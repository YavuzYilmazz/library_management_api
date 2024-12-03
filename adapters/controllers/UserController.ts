import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/UserRepository';
import BookRepository from '../../repositories/BookRepository';
import CreateUserUseCase from '../../use_cases/user/CreateUserUseCase';
import ListUsersUseCase from '../../use_cases/user/ListUsersUseCase';
import BorrowBookUseCase from '../../use_cases/user/BorrowBookUseCase';
import ReturnBookUseCase from '../../use_cases/user/ReturnBookUseCase';
import GetUserByIdUseCase from '../../use_cases/user/GetUserByIdUseCase';

const userRepository = new UserRepository();
const bookRepository = new BookRepository();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const createUserUseCase = new CreateUserUseCase(userRepository);

    try {
        const user = await createUserUseCase.execute(req.body.name);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    const listUsersUseCase = new ListUsersUseCase(userRepository);

    try {
        const users = await listUsersUseCase.execute();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

    try {
        const { id } = req.params;
        const user = await getUserByIdUseCase.execute(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
    const borrowBookUseCase = new BorrowBookUseCase(userRepository, bookRepository);

    try {
        const { userId, bookId } = req.params;

        const result = await borrowBookUseCase.execute(userId, bookId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
    const returnBookUseCase = new ReturnBookUseCase(userRepository, bookRepository);

    try {
        const { userId, bookId } = req.params;
        const { score } = req.body;

        const result = await returnBookUseCase.execute(userId, bookId, score);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
