<<<<<<< HEAD
const express = require('express');
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  archiveNote
} = require('../controllers/noteController');
const { protect } = require('../middleware/auth');
const { validate, createNoteValidation, updateNoteValidation, validateMongoId, validateNoteQuery } = require('../middleware/validators');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(validateNoteQuery, validate, getNotes)
  .post(createNoteValidation, validate, createNote);

router.route('/:id')
  .get(validateMongoId, validate, getNote)
  .put(validateMongoId, updateNoteValidation, validate, updateNote)
  .delete(validateMongoId, validate, deleteNote);

router.patch('/:id/archive', validateMongoId, validate, archiveNote);

module.exports = router;
=======
const express = require('express');
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  archiveNote
} = require('../controllers/noteController');
const { protect } = require('../middleware/auth');
const { validate, createNoteValidation, updateNoteValidation, validateMongoId, validateNoteQuery } = require('../middleware/validators');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(validateNoteQuery, validate, getNotes)
  .post(createNoteValidation, validate, createNote);

router.route('/:id')
  .get(validateMongoId, validate, getNote)
  .put(validateMongoId, updateNoteValidation, validate, updateNote)
  .delete(validateMongoId, validate, deleteNote);

router.patch('/:id/archive', validateMongoId, validate, archiveNote);

module.exports = router;
>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
