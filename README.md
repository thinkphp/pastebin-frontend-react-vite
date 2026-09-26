# React Pastebin (React + Vite + Express + PostgreSQL)

Port al versiunii Sinatra/SQLite, cu frontend React (Vite) si backend Express + PostgreSQL.

## Structura

```
pastebin-project/
├── backend/          Express API + PostgreSQL
│   ├── src/
│   │   ├── server.js
│   │   ├── db.js
│   │   └── routes/snippets.js
│   ├── package.json
│   └── .env.example
└── frontend/         React (Vite)
    ├── src/
    │   ├── main.jsx, App.jsx, api.js
    │   └── pages/Home.jsx, SnippetView.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 1. Baza de date PostgreSQL

Creeaza o baza de date (local sau in cloud, ex. Supabase/Neon/Railway):

```sql
CREATE DATABASE pastebin;
```

Tabela `snippets` se creeaza automat la primul start al backend-ului (vezi `db.js`).

## 2. Backend

```bash
cd backend
cp .env.example .env
# editeaza .env cu DATABASE_URL real
npm install
npm run dev
```

Serverul porneste implicit pe portul 4567. Rute disponibile:

- `POST /api/snippets` — creeaza un snippet (`{ title, content, expiry }`, expiry: `never`|`24h`|`1h`)
- `GET /api/snippets/:slug` — detalii snippet (JSON)
- `GET /api/snippets/:slug/raw` — continut brut (`text/plain`)

## 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite porneste pe portul 5173 si redirectioneaza cererile `/api/*` catre `http://localhost:4567` (vezi `vite.config.js`).

## 4. Build pentru productie

```bash
cd frontend
npm run build
```

Rezultatul din `frontend/dist` poate fi servit static (Nginx, Express `static`, Vercel, etc.), cu backend-ul rulat separat sau in spatele unui reverse-proxy pe `/api`.

## Note

- Slug-urile sunt generate cu `crypto.randomBytes(8).toString('base64url')`, cu retry in caz de coliziune (constrangere `UNIQUE`).
- Limita de continut: ~1 MB; limita titlu: 200 caractere — validate atat pe backend, cat si (partial) prin `maxLength` in formular.
- Expirarea este verificata la citire (`GET /api/snippets/:slug` si `/raw`); snippet-urile expirate raspund cu `410 Gone`. Poti adauga un job periodic (`DELETE FROM snippets WHERE expires_at < now()`) pentru curatare efectiva din baza de date.
