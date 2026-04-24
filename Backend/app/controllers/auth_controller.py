from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import RegisterSchema, LoginSchema
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)
from app.database.database import get_db


def register_user(data: RegisterSchema, db: Session):

    existing = db.query(User).filter(
        (User.email == data.email) |
        (User.username == data.username)
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    new_user = User(
        username=data.username,
        email=data.email,
        password=hash_password(data.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}


def login_user(data: LoginSchema, db: Session):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token({
        "sub": user.email,
        "id": user.id,
        "role": user.role
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }