from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from app.core.config import settings
from jose import jwt


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_hased_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)

def create_access_token(data, expires_delta: int = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(data)}
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, settings.ALGORITHM)
    return encoded_jwt

def create_refresh_token(data, expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.now(timezone.utc) + expires_delta
    else:
        expires_delta = datetime.now(timezone.utc) + timedelta(
            minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"exp": expires_delta, "sub": str(data)}
    encoded_jwt = jwt.encode(
        to_encode, settings.JWT_REFRESH_SECRET_KEY, settings.ALGORITHM
    )
    return encoded_jwt