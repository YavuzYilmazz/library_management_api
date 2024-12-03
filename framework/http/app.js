"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoConnection_1 = __importDefault(require("../../infrastructure/database/mongoConnection"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("../routes/bookRoutes"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
(0, mongoConnection_1.default)();
app.get('/', (req, res) => {
    res.send('Library Management API is running...');
});
// Routes
app.use('/users', userRoutes_1.default);
app.use('/books', bookRoutes_1.default);
app.use((err, req, res, next) => {
    if (err instanceof AppError_1.default) {
        res.status(err.status).json({ message: err.message });
    }
    else {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = app;
