from fastapi import APIRouter, HTTPException, status, Path, Depends
from app.schemas.user_schema import UserSchema, UserCreate, UserUpdate
from app.services.user_service import UserService
from app.api.deps.user_deps import verify_token
from typing import Dict
import redis, os

users_router = APIRouter()

r = redis.Redis(host=os.getenv("DB_HOST"), port=6379, db=0)

@users_router.post(
    "/add_user",
    response_model=UserSchema,
    description="Add a new User",
    summary="Add a new User"
)
async def add_user(user: UserCreate):
    infos = {"username": user.username, "email": user.email, "password": user.password}
    user = await UserService.signUp(user.username, user.email)
    if user:
        raise HTTPException(status_code=400, detail=f"User with this username/email: '{infos['username']}/${infos['email']}' already exist")
    saved_user = await UserService.save_user(**infos)
    return saved_user

@users_router.delete(
    "/delete_user",
    response_model=UserSchema,
    description="Delete a user",
    summary="Delete a user"
)
async def delete_user(
    username: str,
    _ = Depends(verify_token)
):
    user = await UserService.delete_user(username)
    if not user:
        raise HTTPException(status_code=404, detail=f"User with this username: '{username}' not found")
    return user

@users_router.put(
    "/update_user/{email}",
    description="Update a user",
    summary="Update a user"
)
async def update_user(
    userData: UserUpdate,
    email: str = Path(...),
    _ = Depends(verify_token)
):
    print(userData)
    print(email)
    return await UserService.update_user(email, userData) 

@users_router.post(
    "/send_verification_code/{email}",
    response_model=bool,
    description="Check if the email exists and send a verification code.",
    summary="Check if the email exists and send a verification code."
)
async def send_verification_code(
    email: str = Path(...),
    _ = Depends(verify_token)
) -> bool:
    user = await UserService.get_user_by_email(email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with this email: '{email}' doesn't exist")
    if (await UserService.send_verification_code(email)):
        return True
    return False
    
@users_router.post(
    "/password_reset/verify/{email}/{code}",
    response_model=bool,
    description="Verify verification code.",
    summary="Verify verification code."
)
def verify_password_reset_code(
    email: str = Path(...),
    code: str = Path(...),
    _ = Depends(verify_token)
) -> bool:
    # Retrieve the code from Redis
    reset_code_key = f"password_reset_code:{email}"
    stored_code = r.get(reset_code_key)

    if not stored_code:
        raise HTTPException(status_code=400, detail="Invalid or expired reset code")

    if stored_code.decode("utf-8") != code:
        raise HTTPException(status_code=400, detail="Incorrect reset code")

    # Code is valid - delete it to prevent reuse
    r.delete(reset_code_key)

    return True
