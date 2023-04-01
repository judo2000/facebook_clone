const Post = require('../models/Post');
exports.createPost = async (req, res) => {
  try {
    const { type, background, text, images, user, token } = req.body;
    const newPost = await new Post({
      type,
      background,
      text,
      images,
      user,
    });
    const post = newPost.save();
    console.log(post);
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
