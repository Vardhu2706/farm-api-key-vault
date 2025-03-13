# Auth.py

# Imports

from fastapi import APIRouter, HTTPException, Depends, Security, Body
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from app.schemas.user import UserCreate, UserLogin, UserOut, Token, QRCodeResponse
from app.db.mongo import db
from app.auth.utils import create_access_token, generate_qr_code, verify_token
from app.auth.dependencies import get_current_user, oauth2_scheme

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()


class EmailRequest(BaseModel):
    email: EmailStr


@router.post("/qrcode", response_model=QRCodeResponse)
async def get_qr_code(payload: EmailRequest = Body(...)):
    result = generate_qr_code(payload.email)
    print("[DEBUG] Generated QR Secret:", result["secret"])
    print("[DEBUG] OTP Auth URL:", result["otp_auth_url"])
    return result


@router.post("/register", response_model=UserOut)
async def register(user: UserCreate):
    if not verify_token(user.secret, user.token):
        raise HTTPException(status_code=401, detail="Invalid OTP")

    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = pwd_context.hash(user.password)
    user_dict = {
        "name": user.name,
        "email": user.email,
        "hashed_password": hashed,
        "secret": user.secret,
        "otp_auth_url": user.otp_auth_url
    }
    await db.users.insert_one(user_dict)
    return {"email": user.email, "name": user.name}


@router.post("/login")
async def login(user: UserLogin):
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not pwd_context.verify(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_token(db_user["secret"], user.token):
        raise HTTPException(status_code=401, detail="Invalid OTP")

    token = create_access_token(data={"sub": user.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "email": db_user["email"],
            "name": db_user["name"]
        }
    }


@router.get("/me", response_model=UserOut)
async def me(
    token: str = Security(oauth2_scheme),
    current_user=Depends(get_current_user)
):
    return {
        "email": current_user["email"],
        "name": current_user["name"]
    }