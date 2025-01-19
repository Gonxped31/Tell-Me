from pydantic import BaseModel, Field

class PositionSchema(BaseModel):
    latitude: str = Field(...)
    longitude: str = Field(...)

class LocationSchema(BaseModel):
    username: str = Field(...)
    latitude: str = Field(...)
    longitude: str = Field(...)