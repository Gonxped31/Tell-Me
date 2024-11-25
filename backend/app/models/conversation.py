from app.base import Base
from sqlalchemy import Column, ForeignKey, TIMESTAMP, Integer

class Conversation(Base):
    __tablename__="conversations"

    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey("users.id"))
    other_user_id = Column(Integer, ForeignKey("users.id"))
    last_message_id = Column(Integer, ForeignKey("messages.id"))
    last_message_time = TIMESTAMP

    def __repr__(self):
        return f"Conversation({self.id}, {self.sender_id}, {self.other_user_id}, {self.last_message_id}, {self.last_message_time})"