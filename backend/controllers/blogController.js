const Blog = require('../models/Blog');
const User = require('../models/User');
const cloudinary = require("cloudinary").v2

// @desc    Create a new blog
// @route   POST /api/blog
// @access  Private

cloudinary.config({
    cloud_name: 'dkfhw2v5x',     // e.g., 'my-cloud'
    api_key: '382521327277157',           // e.g., '1234567890'
    api_secret: 'VBYrZ8DcakKpvlim-87cJH8Ap8g',     // e.g., 'abc123xyz456'
  });


const createBlog = async (req, res) => {
  try {
    const { title, body, hashtags } = req.body;
    const imageFile = req.files?.image; // image key from frontend

    let imageUrl = null;
    if (imageFile) {
      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: "blogs"
      });
      imageUrl = uploadResult.secure_url;
    }

    const blog = new Blog({
      title,
      body,
      hashtags: typeof hashtags === "string" ? hashtags.split(",").map(tag => tag.trim()) : [],
      author: req.user.userId,
      image: imageUrl
    });

    await blog.save();

    // Populate author details
    await blog.populate("author", "firstname lastname");

    res.status(201).json({
      message: "Blog created successfully",
      blog
    });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'firstname lastname')
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single blog
// @route   GET /api/blog/:id
// @access  Public
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'firstname lastname');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Get single blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's blogs
// @route   GET /api/blog/my-blogs
// @access  Private
const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.userId })
      .populate('author', 'firstname lastname')
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    console.error('Get my blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update blog
// @route   PUT /api/blog/:id
// @access  Private

// const updateBlog = async (req, res) => {
//   try {
//     const { title, body, image, hashtags } = req.body;

//     const blog = await Blog.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found' });
//     }

//     // Check if user owns the blog
//     if (blog.author.toString() !== req.user.userId) {
//       return res.status(401).json({ message: 'Not authorized to update this blog' });
//     }

//     blog.title = title || blog.title;
//     blog.body = body || blog.body;
//     blog.image = image || blog.image;
//     blog.hashtags = hashtags || blog.hashtags;
//     blog.updatedAt = Date.now();

//     await blog.save();

//     // Populate author details
//     await blog.populate('author', 'firstname lastname');

//     res.json({
//       message: 'Blog updated successfully',
//       blog
//     });
//   } catch (error) {
//     console.error('Update blog error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const updateBlog = async (req, res) => {
  try {
    const { title, body, hashtags } = req.body;
    const imageFile = req.files?.image; // If user uploaded a new image

    // 1. Find the blog
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 2. Authorization check
    if (blog.author.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Not authorized to update this blog" });
    }

    // 3. Handle new image upload
    if (imageFile) {
      // Optional: remove old image from Cloudinary if needed
      if (blog.image) {
        try {
          const publicId = blog.image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(`blogs/${publicId}`);
        } catch (err) {
          console.warn("Old image removal failed:", err.message);
        }
      }

      const uploadResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: "blogs"
      });
      blog.image = uploadResult.secure_url;
    }

    // 4. Update fields
    blog.title = title || blog.title;
    blog.body = body || blog.body;
    blog.hashtags = typeof hashtags === "string"
      ? hashtags.split(",").map(tag => tag.trim())
      : (Array.isArray(hashtags) ? hashtags : blog.hashtags);
    blog.updatedAt = Date.now();

    // 5. Save & populate author details
    await blog.save();
    await blog.populate("author", "firstname lastname");

    res.json({
      message: "Blog updated successfully",
      blog
    });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// @desc    Delete blog
// @route   DELETE /api/blog/:id
// @access  Private
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user owns the blog
    if (blog.author.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search blogs by hashtags
// @route   GET /api/blog/search/hashtags
// @access  Public
const searchByHashtags = async (req, res) => {
  try {
    const { hashtags } = req.query;

    if (!hashtags) {
      return res.status(400).json({ message: 'Hashtags parameter is required' });
    }

    const hashtagArray = hashtags.split(',').map(tag => tag.trim());

    const blogs = await Blog.find({
      hashtags: { $in: hashtagArray }
    })
      .populate('author', 'firstname lastname')
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    console.error('Search by hashtags error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get trending blogs (blogs with most hashtags)
// @route   GET /api/blog/trending
// @access  Public
const getTrendingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      {
        $addFields: {
          hashtagCount: { $size: { $ifNull: ["$hashtags", []] } }
        }
      },
      {
        $sort: { hashtagCount: -1, createdAt: -1 }
      },
      {
        $limit: 10
      }
    ]);

    // Populate author details
    const populatedBlogs = await Blog.populate(blogs, {
      path: 'author',
      select: 'firstname lastname'
    });

    res.json(populatedBlogs);
  } catch (error) {
    console.error('Get trending blogs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getMyBlogs,
  updateBlog,
  deleteBlog,
  searchByHashtags,
  getTrendingBlogs
};
