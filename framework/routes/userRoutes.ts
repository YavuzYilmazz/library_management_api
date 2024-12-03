import express from 'express';
import { body, param } from 'express-validator';
import { createUser, listUsers, getUserById, borrowBook, returnBook } from '../../adapters/controllers/UserController';

const router = express.Router();

router.post(
    '/',
    body('name').isString().notEmpty().withMessage('Name is required'),
    createUser
);

router.get('/', listUsers);

router.get(
    '/:id',
    param('id').isMongoId().withMessage('Invalid user ID'),
    getUserById
);

router.post(
    '/:userId/borrow/:bookId',
    param('userId').isMongoId().withMessage('Invalid user ID'),
    param('bookId').isMongoId().withMessage('Invalid book ID'),
    borrowBook
);

router.post(
    '/:userId/return/:bookId',
    param('userId').isMongoId().withMessage('Invalid user ID'),
    param('bookId').isMongoId().withMessage('Invalid book ID'),
    body('score').optional().isInt({ min: 1, max: 10 }).withMessage('Score must be between 1 and 10'),
    returnBook
);

export default router;
