from app.models.location import Location
from fastapi_sqlalchemy import db
from geoalchemy2.functions import ST_DWithin, ST_Distance, ST_SetSRID, ST_MakePoint
from typing import List
from app.services.user_service import UserService

class LocationService:
    @staticmethod
    async def update_user_location(username: str, latitude: float, longitude: float) -> Location:

        user_location = db.session.query(Location).filter(Location.username == username).first()

        location = Location(
            username=username,
            location=f"SRID=4326;POINT({longitude} {latitude})"
        )

        if user_location:
            db.session.delete(user_location)

        db.session.add(location)
        db.session.commit()
        db.session.refresh(location)

        return {
            "username": username,
            "location": (latitude, longitude),
            "updated_at": location.updated_at
        }

    @staticmethod
    async def get_nearby_users(latitude: float, longitude: float, radius: float = 5.0) -> List[dict]:
        point = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
        query = db.session.query(
            Location.username,
            ST_Distance(Location.location, point).label("distance_m")
        ).filter(
            ST_DWithin(Location.location, point, radius * 1000)
        ).order_by("distance_m")

        rows = query.all()

        result = []

        for row in rows:
            username = row.username
            distance = row.distance_m
            result.append({
                "username": username,
                "distance_m": distance,
            })

        return result