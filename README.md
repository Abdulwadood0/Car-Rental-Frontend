# 🚗 Car Rental Frontend

This is the frontend of the Car Rental Web App. It allows users to browse cars, register/login, make bookings, and for admins to manage the system through a responsive dashboard.

## 🧱 Tech Stack

- React
- Redux
- React Router
- Material UI
- Axios
- i18next (for multilingual support: English & Arabic)
- Vercel (deployment)

## ✨ Features

- Fully responsive design using Material UI
- English and Arabic language toggle (i18next)
- Login / Register with JWT via HTTP-only cookies
- Browse available cars with images
- Make reservations with payment (via Moyassar through backend)
- Admin dashboard: manage cars, bookings, and users
- State management with Redux
- Cloudinary-hosted car images fetched from backend
- Connected to a Node.js backend (hosted on AWS EC2)

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Abdulwadood0/Car-Rental-Frontend.git
cd car-rental-frontend
```

### 2. Install Dependencies

```
npm install
```

### 3. Environment Variables

Create a `.env` file and add:

```
REACT_APP_API_URL=http://your-ec2-backend-url/api
```

Replace with your actual backend EC2 URL.

### 4. Run Locally

```bash
npm start
```

Runs on `http://localhost:3000`.

## 🌐 Deployment

The frontend is deployed on **Vercel**.

Make sure to configure the `REACT_APP_API_URL` environment variable in your Vercel project settings to point to your backend.

## 📷 Screenshots of Admin Dashboard

<p float="left">
  <img src="https://github.com/user-attachments/assets/7b5bc321-0884-4e68-940e-1953b817a6ff" width="300" style="margin-right:10px;" />
  <img src="https://github.com/user-attachments/assets/83fe5b0b-7d87-40b1-8387-325351e6417d" width="300" style="margin-right:10px;" />
  <img src="https://github.com/user-attachments/assets/d78bb199-9da2-41aa-b07d-ab127cc8b659" width="300" />
</p>

<p float="left" style="margin-top:10px;">
  <img src="https://github.com/user-attachments/assets/e558672d-1e27-44db-8a1a-53115ae05a91" width="300" style="margin-right:10px;" />
  <img src="https://github.com/user-attachments/assets/aa25e5e2-1e50-4b8b-a56e-4b67d44588a5" width="300" style="margin-right:10px;" />
  <img src="https://github.com/user-attachments/assets/3cbe7989-0764-4985-88de-6990a4468e6b" width="300" />
</p>

<p float="left" style="margin-top:10px;">
  <img src="https://github.com/user-attachments/assets/03ed626a-2a26-4bf8-9948-3f04ee5717c1" width="300" />
</p>


