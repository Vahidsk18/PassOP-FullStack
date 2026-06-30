# 🔐 PassOP - Full Stack Password Manager

PassOP is a full-stack password manager that allows users to securely store and manage their passwords. The application is built using the MERN stack and is fully Dockerized for easy development and deployment.

---

## 🚀 Features

* User Authentication (JWT)
* Secure Password Management
* Password CRUD Operations
* Redis Integration
* MongoDB Atlas Database
* Dockerized Frontend & Backend
* Docker Compose Support
* Responsive UI
* REST API Architecture

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Redis
* JWT Authentication
* Joi Validation

### DevOps

* Docker
* Docker Compose
* GitHub

---

## 📂 Project Structure

```text
PassOP/
│
├── docker-compose.yml
├── .gitignore
│
├── PassOP-frontend-main/
│   ├── Dockerfile
│   ├── package.json
│   └── ...
│
└── PassOP-backend-main/
    ├── Dockerfile
    ├── package.json
    └── ...
```

---

## ⚙️ Environment Variables

### Backend (`PassOP-backend-main/.env`)

```env
PORT=2000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
REDIS_URL=your_redis_url
FRONTEND_HOST=http://localhost:5173
```

### Frontend (`PassOP-frontend-main/.env`)

```env
VITE_BACKEND_URL=http://localhost:2000
```

---

## 🐳 Running with Docker

### Clone the repository

```bash
git clone https://github.com/Vahidsk18/PassOP-FullStack.git
cd PassOP-FullStack
```

### Build and start the application

```bash
docker compose up --build
```

### Stop the application

```bash
docker compose down
```

---

## 💻 Running Without Docker

### Frontend

```bash
cd PassOP-frontend-main
npm install
npm run dev
```

### Backend

```bash
cd PassOP-backend-main
npm install
npm start
```

---

## 📌 API

Backend runs on:

```
http://localhost:2000
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🎯 Future Improvements

* Password Generator
* Two-Factor Authentication (2FA)
* Password Strength Meter
* Password Sharing
* Email Verification
* AWS ECS Deployment
* CI/CD Pipeline using GitHub Actions

---

## 👨‍💻 Author

**Vahid SK**

GitHub: https://github.com/Vahidsk18
