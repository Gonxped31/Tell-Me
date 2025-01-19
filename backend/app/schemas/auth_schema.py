from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict

"""
This module provides data schemas related to authentication tokens.
"""

class TokenSchema(BaseModel):
    model_config = ConfigDict(extra='allow')
    access_token: str = Field(..., description="JWT access token for authentication.")
    refresh_token: str = Field(..., description="JWT refresh token to obtain a new access token.")

    # class Config:
    #     extra = "allow"
    
class TokenPayload(BaseModel):
    model_config = ConfigDict(extra='allow')
    sub: str = Field(None, description="Subject of the token.")
    exp: int = Field(None, description="Expiration time of the token.")

    # class Config:
    #     extra = "allow"