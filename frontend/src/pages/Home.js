import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrendingBlogs } from '../store/slices/blogSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { trendingBlogs, loading } = useSelector((state) => state.blog);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTrendingBlogs());
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" data-aos="fade-up">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Share Your Stories, <br />
              <span className="gradient-text">Connect with the World</span>
            </h1>
            <p className="hero-subtitle">
              Join our community of writers and readers. Share your thoughts, experiences, 
              and insights with people around the globe.
            </p>
            <div className="hero-buttons">
              {isAuthenticated ? (
                <Link to="/create-blog" className="btn btn-primary">
                  Create Your First Blog
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary">
                    Get Started
                  </Link>
                  <Link to="/blogs" className="btn btn-secondary">
                    Explore Blogs
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">Why Choose BlogApp?</h2>
          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon">✍️</div>
              <h3>Easy Writing</h3>
              <p>Create beautiful blog posts with our intuitive editor. Add images, hashtags, and format your content easily.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon">🌍</div>
              <h3>Global Reach</h3>
              <p>Connect with readers from around the world. Share your stories and discover amazing content from others.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon">💬</div>
              <h3>Engage & Discuss</h3>
              <p>Build meaningful conversations through comments. Engage with your audience and other writers.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon">🔍</div>
              <h3>Discover Content</h3>
              <p>Find content that interests you through hashtags and trending topics. Never run out of great reads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Blogs Section */}
      <section className="trending" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trending Stories</h2>
            <Link to="/blogs" className="view-all-link">View All Blogs</Link>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading trending blogs...</p>
            </div>
          ) : (
            <div className="blogs-grid">
              {trendingBlogs.slice(0, 6).map((blog) => (
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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" data-aos="fade-up">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Share Your Story?</h2>
            <p>Join thousands of writers who are already sharing their experiences and insights.</p>
            {isAuthenticated ? (
              <Link to="/create-blog" className="btn btn-primary">
                Start Writing
              </Link>
            ) : (
              <Link to="/signup" className="btn btn-primary">
                Join Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
