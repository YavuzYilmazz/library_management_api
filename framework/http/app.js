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
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
(0, mongoConnection_1.default)();
app.get('/', (req, res) => {
    res.send('Library Management API is running...');
});
exports.default = app;
