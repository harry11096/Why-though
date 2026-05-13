# WhyThough Simplified Version Plan

This document keeps the project focused on the Assignment 2 requirements.
The simplified version removes special effects and advanced presentation, while keeping the core quiz game complete and easy to assess.

## Project Goal

Build a single-player MERN quiz game where users can:

- register, log in, and log out
- choose a quiz category
- answer 6 to 10 multiple-choice questions
- receive a final score
- save each attempt to the database
- view their attempt history
- view a leaderboard

Admins can:

- log in through an admin interface
- create, read, update, delete, activate, and deactivate questions
- bulk import questions from a JSON array

## Simplified Theme

The game can still be called **WhyThough**.

The simplified version should present itself as a clean category quiz game with light personality-style feedback, but without complex animations or highly stylized visual effects.

Recommended tone:

- simple
- playful
- readable
- easy for tutors to understand
- clearly connected to the assignment requirements

## Required Game Variant

Use the category quiz variant.

Question model must include:

- `category`
- `text`
- `options`
- `correctAnswer`
- `isActive`

Users choose one category before starting. The backend only returns active questions from that category.

## Core Quiz Rules

The quiz flow must follow the assignment rules exactly:

- each quiz contains 6 to 10 questions
- questions are multiple choice
- every question has exactly 4 options
- only 1 option is correct
- questions are fetched through RESTful API
- question order is randomized for each attempt
- each answer gives +1 if correct
- no negative score
- once an answer is selected, it cannot be changed
- final score appears after the last question
- the attempt is saved to MongoDB

## Saved Attempt Data

Each attempt should save:

- user ID
- category
- score
- timestamp
- full answer list

Each answer item should include:

- `questionId`
- `selectedAnswer`
- `isCorrect`

## Player Pages

### Login / Register

Basic forms with validation:

- username
- email
- password

Use JWT after successful login.

### Category Selection

Show all available categories as simple cards or buttons.

Example categories:

- Convenience Store
- Human Behavior
- Internet Habits
- System Test

### Quiz Page

Show one question at a time.

Expected behavior:

- user selects one option
- answer locks after selection
- user clicks next
- after the last question, user submits automatically or clicks finish

### Result Page

Show:

- final score
- total questions
- category
- short result message

Keep the result short. Avoid long personality reports in the simplified version.

### Attempt History

Show previous attempts:

- category
- score
- date

Clicking an attempt can show:

- each question
- selected answer
- whether it was correct

### Leaderboard

Show:

- username
- score
- category or overall score
- date

Sort by score from highest to lowest. Ties are allowed.

## Admin Pages

### Admin Login

Admins log in using normal auth, but their user account must have `role: "admin"`.

Backend must enforce admin access with middleware.

### Question Management

Admin can:

- add a question
- edit a question
- delete a question
- activate or deactivate a question
- assign category

### Bulk Import

Admin can paste a JSON array into a text box.

Each imported question must include:

- `category`
- `text`
- `options`
- `correctAnswer`

Validation should check:

- JSON is valid
- input is an array
- every question has exactly 4 options
- correct answer exists inside options
- category is present
- text is present

## Backend API Shape

All API responses should follow:

```json
{
  "success": true,
  "data": {}
}
```

Errors should follow:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Suggested API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Quiz

- `GET /api/quiz/categories`
- `GET /api/quiz/questions?category=...`
- `POST /api/quiz/submit`
- `GET /api/quiz/attempts`
- `GET /api/quiz/leaderboard`

### Admin

- `GET /api/admin/questions`
- `POST /api/admin/questions`
- `PUT /api/admin/questions/:id`
- `DELETE /api/admin/questions/:id`
- `PATCH /api/admin/questions/:id/toggle`
- `POST /api/admin/questions/bulk`

## Frontend Technical Requirements

Use:

- React function components
- React Context + `useReducer` for quiz state
- React Hook Form + Zod for all forms
- dark mode toggle
- localStorage for dark mode preference
- protected routes for logged-in users
- admin-only routes for admin pages

Avoid:

- complex animations
- special visual effects
- long narrative result pages
- features outside the assignment scope

## Backend Technical Requirements

Use:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- server-side validation
- rate limiting for login and quiz submit
- Mongoose population where appropriate

Security basics:

- validate user input
- sanitize text fields
- never return password hashes
- protect admin routes on the backend

## Simplified UI Direction

Use a plain, assessable interface:

- simple header
- dark mode toggle
- login/register forms
- category list
- quiz question panel
- result page
- history table
- leaderboard table
- admin question table

The visual style should be clean and consistent rather than highly experimental.

## Minimum Completion Checklist

- User can register
- User can log in
- User can log out
- User can choose a category
- User can answer 6 to 10 randomized questions
- User cannot change an answer after selecting it
- Final score is shown
- Attempt is saved with full answer list
- User can view attempt history
- User can view leaderboard
- Admin can log in
- Admin can manage questions
- Admin can bulk import questions
- Admin routes are protected
- Dark mode works and persists
- Forms use React Hook Form + Zod
- Quiz state uses Context + useReducer

