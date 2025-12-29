<<<<<<< HEAD
const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const { validate, createCategoryValidation, updateCategoryValidation, validateMongoId, validateNoteQuery } = require('../middleware/validators');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(validateNoteQuery, validate, getCategories)
  .post(createCategoryValidation, validate, createCategory);

router.route('/:id')
  .get(validateMongoId, validate, getCategory)
  .put(validateMongoId, updateCategoryValidation, validate, updateCategory)
  .delete(validateMongoId, validate, deleteCategory);

module.exports = router;
=======
const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const { validate, createCategoryValidation, updateCategoryValidation, validateMongoId, validateNoteQuery } = require('../middleware/validators');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(validateNoteQuery, validate, getCategories)
  .post(createCategoryValidation, validate, createCategory);

router.route('/:id')
  .get(validateMongoId, validate, getCategory)
  .put(validateMongoId, updateCategoryValidation, validate, updateCategory)
  .delete(validateMongoId, validate, deleteCategory);

module.exports = router;
>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
