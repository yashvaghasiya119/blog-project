import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyBlogs, deleteBlog } from '../store/slices/blogSlice';
import { toast } from 'react-toastify';
import './MyBlogs.css';

const MyBlogs = () => {
  const dispatch = useDispatch();
  const { myBlogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchMyBlogs());
  }, [dispatch]);

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await dispatch(deleteBlog(blogId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="my-blogs">
      <div className="container">
        {/* Header */}
        <div className="my-blogs-header" data-aos="fade-up">
          <h1>My Blogs</h1>
          <p>Manage your blog posts and create new content</p>
          <Link to="/create-blog" className="btn btn-primary">
            Create New Blog
          </Link>
        </div>

        {/* Blogs List */}
        <div className="my-blogs-content" data-aos="fade-up">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading your blogs...</p>
            </div>
          ) : myBlogs.length === 0 ? (
            <div className="no-blogs">
              <h3>No blogs yet</h3>
              <p>Start writing your first blog post!</p>
              <Link to="/create-blog" className="btn btn-primary">
                Create Your First Blog
              </Link>
            </div>
          ) : (
            <div className="my-blogs-grid">
              {myBlogs.map((blog) => (
                <div key={blog._id} className="my-blog-card">
                  {blog.image && (
                    <div className="blog-image">
                      <img src={blog.image} alt={blog.title} />
                    </div>
                  )}
                  <div className="blog-content">
                    <h3 className="blog-title">
                      <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                    </h3>
                    <p className="blog-excerpt">
                      {blog.body.length > 150 
                        ? `${blog.body.substring(0, 150)}...` 
                        : blog.body
                      }
                    </p>
                    <div className="blog-meta">
                      <span className="blog-date">
                        {formatDate(blog.createdAt)}
                      </span>
                      {blog.hashtags && blog.hashtags.length > 0 && (
                        <div className="blog-hashtags">
                          {blog.hashtags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="hashtag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="blog-actions">
                      <Link to={`/edit-blog/${blog._id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
