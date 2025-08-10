const express = require('express');
const { authenticateUser } = require('../middleware/auth.middleware');
const {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
  getMyComments
} = require('../controllers/commentController');

const router = express.Router();

// Public routes
router.get('/:postId', getCommentsByPost);

// Private routes
router.post('/', authenticateUser, createComment);
router.put('/:id', authenticateUser, updateComment);
router.delete('/:id', authenticateUser, deleteComment);
router.get('/user/my-comments', authenticateUser, getMyComments);

module.exports = router;
