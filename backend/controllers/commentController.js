const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// @desc    Create a new comment
// @route   POST /api/comment
// @access  Private
const createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;

    // Check if blog exists
    const blog = await Blog.findById(postId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = new Comment({
      content,
      userId: req.user.userId,
      postId
    });

    await comment.save();

    // Populate user details
    await comment.populate('userId', 'firstname lastname');

    res.status(201).json({
      message: 'Comment created successfully',
      comment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get comments for a blog
// @route   GET /api/comment/:postId
// @access  Public
const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate('userId', 'firstname lastname')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update comment
// @route   PUT /api/comment/:id
// @access  Private
const updateComment = async (req, res) => {
  try {
    const { content } = req.body;

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment
    if (comment.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to update this comment' });
    }

    comment.content = content;
    comment.updatedAt = Date.now();

    await comment.save();

    // Populate user details
    await comment.populate('userId', 'firstname lastname');

    res.json({
      message: 'Comment updated successfully',
      comment
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comment/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment
    if (comment.userId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's comments
// @route   GET /api/comment/user/my-comments
// @access  Private
const getMyComments = async (req, res) => {
  try {
    const comments = await Comment.find({ userId: req.user.userId })
      .populate('postId', 'title')
      .populate('userId', 'firstname lastname')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error('Get my comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  getMyComments
};
