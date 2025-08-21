from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List
import models, schemas, crud
from database import engine, SessionLocal
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# ✅ Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict to ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"msg": "API working!"}


# ✅ New endpoint for cuisines
@app.get("/api/cuisines")
def get_cuisines(db: Session = Depends(get_db)):
    results = db.query(models.Recipe.cuisine).distinct().all()
    cuisines = [row[0] for row in results if row[0]]  # remove None values
    return cuisines


@app.get("/api/recipes", response_model=List[schemas.RecipeOut])
def read_recipes(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    skip = (page - 1) * limit
    recipes = crud.get_recipes(db, skip=skip, limit=limit)
    return recipes


@app.get("/api/recipes/search", response_model=List[schemas.RecipeOut])
def search(
    title: str = None,
    cuisine: str = None,
    rating: str = None,
    total_time: str = None,
    calories: str = None,
    db: Session = Depends(get_db),
):
    results = crud.search_recipes(db, title, cuisine, rating, total_time, calories)
    return results
