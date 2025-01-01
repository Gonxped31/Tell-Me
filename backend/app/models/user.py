from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from geoalchemy2 import Geography
from datetime import datetime, timezone
from app.base import Base

class User(Base):
    __tablename__= "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False, unique=True)

    location = relationship("Location", back_populates="user")
    score = relationship("Score", back_populates="user")

    def __repr__(self):
        return f"User({self.id}, {self.username}, {self.email}, {self.password})"
    
class Score(Base):
    __tablename__= "scores"

    id = Column(Integer, primary_key=True)
    rated_by = Column(String, nullable=False)
    rated_to = Column(String, ForeignKey("users.username"), nullable=False, onupdate="CASCADE")
    score = Column(Integer, nullable=False)

    user = relationship("User", back_populates="score")

    def __repr__(self):
        return f"Score({self.id}, {self.rated_by}, {self.rated_to}, {self.score})"

class Location(Base):
    __tablename__= "locations"

    id = Column(Integer, primary_key=True)
    username = Column(String, ForeignKey("users.username"), nullable=False, onupdate="CASCADE")
    location = Column(Geography(geometry_type="POINT", srid=4326), nullable=False)
    updated_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)

    user = relationship("User", back_populates="location")

    def __repr__(self):
        return f"User({self.id}, {self.username}, {self.location}, {self.updated_at})"