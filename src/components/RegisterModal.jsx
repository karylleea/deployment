import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/config';
import './Modal.css';

const STREETS = [
  'Masunurin',
  'Ilang-Ilang',
  'Linao',
  'Kaligtasan I',
  'Kaligtasan II',
  'Sampaguita',
  'Palayan'
];

function RegisterModal({ onClose, onSwitchToLogin }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    birthdate: '',
    street: '',
    contactNumber: '',
    photo: null
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError('Photo size should be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const age = parseInt(formData.age);
    if (age < 15 || age > 30) {
      setError('Age must be between 15 and 30 years old');
      return false;
    }
    if (!formData.birthdate || !formData.street || !formData.contactNumber) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!formData.photo) {
      setError('Please upload a photo');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateStep2()) return;

    setLoading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Upload photo
      const photoRef = ref(storage, `user-photos/${user.uid}`);
      await uploadBytes(photoRef, formData.photo);
      const photoURL = await getDownloadURL(photoRef);

      // Determine if eligible voter
      const age = parseInt(formData.age);
      const isEligibleVoter = age >= 18 && age <= 30;

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        age: age,
        birthdate: formData.birthdate,
        street: formData.street,
        contactNumber: formData.contactNumber,
        photoURL: photoURL,
        isEligibleVoter: isEligibleVoter,
        role: 'user',
        status: 'pending', // Admin needs to approve
        createdAt: new Date().toISOString()
      });

      alert('Registration successful! Please wait for admin approval.');
      onClose();
    } catch (err) {
      setError(err.message);
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
      <div className="modal-container modal-large">
        <div className="modal-header">
          <h2>Join Our Community</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <span>1</span>
              <label>Account Info</label>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <span>2</span>
              <label>Personal Details</label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {currentStep === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength="6"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary btn-full">
                Next Step
              </button>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Age * (15-30 years old)</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Your age"
                    required
                    min="15"
                    max="30"
                  />
                </div>
                <div className="form-group">
                  <label>Birthdate *</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Street *</label>
                <select
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your street</option>
                  {STREETS.map(street => (
                    <option key={street} value={street}>{street}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="09XXXXXXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label>Upload Photo * (Max 5MB)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  required
                />
                {photoPreview && (
                  <div className="photo-preview">
                    <img src={photoPreview} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}

          <div className="modal-footer">
            <p>Already have an account? <button className="link-button" onClick={onSwitchToLogin}>Sign in here</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;