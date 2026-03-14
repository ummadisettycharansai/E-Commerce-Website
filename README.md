<div align="center">

<!-- Animated Banner -->
![Banner](https://capsule-render.vercel.app/render?type=soft&color=0A1628&height=250&section=header&text=M%20ALL&fontSize=80&fontColor=C5A267&animation=fadeIn&subtext=Dress%20Sharp.%20Live%20Bold.&subtextGet=150)

<!-- Technology Badges -->
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white&style=for-the-badge)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white&style=for-the-badge)](https://www.prisma.io/)

</div>

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Author](#-author)

---

## 🌟 About the Project
**M ALL** is a premium, full-stack e-commerce application tailored for modern menswear. Designed with a focus on **visual excellence** and **seamless user experience**, it provides a high-end shopping journey from discovery to checkout.

The project demonstrates a robust implementation of modern web standards, featuring a high-performance frontend and a scalable backend architecture.

---

## 🚀 Key Features

| Feature | Description | Status |
| :--- | :--- | :---: |
| 🎨 **Premium UI/UX** | Stunning dark-themed design with smooth Framer Motion animations. | ✅ |
| 🛍️ **Unified Catalog** | Advanced product listing with search, multifaceted filtering, and sorting. | ✅ |
| 🛒 **Smart Cart** | Persistent, server-synced shopping cart with real-time updates. | ✅ |
| 🔐 **Role-Based Auth** | Secure JWT-based authentication for Customers and Admins. | ✅ |
| 🛡️ **Admin Portal** | Full-featured dashboard for managing products, orders, and users. | ✅ |
| 💳 **Payment Ready** | Integrated with Stripe (Test Mode) for secure transactions. | ✅ |

---

## 🛠️ Tech Stack

### **Frontend Tree**
```text
volk-men/
├── React 18 (UI Library)
├── Vite (Build Tool)
├── Tailwind CSS (Styling)
├── Framer Motion (Animations)
├── Lucide React (Icons)
└── React Router (Navigation)
```

### **Backend Tree**
```text
backend/
├── Node.js & Express (API Runtime)
├── Prisma (ORM)
├── PostgreSQL/SQL Server (Database)
├── JWT (Authentication)
├── Multer (File Handling)
└── Zod (Schema Validation)
```

---

## 📸 Screenshots
*(Include screenshots here)*

<div align="center">
  <img src="https://via.placeholder.com/800x450?text=Premium+Homepage+Hero" width="800" alt="Homepage">
  <img src="https://via.placeholder.com/800x450?text=Product+Grid+and+Filters" width="800" alt="Listing">
</div>

---

## 🏁 Getting Started

### Prerequisites
- **Node.js**: v20 or higher
- **PostgreSQL**: v16 (or SQL Server)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ummadisettycharansai/E-Commerce-Website.git
   cd E-Commerce-Website
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env and update DATABASE_URL
   npx prisma generate
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../volk-men
   npm install --legacy-peer-deps
   npm run dev
   ```

---

## 📂 Project Structure

```text
E-Commerce-Website/
├── backend/            # Express API with Prisma ORM
│   ├── src/            # Controllers, Routes, Middleware
│   └── prisma/         # Database Schema & Seeds
├── volk-men/           # Premium React Frontend
│   └── src/            # Components, Pages, Contexts
├── docker-compose.yml  # Docker Orchestration
└── README.md           # Documentation
```

---

## 👤 Author

**Ummadisetty Charan Sai**
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/ummadisettycharansai)

- **Organization:** Personal Project
- **Role:** Full-Stack Developer

---

<div align="center">
  <h3>Giving a star ⭐ keeps the motivation high!</h3>
</div>
