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
class ReturnBookUseCase {
    constructor(userRepository, bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    execute(userId, bookId, score) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            const book = yield this.bookRepository.getBookById(bookId);
            if (!book) {
                throw new AppError_1.default('Book not found', 404);
            }
            if (!user) {
                throw new AppError_1.default('User not found', 404);
            }
            const borrowedBookIndex = user.books.present.findIndex(b => b.bookId === bookId);
            if (borrowedBookIndex === -1) {
                throw new AppError_1.default('This book is not currently borrowed by the user', 400);
            }
            if (score !== undefined) {
                if (score <= 1 || score >= 10) {
                    throw new AppError_1.default('Score must be between 1 and 10', 400);
                }
                if (book.score === -1) {
                    book.score = score;
                    book.voteCount = 1;
                }
                else {
                    book.score = (book.score * book.voteCount + score) / (book.voteCount + 1);
                    book.voteCount += 1;
                }
                yield this.bookRepository.updateBook(book);
            }
            const borrowedBook = user.books.present[borrowedBookIndex];
            user.books.present.splice(borrowedBookIndex, 1);
            user.books.past.push({
                bookId: borrowedBook.bookId,
                name: book.name,
                userScore: score !== null && score !== void 0 ? score : undefined,
            });
            yield this.userRepository.updateUser(user);
            return { message: 'Book returned successfully' };
        });
    }
}
exports.default = ReturnBookUseCase;
