# 🚀 Zerodha Paper Trading Platform

A full-stack paper trading platform inspired by **Zerodha Kite**, built to simulate real stock trading with modern authentication, secure APIs, and a production-ready deployment architecture.

This platform allows users to create accounts, log in using a unique **User ID**, and perform paper trades in a safe, realistic trading environment — just like a real brokerage, but without risking money.

---

🔗 Live Demo

🌐 Frontend
https://zerodha-paper-trading-platform.vercel.app

🌐 Alternate Landing
https://zerodha-paper-trading-platform-64ee.vercel.app

🖼️ Screenshots
![Landing](screenshots/landing.png)
![Dashboard](screenshots/dashboard.png)

## 🧠 What This Project Does

This project replicates the **core workflow of Zerodha**:

- OTP-based user signup  
- Email & mobile verification  
- Unique User ID based login  
- Secure dashboard  
- Paper trading (virtual buy/sell)  
- Portfolio & trade tracking  

It behaves like a **real fintech trading system**, but uses **virtual money**.

---

## 🏗️ Tech Stack

### Frontend
- React.js  
- Vercel  
- Axios  
- React Router  

### Backend
- Node.js  
- Express.js  
- JWT Authentication  
- MongoDB Atlas  
- Render  

### Email & OTP
- Resend API  

---

## 🔐 Authentication Flow

### Signup
1. User enters mobile number  
2. OTP is sent  
3. Mobile verified  
4. Email OTP is sent  
5. Email verified  
6. User sets:
   - Username  
   - Password  
7. Account is created  

### Login
Users log in using:
- **User ID**
- **Password**

### Forgot Password
- Email OTP verification  
- Token-based secure reset  
- Expiry-protected links  

---

## 🗄️ Database

Hosted on **MongoDB Atlas**

Stores:
- User accounts  
- Encrypted passwords  
- OTP & reset tokens  
- Trades  
- Portfolio data  

---

## 🌐 Deployment Architecture

Browser
↓
Vercel (Frontend)
↓
Render (Backend API)
↓
MongoDB Atlas
↓
Resend (Email & OTP)


Fully configured with:
- CORS
- JWT
- Secure cookies
- Production domains

---

## ⚙️ Environment Variables
### Backend

- MONGO_URI
- JWT_SECRET
- RESEND_API_KEY
- FRONTEND_URL

### Frontend

- REACT_APP_API_URL
- REACT_APP_LANDING_URL

## 🛡️ Security Features

- Encrypted passwords
- JWT based authentication
- OTP expiry control
- Secure password reset
- CORS protected APIs

## 🧪 Why This Project Is Special

This is not a CRUD demo.

It includes:

- Multi-step onboarding
- Email & OTP verification
- Real production deployment
- Fintech-grade authentication
- API security
- Cloud hosting & debugging

This is the same architecture used by real fintech platforms.

## 👨‍💻 Author

Yash Kumar
B.Tech (ECE)
Full-Stack Developer
Built and deployed end-to-end.

## ⭐ If you like this project, feel free to star the repo!


