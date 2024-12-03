import { Request, Response, NextFunction } from 'express';
import BookRepository from '../../repositories/BookRepository';
import ListBooksUseCase from '../../use_cases/book/ListBooksUseCase';
import GetBookByIdUseCase from '../../use_cases/book/GetBookByIdUseCase';
import CreateBookUseCase from '../../use_cases/book/CreateBookUseCase';

const bookRepository = new BookRepository();

export const listBooks = async (req: Request, res: Response, next: NextFunction) => {
    const listBooksUseCase = new ListBooksUseCase(bookRepository);

    try {
        const books = await listBooksUseCase.execute();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    const getBookByIdUseCase = new GetBookByIdUseCase(bookRepository);

    try {
        const { id } = req.params;
        const book = await getBookByIdUseCase.execute(id);
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const createBookUseCase = new CreateBookUseCase(bookRepository);

    try {
        const { name } = req.body;
        const book = await createBookUseCase.execute(name);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
};
