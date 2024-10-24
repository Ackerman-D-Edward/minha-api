import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

// Conexão ao MongoDB
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

export default app;