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
const Book_1 = __importDefault(require("../domain/entities/Book"));
class BookRepository {
    createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = new Book_1.default(bookData);
            return yield book.save();
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Book_1.default.findById(id);
        });
    }
    listBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Book_1.default.find({}, 'id name');
        });
    }
    updateBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield book.save();
        });
    }
}
exports.default = BookRepository;
