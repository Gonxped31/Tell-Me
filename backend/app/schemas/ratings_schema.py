from pydantic import BaseModel, Field, ConfigDict

class ScoreSchema(BaseModel):
    model_config = ConfigDict(extra='allow')
    rated_by: str = Field(...)
    rated_to: str = Field(...)
    score: int = Field(...)

    # class Config:
    #     extra = "allow"