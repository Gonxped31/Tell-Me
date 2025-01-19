from pydantic import BaseModel, Field

class ScoreSchema(BaseModel):
    rated_by: str = Field(...)
    rated_to: str = Field(...)
    score: int = Field(...)

    class Config:
        extra = "allow"