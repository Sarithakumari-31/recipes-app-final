import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Get the DATABASE_URL from environment variable (Render/Railway will provide this)
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # fallback for local development
    DATABASE_URL = "postgresql://postgres:yourpassword@localhost:5432/recipesdb"

# Create engine
engine = create_engine(DATABASE_URL)

# Session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
