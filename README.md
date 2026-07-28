# NovaPedia - ambitious-crew-project

NovaPedia is a collaborative encyclopedia web application with three reading experiences:

- `Enfant`: simplified content + interactive puzzle
- `Explorateur`: detailed content + quiz
- `Chercheur`: full article-style pages + edit/delete entry points

The repository contains two independent parts:

- a `React + Vite + TanStack Router` frontend (`Front/`) for the user interface
- a `FastAPI` backend (`Backend/`) for authentication, categories, and article APIs

Important:

- The frontend currently runs on local/mock content and does not require the backend to start.
- The backend is available for API development and future integration.

## Team Members

- TIAHERANTO Mandaniaina
- RAKOTONIAINA Mirandy Tianasoa
- SAHONDRAHARIVONY Miray Nivolana
- RAKOTOARINELINA Jessarel Fidèl
- ANJARAMANDRESY Miandry Finiavana
- RAZANATSOA Aime Freddy

## Main Features
- Category-based encyclopedia navigation (`enfant`, `explorateur`, `chercheur`)
- Dynamic article page by URL slug (`/$category/$slug`)
- Text-to-speech buttons in several content areas
- Interactive puzzle mode for children
- Quiz mode for explorers
- Encyclopedia-style article mode for researchers
- Login/Register UI flow on the frontend (currently not wired to backend)
- Backend JWT auth endpoints (`/auth/register`, `/auth/login`) for API-side auth
- Backend CRUD for categories and articles

## Run Modes

### Frontend only (recommended for current app demo)

Use this when you want to run the app UI as implemented today.

```bash
cd Front
npm install
npm run dev
```

### Full stack (for API development/integration work)

Use this when working on backend endpoints or integrating frontend with real APIs.

- Run backend in `Backend/`
- Run frontend in `Front/`

## Tech Stack

### Frontend (`Front/`)

- React 19
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- Radix UI components

### Backend (`Backend/`)

- FastAPI
- SQLAlchemy
- PostgreSQL (`psycopg2-binary`)
- JWT (`python-jose`)
- Password hashing (`passlib` + `argon2-cffi`)

## Project Structure

`Backend/`

- `app/main.py`: FastAPI app entrypoint and router registration
- `app/routes/`: API route definitions (`auth`, `categories`, `articles`)
- `app/controllers/`: business logic for auth/category/article
- `app/models/`: SQLAlchemy entities
- `app/schemas/`: Pydantic request/response schemas
- `app/database/database.py`: DB engine/session configuration

`Front/`

- `src/routes/`: file-based app routes
- `src/pages/ArticleEditor.tsx`: article creation UI
- `src/hooks/useArticleForm.ts`: form state/validation logic
- `src/lib/mockData.ts`: in-memory encyclopedia article dataset
- `src/components/`: UI/layout/feature components

## Prerequisites

- Node.js 18+ (or newer)
- npm
- Python 3.10+
- PostgreSQL running locally or remotely

## Backend Setup (optional for current frontend)

1. Go to backend folder:

```bash
cd Backend
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
```

PowerShell:

```bash
.venv\Scripts\Activate.ps1
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Configure environment variables in `Backend/.env`:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
SECRET_KEY=change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

5. Run API server:

```bash
uvicorn app.main:app --reload
```

Default URL: `http://127.0.0.1:8000`

## Frontend Setup (required for UI demo)

1. Go to frontend folder:

```bash
cd Front
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Default URL: `http://localhost:5173`

## API Overview

Authentication:

- `POST /auth/register`
- `POST /auth/login`

Categories:

- `GET /categories/`
- `GET /categories/{category_id}`
- `POST /categories/`
- `PUT /categories/{category_id}`
- `DELETE /categories/{category_id}`

Articles:

- `GET /articles/`
- `GET /articles/{article_id}`
- `GET /articles/author/{author_id}`
- `POST /articles/`
- `PUT /articles/{article_id}`
- `DELETE /articles/{article_id}`

Health/utility:

- `GET /` (API heartbeat message)
- `GET /db-test` (database connectivity test)

## Notes on Current Implementation

- Frontend data for encyclopedia pages currently comes from `src/lib/mockData.ts`.
- Frontend routes and article rendering do not fetch backend data yet.
- Frontend login/register form is currently UI-only (no API integration yet).
- Article creation UI currently simulates API submission in `useArticleForm`.
- Article create/update/delete endpoints are currently public in backend routes.
- Article creation currently uses a temporary fixed `author_id=1`.

## Suggested Next Improvements

- Connect frontend auth form to `/auth/register` and `/auth/login`
- Store JWT on frontend and attach token to protected requests
- Protect article write endpoints with authenticated user checks
- Replace fixed `author_id=1` with token-based current user
- Wire article editor submit flow to backend `POST /articles/`
- Add tests for API endpoints and frontend form validation flows

## License

This repository contains a `LICENSE` file. See it for usage terms.
