from sqlalchemy import Column, Integer, ForeignKey, Table
from app.database.database import Base

# Association table for many-to-many relationship between Article and Category
article_category = Table(
    "article_categories",
    Base.metadata,
    Column("article_id", Integer, ForeignKey("articles.id", ondelete="CASCADE"), primary_key=True),
    Column("category_id", Integer, ForeignKey("categories.id", ondelete="CASCADE"), primary_key=True)
)