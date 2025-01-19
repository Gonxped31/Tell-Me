from pydantic import BaseModel, Field

class PositionSchema(BaseModel):
    latitude: str = Field(...)
    longitude: str = Field(...)

    class Config:
        from_attributes = True

class LocationSchema(BaseModel):
    username: str = Field(...)
    latitude: str = Field(...)
    longitude: str = Field(...)

    class Config:
        from_attributes = True