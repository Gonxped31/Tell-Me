from app.base import Base
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    DateTime,
    Boolean,
    func
)
from sqlalchemy.orm import relationship
import uuid

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True)
    conv_id = Column(String, nullable=False, unique=True, default=lambda: str(uuid.uuid4()))
    initiator_username = Column(String, ForeignKey("users.username"), nullable=False)
    recipient_username = Column(String, ForeignKey("users.username"), nullable=False)
    created_at = Column(DateTime, default=func.now())
    is_anonymous = Column(Boolean, default=False)
    initiator_opened = Column(Boolean, default=True)
    recipient_opened = Column(Boolean, default=False)

    initiator = relationship("User", foreign_keys=[initiator_username], back_populates="initiated_conversations")
    recipient = relationship("User", foreign_keys=[recipient_username], back_populates="received_conversations")
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

    def __repr__(self):
        return f"Conversation({self.conv_id},"\
            " initiator={self.initiator_username},"\
            " recipient={self.recipient_username},"\
            " is_anonymous={self.is_anonymous},"\
            " created_at={self.created_at}),"\
            " initiator_opened-{self.initiator_opened},"\
            " recipient_opened={self.recipient_opened})"
