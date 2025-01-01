from pydantic import BaseModel, Field

class UserSchema(BaseModel):
    username: str = Field(..., examples=["gonxped31"])
    email: str = Field(..., examples=["gonxped31@gmail.com"])
    password: str = Field(..., examples=["password"])

    class Config:
        orm_mode = True

class UserCreateSchema(BaseModel):
    username: str = Field(...)
    email: str
    password: str = Field(...)

