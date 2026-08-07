# 🗄️ Local PostgreSQL & Environment Setup

This document outlines the database and environment variables configuration implemented to support local development and connection setup.

---

## 1. Environment Configuration Files

We created environment variable templates for both the frontend and backend to resolve configuration errors:

* **Frontend Configuration**: [`.env`](file:///home/code8/Desktop/Flight-13-Academy/.env)
  * Configures `VITE_API_URL=http://localhost:5000` so Vite components query the active local backend API port rather than resolving to production domains.
* **Backend Configuration**: [`backend/.env`](file:///home/code8/Desktop/Flight-13-Academy/backend/.env)
  * Sets standard API port mapping (`PORT=5000`).
  * Establishes database connection string keys for Supabase API clients (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
  * Configures a local PostgreSQL connection string:
    `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/flight13`

---

## 2. Database Creation & Authentication

To run the backend locally against your standard PostgreSQL instance, follow these steps:

### Create the Database
Create the `flight13` database using Peer Authentication:
```bash
sudo -u postgres createdb flight13
```

### Configure User Authentication
Local TCP/IP loopback connections (`localhost:5432`) require password authentication. Set a local password for the administrative `postgres` user by running:
```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

This maps to the connection string declared inside `backend/.env`:
`DATABASE_URL=postgresql://postgres:postgres@localhost:5432/flight13`

---

## 3. Transitioning to Supabase (Production)

Because Supabase is built natively on top of PostgreSQL, the database structure and credentials map 1-to-1.

When you are ready to transition the app to production:
1. Create a database instance on your Supabase dashboard.
2. Retrieve the cloud API keys and PostgreSQL Connection URL.
3. Update [backend/.env](file:///home/code8/Desktop/Flight-13-Academy/backend/.env) keys:
   * Replace `SUPABASE_URL` and keys with the Supabase API credentials.
   * Replace `DATABASE_URL` with your Supabase direct database connection string (e.g., `postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres`).
