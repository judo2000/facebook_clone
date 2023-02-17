const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/tokens');

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email address',
      });
    }

    const check = await User.findOne({ email });

    if (check) {
      return res.status(400).json({
        message:
          'The email address already exists.  Try with a different email address.',
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: 'First name must be between 3 and 30 characters',
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: 'Last name must be between 3 and 30 characters',
      });
    }
    if (!validateLength(password, 6, 20)) {
      return res.status(400).json({
        message: 'Password must be between 6 and 20 characters',
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);
    const user = await User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    );
    console.log(emailVerificationToken);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
