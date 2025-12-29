<<<<<<< HEAD
// src/routes/authRoutes.js
const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validate, registerValidation, loginValidation } = require('../middleware/validators');

const router = express.Router();

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

// Protected routes (requires authentication)
router.get('/me', protect, getMe);

=======
// src/routes/authRoutes.js
const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validate, registerValidation, loginValidation } = require('../middleware/validators');

const router = express.Router();

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);

// Protected routes (requires authentication)
router.get('/me', protect, getMe);

>>>>>>> 35d0515 (stage1 :working all fine project  without good frontend colours)
module.exports = router;