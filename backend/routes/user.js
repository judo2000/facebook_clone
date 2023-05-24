const express = require('express');
const {
  register,
  activateAccount,
  login,
  auth,
  sendVerification,
  getProfile,
  updateProfilePicture,
  updateCover,
} = require('../controllers/user');
const { authUser } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/activate', authUser, authUser, activateAccount);
router.post('/login', login);
router.post('/sendVerification', authUser, sendVerification);
router.get('/getProfile/:username', authUser, getProfile);
router.put('/updateProfilePicture', authUser, updateProfilePicture);
router.put('/updateCover', authUser, updateCover);
module.exports = router;
