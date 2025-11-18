import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import paymentRoutes from './routes/payment.js';
import locationRoutes from './routes/locations.js'; // <-- 1. NEW: Import location routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/locations', locationRoutes); // <-- 2. NEW: Use location routes

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});