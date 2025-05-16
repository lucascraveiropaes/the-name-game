# WillowTree Game Session API (Next.js)

This is a **Next.js 13+ app** featuring a JWT-based game session backend API, with request validation powered by [Zod](https://github.com/colinhacks/zod). The app runs serverless functions inside the `/app/api` directory and leverages modern Next.js routing and middleware.

---

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## What It Does

* Handles game session state via **JWT tokens**, securely storing progress in the client cookie.
* Validates all inputs and session payloads using **Zod schemas**, preventing malformed or malicious data.
* Exposes API endpoints under `/api/game` to manage game flow.
* Issues updated JWT tokens with fresh session data and expiration on each valid request.
* Integrates with an external profiles API to dynamically generate game options.

---

## API Endpoints

### POST `/api/game/start`

* Starts a new game session.
* Fetches profiles from external API.
* Creates initial session JWT with target and options.
* Response includes session data and sets a secure `game-token` cookie.

**Request Body:**

```json
{
  "mode": "practice" // or other mode strings
}
```

**Response:**

```json
{
  "sessionId": "uuid",
  "mode": "easy",
  "targetName": "First Last",
  "options": [
    { "id": "...", "imageUrl": "...", "alt": "..." },
    ...
  ]
}
```

---

### POST `/api/game/attempt`

* Submits an attempt (user answer) during the game.
* Requires `Authorization: Bearer <token>` header with the current session JWT.
* Validates input and session.
* Updates session attempts with correctness and duration.
* If game is over (5 attempts), returns `gameOver: true` with updated token.
* Otherwise, updates target and options for next round.
* Sets updated `game-token` cookie.

**Request Body:**

```json
{
  "selectedId": "profileId",
  "duration": 4500 // milliseconds taken to answer
}
```

**Response (ongoing game):**

```json
{
  "correct": true,
  "gameOver": false,
  "targetName": "Next Target Name",
  "options": [ /* new options */ ]
}
```

**Response (game over):**

```json
{
  "correct": false,
  "gameOver": true
}
```

---

## Project Highlights

* Next.js App Router + API Routes
* Type-safe request and response validation with Zod
* JWT signing and verification for stateless session management
* Secure HTTP-only cookies with `Set-Cookie` headers
* Uses modern TypeScript patterns for maintainability

---

## Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [Zod Validation Library](https://github.com/colinhacks/zod)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* [Next.js App Router API](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)

---

## Deploy on Vercel

Deploy this app effortlessly with [Vercel](https://vercel.com/new):

```bash
vercel --prod
```

Check [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

---

## Notes

* Configure your `.env` with `JWT_SECRET` and `API_URL` before running.
* All game session logic is handled server-side; client holds the JWT cookie.
* Make sure to have `zod` and `jsonwebtoken` installed for schema validation and JWT.