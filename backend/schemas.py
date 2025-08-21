# Not used (we return dicts manually)
from pydantic import BaseModel
from typing import Optional, Dict

# ---------- Base schema ----------
class RecipeBase(BaseModel):
    cuisine: Optional[str]
    title: Optional[str]
    rating: Optional[float]
    prep_time: Optional[int]
    cook_time: Optional[int]
    total_time: Optional[int]
    description: Optional[str]
    nutrients: Optional[Dict]   # nutrients JSON
    serves: Optional[str]


# ---------- Output schema (used in response_model) ----------
class RecipeOut(RecipeBase):
    id: int

    class Config:
        from_attributes = True   # replaces orm_mode in Pydantic v2
