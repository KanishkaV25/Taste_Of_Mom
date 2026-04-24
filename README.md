# TasteOfMom — Authentic Homemade Food Platform

![TasteofMom Banner](https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80)

👉 **Live Demo:** [taste-of-mom.vercel.app](https://taste-of-mom.vercel.app/)

## 📖 Overview
**TasteOfMom** is a full-stack e-commerce prototype engineered specifically to solve the "Trust Problem" in online home-cooked food delivery. 

Unlike standard food delivery apps processing generic restaurant orders, this application focuses heavily on **Consumer Trust** and **Emotional Connection** by emphasizing *who* is cooking the food through a robust Trust Layer architecture.

## 🚀 Key Features

*   **The "Trust Layer":** Custom-built UI/UX that assigns every dish to a verified persona (e.g., "Made by Aunty Sunita"). Products feature strict hygiene labels, ⭐ star ratings, and dynamic order tracking histories to simulate a highly trusted marketplace.
*   **Emotion-Driven Design:** Replaced generic "Add to Cart" logic with high-contrast emotional badging ("Comfort food", "Sunday Special") to establish an immediate brand connection.
*   **Complete Checkout Lifecycle:** The frontend initiates a true `POST` payload to an Express.js internal API sequence that handles state transition, processes the mock payment loop, and stores the user's order dynamically.
*   **Real-time Order History:** A persistent dashboard allowing users to track the simulated status of their live orders, retrieved dynamically via a `GET /api/orders` endpoint.
*   **Data-Driven Sorting Algorithms:** Built-in category filtering and "Top Rated" dynamic sorting prioritized directly on the main grid viewport.

## 🛠 Tech Stack

*   **Frontend:** React 18, Vite, Custom CSS (Responsive & Mobile First)
*   **Backend:** Node.js, Express.js
*   **APIs:** RESTful endpoints with custom CORS definitions
*   **Deployment:** Vercel (Frontend Client) & Render.com (Backend Services)

---

## 🏗️ System Architecture & Design Decisions

### In-Memory Product & Order Persistence
**Note:** For the purposes of this prototype and deployment speed, user orders and standard products are intentionally tracked via an in-memory `globalOrders` array running continuously inside the Node.js server instance.
*   *Why?* To demonstrate the end-to-end data lifecycle (Store > Validate > Persist > Fetch) without the overhead of connecting a third-party DB.
*   *Production Path:* If scaled into production, the Express routes are structurally prepared to swap the array handlers directly for **Mongoose / MongoDB Atlas** queries (`Order.create()`, `Order.find()`) seamlessly to ensure absolute durability across server restarts.

### Native Asset Optimization
Images utilized throughout the application are mapped directly to high-capacity CDNs and triggered natively via `<img loading="lazy" />` to aggressively optimize Largest Contentful Paint (LCP) speeds and preserve the client's network payload.

---

## 💻 Run Locally

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16 or higher)
*   npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/KanishkaV25/Taste_Of_Mom.git
   cd Taste_Of_Mom
   ```

2. Start the Backend API:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. Start the Frontend Application (Open a new terminal tab):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Go to `http://localhost:5173` in your browser.
