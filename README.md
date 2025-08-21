# Recipes App 🍲

## Backend (FastAPI + PostgreSQL)
1. `cd backend`
2. `python -m pip install -r requirements.txt`
3. Update `database.py` with your Postgres user/password.
4. Run `psql -U postgres -d recipes_db -f init.sql` to create the table.
5. Put `US_recipes.json` in `backend/` and run `python load_data.py` to insert recipes.
6. Start API: `uvicorn main:app --reload` → http://127.0.0.1:8000/docs

## Frontend (React + Tailwind)
1. `cd frontend`
2. `npm install`
3. `npm run dev` → http://localhost:5174/

