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
            if (!user || !book) {
                throw new AppError_1.default('User or Book not found', 404);
            }
            const borrowedBook = user.borrowedBooks.find(b => b.bookId === bookId);
            if (!borrowedBook) {
                throw new AppError_1.default('Book was not borrowed by the user', 400);
            }
            if (score) {
                book.ratings.push(score);
                book.averageRating =
                    book.ratings.reduce((sum, rating) => sum + rating, 0) / book.ratings.length;
                yield this.bookRepository.updateBook(book);
            }
            user.borrowedBooks = user.borrowedBooks.filter(b => b.bookId !== bookId);
            yield this.userRepository.updateUser(user);
            return { message: 'Book returned successfully' };
        });
    }
}
exports.default = ReturnBookUseCase;
