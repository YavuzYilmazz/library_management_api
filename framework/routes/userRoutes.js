"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const UserController_1 = require("../../adapters/controllers/UserController");
const router = express_1.default.Router();
router.post('/', (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Name is required'), UserController_1.createUser);
router.get('/', UserController_1.listUsers);
router.get('/:id', (0, express_validator_1.param)('id').isMongoId().withMessage('Invalid user ID'), UserController_1.getUserById);
router.post('/:userId/borrow/:bookId', (0, express_validator_1.param)('userId').isMongoId().withMessage('Invalid user ID'), (0, express_validator_1.param)('bookId').isMongoId().withMessage('Invalid book ID'), UserController_1.borrowBook);
router.post('/:userId/return/:bookId', (0, express_validator_1.param)('userId').isMongoId().withMessage('Invalid user ID'), (0, express_validator_1.param)('bookId').isMongoId().withMessage('Invalid book ID'), (0, express_validator_1.body)('score').optional().isInt({ min: 1, max: 10 }).withMessage('Score must be between 1 and 10'), UserController_1.returnBook);
exports.default = router;
