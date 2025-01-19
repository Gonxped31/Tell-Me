from pydantic import BaseModel, Field, ConfigDict

class PositionSchema(BaseModel):
    model_config = ConfigDict(extra='allow')
    latitude: str = Field(...)
    longitude: str = Field(...)

    # class Config:
    #     extra = "allow"

class LocationSchema(BaseModel):
    model_config = ConfigDict(extra='allow')
    username: str = Field(...)
    latitude: str = Field(...)
    longitude: str = Field(...)

    # class Config:
    #     extra = "allow"