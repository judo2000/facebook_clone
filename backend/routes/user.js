const express = require('express');
const {
  register,
  activateAccount,
  login,
  auth,
} = require('../controllers/user');
const { authUser } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/activate', authUser, authUser, activateAccount);
router.post('/login', login);

module.exports = router;
