from app.models.user import User
from app.models.location import Location
from app.models.ratings import Score
from app.models.conversation import Conversation
from app.schemas.user_schema import UserUpdate
from fastapi import HTTPException, status
from fastapi_sqlalchemy import db
from app.core.security import get_hased_password, verify_password
import secrets
import smtplib
from email.mime.text import MIMEText
import redis
import os
import secrets
from sqlalchemy import or_
from typing import Dict

# Configurations
# r = redis.Redis(host=os.getenv("DB_HOST"), port=6379, db=0)
r = redis.from_url(os.getenv("REDIS_URL"))
CODE_EXPIRATION = 300  # 5 minutes (in seconds)
RATE_LIMIT_PERIOD = 300  # User can request code every 5 minutes (in seconds)


class UserService:
    @staticmethod
    async def get_user_by_username(username: str) -> User:
        return db.session.query(User).filter(User.username == username).first()
    
    @staticmethod
    async def get_user_by_email(email: str) -> User:
        return db.session.query(User).filter(User.email == email).first()

    @staticmethod
    async def save_user(username: str, email: str, password: str) -> User:
        """Save a new user in database.

        Args:
            user_infos (dict): informations about the user to save.

        Returns:
            User: the user object saved in database.
        """
        password = get_hased_password(password)
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return user
    
    @staticmethod
    async def delete_user(username: str) -> User:
        user = await UserService.get_user_by_username(username)
        if not user:
            return None
        db.session.delete(user)
        db.session.commit()
        return user
    
    @staticmethod
    async def authenticate_user(username: str, password: str):
        user = await UserService.get_user_by_username(username)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user
    
    @staticmethod
    async def signUp(username: str, email: str):
        user = await UserService.get_user_by_username(username)
        if user:
            return None
        user = await UserService.get_user_by_email(email)
        if user:
            return None
        return user

    @staticmethod
    async def send_verification_code_email(recipient_email: str, code: str) -> Dict:
        EMAIL_SENDER = os.getenv("EMAIL_SENDER")
        SMTP_SERVER = "smtp.gmail.com" #os.getenv("EMAIL_SENDER")
        SMTP_PORT = 587 #os.getenv("EMAIL_SENDER")
        EMAIL_PASSWORD = "qzln pock ghba pjcc"
        # Create the email content
        msg = MIMEText(f"Your password reset code is: {code}. This code will expire in {int(CODE_EXPIRATION/60)} {'minutes' if int(CODE_EXPIRATION/60) else 'minute'}.")
        msg["Subject"] = "Password Reset Code"
        msg["From"] = EMAIL_SENDER
        msg["To"] = recipient_email

        # Send email via SMTP
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD) 
            server.sendmail(EMAIL_SENDER, recipient_email, msg.as_string())

        return {"message": "Email sent."}

    @staticmethod
    async def send_verification_code(email: str) -> Dict:
        rate_limit_key = f"rate_limit:{email}"
        if r.exists(rate_limit_key):
            ttl = r.ttl(rate_limit_key)
            raise HTTPException(
                status_code=429,
                detail=f"Too many requests. Try again in {ttl} seconds."
            )

        # Generate a secure reset code
        reset_code = secrets.randbelow(10000) # Generates a 6-character code

        # Store the code in Redis with expiration
        reset_code_key = f"password_reset_code:{email}"
        r.setex(reset_code_key, CODE_EXPIRATION, reset_code)

        # Set the rate-limit key with expiration
        r.setex(rate_limit_key, RATE_LIMIT_PERIOD, "1")

        return await UserService.send_verification_code_email(email, reset_code)

    @staticmethod
    async def update_user(email: str, userData: UserUpdate) -> User:
        user = await UserService.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail=f"User with this email: {email} doesn't exist")
        
        old_username = user.username
        
        data_dict = userData.model_dump(exclude_unset=True)

        if "password" in data_dict:
            data_dict["password"] = get_hased_password(data_dict["password"])

        for key, value in data_dict.items():
            if hasattr(user, key):
                setattr(user, key, value)
            else:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Field {key} does not exist")
            
        if "username" in data_dict:
            new_username = data_dict["username"]

            db.session.query(Location)\
                .filter(Location.username == old_username)\
                .update({"username": new_username})

            db.session.query(Score)\
                .filter(Score.rated_to == old_username)\
                .update({"rated_to": new_username})
            
            db.session.query(Score)\
                .filter(Score.rated_by == old_username)\
                .update({"rated_by": new_username})
            
            db.session.query(Conversation)\
                .filter(Conversation.initiator_username == old_username)\
                .update({"initiator_username": new_username})
            
            db.session.query(Conversation)\
                .filter(Conversation.recipient_username == old_username)\
                .update({"recipient_username": new_username})
            
            updated_convs = db.session.query(Conversation)\
                .filter(or_(
                    Conversation.initiator_username == new_username,
                    Conversation.recipient_username == new_username
                )).all()
            
        db.session.commit()
        return {
            "user": user,
            "updated_conversations": list(map(lambda conv: conv.conv_id, updated_convs))
        }