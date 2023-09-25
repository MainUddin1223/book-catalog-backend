import express from 'express';
import { verifyAdmin } from '../../middlewares/verifyAuth';
import { categoryController } from './category.controller';
const router = express.Router();
router
  .route('/create-category')
  .post(verifyAdmin, categoryController.createCategory);

router.route('').get(categoryController.getAllCategories);

router
  .route('/:id')
  .get(categoryController.getCategroyById)
  .patch(verifyAdmin, categoryController.updateCategory)
  .delete(verifyAdmin, categoryController.deleteCategory);

export default { categoryRouter: router };
