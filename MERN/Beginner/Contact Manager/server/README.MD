# User Routes — Documentation

This document describes the user-related HTTP API implemented in `server/routes/user.route.js`.
It covers available endpoints, expected request bodies, responses, authentication, error cases, and example usage (curl + fetch).

---

## Overview

- Base router: this file exports an Express router that mounts user endpoints.
- Mount point: The router is typically mounted in the server (e.g., `app.use('/api/user', userRouter)`); confirm your server's route prefix to construct full URLs.
- Authentication: Routes except `/register` and `/login` use a JWT stored in an HTTP-only cookie named `token`. The middleware `verifyToken` reads `req.cookies.token` and verifies it with `process.env.JWT_SECRET`.

---

## Model (User)

From `server/models/user.model.js` the user schema contains the following fields:

- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required) — stored hashed
- `avatar` (String, optional)
- `timestamps` — `createdAt` and `updatedAt` added automatically

---

## Endpoints

All paths below are relative to the router mount point (for example, if the router is mounted at `/api/user`, the full path for register is `/api/user/register`).

### POST /register

- Purpose: Register a new user.
- Auth: None
- Request JSON body:
  - `name` (string) — required
  - `email` (string) — required
  - `password` (string) — required
- Success response (JSON):
  - Status: 200 (the controller returns default 200 for success)
  - Body: `{ success: true, message: "User created successfully" }`
- Common error responses:
  - Missing fields: `{ success: false, message: "All fields are required" }` (no explicit status set in controller)
  - Duplicate email: `{ success: false, message: "User already exists" }` (no explicit status set in controller)
- Notes: Password is hashed before storing using `bcrypt`.

Example:

curl:

```bash
curl -X POST https://your-host/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"Pa$$w0rd"}'
```

fetch (client):

```js
fetch("/api/user/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Alice",
    email: "alice@example.com",
    password: "Pa$$w0rd",
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

---

### POST /login

- Purpose: Authenticate a user and issue a JWT cookie and token in response.
- Auth: None
- Request JSON body:
  - `email` (string) — required
  - `password` (string) — required
- Success response (JSON):
  - Status: 200
  - Body: `{ success: true, message: "Login successful", user: { id, name, email }, token }`
  - Side-effect: Sets an HTTP-only cookie named `token` with the JWT (expires in 7 days).
- Common error responses:
  - Missing fields: 400 `{ success: false, message: "Email and Password are required" }`
  - User not found: 404 `{ success: false, message: "User not found" }`
  - Invalid credentials: 401 `{ success: false, message: "Invalid credentials" }`
- Notes: JWT contains `{ id, email }` and is signed with `process.env.JWT_SECRET` (expires in 7 days). Cookie options: `httpOnly: true`, `sameSite: 'strict'`, `secure` in production.

Example:

curl:

```bash
curl -X POST https://your-host/api/user/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"alice@example.com","password":"Pa$$w0rd"}'
```

(The `-c cookies.txt` saves the `token` cookie for later requests.)

fetch (client):

```js
fetch("/api/user/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include", // allow cookies
  body: JSON.stringify({ email: "alice@example.com", password: "Pa$$w0rd" }),
})
  .then((r) => r.json())
  .then(console.log);
```

---

### GET /:id

- Purpose: Retrieve a user's public profile (excluding password).
- Auth: Protected — requires valid `token` cookie.
- Path params:
  - `id` — MongoDB user id (string)
- Success response (JSON):
  - Status: 200
  - Body: `{ success: true, user }` where `user` excludes `password`.
- Error responses:
  - No token: 401 `{ success: false, message: "Unauthorized: No token provided" }`
  - Invalid token: 401 `{ success: false, message: "Unauthorized: Invalid token" }`
  - Missing id: 400 `{ success: false, message: "User ID is required" }`
  - Not found: 404 `{ success: false, message: "User not found" }`
  - Invalid ID format: 400 `{ success: false, message: "Invalid user ID format" }`

Example (curl using saved cookie):

```bash
curl -X GET https://your-host/api/user/<USER_ID> -b cookies.txt
```

fetch (client):

```js
fetch(`/api/user/${userId}`, { credentials: "include" })
  .then((r) => r.json())
  .then(console.log);
