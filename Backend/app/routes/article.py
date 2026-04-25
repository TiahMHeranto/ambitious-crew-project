from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.schemas.article import ArticleCreate, ArticleUpdate, ArticleResponse
from app.controllers.article_controller import (
    create_article,
    get_articles,
    get_article_by_id,
    update_article,
    delete_article,
    get_articles_by_author
)
from app.controllers.auth_controller import get_current_user
from app.database.database import get_db
from app.models.user import User

router = APIRouter(
    prefix="/articles",
    tags=["Articles"]
)


@router.post("/", response_model=ArticleResponse, status_code=status.HTTP_201_CREATED)
def create_new_article(
    data: ArticleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_article(db, data, current_user.id)


@router.get("/", response_model=List[ArticleResponse])
def list_articles(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return get_articles(db, skip, limit, category)


@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(
    article_id: int,
    db: Session = Depends(get_db)
):
    return get_article_by_id(db, article_id)


@router.put("/{article_id}", response_model=ArticleResponse)
def update_existing_article(
    article_id: int,
    data: ArticleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_article(db, article_id, data, current_user)


@router.delete("/{article_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_article(
    article_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return delete_article(db, article_id, current_user)


@router.get("/author/{author_id}", response_model=List[ArticleResponse])
def list_articles_by_author(
    author_id: int,
    db: Session = Depends(get_db)
):
    return get_articles_by_author(db, author_id)