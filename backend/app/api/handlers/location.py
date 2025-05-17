from fastapi import APIRouter, Path, status, HTTPException, Depends
from app.schemas.geography_schema import PositionSchema
from app.services.location_service import LocationService
from app.api.deps.user_deps import verify_token
from typing import List, Dict

location_router = APIRouter()

@location_router.post(
    "/update_user_location",
    response_model=Dict,
    description="Update user location",
    summary="Update user location"
)
async def update_user_location(
    location: PositionSchema,
    _ = Depends(verify_token)
):
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

@location_router.get(
    "/get_nearby_users/{latitude}/{longitude}",
    response_model=List[dict],
    description="Get nearby users",
    summary="Get nearby users"
)
async def get_nearby_users(
    latitude = Path(...),
    longitude = Path(...),
    _ = Depends(verify_token)
):
    nearby_users = await LocationService.get_nearby_users(
        latitude=float(latitude),
        longitude=float(longitude)
    )    
    return nearby_users

@location_router.delete(
    "/delete_user_location/{username}",
    response_model=str,
    description="Delete a user's location",
    summary="Delete a user's location"
)
async def delete_user_location(
    username: str = Path(...),
    _ = Depends(verify_token)
):
    username = await LocationService.delete_user_location(username)
    if not username:
        raise HTTPException(status_code=404, detail=f"Location for this username: '{username}' not found")
    return username