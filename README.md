# TasteofMom — Snack Store

A full-stack e-commerce prototype for handcrafted East-Indian food.

## Tech Stack
- **Frontend:** React 18, Vite
- **Backend:** Node.js, Express
- **API:** RESTful JSON
- **Deploy:** Vercel (frontend) + Render (backend)

## System Design Note
> **Note:** Orders are currently stored in-memory (using a global array in Node.js) for demo purposes. In production, this would be replaced with a persistent database (e.g., MongoDB/PostgreSQL) to ensure durability and scalability.

## Features
- Dynamic fetching of products with **Emotion UI** tags and **Home Chef** attribution.
- Integrated **Trust Layer** ensuring consumer faith (Ratings, Order Counts, Hygiene verification).
- Performance optimized frontend with Native Lazy Loading for images.
- Full Checkout and persistent Order History endpoints.

## Run Locally

**Backend:**
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```
