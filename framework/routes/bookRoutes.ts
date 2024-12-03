import express from 'express';
import { body, param } from 'express-validator';
import { createBook, listBooks, getBookById } from '../../adapters/controllers/BookController';

const router = express.Router();

router.post(
    '/',
    body('name').isString().notEmpty().withMessage('Book name is required'),
    createBook
);

router.get('/', listBooks);

router.get(
    '/:id',
    param('id').isMongoId().withMessage('Invalid book ID'),
    getBookById
);

export default router;
