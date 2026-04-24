from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.user import User
from app.models.article import Article
from app.models.category import Category
from app.schemas.article import ArticleCreate, ArticleUpdate

def create_article(
    db: Session,
    article_data: ArticleCreate,
    author_id: int
):
    # Vérifier si l'auteur existe
    author = db.query(User).filter(User.id == author_id).first()
    if not author:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Auteur non trouvé"
        )
    
    # Créer l'article
    new_article = Article(
        title=article_data.title,
        content=article_data.content,
        author_id=author_id
    )
    
    db.add(new_article)
    db.flush()  # Pour obtenir l'ID sans commit
    
    # Ajouter les catégories si elles existent
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

def get_articles(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None
):
    query = db.query(Article)
    
    if category:
        query = query.join(Article.categories).filter(Category.name == category)
    
    return query.offset(skip).limit(limit).all()

def get_article_by_id(db: Session, article_id: int):
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article non trouvé"
        )
    return article

def update_article(
    db: Session,
    article_id: int,
    article_data: ArticleUpdate,
    current_user: User
):
    article = get_article_by_id(db, article_id)
    
    # Vérifier permission (auteur ou admin)
    if article.author_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permission refusée"
        )
    
    if article_data.title is not None:
        article.title = article_data.title
    if article_data.content is not None:
        article.content = article_data.content
    
    db.commit()
    db.refresh(article)
    return article

def delete_article(db: Session, article_id: int, current_user: User):
    article = get_article_by_id(db, article_id)
    
    # Vérifier permission (auteur ou admin)
    if article.author_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permission refusée"
        )
    
    db.delete(article)
    db.commit()
    return {"message": "Article supprimé avec succès"}

def get_articles_by_author(db: Session, author_id: int):
    author = db.query(User).filter(User.id == author_id).first()
    if not author:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Auteur non trouvé"
        )
    return db.query(Article).filter(Article.author_id == author_id).all()