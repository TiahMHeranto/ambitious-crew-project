from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from app.schemas.category import CategoryResponse

class ArticleBase(BaseModel):
    title: str
    content: str

class ArticleCreate(ArticleBase):
    category_names: Optional[List[str]] = []

# =========================
# Update Schema
# =========================
class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category_names: Optional[List[str]] = None

class ArticleResponse(ArticleBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None  # ← Changement ici: ajouter Optional et = None
    categories: List[CategoryResponse] = []

    class Config:
        from_attributes = True