```

---

### PUT /:id

- Purpose: Update the currently logged-in user's data (name, email, password).
- Auth: Protected — requires valid `token` cookie.
- Path params:
  - `id` — MongoDB user id
- Request JSON body (any of):
  - `name` (string)
  - `email` (string)
  - `password` (string) — if present, it is hashed before saving
- Behavior & Permissions:
  - The controller checks `req.user.id` (from JWT) and requires it to match the `id` param. If they differ, response is 403 Forbidden.
- Success response (JSON):
  - Status: 200
  - Body: `{ success: true, message: "User updated successfully", user: updatedUser }` (password excluded)
- Common error responses:
  - Forbidden: 403 `{ success: false, message: "Forbidden: You cannot update this user" }`
  - Not found: 404 `{ success: false, message: "User not found" }`
  - Invalid ID format: 400 `{ success: false, message: "Invalid user ID format" }`

Example:

```bash
curl -X PUT https://your-host/api/user/<USER_ID> \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"name":"Alice Updated","password":"NewPa$$w0rd"}'
```

---

### DELETE /:id

- Purpose: Delete the currently logged-in user's account.
- Auth: Protected — requires valid `token` cookie.
- Path params:
  - `id` — MongoDB user id
- Behavior & Permissions:
  - Only the logged-in user may delete their own account (checked by comparing `req.user.id` with param `id`).
  - On successful deletion the server clears the `token` cookie (`res.clearCookie('token')`).
- Success response (JSON):
  - Status: 200
  - Body: `{ success: true, message: "User deleted and logged out successfully" }`
- Error responses:
  - Forbidden: 403 `{ success: false, message: "Forbidden: You cannot delete this user" }`
  - Not found: 404 `{ success: false, message: "User not found" }`
  - Invalid ID format: 400 `{ success: false, message: "Invalid user ID format" }`

Example:

```bash
curl -X DELETE https://your-host/api/user/<USER_ID> -b cookies.txt
```

---

## Authentication Details

- Token source: `verifyToken` middleware reads JWT from `req.cookies.token`.
- Token creation: `jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })` (see `loginUser`).
- Cookie options: `httpOnly: true`, `sameSite: 'strict'`, `secure` when `NODE_ENV === 'production'`.

Client tip: use `credentials: 'include'` in fetch or `-b`/`-c` in curl to send/receive cookies.

Environment requirement: ensure `JWT_SECRET` is set in environment.

---

## Error Handling & Status Codes Summary

- 200: Success operations (register, login, get, update, delete)
- 400: Bad request (missing fields, invalid ID format)
- 401: Unauthorized (missing/invalid token; invalid credentials for login)
- 403: Forbidden (user tries to modify/delete another user's data)
- 404: Not found (user does not exist)
- 500: Internal server error (unexpected exceptions)

Note: Some `createUser` error responses in the controller currently return JSON without explicit status codes — consider returning explicit 4xx status codes for consistency.

---

## Implementation Notes & Suggestions

- `register` currently returns JSON messages without explicit HTTP status codes for some failures. Consider returning 400 for validation errors and 409 for duplicate email.
- For stricter security, set a shorter JWT expiration or support refresh tokens.
- Rate-limit auth endpoints to mitigate brute-force attempts.
- Ensure HTTPS in production to protect cookies.

---

## Quick Test Checklist

- Set `JWT_SECRET` in `.env` or environment.
- Start server and confirm mount path for user router (e.g., `/api/user`).
- Register a test account, then log in and verify `token` cookie is set.
- Use cookie to call GET/PUT/DELETE and confirm permission checks work when using the same account vs another account.

---

If you'd like, I can also:

- Add example Postman collection snippets or a tiny test script to exercise these endpoints.
- Update the controllers to normalize status codes (e.g., return 400/409 for register failures).
