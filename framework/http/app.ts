import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectMongoDB from '../../infrastructure/database/mongoConnection';

const app = express();

dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

connectMongoDB();

app.get('/', (req, res) => {
    res.send('Library Management API is running...');
});

export default app;
