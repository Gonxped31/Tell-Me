from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Boolean
)
from sqlalchemy.orm import relationship
from app.base import Base

class User(Base):
    __tablename__= "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False, unique=True)

    location = relationship("Location", back_populates="user")
    score = relationship("Score", back_populates="user")
    settings = relationship("UserSettings", back_populates="user", uselist=False)
    initiated_conversations = relationship("Conversation", foreign_keys="[Conversation.initiator_username]", back_populates="initiator")
    received_conversations = relationship("Conversation", foreign_keys="[Conversation.recipient_username]", back_populates="recipient")
    notification = relationship("Notifications", back_populates="user")

    def __repr__(self):
        return f"User({self.username},"\
            " email={self.email},"\
            " password={self.password})"

class UserSettings(Base):
    __tablename__ = "user_settings"

    id = Column(Integer, primary_key=True)
    username = Column(String, ForeignKey("users.username"), nullable=False, unique=True)
    allow_anonymous = Column(Boolean, default=False)
    auto_delete_days = Column(Integer, default=7)

    user = relationship("User", back_populates="settings")

    def __repr__(self):
        return f"UserSettings({self.username},"\
            " {self.allow_anonymous},"\
            " {self.auto_delete_days})"
