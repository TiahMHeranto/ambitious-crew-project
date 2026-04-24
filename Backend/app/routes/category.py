from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from app.controllers.category_controller import (
    create_category,
    get_category,
    get_categories,
    update_category,
    delete_category,
    get_categories_with_article_count
)
from app.database.database import get_db

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)

@router.post("/", response_model=CategoryResponse, status_code=201)
def create(
    data: CategoryCreate,
    db: Session = Depends(get_db)
):
    """Create a new category"""
    return create_category(data, db)

@router.get("/", response_model=dict)
def list_categories(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get all categories with pagination and search"""
    return get_categories(db, skip, limit, search)

@router.get("/with-counts")
def get_categories_counts(
    db: Session = Depends(get_db)
):
    """Get all categories with article count"""
    return get_categories_with_article_count(db)

@router.get("/{category_id}", response_model=CategoryResponse)
def get(
    category_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific category by ID"""
    return get_category(category_id, db)

@router.put("/{category_id}", response_model=CategoryResponse)
def update(
    category_id: int,
    data: CategoryUpdate,
    db: Session = Depends(get_db)
):
    """Update a category"""
    return update_category(category_id, data, db)

@router.delete("/{category_id}")
def delete(
    category_id: int,
    db: Session = Depends(get_db)
):
    """Delete a category"""
    return delete_category(category_id, db)