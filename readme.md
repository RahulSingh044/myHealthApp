# 🏥 HealthHistory

*A Secure Digital Medical Records Platform*


<p align="center">
<img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
<img src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Zustand-State%20Management-orange" />
<img src="https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express" />
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb" />

</p>
<p align="center">

<img src="https://img.shields.io/github/stars/RahulSingh044/myHealthApp?style=social" />
<img src="https://img.shields.io/github/forks/RahulSingh044/myHealthApp?style=social" />
</p>


------------------------------------------------------------------------

## 📌 Overview

**HealthHistory** is a complete medical records management platform
built using **Next.js**, **Express**, and **MongoDB**.\
It enables users to securely store health profiles, upload medical
records, track medications, and share limited emergency access using QR
codes.

This project highlights strong **frontend engineering** with a focus on
responsiveness, usability, and secure data workflows.

------------------------------------------------------------------------

## 🚀 Features

### 🎨 Frontend (Your Role --- Frontend Engineer)

-   Responsive **Next.js App Router UI** with Tailwind and mobile drawer
    navigation\
-   **Drag-and-drop file uploads** with preview for images, PDFs, and
    documents\
-   Real-time **form validation** with React hooks\
-   **Medical record preview** with blob streaming\
-   **OTP login UI**, protected route layout, and client authentication
    handling\
-   **Emergency Access UI** with QR generation + read-only preview\
-   Global state using **Zustand (useUserStore)**\
-   Reusable components: tables, modals, drawers, forms, skeleton
    loaders

### 🛠 Backend Highlights

-   Express REST API\
-   MongoDB + Mongoose models\
-   OTP delivery (Nodemailer)\
-   Password hashing (bcrypt)\
-   Secure file uploads + ZIP downloads (Archiver)\
-   Emergency access endpoints

------------------------------------------------------------------------

## 🧱 Architecture Diagram

                            ┌────────────────────────┐
                            │      Frontend (Next.js)│
                            │                        │
                            │  • UI Pages            │
                            │  • Zustand Store       │
                            │  • Server Actions      │
                            └───────────┬────────────┘
                                        │ API Calls (HTTPS)
                                        ▼
                         ┌──────────────────────────────────┐
                         │            Backend (Express)      │
                         │                                    │
                         │  • Auth Controller                 │
                         │  • OTP Service (Nodemailer)        │
                         │  • Medical Records Upload          │
                         │  • Emergency Access Keys           │
                         └──────────────┬─────────────────────┘
                                        │ Mongoose ORM
                                        ▼
                             ┌──────────────────────────┐
                             │        MongoDB           │
                             │  • Users                 │
                             │  • Profiles              │
                             │  • Records               │
                             │  • Medications           │
                             └──────────────────────────┘

------------------------------------------------------------------------

## 📁 Project Structure

    root
    │── healthapp/                 # Next.js Frontend
    │   ├── app/
    │   ├── components/
    │   ├── store/                 # Zustand Store
    │   └── public/
    │
    └── backend/                   # Express Backend
        ├── controllers/
        ├── models/
        ├── routes/
        └── middleware/

------------------------------------------------------------------------

## ⚙️ Tech Stack

### Frontend

-   Next.js (App Router)
-   React
-   Tailwind CSS\
-   Zustand\
-   React Hot Toast\
-   TypeScript (optional)

### Backend

-   Express.js\
-   MongoDB & Mongoose\
-   Nodemailer\
-   Bcrypt\
-   Archiver

------------------------------------------------------------------------

## 🚀 Getting Started

### 1️⃣ Clone the Repository

``` bash
git clone https://github.com/your-username/HealthHistory
cd HealthHistory
```

### 2️⃣ Install Dependencies

#### Frontend

``` bash
cd healthapp
npm install
```

#### Backend

``` bash
cd backend
npm install
```

### 3️⃣ Setup Environment Variables

#### healthapp/.env

    NEXT_PUBLIC_API_URL=http://localhost:5000

#### backend/.env

    
CLIENT_ID=""
CLIENT_SECRET=""
EMAIL_USER=your_email
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongo_db_uri
PORT=5000
REDIRECT_URI=""
REFRESH_TOKEN=""


### 4️⃣ Run the Project

#### Backend

``` bash
cd backend
npm start
```

#### Frontend

``` bash
cd healthapp
npm run dev
```

------------------------------------------------------------------------

## 🔐 Security Features

-   OTP-based login\
-   Protected routes (frontend)\
-   Bcrypt password hashing\
-   File type validation\
-   Secure environment variables

------------------------------------------------------------------------

## 🔮 Future Enhancements

-   Role-based dashboards (doctor, admin)\
-   Cloud file storage (S3 / Cloudinary)\
-   Profile sharing URLs\
-   Advanced analytics & insights

------------------------------------------------------------------------

## 🤝 Contributing

PRs welcome!\
Fork → Modify → Pull Request

------------------------------------------------------------------------

## 🧾 License

This project is licensed under the **MIT License**.

------------------------------------------------------------------------

## ⭐ Support the Project

If you like this project, consider giving it a star ⭐ on GitHub!
