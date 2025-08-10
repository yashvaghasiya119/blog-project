import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero" data-aos="fade-up">
          <h1>About BlogApp</h1>
          <p>Empowering writers to share their stories with the world</p>
        </section>

        {/* Mission Section */}
        <section className="mission-section" data-aos="fade-up">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At BlogApp, we believe that everyone has a story worth sharing. Our mission is to provide 
              a platform where writers can express themselves freely, connect with readers globally, and 
              build meaningful communities around shared interests and experiences.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section" data-aos="fade-up">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card" data-aos="fade-up" data-aos-delay="100">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>We foster a supportive community where writers and readers can connect, engage, and grow together.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="200">
              <div className="value-icon">✨</div>
              <h3>Creativity</h3>
              <p>We encourage creative expression and provide tools that help writers bring their ideas to life.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="300">
              <div className="value-icon">🌍</div>
              <h3>Diversity</h3>
              <p>We celebrate diverse voices and perspectives, creating a platform that reflects the richness of human experience.</p>
            </div>
            <div className="value-card" data-aos="fade-up" data-aos-delay="400">
              <div className="value-icon">🔒</div>
              <h3>Privacy</h3>
              <p>We respect your privacy and ensure that your personal information and content are protected.</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section" data-aos="fade-up">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member" data-aos="fade-up" data-aos-delay="100">
              <div className="member-avatar">👨‍💻</div>
              <h3>John Doe</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">
                Passionate about technology and storytelling. Believes in the power of words to change the world.
              </p>
            </div>
            <div className="team-member" data-aos="fade-up" data-aos-delay="200">
              <div className="member-avatar">👩‍🎨</div>
              <h3>Jane Smith</h3>
              <p className="member-role">Head of Design</p>
              <p className="member-bio">
                Creative designer focused on creating beautiful and intuitive user experiences.
              </p>
            </div>
            <div className="team-member" data-aos="fade-up" data-aos-delay="300">
              <div className="member-avatar">👨‍🔬</div>
              <h3>Mike Johnson</h3>
              <p className="member-role">Lead Developer</p>
              <p className="member-bio">
                Full-stack developer with expertise in modern web technologies and scalable systems.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section" data-aos="fade-up">
          <div className="stats-grid">
            <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Writers</div>
            </div>
            <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Blog Posts</div>
            </div>
            <div className="stat-card" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-number">100K+</div>
              <div className="stat-label">Readers</div>
            </div>
            <div className="stat-card" data-aos="fade-up" data-aos-delay="400">
              <div className="stat-number">150+</div>
              <div className="stat-label">Countries</div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="contact-cta" data-aos="fade-up">
          <h2>Get in Touch</h2>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
          <a href="/contact" className="btn btn-primary">Contact Us</a>
        </section>
      </div>
    </div>
  );
};

export default About;
