"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BookController_1 = require("../../adapters/controllers/BookController");
const router = express_1.default.Router();
router.get('/', BookController_1.listBooks);
router.get('/:id', BookController_1.getBookById);
router.post('/', BookController_1.createBook);
exports.default = router;
