from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.models.category import Category
from app.models.article_category import article_category
from app.schemas.category import CategoryCreate, CategoryUpdate

def create_category(data: CategoryCreate, db: Session):
    """Create a new category"""
    # Check if category with same name exists
    existing = db.query(Category).filter(
        Category.name == data.name
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this name already exists"
        )
    
    new_category = Category(
        name=data.name,
        description=data.description
    )
    
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    
    return new_category

def get_category(category_id: int, db: Session):
    """Get a single category by ID"""
    category = db.query(Category).filter(Category.id == category_id).first()
    
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    return category

def get_categories(
    db: Session, 
    skip: int = 0, 
    limit: int = 100, 
    search: Optional[str] = None
):
    """Get all categories with optional search"""
    query = db.query(Category)
    
    if search:
        query = query.filter(Category.name.ilike(f"%{search}%"))
    
    categories = query.offset(skip).limit(limit).all()
    total = query.count()
    
    return {
        "items": categories,
        "total": total,
        "skip": skip,
        "limit": limit
    }

def update_category(category_id: int, data: CategoryUpdate, db: Session):
    """Update a category"""
    category = db.query(Category).filter(Category.id == category_id).first()
    
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    # Check if new name conflicts with existing category
    if data.name and data.name != category.name:
        existing = db.query(Category).filter(Category.name == data.name).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category with this name already exists"
            )
        category.name = data.name
    
    if data.description is not None:
        category.description = data.description
    
    db.commit()
    db.refresh(category)
    
    return category

def delete_category(category_id: int, db: Session):
    """Delete a category"""
    category = db.query(Category).filter(Category.id == category_id).first()
    
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found"
        )
    
    db.delete(category)
    db.commit()
    
    return {"message": "Category deleted successfully"}

def get_categories_with_article_count(db: Session):
    """Get all categories with article count"""
    results = db.query(
        Category,
        func.count(article_category.c.article_id).label('article_count')
    ).outerjoin(
        article_category, Category.id == article_category.c.category_id
    ).group_by(Category.id).all()
    
    categories = []
    for category, count in results:
        category_dict = {
            "id": category.id,
            "name": category.name,
            "description": category.description,
            "created_at": category.created_at,
            "updated_at": category.updated_at,
            "article_count": count
        }
        categories.append(category_dict)
    
    return categories