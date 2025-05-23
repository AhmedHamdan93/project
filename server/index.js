import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
// import { MongoClient, ServerApiVersion } from 'mongodb';

// Load environment variables
dotenv.config({path:'../.env'});

const app = express();
const PORT = process.env.PORT || 4000;

console.log('port',PORT)
console.log('mongo',process.env.MONGODB_URI)


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI,
    ttl: 60 * 60 * 24, // 1 day
  }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Auth API Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});