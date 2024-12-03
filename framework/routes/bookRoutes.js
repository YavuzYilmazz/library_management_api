"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const BookController_1 = require("../../adapters/controllers/BookController");
const router = express_1.default.Router();
router.post('/', (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Book name is required'), BookController_1.createBook);
router.get('/', BookController_1.listBooks);
router.get('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid book ID'), BookController_1.getBookById);
exports.default = router;
