from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import RegisterSchema, LoginSchema
from app.controllers.auth_controller import (
    register_user,
    login_user
)
from app.database.database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    data: RegisterSchema,
    db: Session = Depends(get_db)
):
    return register_user(data, db)


@router.post("/login")
def login(
    data: LoginSchema,
    db: Session = Depends(get_db)
):
    return login_user(data, db)