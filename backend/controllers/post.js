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

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'first_name last_name picture username, gender')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
