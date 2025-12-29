<<<<<<< HEAD
const Note = require('../models/Note');
const Category = require('../models/Category');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { paginate, getPaginationData } = require('../utils/pagination');

// @desc    Get all notes for logged in user
// @route   GET /api/notes
// @access  Private
exports.getNotes = catchAsync(async (req, res, next) => {
  let query = { user: req.user.id };

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.archived !== undefined) {
      query.isArchived = req.query.archived === 'true';
    }

    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const total = await Note.countDocuments(query);
    let noteQuery = Note.find(query)
      .populate('category', 'name color')
      .sort({ createdAt: -1 });

    noteQuery = paginate(noteQuery, page, limit);
    const notes = await noteQuery;

    const pagination = getPaginationData(total, page, limit);

    res.status(200).json({
      success: true,
      count: notes.length,
      pagination,
      data: { notes }
    });

});

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
exports.getNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id).populate('category', 'name color');

  if (!note) return next(new AppError('Note not found', 404));

  if (note.user.toString() !== req.user.id) {
    return next(new AppError('Not authorized to access this note', 403));
  }

  res.status(200).json({ success: true, data: { note } });
});

// @desc    Create note
// @route   POST /api/notes
// @access  Private
exports.createNote = catchAsync(async (req, res, next) => {
    req.body.user = req.user.id;

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) return next(new AppError('Category not found', 404));
      if (category.user.toString() !== req.user.id) {
        return next(new AppError('Not authorized to use this category', 403));
      }
    }

    const note = await Note.create(req.body);
    await note.populate('category', 'name color');

    res.status(201).json({ success: true, message: 'Note created successfully', data: { note } });
});

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
exports.updateNote = catchAsync(async (req, res, next) => {
    let note = await Note.findById(req.params.id);
    if (!note) return next(new AppError('Note not found', 404));
    if (note.user.toString() !== req.user.id) return next(new AppError('Not authorized to update this note', 403));

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) return next(new AppError('Category not found', 404));
      if (category.user.toString() !== req.user.id) return next(new AppError('Not authorized to use this category', 403));
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('category', 'name color');

    res.status(200).json({ success: true, message: 'Note updated successfully', data: { note } });
});

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
exports.deleteNote = catchAsync(async (req, res, next) => {
    const note = await Note.findById(req.params.id);
    if (!note) return next(new AppError('Note not found', 404));
    if (note.user.toString() !== req.user.id) return next(new AppError('Not authorized to delete this note', 403));

    await note.deleteOne();
    res.status(200).json({ success: true, message: 'Note deleted successfully', data: {} });
});

// @desc    Archive/Unarchive note
// @route   PATCH /api/notes/:id/archive
// @access  Private
exports.archiveNote = catchAsync(async (req, res, next) => {
    let note = await Note.findById(req.params.id);
    if (!note) return next(new AppError('Note not found', 404));
    if (note.user.toString() !== req.user.id) return next(new AppError('Not authorized to archive this note', 403));

    note.isArchived = !note.isArchived;
    await note.save();

    res.status(200).json({ success: true, message: `Note ${note.isArchived ? 'archived' : 'unarchived'} successfully`, data: { note } });
});
=======
const Note = require('../models/Note');
const Category = require('../models/Category');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { paginate, getPaginationData } = require('../utils/pagination');

// @desc    Get all notes for logged in user
// @route   GET /api/notes
// @access  Private
exports.getNotes = catchAsync(async (req, res, next) => {
  let query = { user: req.user.id };

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.archived !== undefined) {
      query.isArchived = req.query.archived === 'true';
    }

    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const total = await Note.countDocuments(query);
    let noteQuery = Note.find(query)
      .populate('category', 'name color')
      .sort({ createdAt: -1 });

    noteQuery = paginate(noteQuery, page, limit);
    const notes = await noteQuery;

    const pagination = getPaginationData(total, page, limit);

    res.status(200).json({
      success: true,
      count: notes.length,
      pagination,
      data: { notes }
    });

});

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
exports.getNote = catchAsync(async (req, res, next) => {
  const note = await Note.findById(req.params.id).populate('category', 'name color');

  if (!note) return next(new AppError('Note not found', 404));

  if (note.user.toString() !== req.user.id) {
    return next(new AppError('Not authorized to access this note', 403));
  }

  res.status(200).json({ success: true, data: { note } });
});

// @desc    Create note
// @route   POST /api/notes
// @access  Private
exports.createNote = catchAsync(async (req, res, next) => {
    req.body.user = req.user.id;

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) return next(new AppError('Category not found', 404));
      if (category.user.toString() !== req.user.id) {
        return next(new AppError('Not authorized to use this category', 403));
      }
    }

    const note = await Note.create(req.body);
    await note.populate('category', 'name color');

    res.status(201).json({ success: true, message: 'Note created successfully', data: { note } });
});

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
exports.updateNote = catchAsync(async (req, res, next) => {
    let note = await Note.findById(req.params.id);
    if (!note) return next(new AppError('Note not found', 404));
    if (note.user.toString() !== req.user.id) return next(new AppError('Not authorized to update this note', 403));

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) return next(new AppError('Category not found', 404));
      if (category.user.toString() !== req.user.id) return next(new AppError('Not authorized to use this category', 403));
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('category', 'name color');

    res.status(200).json({ success: true, message: 'Note updated successfully', data: { note } });
});

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
exports.deleteNote = catchAsync(async (req, res, next) => {
    const note = await Note.findById(req.params.id);
    if (!note) return next(new AppError('Note not found', 404));
    if (note.user.toString() !== req.user.id) return next(new AppError('Not authorized to delete this note', 403));

    await note.deleteOne();
    res.status(200).json({ success: true, message: 'Note deleted successfully', data: {} });
});

// @desc    Archive/Unarchive note
// @route   PATCH /api/notes/:id/archive
// @access  Private
exports.archiveNote = catchAsync(async (req, res, next) => {
    let note = await Note.findById(req.params.id);
    if (!note) return next(new AppError('Note not found', 404));
    if (note.user.toString() !== req.user.id) return next(new AppError('Not authorized to archive this note', 403));

    note.isArchived = !note.isArchived;
    await note.save();

    res.status(200).json({ success: true, message: `Note ${note.isArchived ? 'archived' : 'unarchived'} successfully`, data: { note } });
});
>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
