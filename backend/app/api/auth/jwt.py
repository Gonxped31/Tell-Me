from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from app.services.user_service import UserService
from app.models.user import User
from app.api.deps.user_deps import verify_token
from app.core.security import create_access_token, create_refresh_token
from app.core.config import settings
from app.schemas.auth_schema import TokenSchema, TokenPayload
from app.schemas.user_schema import UserSchema
from jose import jwt, JWTError
from pydantic import ValidationError

auth_router = APIRouter()

@auth_router.post('/auth/login')
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await UserService.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    
    return {
        "access_token": create_access_token(user.username),
        "refresh_token": create_refresh_token(user.username),
        "user": {
            "username": user.username,
            "email": user.email
        }
    }
    
@auth_router.post(
        "/auth/verify_token",
        summary="Test if the access token is valid",
        response_model=UserSchema,
        )
async def verify_user_token(user: User = Depends(verify_token)):
    return user

@auth_router.post("/auth/refresh",summary="Refresh token", response_model=TokenSchema)
async def refresh_token(refresh_token: str = Body(...)):
    try:
        payload = jwt.decode(
            refresh_token,
            settings.JWT_REFRESH_SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = await UserService.get_user(token_data.sub)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid token for user",
        )
    return {
        "access_token": create_access_token(user.username),
        "refresh_token": create_refresh_token(user.username),
    }