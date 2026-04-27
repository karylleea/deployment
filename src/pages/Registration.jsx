import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/config';
import '../styles/Registration.css';

const STREETS = [
  'Masunurin',
  'Ilang-Ilang',
  'Linao',
  'Kaligtasan I',
  'Kaligtasan II',
  'Sampaguita',
  'Palayan'
];

function Registration() {
  const navigate = useNavigate();
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const age = parseInt(formData.age);
    if (age < 15 || age > 30) {
      setError('Age must be between 15 and 30 years old to register');
      return;
    }

    if (!formData.photo) {
      setError('Please upload a photo');
      return;
    }

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
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1>Youth Registration</h1>
        <p className="subtitle">Barangay Banus SK Youth Profiling System</p>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
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
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age * (15-30 years old)</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
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
              <option value="">Select Street</option>
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
              required
              placeholder="09XXXXXXXXX"
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

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
