import express from 'express';
import { verifyAdmin } from '../../middlewares/verifyAuth';
import { bookController } from './book.controller';
const router = express.Router();

router.route('/create-book').post(verifyAdmin, bookController.createBook);
router
  .route('/:id')
  .get(bookController.getBookById)
  .patch(verifyAdmin, bookController.getBookById)
  .delete(verifyAdmin, bookController.deleteBook);

export default { bookRouter: router };
