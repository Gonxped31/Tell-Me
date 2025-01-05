from pydantic import Field, BaseModel
from datetime import datetime

class MessageOut(BaseModel):
    message_id: str = Field(..., description="Unique identifier for the message")
    conversation_id: str = Field(..., description="ID of the conversation this message belongs to")
    sender_username: str = Field(..., description="Username of the sender")
    content: str = Field(..., description="Content of the message")
    created_at: datetime = Field(..., description="Timestamp when the message was created")

    class Config:
        orm_mode = True

class MessageCreate(BaseModel):
    conversation_id: str = Field(..., description="ID of the conversation this message belongs to")
    sender_username: str = Field(..., description="Username of the sender")
    content: str = Field(..., description="Content of the message")

    class Config:
        orm_mode = True