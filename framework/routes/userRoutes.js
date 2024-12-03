"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../../adapters/controllers/UserController");
const router = express_1.default.Router();
router.get('/', UserController_1.listUsers);
router.get('/:id', UserController_1.getUserById);
router.post('/', UserController_1.createUser);
router.post('/:userId/borrow/:bookId', UserController_1.borrowBook);
router.post('/:userId/return/:bookId', UserController_1.returnBook);
exports.default = router;
