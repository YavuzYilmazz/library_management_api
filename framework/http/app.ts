import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from '../../infrastructure/database/mongoConnection';
import userRoutes from '../routes/userRoutes';
import bookRoutes from '../routes/bookRoutes';
import { Request, Response, NextFunction } from 'express';
import AppError from '../../utils/AppError';

const app = express();

dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

connectMongoDB();

app.get('/', (req, res) => {
    res.send('Library Management API is running...');
});

// Routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.status).json({ message: err.message });
    } else {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


export default app;
