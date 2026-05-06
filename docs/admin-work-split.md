# Admin Work Split

This file is a practical breakdown for Evelyn's individual contribution record.

## 15 development commits

1. Set up backend admin route skeleton and secure it with auth middleware.
2. Repair the `User` model and finish password comparison logic.
3. Repair the `Question` model and enforce the 5 allowed categories.
4. Add admin-only question listing with inactive questions included.
5. Implement create-question API with server-side validation.
6. Implement update-question API with validation and not-found handling.
7. Implement delete-question API with consistent JSON responses.
8. Implement active/inactive toggle API.
9. Implement bulk JSON import API and per-item validation messages.
10. Add login rate limiting and standard API error handling.
11. Add category metadata endpoint for the admin frontend dropdown.
12. Create frontend API helper layer for auth and admin requests.
13. Build the standalone admin login page.
14. Build the create/edit question form and local status messages.
15. Build the question list, toggle/delete actions, and bulk-import UI.

## 5 debug / polish commits

1. Fix category schema enum syntax and correct-answer validation.
2. Fix broken or empty backend entry files so the server can boot.
3. Fix token persistence and admin-role verification on page refresh.
4. Fix malformed JSON / invalid option edge cases in bulk import.
5. Polish admin UX with dark mode, reset behaviour, and clearer error notices.
