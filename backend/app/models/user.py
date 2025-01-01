from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from geoalchemy2 import Geography
from datetime import datetime, timezone
from app.base import Base

class User(Base):
    __tablename__= "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False, unique=True)
    average_rate = Column(Integer, nullable=False)

    location = relationship("Location", back_populates="user")

    def __repr__(self):
        return f"User({self.id}, {self.username}, {self.email}, {self.password}, {self.average_rate})"

class Location(Base):
    __tablename__= "locations"

    id = Column(Integer, primary_key=True)
    username = Column(String, ForeignKey("users.username"))
    location = Column(Geography(geometry_type="POINT", srid=4326), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)

    user = relationship("User", back_populates="location")

    def __repr__(self):
        return f"User({self.id}, {self.username}, {self.location}, {self.updated_at})"