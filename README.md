# Corporate Portfolio + OMS Platform

A production-style MERN stack portfolio website with a polished corporate UI and admin OMS for orders and portfolio publishing.

## Stack

- React + Vite
- Tailwind CSS
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Cloudinary asset support

## Setup

1. Install dependencies:
   npm install
2. Configure environment variables in .env based on .env.example
3. Start MongoDB locally
4. Run the app:
   npm run dev
5. Open the frontend at http://localhost:5173

## Admin login

Email: admin@company.com
Password: ChangeMe123!

## Notes

This is a polished corporate implementation designed for demonstration and business-facing portfolio needs.

## Deploy the backend on Render

1. Push this repository to GitHub and create a Render Blueprint from `render.yaml`.
2. In Render, set `MONGODB_URI` to a MongoDB Atlas connection string. Do not use the local MongoDB URL in production.
3. Set `CLOUDINARY_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_WHATSAPP` in the Render service environment.
4. Set `ALLOWED_ORIGINS` to the deployed frontend URL, for example `https://your-site.onrender.com`.
5. Render will run `npm run server:prod`; its assigned `PORT` is used automatically. Verify `/api/health` returns status `ok`.

For a separately deployed Vite frontend, set these build environment variables before running `npm run build`:

- `VITE_API_URL=https://your-api-name.onrender.com`
- `VITE_ADMIN_WHATSAPP=254755375947`

The WhatsApp button opens a direct chat with a pre-filled message. The order form uses the backend `ADMIN_WHATSAPP` value to build its order-specific WhatsApp redirect.
