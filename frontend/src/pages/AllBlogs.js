import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { fetchAllBlogs, searchByHashtags } from '../store/slices/blogSlice';
import './Blogs.css';

const AllBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  
  const dispatch = useDispatch();
  
  const { blogs, loading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchByHashtags(searchTerm));
    } else {
      dispatch(fetchAllBlogs());
    }
  };

  const handleHashtagClick = (hashtag) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter(tag => tag !== hashtag));
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag]);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get unique hashtags from all blogs
  const allHashtags = [...new Set(blogs.flatMap(blog => blog.hashtags || []))];

  return (
    <div className="blogs-page">
      <div className="container">
        {/* Header */}
        <section className="blogs-header" data-aos="fade-up">
          <h1>All Blogs</h1>
          <p>Discover amazing stories from our community of writers</p>
        </section>

        {/* Search and Filters */}
        <section className="search-section" data-aos="fade-up">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by hashtags (e.g., tech, lifestyle, travel)"
                className="search-input"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>

          {/* Popular Hashtags */}
          <div className="hashtags-section">
            <h3>Popular Topics</h3>
            <div className="hashtags-list">
              {allHashtags.slice(0, 10).map((hashtag, index) => (
                <button
                  key={index}
                  onClick={() => handleHashtagClick(hashtag)}
                  className={`hashtag-btn ${selectedHashtags.includes(hashtag) ? 'active' : ''}`}
                >
                  {hashtag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="blogs-section" data-aos="fade-up">
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="no-blogs">
              <h3>No blogs found</h3>
              <p>Try adjusting your search criteria or browse all blogs.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedHashtags([]);
                  dispatch(fetchAllBlogs());
                }}
                className="btn btn-primary"
              >
                View All Blogs
              </button>
            </div>
          ) : (
            <div className="blogs-grid">
              {blogs.map((blog) => (
                <NavLink className="blog-card" to={`/blog/${blog._id}`} key={blog._id}>
                  <div key={blog._id} className="blog-card" data-aos="fade-up">
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
                      <span className="blog-author">
                        By {blog.author?.firstname} {blog.author?.lastname}
                      </span>
                      <span className="blog-date">
                        {formatDate(blog.createdAt)}
                      </span>
                    </div>
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
                </div>
                </NavLink>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AllBlogs;
