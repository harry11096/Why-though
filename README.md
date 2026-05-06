# quiz-game

COMP5347 Assignment 2 project skeleton with a completed admin question-management module.

## Admin module scope

This repository now includes Evelyn's admin subsystem:

- admin login via JWT
- admin-only backend protection
- list all questions including inactive ones
- create question
- edit question
- delete question
- toggle active/inactive state
- bulk import questions from a JSON array
- dark mode for the admin page

## Backend setup

1. Go to [backend/package.json](/Users/sherley/Desktop/研究生文件/上课/COMP%205347/项目文件/quiz-game/backend/package.json).
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env`.
4. Start MongoDB locally.
5. Run `npm start`.

Example environment values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/quizgame
JWT_SECRET=replace_this_with_a_real_secret
ADMIN_SETUP_KEY=create_admin_once
CLIENT_ORIGIN=http://localhost:5173
```

## Frontend setup

1. Go to [frontend/package.json](/Users/sherley/Desktop/研究生文件/上课/COMP%205347/项目文件/quiz-game/frontend/package.json).
2. Install dependencies with `npm install`.
3. Run `npm run dev`.
4. Open the Vite local URL in the browser.

Optional frontend environment variable:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## First admin account

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
