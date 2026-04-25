from fastapi import FastAPI
from sqlalchemy import text
from .database.database import engine, Base
from app.routes.auth import router as auth_router
from app.models.user import User
from app.models.article import Article
from app.models.category import Category
from app.models.article_category import article_category
from app.routes.category import router as category_router
from app.routes.article import router as article_router



app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "FastAPI running"}

@app.get("/db-test")
def test_db():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return {"database": "connected", "result": result.scalar()}
    
app.include_router(auth_router)
app.include_router(category_router)
app.include_router(article_router)