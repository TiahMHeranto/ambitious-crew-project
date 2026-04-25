from fastapi import APIRouter, Depends, status
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
from app.database.database import get_db

router = APIRouter(
    prefix="/articles",
    tags=["Articles"]
)


# =========================
# CREATE (PUBLIC)
# =========================
@router.post("/", response_model=ArticleResponse, status_code=status.HTTP_201_CREATED)
def create_new_article(
    data: ArticleCreate,
    db: Session = Depends(get_db)
):
    return create_article(db, data, author_id=1)  # ⚠️ TEMP FIX (or pass from body)


# =========================
# GET ALL (PUBLIC)
# =========================
@router.get("/", response_model=List[ArticleResponse])
def list_articles(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return get_articles(db, skip, limit, category)


# =========================
# GET ONE (PUBLIC)
# =========================
@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(article_id: int, db: Session = Depends(get_db)):
    return get_article_by_id(db, article_id)


# =========================
# UPDATE (PUBLIC ⚠️ NO SECURITY)
# =========================
@router.put("/{article_id}", response_model=ArticleResponse)
def update_existing_article(
    article_id: int,
    data: ArticleUpdate,
    db: Session = Depends(get_db)
):
    return update_article(db, article_id, data)


# =========================
# DELETE (PUBLIC ⚠️ NO SECURITY)
# =========================
@router.delete("/{article_id}")
def delete_existing_article(
    article_id: int,
    db: Session = Depends(get_db)
):
    return delete_article(db, article_id)


# =========================
# BY AUTHOR (PUBLIC)
# =========================
@router.get("/author/{author_id}", response_model=List[ArticleResponse])
def list_articles_by_author(
    author_id: int,
    db: Session = Depends(get_db)
):
    return get_articles_by_author(db, author_id)