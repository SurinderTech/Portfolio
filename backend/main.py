from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import sqlite3
import json
from datetime import datetime

app = FastAPI(title="Surinder Kumar Portfolio API", version="1.0.0")

# CORS — allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Database setup ────────────────────────────────────────────────────────────

def get_db():
    conn = sqlite3.connect("portfolio.db")
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            service TEXT NOT NULL,
            requirements TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            price TEXT,
            delivery TEXT,
            tags TEXT,
            active INTEGER DEFAULT 1
        );

        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            tags TEXT,
            live_url TEXT,
            active INTEGER DEFAULT 1
        );

        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
    """)
    # Seed services if empty
    count = conn.execute("SELECT COUNT(*) FROM services").fetchone()[0]
    if count == 0:
        services = [
            ("AI Chatbots", "Smart WhatsApp & website chatbots powered by GPT-4", "₹1,499", "3–5 days", '["WhatsApp Bot","GPT-4","Lead Gen"]'),
            ("n8n Automation", "End-to-end workflow automation for your business", "₹999", "2–4 days", '["n8n","Zapier","Make.com"]'),
            ("AI Agents (Premium)", "Voice AI agents and autonomous multi-step systems", "₹4,999", "7–10 days", '["Voice AI","LangChain","Agents"]'),
            ("Modern Websites", "SaaS landing pages and business sites with Next.js", "₹1,499", "4–7 days", '["Next.js","Tailwind","Framer"]'),
            ("Custom Software", "Admin dashboards, tools, and custom SaaS applications", "₹2,999", "7–14 days", '["FastAPI","React","SQLite"]'),
            ("PPT Design", "Premium presentation design and brand kits", "₹499", "1–2 days", '["Figma","Canva","Brand"]'),
        ]
        conn.executemany(
            "INSERT INTO services (title, description, price, delivery, tags) VALUES (?,?,?,?,?)",
            services,
        )
        conn.commit()
    conn.close()

init_db()

# ─── Schemas ───────────────────────────────────────────────────────────────────

class OrderCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    service: str
    requirements: str

class ContactCreate(BaseModel):
    name: str
    email: str
    message: str

# ─── Routes ────────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "ok", "message": "Surinder Kumar Portfolio API 🚀"}

@app.get("/services")
def get_services():
    conn = get_db()
    rows = conn.execute("SELECT * FROM services WHERE active=1").fetchall()
    conn.close()
    result = []
    for r in rows:
        item = dict(r)
        item["tags"] = json.loads(item["tags"])
        result.append(item)
    return result

@app.post("/order")
def create_order(order: OrderCreate):
    conn = get_db()
    conn.execute(
        "INSERT INTO orders (name, email, phone, service, requirements) VALUES (?,?,?,?,?)",
        (order.name, order.email, order.phone, order.service, order.requirements),
    )
    conn.commit()
    conn.close()
    return {
        "success": True,
        "message": f"Order received for {order.service}. Surinder will contact you within 24 hours!",
    }

@app.get("/orders")
def get_orders():
    """Admin route — protect with auth in production"""
    conn = get_db()
    rows = conn.execute("SELECT * FROM orders ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.get("/projects")
def get_projects():
    conn = get_db()
    rows = conn.execute("SELECT * FROM projects WHERE active=1").fetchall()
    conn.close()
    result = []
    for r in rows:
        item = dict(r)
        if item.get("tags"):
            item["tags"] = json.loads(item["tags"])
        result.append(item)
    return result

@app.post("/contact")
def create_contact(contact: ContactCreate):
    conn = get_db()
    conn.execute(
        "INSERT INTO contacts (name, email, message) VALUES (?,?,?)",
        (contact.name, contact.email, contact.message),
    )
    conn.commit()
    conn.close()
    return {"success": True, "message": "Message received! Will reply within 24 hours."}
