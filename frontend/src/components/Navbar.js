import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" data-aos="fade-down">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h2>BlogApp</h2>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/blogs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Blogs
              </Link>
              <Link to="/my-blogs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                My Blogs
              </Link>
              <Link to="/create-blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Create Blog
              </Link>
            </>
          ) : (
            <Link to="/blogs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Blogs
            </Link>
          )}
          
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </div>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">
                Welcome, {user?.firstname}!
              </span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Signup
              </Link>
            </div>
          )}
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
