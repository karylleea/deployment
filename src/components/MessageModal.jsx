import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import './Modal.css';

function MessageModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    recipientId: '',
    subject: '',
    message: ''
  });
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOfficials();
  }, []);

  const fetchOfficials = async () => {
    try {
      const officialsSnapshot = await getDocs(collection(db, 'officials'));
      setOfficials(officialsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching officials:', error);
    }
  };

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
      // Get user data for sender name
      const userDoc = await getDocs(collection(db, 'users'));
      const currentUser = userDoc.docs.find(doc => doc.id === auth.currentUser.uid);
      const userData = currentUser.data();

      // Get recipient data
      const selectedOfficial = officials.find(official => official.id === formData.recipientId);

      await addDoc(collection(db, 'messages'), {
        ...formData,
        senderId: auth.currentUser.uid,
        senderName: `${userData.firstName} ${userData.lastName}`,
        recipientName: selectedOfficial.name,
        status: 'sent',
        createdAt: new Date().toISOString(),
        read: false
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to send message. Please try again.');
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
          <h2>Send Message</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Send to *</label>
              <select
                name="recipientId"
                value={formData.recipientId}
                onChange={handleChange}
                required
              >
                <option value="">Select an official</option>
                {officials.map(official => (
                  <option key={official.id} value={official.id}>
                    {official.name} - {official.position}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter message subject"
                required
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows="6"
                required
              />
            </div>

            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;