import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear form as specified in requirements
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return <>
    <div className="contact">
      <div className="container">
        {/* Hero Section */}
        <section className="contact-hero" data-aos="fade-up">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </section>

        <div className="contact-content">
          {/* Contact Info */}
          <section className="contact-info" data-aos="fade-up">
            <h2>Get in Touch</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">📧</div>
                <h3>Email</h3>
                <p>info@blogapp.com</p>
                <p>support@blogapp.com</p>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>Mon-Fri 9AM-6PM EST</p>
              </div>
              <div className="info-item">
                <div className="info-icon">📍</div>
                <h3>Address</h3>
                <p>123 Blog Street</p>
                <p>Content City, CC 12345</p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="contact-form-section" data-aos="fade-up">
            <div className="form-container">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    rows="6"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section className="faq-section" data-aos="fade-up">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I create an account?</h3>
              <p>Click on the "Sign Up" button in the navigation bar and fill out the registration form with your details.</p>
            </div>
            <div className="faq-item">
              <h3>How do I create a blog post?</h3>
              <p>After logging in, click on "Create Blog" in the navigation menu and fill out the blog form with your content.</p>
            </div>
            <div className="faq-item">
              <h3>Can I edit my blog posts?</h3>
              <p>Yes, you can edit your own blog posts by going to "My Blogs" and clicking the edit button on any of your posts.</p>
            </div>
            <div className="faq-item">
              <h3>How do I add hashtags to my blog?</h3>
              <p>When creating or editing a blog post, you can add hashtags in the hashtags field. Separate multiple hashtags with commas.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </>
};

export default Contact;
