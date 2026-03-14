# Men's Fashion Shopping App

A full-stack e-commerce application for men's fashion built with Node.js, Express, PostgreSQL, React, and Tailwind CSS.

## Tech Stack

**Backend:** Node.js · Express · PostgreSQL · Prisma ORM · JWT · bcrypt · Stripe · AWS S3 · Zod · multer

**Frontend:** React 18 · React Router v6 · Tailwind CSS · Zustand · TanStack Query · Stripe.js · Axios · React Hook Form

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Docker & Docker Compose (optional)

---

### Option A: Docker (Recommended)

```bash
# Copy and fill in your secrets
cp .env.example .env

# Start all services
docker-compose up --build

# Seed the database (in a new terminal)
docker exec mensshop_backend npx ts-node prisma/seed.ts
```

App will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api

---

### Option B: Local Development

**1. Start PostgreSQL** (or use Docker just for the DB):
```bash
docker-compose up postgres -d
```

**2. Backend setup:**
```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run db:seed
npm run dev
```

**3. Frontend setup:**
```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `AWS_ACCESS_KEY_ID` | AWS access key for S3 |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key for S3 |
| `AWS_S3_BUCKET` | S3 bucket name |
| `AWS_REGION` | AWS region |
| `EMAIL_HOST` | SMTP host |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASS` | SMTP password / app password |

### Frontend (`frontend/.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key (`pk_test_...`) |

---

## Seed Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@mensshop.com | Admin@123 |
| Customer | john@example.com | User@123 |
| Customer | mike@example.com | User@123 |
| Customer | david@example.com | User@123 |
| Customer | chris@example.com | User@123 |
| Customer | alex@example.com | User@123 |

---

## API Overview

| Resource | Base Path |
|---|---|
| Auth | `/api/auth` |
| Products | `/api/products` |
| Categories | `/api/categories` |
| Cart | `/api/cart` |
| Orders | `/api/orders` |
| Payments | `/api/payments` |
| Addresses | `/api/addresses` |
| Reviews | `/api/reviews` |
| Wishlist | `/api/wishlist` |
| Admin | `/api/admin` |

---

## Project Structure

```
assessment project/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/
│       ├── config/        # DB, Stripe, S3
│       ├── controllers/   # Route handlers
│       ├── middleware/    # Auth, admin, rate limit, validate
│       ├── routes/        # Express routers
│       ├── schemas/       # Zod validation
│       └── utils/         # JWT, email, helpers
├── frontend/
│   └── src/
│       ├── api/           # Axios API functions
│       ├── components/    # UI, layout, product, cart, checkout, admin
│       ├── pages/         # All route pages
│       ├── store/         # Zustand stores
│       └── utils/
└── docker-compose.yml
```

## Features

- JWT authentication with role-based access (CUSTOMER / ADMIN)
- Product catalog with filtering, sorting, search, pagination
- Shopping cart (persisted + server-synced)
- Wishlist
- Stripe payment integration
- Order management with status tracking
- Address book
- Product reviews & ratings
- Admin dashboard with revenue stats, order management, user management
- Image upload to AWS S3
- Password reset via email
- Rate limiting, input validation, error handling
- Docker Compose for one-command setup
