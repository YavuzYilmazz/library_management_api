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
const AppError_1 = __importDefault(require("../../utils/AppError"));
class BorrowBookUseCase {
    constructor(userRepository, bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    execute(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            const book = yield this.bookRepository.getBookById(bookId);
            if (!book) {
                throw new AppError_1.default('Book not found', 404);
            }
            if (!user) {
                throw new AppError_1.default('User not found', 404);
            }
            user.books = user.books || { past: [], present: [] };
            const isAlreadyBorrowed = user.books.present.some(b => b.bookId === bookId);
            if (isAlreadyBorrowed) {
                throw new AppError_1.default('Book is already borrowed by this user', 400);
            }
            user.books.present.push({ bookId, name: book.name });
            yield this.userRepository.updateUser(user);
            return { message: 'Book borrowed successfully' };
        });
    }
}
exports.default = BorrowBookUseCase;
