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
class CreateBookUseCase {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    execute(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new AppError_1.default('Name is required', 400);
            }
            const book = yield this.bookRepository.createBook({ name });
            return {
                id: book._id,
                name: book.name,
                score: book.score
            };
        });
    }
}
exports.default = CreateBookUseCase;
