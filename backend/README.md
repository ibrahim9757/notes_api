notes-api

Minimal notes API scaffold.

Files added:
- `src/index.js` — minimal Express entry point
- `src/config/db.js` — DB config placeholder
- `.env` — sample env variables
- `.gitignore` — ignores node_modules and .env

PowerShell tip: Windows PowerShell doesn't include `touch` by default. Use `New-Item -ItemType File -Path <path> -Force` or run Git Bash/WSL for Unix commands.


# Notes API

A RESTful API for managing notes with user authentication.

## Features

- User authentication (JWT)
- Create, read, update, delete notes
- Organize notes with categories
- Search notes
- Archive notes

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

## Installation

1. Clone repository
2. Install dependencies:
```bash
   npm install
```
3. Create `.env` file with:
```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/notes-api
   JWT_SECRET=your-secret-key
   JWT_EXPIRE=7d
```
4. Start MongoDB
5. Run development server:
```bash
   npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create note
- `GET /api/notes/:id` - Get single note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Author

Your Name

## License

MIT