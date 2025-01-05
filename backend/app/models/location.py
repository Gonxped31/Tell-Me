from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from geoalchemy2 import Geography
from app.base import Base

class Location(Base):
    __tablename__= "locations"

    id = Column(Integer, primary_key=True)
    username = Column(String, ForeignKey("users.username"), nullable=False, onupdate="CASCADE")
    location = Column(Geography(geometry_type="POINT", srid=4326), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)

    user = relationship("User", back_populates="location")

    def __repr__(self):
        return f"User(username={self.username},"\
            " location={self.location},"\
            " updated_at={self.updated_at})"
