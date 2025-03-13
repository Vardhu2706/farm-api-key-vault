# Main.py

# Imports
from fastapi import FastAPI
from app.routes import apiKeys, auth

# Init Fast API app
app = FastAPI()

# Register Routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(apiKeys.router, prefix="/keys", tags=["API Keys"])