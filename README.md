# 🔐 API Key Vault

A secure full-stack application for storing, managing, and sharing API keys with full authentication, access control, and encryption.

---

## 🚀 Features

### ✅ Authentication
- JWT-based login and protected routes
- TOTP-based Two-Factor Authentication (2FA) using QR code
- User registration with OTP verification

### 🔐 API Key Management
- Create, read, update, and delete API keys
- End-to-end encryption for API key storage
- Show/hide functionality for decrypted keys

### 👥 Sharing & Access Control
- Share keys with other registered users
- View shared keys
- Revoke access to shared users

### 🖥️ Frontend (React + RTK Query)
- Responsive UI built with React & Bootstrap
- State & API management using RTK Query
- Modals for key edit, delete, share
- Toast notifications and loading states

---

## 🛠️ Tech Stack

**Backend**
- FastAPI
- MongoDB (with Motor)
- JWT, Passlib (bcrypt)
- Speakeasy (TOTP)
- Pydantic v2

**Frontend**
- React
- Redux Toolkit + RTK Query
- React-Bootstrap
- React-Toastify

---

## 📦 Setup Instructions

### Backend
```bash
cd backend
python -m venv fastapienv
source fastapienv/bin/activate  # or fastapienv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in `backend/` with the following:

```env
MONGO_URI=<your_mongo_uri>
DB_NAME=apikeyvault
FERNET_KEY=<generated_key>
SECRET_KEY=<jwt_secret>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

To generate a Fernet key:
```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

---
