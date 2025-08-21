from sqlalchemy.orm import Session
from sqlalchemy import or_
import models

def search_recipes(
    db: Session,
    title: str = None,
    cuisine: str = None,
    rating: float = None,
    total_time: int = None,
    calories: int = None
):
    query = db.query(models.Recipe)

    if title:
        query = query.filter(models.Recipe.title.ilike(f"%{title}%"))  # <-- text search

    if cuisine:
        query = query.filter(models.Recipe.cuisine.ilike(f"%{cuisine}%"))

    if rating:
        query = query.filter(models.Recipe.rating >= rating)

    if total_time:
        query = query.filter(models.Recipe.total_time <= total_time)

    if calories:
        query = query.filter(models.Recipe.nutrients["calories"].astext.ilike(f"%{calories}%"))

    return query.limit(50).all()
