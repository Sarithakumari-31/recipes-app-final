from sqlalchemy import Column, Integer, String, Float, Text, JSON
from database import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    cuisine = Column(String(255))
    title = Column(String(255), nullable=False)
    rating = Column(Float)
    prep_time = Column(Integer)
    cook_time = Column(Integer)
    total_time = Column(Integer)
    description = Column(Text)
    nutrients = Column(JSON)
    serves = Column(String(50))
