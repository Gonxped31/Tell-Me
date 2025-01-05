from app.base import Base
from sqlalchemy import (
    Column, 
    ForeignKey, 
    String, 
    Integer, 
    Boolean,
    DateTime,
    Text,
    func
)
from sqlalchemy.orm import relationship
import uuid

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    message_id = Column(String, nullable=False, unique=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String, ForeignKey("conversations.conv_id"), nullable=False)
    sender_username = Column(String, ForeignKey("users.username"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=func.now())
    is_read = Column(Boolean, default=False)

    conversation = relationship("Conversation", back_populates="messages")
    sender = relationship("User", foreign_keys=[sender_username])

    def __repr__(self):
        return f"Message(message_id={self.message_id},"\
            " conversation_id={self.conversation_id},"\
            " sender_username={self.sender_username},"\
            " content={self.content}"\
            " created_at={self.created_at}"\
            " is_read={self.is_read})"