import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" data-aos="fade-up">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BlogApp</h3>
            <p>Share your stories, connect with others, and explore amazing content from around the world.</p>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><a href="/blogs?hashtags=tech">Technology</a></li>
              <li><a href="/blogs?hashtags=lifestyle">Lifestyle</a></li>
              <li><a href="/blogs?hashtags=travel">Travel</a></li>
              <li><a href="/blogs?hashtags=food">Food</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📧 info@blogapp.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Blog Street, Content City</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} BlogApp. All rights reserved. | BCA Project</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
