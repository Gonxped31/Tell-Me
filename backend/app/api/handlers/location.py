from fastapi import APIRouter, Path, status, HTTPException
from app.schemas.geography_schema import LocationSchema
from app.services.location_service import LocationService
from typing import List, Dict

location_router = APIRouter()

@location_router.post(
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

@location_router.get(
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