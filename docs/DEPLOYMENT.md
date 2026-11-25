# S.A.R.T.H.I. — Deployment Guide

This guide documents deployment strictly based on the repository's existing configuration files:
- **Frontend (Netlify / Vercel):** [frontend/netlify.toml](../frontend/netlify.toml), [frontend/vercel.json](../frontend/vercel.json), [frontend/.env.example](../frontend/.env.example), and static fallback snapshot [frontend/public/readiness-cache.json](../frontend/public/readiness-cache.json)
- **Backend (Render / Railway / Procfile hosts):** [backend/Procfile](../backend/Procfile), [backend/requirements.txt](../backend/requirements.txt), and [backend/.env.example](../backend/.env.example)
- **Database:** MySQL 8 schema dump (`sarthi_db_deploy.sql`, gitignored)

---

## 1. Deployment Topology

S.A.R.T.H.I. uses a decoupled frontend/backend architecture:

1. **Static Frontend (`frontend/`)** builds to `frontend/dist` (`npm run build`) and includes `frontend/public/readiness-cache.json`. Because the static snapshot contains all 2,000 normalized dossiers, the deployed frontend remains functional on any phone or browser even when no live FastAPI backend is reachable (`CACHE READY` mode).
2. **Backend API (`backend/`)** runs FastAPI via Uvicorn (`uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}`) with access to the `.joblib` files in `backend/models/` and a reachable MySQL `sarthi_db` database.
3. **Database (`sarthi_db`)** runs on managed MySQL 8 (or local MySQL tunneled/migrated for hosted backends).

---

## 2. Database Deployment (MySQL 8)

Export and import using explicit UTF-8 encoding so Windows PowerShell redirection does not produce UTF-16 files.

### Exporting Local Database

```cmd
mysqldump --default-character-set=utf8mb4 --routines --triggers -u root -p sarthi_db --result-file=sarthi_db_deploy.sql
```

### Importing Into Target MySQL Instance

```bash
mysql --default-character-set=utf8mb4 -h <DB_HOST> -P <DB_PORT> -u <DB_USER> -p <DB_NAME> < sarthi_db_deploy.sql
```

Verify that all 5 tables exist (`soldiers`, `physical_fitness`, `health_recovery`, `injury_records`, `prediction_history`).

---

## 3. Backend Deployment (`backend/`)

The repository includes [backend/Procfile](../backend/Procfile):

```procfile
web: uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
```

### Deploying to Render / Railway / Python PaaS

1. Set the service **Root Directory** to `backend`.
2. **Build Command:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Start Command** (automatically read from `Procfile` on compatible hosts):
   ```bash
   uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
   ```
4. **Environment Variables** (see [backend/.env.example](../backend/.env.example)):
   - `DB_HOST` — Managed MySQL hostname
   - `DB_PORT` — MySQL port (usually `3306`)
   - `DB_NAME` — `sarthi_db`
   - `DB_USER` — MySQL username
   - `DB_PASSWORD` — MySQL password (set as secret in host dashboard)
   - `ALLOWED_ORIGINS` — Comma-separated frontend URLs, e.g. `https://sarthi-readiness-ai.netlify.app`

5. **Verify Live Backend:**
   ```bash
   curl https://<your-backend-domain>/health
   ```
   Expected response: `{"status":"Healthy","backend":"Operational","database":"Connected"}`.

> **Important:** `backend/database.py` raises `ValueError("Database configuration missing in .env file")` at startup if `DB_HOST`, `DB_NAME`, `DB_USER`, or `DB_PASSWORD` are unset. Ensure they are configured in your hosting provider's environment settings before starting Uvicorn.

---

## 4. Frontend Deployment (`frontend/`)

### Option A: Netlify (Existing Configuration: `frontend/netlify.toml`)

[frontend/netlify.toml](../frontend/netlify.toml) already defines the build and SPA fallback redirect:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Steps (Netlify CLI or Git integration):**

1. Set the **Base directory** to `frontend` (or run CLI inside `frontend/`).
2. *(Optional — only needed when pairing with a hosted FastAPI backend)* Set environment variable in Netlify:
   - `VITE_API_URL=https://<your-backend-domain>`
   If omitted, the app defaults to `http://127.0.0.1:8000` and serves the bundled `/readiness-cache.json` snapshot cleanly across devices without failing.
3. Build and deploy via CLI:
   ```bash
   cd frontend
   npm install
   npm run build
   netlify deploy --prod --dir=dist
   ```

The current production site is deployed at `https://sarthi-readiness-ai.netlify.app`.

### Option B: Vercel (Existing Configuration: `frontend/vercel.json`)

[frontend/vercel.json](../frontend/vercel.json) provides SPA routing rewrites:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

1. Import the project in Vercel with **Root Directory** set to `frontend`.
2. Framework Preset: **Vite** (`npm run build`, output directory `dist`).
3. Configure `VITE_API_URL` in Vercel Project Environment Variables if connecting to a hosted backend, then trigger a redeploy.

---

## 5. Temporary Local-Backend Public Demo (Optional)

If demonstrating the live local FastAPI + ReportLab PDF endpoint against the deployed Netlify site without cloud-hosting MySQL yet:

1. Ensure MySQL and Uvicorn are running locally on `127.0.0.1:8000`.
2. Expose port `8000` over HTTPS (e.g., `cloudflared tunnel --url http://127.0.0.1:8000`).
3. Set `VITE_API_URL` to the generated `https://*.trycloudflare.com` URL, rebuild `frontend/dist`, and redeploy.
4. Keep the local backend process running only while demonstrating live `/predict/soldier/{id}` writes and server-generated ReportLab PDFs; when offline, the frontend automatically reverts to `CACHE READY` mode using `/readiness-cache.json`.
