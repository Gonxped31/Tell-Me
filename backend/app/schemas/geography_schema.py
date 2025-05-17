from pydantic import BaseModel, Field, ConfigDict
import datetime
from geoalchemy2 import Geography

class PositionSchema(BaseModel):
    model_config = ConfigDict(extra='allow')
    username: str = Field(...)
    latitude: str = Field(...)
    longitude: str = Field(...)

    # class Config:
    #     extra = "allow"

class LocationSchema(BaseModel):
    model_config = ConfigDict(extra='allow')
    username: str = Field(...)
    location: tuple = Field(...)
    updated_at: datetime = Field(...)

    # class Config:
    #     extra = "allow"