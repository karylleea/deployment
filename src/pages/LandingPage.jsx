import { useState } from 'react';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import '../styles/LandingPage.css';

function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const features = [
    {
      icon: '👥',
      title: 'Youth Profiling',
      description: 'Comprehensive database of youth residents for better community planning and engagement.'
    },
    {
      icon: '📋',
      title: 'Concern Management',
      description: 'Submit and track community concerns with transparent status updates and resolutions.'
    },
    {
      icon: '🏛️',
      title: 'Official Directory',
      description: 'Easy access to contact information and roles of barangay and SK officials.'
    },
    {
      icon: '💬',
      title: 'Direct Messaging',
      description: 'Communicate directly with officials for faster response to your needs.'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Data-driven insights for better decision making and community development.'
    },
    {
      icon: '🔒',
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security and privacy measures.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Registered Youth' },
    { number: '150+', label: 'Concerns Resolved' },
    { number: '24/7', label: 'System Availability' },
    { number: '99.9%', label: 'Uptime Guarantee' }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero-section">
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <span className="logo-icon">🏘️</span>
              <span className="logo-text">Barangay Banus SK</span>
            </div>
            <div className="nav-buttons">
              <button 
                className="btn-secondary"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
              <button 
                className="btn-primary"
                onClick={() => setShowRegisterModal(true)}
              >
                Register
              </button>
            </div>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Empowering Youth,
              <span className="gradient-text"> Building Community</span>
            </h1>
            <p className="hero-subtitle">
              The premier digital platform for Barangay Banus Sangguniang Kabataan. 
              Connect, engage, and make your voice heard in shaping our community's future.
            </p>
            <div className="info-banner">
              <span className="info-icon">ℹ️</span>
              <span>New here? Register to create your account and join our community!</span>
            </div>
            <div className="hero-buttons">
              <button 
                className="btn-primary btn-large"
                onClick={() => setShowRegisterModal(true)}
              >
                Join Our Community
              </button>
              <button 
                className="btn-outline btn-large"
                onClick={() => setShowLoginModal(true)}
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="card-content">
                <div className="dashboard-preview">
                  <div className="preview-header">
                    <div className="preview-avatar"></div>
                    <div className="preview-info">
                      <div className="preview-name"></div>
                      <div className="preview-role"></div>
                    </div>
                  </div>
                  <div className="preview-stats">
                    <div className="stat-item">
                      <div className="stat-number"></div>
                      <div className="stat-label"></div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number"></div>
                      <div className="stat-label"></div>
                    </div>
                  </div>
                  <div className="preview-chart">
                    <div className="chart-bar" style={{height: '60%'}}></div>
                    <div className="chart-bar" style={{height: '80%'}}></div>
                    <div className="chart-bar" style={{height: '40%'}}></div>
                    <div className="chart-bar" style={{height: '90%'}}></div>
                    <div className="chart-bar" style={{height: '70%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Comprehensive Youth Management Platform</h2>
            <p className="section-subtitle">
              Everything you need to engage with your community and make a difference
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join hundreds of youth making a difference in Barangay Banus
            </p>
            <div className="cta-buttons">
              <button 
                className="btn-primary btn-large"
                onClick={() => setShowRegisterModal(true)}
              >
                Create Account
              </button>
              <button 
                className="btn-outline btn-large"
                onClick={() => setShowLoginModal(true)}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🏘️</span>
                <span className="logo-text">Barangay Banus SK</span>
              </div>
              <p className="footer-description">
                Empowering youth through digital innovation and community engagement.
              </p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Barangay Banus SK Youth Profiling System. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}
      {showRegisterModal && (
        <RegisterModal 
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
}

export default LandingPage;