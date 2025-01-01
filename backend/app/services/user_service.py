from app.models.user import User
from fastapi_sqlalchemy import db
from app.core.security import get_hased_password, verify_password
import uuid

class UserService:
    async def get_user(username: str) -> User:
        return db.session.query(User).filter(User.username == username).first()

    async def save_user(username: str, email: str, password: str) -> User:
        """Save a new user in database.

        Args:
            user_infos (dict): informations about the user to save.

        Returns:
            User: the user object saved in database.
        """
        password = get_hased_password(password)
        user = User(username=username, email=email, password=password, average_rate=0)
        db.session.add(user)
        db.session.commit()
        return user
    
    async def delete_user(username: str) -> User:
        user = await UserService.get_user(username)
        if not user:
            return None
        db.session.delete(user)
        db.session.commit()
        return user
    
    async def authenticate_user(username: str, password: str):
        user = await UserService.get_user(username)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user