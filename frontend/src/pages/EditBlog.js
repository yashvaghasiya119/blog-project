import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleBlog, updateBlog } from '../store/slices/blogSlice';
import './BlogForm.css';

const EditBlog = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: '',
    hashtags: ''
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleBlog, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleBlog) {
      setFormData({
        title: singleBlog.title || '',
        body: singleBlog.body || '',
        image: singleBlog.image || '',
        hashtags: singleBlog.hashtags ? singleBlog.hashtags.join(', ') : ''
      });
    }
  }, [singleBlog]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Blog content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const blogData = {
        ...formData,
        hashtags: formData.hashtags
          ? formData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag)
          : []
      };

      const result = await dispatch(updateBlog({ blogId: id, blogData }));
      if (updateBlog.fulfilled.match(result)) {
        navigate('/my-blogs');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!singleBlog) {
    return (
      <div className="error-container">
        <h2>Blog not found</h2>
        <p>The blog you're trying to edit doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="blog-form-container">
      <div className="container">
        <div className="blog-form-header" data-aos="fade-up">
          <h1>Edit Blog</h1>
          <p>Update your blog post</p>
        </div>

        <div className="blog-form-card" data-aos="fade-up">
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Blog Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-control ${errors.title ? 'error' : ''}`}
                placeholder="Enter your blog title"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="image" className="form-label">Image URL (Optional)</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter image URL from Cloudinary or other image hosting service"
              />
              <small className="form-help">
                You can upload an image to Cloudinary and paste the URL here
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="hashtags" className="form-label">Hashtags (Optional)</label>
              <input
                type="text"
                id="hashtags"
                name="hashtags"
                value={formData.hashtags}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter hashtags separated by commas (e.g., tech, lifestyle, travel)"
              />
              <small className="form-help">
                Separate multiple hashtags with commas
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="body" className="form-label">Blog Content</label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                className={`form-control ${errors.body ? 'error' : ''}`}
                rows="12"
                placeholder="Write your blog content here..."
              ></textarea>
              {errors.body && <span className="error-message">{errors.body}</span>}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
