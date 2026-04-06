# LearnQuest - Gamified Learning Platform

Production-ready monorepo starter for a modern learning platform with:
- Gamification (XP, levels, streak, leaderboard)
- Quizzes + timer metadata + admin CRUD
- Flashcards + spaced repetition fields
- Roadmap (tree node model + completion suggestions)
- Coding debug training
- AI tutor endpoint (OpenAI-ready stub)
- Realtime Study Room chat + pomodoro events (Socket.io)
- Markdown Notes with keyword extraction

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Framer Motion
- Backend: Node.js + Express + Socket.io
- DB: MongoDB + Mongoose
- Auth: JWT

## Folder Structure
```
/backend
  /src
    /config
    /controllers
    /middleware
    /models
    /routes
    /socket
    /data
/frontend
  /src
    /api
    /context
```

## Database Schemas
Implemented in `backend/src/models/index.js`:
- Users
- Quizzes (embedded Questions)
- Flashcards (Deck + Cards)
- RoadmapNodes
- Notes
- Achievements
- StudyRooms

## REST API Design
- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- Quiz: `/api/quizzes`, `/api/quizzes/:id/submit`
- Flashcard: `/api/flashcards`, `/api/flashcards/:deckId/review/:cardId`
- Roadmap: `/api/roadmap`, `/api/roadmap/:id/complete`
- Notes: `/api/notes`
- Leaderboard: `/api/leaderboard`
- AI Tutor: `/api/ai/tutor`
- Admin: `/api/admin/stats`, `/api/admin/users`
- Study Rooms: `/api/study-rooms`

## Local Setup
### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Sample Credentials (after `npm run seed`)
- Admin: `admin@learnquest.dev` / `Admin123!`
- Learner: `learner@learnquest.dev` / `Learner123!`

## Vercel Deployment Tutorial

### Option A: Deploy frontend on Vercel + backend on Render/Railway (recommended)
1. Push this repo to GitHub.
2. Create MongoDB Atlas cluster and copy connection string.
3. Deploy `backend` folder to Render/Railway:
   - Build command: `npm install`
   - Start command: `npm start`
   - Env: `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`, `OPENAI_API_KEY`
4. Deploy `frontend` folder to Vercel:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build command: `npm run build`
   - Output Directory: `dist`
   - Env: `VITE_API_URL=https://<your-backend>/api`, `VITE_SOCKET_URL=https://<your-backend>`
5. Update backend `CLIENT_ORIGIN` to Vercel URL.

### Option B: Deploy both on Vercel (serverless backend)
- Convert backend to Vercel serverless functions (`api/*.js`) or use `vercel.json` rewrites.
- Current backend uses long-running Socket.io server, which is better on Render/Railway/Fly.io.

## Bonus Features Included
- Dark-ready theme foundation via Tailwind `darkMode: 'class'`
- Realtime notifications via socket room system messages
- Sound effects hook-ready (add audio assets in frontend and trigger on achievement unlock)
