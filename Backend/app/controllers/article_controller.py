from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from app.models.user import User
from app.models.article import Article
from app.models.category import Category
from app.schemas.article import ArticleCreate, ArticleUpdate


# =========================
# CREATE ARTICLE (NO AUTH)
# =========================
def create_article(db: Session, article_data: ArticleCreate, author_id: int):

    author = db.query(User).filter(User.id == author_id).first()
    if not author:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Auteur non trouvé"
        )

    new_article = Article(
        title=article_data.title,
        content=article_data.content,
        author_id=author_id
    )

    db.add(new_article)
    db.flush()

    if article_data.category_names:
        for cat_name in article_data.category_names:
            category = db.query(Category).filter(Category.name == cat_name).first()

            if not category:
                category = Category(name=cat_name)
                db.add(category)
                db.flush()

            new_article.categories.append(category)

    db.commit()
    db.refresh(new_article)

    return new_article


# =========================
# GET ARTICLES (PUBLIC)
# =========================
def get_articles(db: Session, skip: int = 0, limit: int = 100, category: Optional[str] = None):

    query = db.query(Article)

    if category:
        query = query.join(Article.categories).filter(Category.name == category)

    return query.offset(skip).limit(limit).all()


# =========================
# GET BY ID (PUBLIC)
# =========================
def get_article_by_id(db: Session, article_id: int):

    article = db.query(Article).filter(Article.id == article_id).first()

    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article non trouvé"
        )

    return article


# =========================
# UPDATE ARTICLE (NO AUTH CHECK)
# =========================
def update_article(db: Session, article_id: int, article_data: ArticleUpdate):

    article = get_article_by_id(db, article_id)

    if article_data.title is not None:
        article.title = article_data.title

    if article_data.content is not None:
        article.content = article_data.content

    db.commit()
    db.refresh(article)

    return article


# =========================
# DELETE ARTICLE (NO AUTH CHECK)
# =========================
def delete_article(db: Session, article_id: int):

    article = get_article_by_id(db, article_id)

    db.delete(article)
    db.commit()

    return {"message": "Article supprimé avec succès"}


# =========================
# BY AUTHOR (PUBLIC)
# =========================
def get_articles_by_author(db: Session, author_id: int):

    return db.query(Article).filter(Article.author_id == author_id).all()