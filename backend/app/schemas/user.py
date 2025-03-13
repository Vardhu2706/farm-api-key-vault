# User.py

# Imports
from pydantic import BaseModel, EmailStr


# UserCreate Model
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    secret: str
    otp_auth_url: str
    token: str


# UserLogin Model
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    token: str


# UserOut Model
class UserOut(BaseModel):
    email: EmailStr


# Token Model
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# QRCodeResponse Model
class QRCodeResponse(BaseModel):
    secret: str
    otp_auth_url: str
    qr_code_base64: str