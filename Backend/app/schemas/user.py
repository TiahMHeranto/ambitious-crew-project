from pydantic import BaseModel, EmailStr, Field

class RegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=72)

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str

class Config:
    orm_mode = True