import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from '../../infrastructure/database/mongoConnection';
import userRoutes from '../routes/userRoutes';
import bookRoutes from '../routes/bookRoutes';

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


export default app;
