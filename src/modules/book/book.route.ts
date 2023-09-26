import express from 'express';
import { verifyAdmin } from '../../middlewares/verifyAuth';
import { bookController } from './book.controller';
const router = express.Router();

router.route('').get(bookController.getBooks);
router.route('/create-book').post(verifyAdmin, bookController.createBook);
router
  .route('/:id')
  .get(bookController.getBookById)
  .patch(verifyAdmin, bookController.updateBook)
  .delete(verifyAdmin, bookController.deleteBook);
router.route('/:id/category').get(bookController.getBooksCategoryId);

export default { bookRouter: router };
