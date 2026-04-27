import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import './Modal.css';

function LoginModal({ onClose, onSwitchToRegister }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        if (userData.status === 'pending') {
          setError('Your account is pending admin approval');
          await auth.signOut();
          return;
        }

        if (userData.status === 'rejected') {
          setError('Your account has been rejected. Please contact the admin.');
          await auth.signOut();
          return;
        }

        // Close modal and redirect based on role
        onClose();
        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('User data not found');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Provide more specific error messages
      if (err.code === 'auth/configuration-not-found') {
        setError('⚠️ Firebase Authentication is not enabled. Please check FIX_AUTH_ERROR.md for setup instructions.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('⚠️ Email/Password sign-in is not enabled in Firebase Console.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Please register first or run window.setupDefaultData() in console.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else if (err.code === 'auth/user-disabled') {
        setError('This account has been disabled.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please check your email and password.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>Welcome Back</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="modal-footer">
            <p>Don't have an account? <button className="link-button" onClick={onSwitchToRegister}>Create one here</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;