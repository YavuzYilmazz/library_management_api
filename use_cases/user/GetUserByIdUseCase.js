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
class GetUserByIdUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return {
                id: user._id,
                name: user.name,
                books: {
                    past: user.borrowedBooks
                        .filter(book => book.score !== null)
                        .map(book => ({
                        bookId: book.bookId,
                        score: book.score,
                    })),
                    present: user.borrowedBooks
                        .filter(book => book.score === null)
                        .map(book => ({
                        bookId: book.bookId,
                    })),
                },
            };
        });
    }
}
exports.default = GetUserByIdUseCase;
