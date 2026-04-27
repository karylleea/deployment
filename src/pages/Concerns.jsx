import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import ConcernModal from '../components/ConcernModal';
import '../styles/Concerns.css';

function Concerns() {
  const navigate = useNavigate();
  const [myConcerns, setMyConcerns] = useState([]);
  const [showConcernModal, setShowConcernModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Infrastructure',
    'Health & Sanitation',
    'Peace & Order',
    'Youth Programs',
    'Education',
    'Other'
  ];

  useEffect(() => {
    fetchMyConcerns();
  }, []);

  const fetchMyConcerns = async () => {
    try {
      const q = query(
        collection(db, 'concerns'),
        where('userId', '==', auth.currentUser.uid)
      );
      const concernsSnapshot = await getDocs(q);
      setMyConcerns(concernsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching concerns:', error);
    }
  };

  const handleConcernSuccess = () => {
    fetchMyConcerns();
    alert('Concern submitted successfully!');
  };

  return (
    <div className="concerns-container">
      <nav className="page-nav">
        <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
        <h2>My Concerns</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowConcernModal(true)}
        >
          + New Concern
        </button>
      </nav>

      <div className="concerns-content">
        <div className="my-concerns-section">
          <div className="section-header">
            <h1>My Submitted Concerns</h1>
            <p>Track the status of your submitted concerns and their resolutions</p>
          </div>
          
          {myConcerns.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No concerns submitted yet</h3>
              <p>Have an issue or suggestion? Submit your first concern to get started.</p>
              <button 
                className="btn-primary"
                onClick={() => setShowConcernModal(true)}
              >
                Submit Your First Concern
              </button>
            </div>
          ) : (
            <div className="concerns-list">
              {myConcerns.map(concern => (
                <div key={concern.id} className="concern-card">
                  <div className="concern-header">
                    <span className={`status-badge ${concern.status}`}>
                      {concern.status}
                    </span>
                    <small className="date">
                      {new Date(concern.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <h3>{concern.title}</h3>
                  <p className="category">{concern.category}</p>
                  <p className="description">{concern.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showConcernModal && (
        <ConcernModal 
          onClose={() => setShowConcernModal(false)}
          onSuccess={handleConcernSuccess}
        />
      )}
    </div>
  );
}

export default Concerns;
