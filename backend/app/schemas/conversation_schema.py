from pydantic import Field, BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class ConversationOut(BaseModel):
    model_config = ConfigDict(extra='allow')
    conv_id: str = Field(..., description="Unique identifier for the conversation")
    initiator_username: str = Field(..., description="Username of the user who initiated the conversation")
    recipient_username: str = Field(..., description="Username of the recipient of the conversation")
    created_at: datetime = Field(..., description="Timestamp when the conversation was created")
    is_anonymous: bool = Field(..., description="Indicates whether the conversation is anonymous")
    initiator_opened: bool = Field(..., description="Indicates wether the conversation has been opened by the initiator")
    recipient_opened: bool = Field(..., description="Indicates wether the conversation has been opened by the recipient")

    # class Config:
    #     extra = "allow"

class ConversationCreate(BaseModel):
    model_config = ConfigDict(extra='allow')
    initiator_username: str = Field(..., description="Username of the user who initiated the conversation")
    recipient_username: str = Field(..., description="Username of the recipient of the conversation")

    # class Config:
    #     extra = "allow"

class ConversationUpdate(BaseModel):
    model_config = ConfigDict(extra='allow')
    is_anonymous: Optional[bool] = Field(None, description="Indicates whether the conversation is anonymous")
    initiator_opened: Optional[bool] = Field(None, description="Indicates wether the conversation has been opened by the initiator")
    recipient_opened: Optional[bool] = Field(None, description="Indicates wether the conversation has been opened by the recipient")

    # class Config:
    #     extra = "allow"