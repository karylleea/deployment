import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/Officials.css';

function Officials() {
  const navigate = useNavigate();
  const [officials, setOfficials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfficials();
  }, []);

  const fetchOfficials = async () => {
    try {
      const officialsSnapshot = await getDocs(collection(db, 'officials'));
      setOfficials(officialsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching officials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="officials-container">
      <nav className="page-nav">
        <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
        <h2>Barangay Officials</h2>
      </nav>

      <div className="officials-content">
        <h1>Barangay Banus Officials</h1>
        
        {officials.length === 0 ? (
          <p className="no-data">No officials data available</p>
        ) : (
          <div className="officials-grid">
            {officials.map(official => (
              <div key={official.id} className="official-card">
                <img 
                  src={official.photoURL || '/default-avatar.png'} 
                  alt={official.name} 
                  className="official-photo"
                />
                <h3>{official.name}</h3>
                <p className="position">{official.position}</p>
                {official.contact && <p className="contact">📞 {official.contact}</p>}
                {official.email && <p className="email">✉️ {official.email}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Officials;
