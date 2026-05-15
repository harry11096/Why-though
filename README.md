# WhyThough

WhyThough is a playful personality quiz app about ordinary habits that feel strangely revealing. It looks calm and minimal on the surface, then lets each quiz category bring its own little world: convenience-store midnight thoughts, confusing human behavior, cosmic nonsense, internet mental states, and the system watching back.

The goal is to turn WhyThough into a polished, maintainable MERN product with a clean interface, a strong voice, and enough structure to keep growing.

## Product Direction

- A simple Apple-inspired interface: generous spacing, quiet panels, crisp typography, and direct controls.
- Distinct visual identity for each quiz category without making the whole app noisy.
- Short, shareable personality-style results instead of long AI-like reports everywhere.
- A real user flow: register, log in, choose a category, answer questions, review results, and revisit past attempts.
- A practical admin area for managing questions and importing new content.

## Current Features

- User registration and login with JWT authentication
- Profile editing
- Category-based quiz flow
- Random active questions from MongoDB
- Saved quiz attempts
- Attempt history and previous result reports
- Leaderboard API
- Admin-only question management
- Question create, edit, delete, activate/deactivate, and bulk import
- Chinese and English interface copy

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Auth: JWT, bcrypt
- Validation: express-validator, zod/react-hook-form on frontend forms

## Backend Setup

1. Go to `backend`.
2. Install dependencies with `npm install`.
3. Create a `.env` file.
4. Start MongoDB locally.
5. Run `npm start` or `npm run dev`.

Example environment values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/whythough
JWT_SECRET=replace_this_with_a_real_secret
ADMIN_SETUP_KEY=create_admin_once
CLIENT_ORIGIN=http://localhost:5173
```

## Frontend Setup

1. Go to `frontend`.
2. Install dependencies with `npm install`.
3. Run `npm run dev`.
4. Open the Vite local URL in the browser.

Optional frontend environment variable:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## First Admin Account

Use the normal registration endpoint and include `adminSetupKey` matching `ADMIN_SETUP_KEY`. That will create the initial admin account.

Example request:

```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "admin123",
  "adminSetupKey": "create_admin_once"
}
```

Endpoint:

`POST /api/auth/register`

## Admin API endpoints

- `GET /api/admin/questions`
- `POST /api/admin/questions`
- `PUT /api/admin/questions/:id`
- `DELETE /api/admin/questions/:id`
- `PATCH /api/admin/questions/:id/toggle`
- `POST /api/admin/questions/bulk`
- `GET /api/admin/categories`

All admin routes require a valid admin JWT in the `Authorization: Bearer <token>` header.

## Roadmap

See [docs/product-roadmap.md](/Users/zhanggeng./Documents/超棒测试/docs/product-roadmap.md) for the next product milestones.
