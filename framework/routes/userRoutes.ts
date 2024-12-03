import express from 'express';
import { listUsers, getUserById, createUser, borrowBook, returnBook } from '../../adapters/controllers/UserController';

const router = express.Router();

router.get('/', listUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/:userId/borrow/:bookId', borrowBook);
router.post('/:userId/return/:bookId', returnBook);

export default router;
