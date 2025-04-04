from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class UserSchema(BaseModel):
    model_config = ConfigDict(extra='allow')
    username: str = Field(..., examples=["gonxped31"])
    email: str = Field(..., examples=["gonxped31@gmail.com"])
    password: str = Field(..., examples=["password"])

    # class Config:
    #     extra = "allow"

class UserUpdate(BaseModel):
    model_config = ConfigDict(extra='allow')
    username: Optional[str] = Field(None, examples=["gonxped31"])
    email: Optional[str] = Field(None, examples=["gonxped31@gmail.com"])
    password: Optional[str] = Field(None, examples=["password"])

    # class Config:
    #     extra = "allow"

class UserCreate(BaseModel):
    model_config = ConfigDict(extra='allow')
    username: str = Field(...)
    email: str
    password: str = Field(...)

    # class Config:
    #     extra = "allow"

class UserSettingOut(BaseModel):
    model_config = ConfigDict(extra='allow')
    username: str = Field(..., description="Username of the user")
    allow_anonymous: bool = Field(..., description="Indicates whether the user allows sending messages anonymously")
    auto_delete_days: int = Field(..., description="Number of days after which conversations are automatically deleted")

    # class Config:
    #     extra = "allow"
