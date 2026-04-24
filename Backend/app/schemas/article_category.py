from pydantic import BaseModel
from typing import List

class ArticleCategoryAssociation(BaseModel):
    article_id: int
    category_id: int

    class Config:
        from_attributes = True

class ArticleCategoriesUpdate(BaseModel):
    category_ids: List[int]