import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();

// Conexão ao MongoDB
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);

// Rotas protegidas (CRUD de produtos, requer autenticação)
app.use('/api/products', authMiddleware, productRoutes);


export default app;