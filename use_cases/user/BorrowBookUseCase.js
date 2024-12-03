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
Object.defineProperty(exports, "__esModule", { value: true });
class BorrowBookUseCase {
    constructor(userRepository, bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }
    execute(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(userId);
            const book = yield this.bookRepository.getBookById(bookId);
            if (!user || !book) {
                throw new Error('User or Book not found');
            }
            const isAlreadyBorrowed = user.borrowedBooks.some(b => b.bookId === bookId);
            if (isAlreadyBorrowed) {
                throw new Error('Book is already borrowed');
            }
            user.borrowedBooks.push({ bookId });
            yield this.userRepository.updateUser(user);
            return { message: 'Book borrowed successfully' };
        });
    }
}
exports.default = BorrowBookUseCase;
