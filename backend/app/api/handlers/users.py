from fastapi import APIRouter, HTTPException, Path, Query, status
from typing import Dict
from app.schemas.user_schema import UserSchema, UserCreateSchema
from app.schemas.geography_schema import PositionSchema, LocationSchema
from app.services.user_service import UserService
from app.services.location_service import LocationService
from typing import List, Dict

users_router = APIRouter()

@users_router.get("/get_users")
async def get_users():
    return {"message": "Users"}

@users_router.post(
    "/add_user",
    response_model=UserSchema,
    description="Add a new User",
    summary="Add a new User"
)
async def add_user(user: UserCreateSchema):
    infos = {"username": user.username, "email": user.email, "password": user.password}
    user = await UserService.authenticate_user(user.username, user.password)
    if user:
        raise HTTPException(status_code=400, detail=f"User with this username: '{infos['username']}' already exists")
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
):
    user = await UserService.delete_user(username)
    if not user:
        raise HTTPException(status_code=404, detail=f"User with this username: '{username}' not found")
    return user

#TODO
@users_router.put("/update_user/{user_id}/{infos}")
async def update_user():
    return {"message": "User updated"}

@users_router.post(
    "/update_user_location",
    response_model=Dict,
    description="Update user location",
    summary="Update user location"
)
async def update_user_location(location: LocationSchema):
    try:
        if location.latitude == None or location.longitude == None:
            raise ValueError("Latitude and Longitude should not be null")

        location_updated = await LocationService.update_user_location(
            username=location.username,
            latitude=float(location.latitude),
            longitude=float(location.longitude)
        )
    except HTTPException:
        raise HTTPException(status_code=404, detail=f"User with this username: '{location.username}' does not exists")
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Latitude and Longitude should not be null")

    return location_updated

@users_router.get(
    "/get_nearby_users/{latitude}/{longitude}",
    response_model=List[dict],
    description="Get nearby users",
    summary="Get nearby users"
)
async def get_nearby_users(
    latitude = Path(...),
    longitude = Path(...)
):
    nearby_users = await LocationService.get_nearby_users(
        latitude=float(latitude),
        longitude=float(longitude)
    )    
    return nearby_users