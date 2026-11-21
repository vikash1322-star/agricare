# AgriCare Full-Stack Starter
AgriCare is a React + Express + MongoDB crop-service application. Farmers can register, log in, submit service applications, and track their status. Admin users can review applications, approve/reject, add notes, and view registered farmers.


## Requirements
- Node.js LTS (18+ recommended)
- MongoDB Community installed and running, or MongoDB Atlas connection string

## Run on Windows
Open VS Code, open this `agricare` folder.

### Terminal 1 — Backend
```powershell
cd backend
npm install
Copy-Item .env.example .env
```
Edit backend `.env` and set `MONGO_URI`, a unique `JWT_SECRET`, and `ADMIN_PASSWORD`. Keep the admin password private.
Then run:
```powershell
npm run dev
```
Backend API: http://localhost:5000/api/health


### Terminal 2 — Frontend
Open a second VS Code terminal:
```powershell
cd frontend
npm install
Copy-Item .env.example .env
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

### Admin access
The backend creates an initial admin account when it first connects to MongoDB:
- Email: value of `ADMIN_EMAIL` in backend `.env` (sample: admin@agricare.com)
- Password: value of `ADMIN_PASSWORD` in backend `.env`
Change the sample password before use. Do not deploy with the sample credentials.

## Routes
- `/` homepage
- `/services` service catalog
- `/about` about page
- `/register` farmer registration
- `/login` login
- `/dashboard` customer dashboard (auth protected)
- `/admin` admin dashboard (role protected)

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/requests` (authenticated)
- `GET /api/requests/mine` (authenticated)
- `GET /api/requests` (admin)
- `PATCH /api/requests/:id/status` (admin)
- `GET /api/admin/summary` (admin)
- `GET /api/admin/users` (admin)
- `GET /api/health`

This is a starter for local development. Before production deployment, add rate limiting, email/phone verification, audit logs, stronger validation, CSRF considerations for cookie auth, and a secure deployment configuration.
