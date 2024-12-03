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
exports.createBook = exports.getBookById = exports.listBooks = void 0;
const BookRepository_1 = __importDefault(require("../../repositories/BookRepository"));
const ListBooksUseCase_1 = __importDefault(require("../../use_cases/book/ListBooksUseCase"));
const GetBookByIdUseCase_1 = __importDefault(require("../../use_cases/book/GetBookByIdUseCase"));
const CreateBookUseCase_1 = __importDefault(require("../../use_cases/book/CreateBookUseCase"));
const bookRepository = new BookRepository_1.default();
const listBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const listBooksUseCase = new ListBooksUseCase_1.default(bookRepository);
    try {
        const books = yield listBooksUseCase.execute();
        res.status(200).json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.listBooks = listBooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getBookByIdUseCase = new GetBookByIdUseCase_1.default(bookRepository);
    try {
        const { id } = req.params;
        const book = yield getBookByIdUseCase.execute(id);
        res.status(200).json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.getBookById = getBookById;
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const createBookUseCase = new CreateBookUseCase_1.default(bookRepository);
    try {
        const { name } = req.body;
        const book = yield createBookUseCase.execute(name);
        res.status(201).json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
