import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../store/slices/blogSlice';
import './BlogForm.css';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    hashtags: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.blog);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
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

      const result = await dispatch(createBlog({ blogData, imageFile }));
      if (createBlog.fulfilled.match(result)) {
        navigate('/my-blogs');
      }
    }
  };

  return (
    <div className="blog-form-container">
      <div className="container">
        <div className="blog-form-header" data-aos="fade-up">
          <h1>Create New Blog</h1>
          <p>Share your thoughts and experiences with the world</p>
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
              <label htmlFor="image" className="form-label">Blog Image (Optional)</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-control"
              />
              <small className="form-help">
                Upload an image file (JPG, PNG, GIF). Max size: 5MB
              </small>
              
              {imagePreview && (
                <div className="image-preview-container">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="image-preview"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="btn btn-sm btn-danger remove-image-btn"
                  >
                    Remove Image
                  </button>
                </div>
              )}
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
                {loading ? 'Creating...' : 'Create Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
