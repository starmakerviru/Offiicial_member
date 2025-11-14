from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, constr
import sqlite3
import time
from typing import List, Optional

DB_PATH = "data.db"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Database helpers ---

def get_conn():
    return sqlite3.connect(DB_PATH)

def init_db():
    with get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS logins (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                ts INTEGER NOT NULL
            )
            """
        )
        conn.commit()

init_db()

# --- Models ---

class LoginCreate(BaseModel):
    username: constr(strip_whitespace=True, min_length=1)
    ts: Optional[int] = None  # ms since epoch; will default to now

class Login(BaseModel):
    id: int
    username: str
    ts: int

# --- Routes ---

@app.get("/health")
def health():
    return {"ok": True, "time": int(time.time() * 1000)}

@app.post("/api/logins", response_model=Login)
def create_login(payload: LoginCreate):
    ts = payload.ts if payload.ts is not None else int(time.time() * 1000)
    with get_conn() as conn:
        cur = conn.cursor()
        cur.execute("INSERT INTO logins (username, ts) VALUES (?, ?)", (payload.username, ts))
        conn.commit()
        new_id = cur.lastrowid
        return {"id": new_id, "username": payload.username, "ts": ts}

@app.get("/api/logins", response_model=List[Login])
def list_logins(limit: int = 100, offset: int = 0):
    with get_conn() as conn:
        cur = conn.cursor()
        cur.execute(
            "SELECT id, username, ts FROM logins ORDER BY id DESC LIMIT ? OFFSET ?",
            (limit, offset),
        )
        rows = cur.fetchall()
        return [
            {"id": r[0], "username": r[1], "ts": r[2]} for r in rows
        ]

@app.get("/api/logins/{login_id}", response_model=Login)
def get_login(login_id: int):
    with get_conn() as conn:
        cur = conn.cursor()
        cur.execute("SELECT id, username, ts FROM logins WHERE id = ?", (login_id,))
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Login not found")
        return {"id": row[0], "username": row[1], "ts": row[2]}

# Run with:
# uvicorn server:app --host 127.0.0.1 --port 8000 --reload
