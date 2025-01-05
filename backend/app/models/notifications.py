from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Text
)
from app.base import Base
from sqlalchemy.orm import relationship
import uuid

class Notifications(Base):
    __tablename__= "notifications"

    id = Column(Integer, primary_key=True)
    notification_id = Column(String, nullable=False, unique=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, ForeignKey("users.username"), unique=True, nullable=False)
    content = Column(Text, nullable=False)

    user = relationship("User", back_populates="notification")

    def __repr__(self):
        return f"Notifications(notification_id={self.notification_id},"\
            " username={self.username},"\
            " content={self.content})"
