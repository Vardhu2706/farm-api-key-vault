# Utils.py


# Imports
import pyotp
import qrcode
import base64


from io import BytesIO
from datetime import datetime, timedelta
from jose import jwt
from app.config import settings


# Generate QR Code
def generate_qr_code(email: str):
    
    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret)
    otp_url = totp.provisioning_uri(name=email, issuer_name="API Key Vault")

    img = qrcode.make(otp_url)
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    qr_base64 = base64.b64encode(buffer.getvalue()).decode()

    return {
        "secret": secret,
        "otp_auth_url": otp_url,
        "qr_code_base64": f"data:image/png;base64,{qr_base64}"
    }


# Verify Token
def verify_token(secret: str, token:str) -> bool:
    
    totp = pyotp.TOTP(secret)
    return totp.verify(token)


# Create Access Token
def create_access_token(data: dict, expires_delta: int = None):
    
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta or settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
