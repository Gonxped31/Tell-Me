from app.base import Base
from sqlalchemy import (
    Column, 
    ForeignKey, 
    String, 
    TIMESTAMP, 
    Integer, 
    Boolean,
    DateTime,
    func
)

class Message(Base):
    __tablename__="messages"

    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey("users.id"))
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    message_line = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, default=func.now())
    is_read = Column(Boolean, default=False)
    deleted_at = Column(DateTime, nullable=True)

    def __repr__(self):
        return f"Message({self.id}, {self.sender_id}, {self.conversation_id}, {self.message_line}, {self.created_at}, {self.is_read}, {self.deleted_at})"