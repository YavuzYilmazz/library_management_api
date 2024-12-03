"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = exports.getUserById = exports.listUsers = exports.createUser = void 0;
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
const BookRepository_1 = __importDefault(require("../../repositories/BookRepository"));
const CreateUserUseCase_1 = __importDefault(require("../../use_cases/user/CreateUserUseCase"));
const ListUsersUseCase_1 = __importDefault(require("../../use_cases/user/ListUsersUseCase"));
const BorrowBookUseCase_1 = __importDefault(require("../../use_cases/user/BorrowBookUseCase"));
const ReturnBookUseCase_1 = __importDefault(require("../../use_cases/user/ReturnBookUseCase"));
const GetUserByIdUseCase_1 = __importDefault(require("../../use_cases/user/GetUserByIdUseCase"));
const userRepository = new UserRepository_1.default();
const bookRepository = new BookRepository_1.default();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserUseCase = new CreateUserUseCase_1.default(userRepository);
    try {
        const user = yield createUserUseCase.execute(req.body.name);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const listUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsersUseCase = new ListUsersUseCase_1.default(userRepository);
    try {
        const users = yield listUsersUseCase.execute();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.listUsers = listUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getUserByIdUseCase = new GetUserByIdUseCase_1.default(userRepository);
    try {
        const { id } = req.params;
        const user = yield getUserByIdUseCase.execute(id);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const borrowBookUseCase = new BorrowBookUseCase_1.default(userRepository, bookRepository);
    try {
        const { userId, bookId } = req.params;
        const result = yield borrowBookUseCase.execute(userId, bookId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.borrowBook = borrowBook;
const returnBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const returnBookUseCase = new ReturnBookUseCase_1.default(userRepository, bookRepository);
    try {
        const { userId, bookId } = req.params;
        const { score } = req.body;
        const result = yield returnBookUseCase.execute(userId, bookId, score);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.returnBook = returnBook;
