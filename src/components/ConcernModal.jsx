import { useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import './Modal.css';

function ConcernModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Infrastructure',
    'Health & Sanitation',
    'Peace & Order',
    'Youth Programs',
    'Education',
    'Other'
  ];

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
      // Get user data for name
      const userDoc = await getDocs(collection(db, 'users'));
      const currentUser = userDoc.docs.find(doc => doc.id === auth.currentUser.uid);
      const userData = currentUser.data();

      await addDoc(collection(db, 'concerns'), {
        ...formData,
        userId: auth.currentUser.uid,
        userName: `${userData.firstName} ${userData.lastName}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to submit concern. Please try again.');
      console.error(err);
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
          <h2>Submit a Concern</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief title of your concern"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your concern in detail..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Concern'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConcernModal;