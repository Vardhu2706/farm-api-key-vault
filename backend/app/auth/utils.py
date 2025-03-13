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
def generate_qr_code(email: str = None):
    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret)

    if email:
        uri = totp.provisioning_uri(name=email, issuer_name="API Key Vault")
    else:
        uri = totp.provisioning_uri(name="user", issuer_name="API Key Vault")

    img = qrcode.make(uri)
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    base64_qr = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return {
        "secret": secret,
        "otp_auth_url": uri,
        "qr_code_base64": f"data:image/png;base64,{base64_qr}"
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
