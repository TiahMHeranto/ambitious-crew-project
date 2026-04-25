# app/routes/category.py
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse, CategoryWithArticleCount
from app.controllers.category_controller import (
    get_categories,
    get_category,
    create_category,
    update_category,
    delete_category
)
from app.database.database import get_db

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)

@router.get("/", response_model=List[CategoryResponse])  # Changé de dict à List[CategoryResponse]
def list_categories(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all categories with pagination and search"""
    categories = get_categories(db, skip, limit, search)
    return categories  # Retourne la liste des objets Category

@router.get("/{category_id}", response_model=CategoryResponse)
def get_category_by_id(
    category_id: int,
    db: Session = Depends(get_db)
):
    """Get a single category by ID"""
    return get_category(category_id, db)

@router.post("/", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_new_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    """Create a new category"""
    return create_category(db, category)

@router.put("/{category_id}", response_model=CategoryResponse)
def update_existing_category(
    category_id: int,
    category: CategoryUpdate,
    db: Session = Depends(get_db)
):
    """Update a category"""
    return update_category(db, category_id, category)

@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    """Delete a category"""
    return delete_category(db, category_id)