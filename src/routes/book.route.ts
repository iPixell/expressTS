import { Router } from 'express';
import {getAllBooks, getBookById, createBook, updateBook, deleteBook} from '../controllers/book.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', requireAuth, getBookById);
router.post('/', requireAuth, createBook);
router.put('/:id', requireAuth, updateBook);
router.delete('/:id', requireAuth, deleteBook);

export default router;