const express = require('express');
const { authenticateUser } = require('../middleware/auth.middleware');
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getMyBlogs,
  updateBlog,
  deleteBlog,
  searchByHashtags,
  getTrendingBlogs
} = require('../controllers/blogController');

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/trending', getTrendingBlogs);
router.get('/search/hashtags', searchByHashtags);

// Private routes
router.post('/', authenticateUser, createBlog);
router.get('/my-blogs', authenticateUser, getMyBlogs);

// Keep these routes at the end to avoid conflicts
router.get('/:id', getSingleBlog);
router.put('/:id', authenticateUser, updateBlog);
router.delete('/:id', authenticateUser, deleteBlog);

module.exports = router;
