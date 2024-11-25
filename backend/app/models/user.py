from sqlalchemy import Column, String, Integer
from app.base import Base

class User(Base):
    __tablename__= "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False, unique=True)
    email = Column(String, nullable=False)
    password = Column(String(50), nullable=False, unique=True)
    average_rate = Column(Integer, nullable=False)

    def __repr__(self):
        return f"User({self.id}, {self.username}, {self.email}, {self.password}, {self.average_rate})"

