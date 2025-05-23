# Fullstack Authentication App

A complete authentication system built with:

- **Frontend**: TypeScript, TanStack Router, shadcn/ui components
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Custom session-based auth using express-session

## Features

- User registration and login
- Session-based authentication
- Protected routes (both client and server side)
- User profile management
- Responsive design
- Dark/light theme support

## Project Structure

```
├── server/                 # Backend code
│   ├── index.js            # Express server setup
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── middleware/         # Auth middleware
├── src/                    # Frontend code
│   ├── components/         # UI components
│   ├── pages/              # Application pages
│   ├── context/            # React context providers
│   ├── lib/                # Utility functions
│   └── hooks/              # Custom hooks
└── .env                    # Environment variables
```

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure MongoDB:
   - Create a MongoDB Atlas account and cluster
   - Update the `.env` file with your MongoDB connection string
4. Start the backend server: `npm run server:dev`
5. Start the frontend development server: `npm run dev`

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `GET /api/auth/check` - Check if user is authenticated
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auth-app
SESSION_SECRET=your_session_secret_change_this_in_production
CLIENT_URL=http://localhost:5173
```

## Security Considerations

- Passwords are hashed using bcrypt
- Sessions are stored in MongoDB
- CORS is configured to only allow requests from the frontend
- HTTP-only cookies are used for session management