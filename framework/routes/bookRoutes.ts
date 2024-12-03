import express from 'express';
import { listBooks, getBookById, createBook } from '../../adapters/controllers/BookController';

const router = express.Router();

router.get('/', listBooks);
router.get('/:id', getBookById);
router.post('/', createBook);

export default router;
