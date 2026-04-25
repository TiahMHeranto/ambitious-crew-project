# app/controllers/category_controller.py
from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi import HTTPException, status
from typing import List, Optional
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse

def get_categories(
    db: Session, 
    skip: int = 0, 
    limit: int = 100, 
    search: Optional[str] = None
) -> List[Category]:
    """Get all categories with pagination and search"""
    query = db.query(Category)
    
    if search:
        query = query.filter(
            or_(
                Category.name.ilike(f"%{search}%"),
                Category.description.ilike(f"%{search}%")
            )
        )
    
    categories = query.offset(skip).limit(limit).all()
    return categories

def get_category(category_id: int, db: Session) -> Category:
    """Get a single category by ID"""
    category = db.query(Category).filter(Category.id == category_id).first()
    
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    return category

def create_category(db: Session, category_data: CategoryCreate) -> Category:
    """Create a new category"""
    # Check if category with same name exists
    existing = db.query(Category).filter(Category.name == category_data.name).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this name already exists"
        )
    
    new_category = Category(**category_data.model_dump())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

def update_category(db: Session, category_id: int, category_data: CategoryUpdate) -> Category:
    """Update a category"""
    category = get_category(category_id, db)
    
    update_data = category_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(category, field, value)
    
    db.commit()
    db.refresh(category)
    return category

def delete_category(db: Session, category_id: int) -> None:
    """Delete a category"""
    category = get_category(category_id, db)
    db.delete(category)
    db.commit()