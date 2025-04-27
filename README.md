# 📊 Crypto Transactions Dashboard

A full-stack web application for securely managing and viewing cryptocurrency transactions with filtering, inline editing, theming, and pagination.

---

## 🔗 Live Demo

👉 [View Live App](https://transaction-app-y77v.onrender.com)

---

## ✨ Features

- 🔐 **JWT Authentication** – Secure login-protected dashboard
- 📊 **Transaction Table** – View formatted crypto transactions
- 📄 **Dynamic Pagination** – Efficient browsing through transaction history
- ⏳ **Debounced Pagination** – Smooth page changes by reducing unnecessary API calls
- 🔎 **Advanced Filtering** – Filter by date range, minimum and maximum amounts
- ✏️ **Inline Editing** – Edit transaction amounts directly in the table
- 🎨 **Responsive UI** – Fully responsive layout using Tailwind CSS and DaisyUI
- 🌙 **Theme Support** – Choose from 34 built-in DaisyUI themes
- 📦 **REST API Integration** – Frontend communicates with backend using Axios

---

## 🧰 Tech Stack

### 🖥️ Frontend

- React (with Vite)
- Zustand (state management)
- Tailwind CSS + DaisyUI + MUI (for UI components)
- Axios (API client)
- Lucide Icons

### 🛠️ Backend

- Node.js + Express
- MongoDB (via Mongoose)
- JWT (Authentication & Authorization)

---

## 🔐 Authentication Flow

- User logs in and receives a signed JWT token
- Token is stored in `cookies`
- All protected routes validate the token on request
- Backend verifies the token for authorization

---

## 📝 /todo

- [ ] Implement **rate limiting** (e.g., `express-rate-limit`) to prevent request spam
- [ ] Add **validation middleware** to sanitize user input and block malformed data
- [ ] Apply **authorization checks** on sensitive routes (e.g., only allow editing own transactions)
- [ ] Protect MongoDB from abuse (e.g., schema constraints, input length limits)
- [ ] Add basic **logging** for failed requests and suspicious activity
- [ ] Set up **helmet** middleware for HTTP headers security
- [ ] Optional: Add **CAPTCHA** or throttling on auth routes

## 📚 About This Project

This project was originally assigned to a friend during a job interview. I chose to take on the challenge myself to test and push my skills in full-stack development.

Throughout the process, I built out features including authentication, secure REST APIs, responsive layouts, dynamic UI state management, and editable, filterable data tables. I enjoyed working through the entire stack — from backend routes to frontend polish — and learned a great deal in the process.

---
