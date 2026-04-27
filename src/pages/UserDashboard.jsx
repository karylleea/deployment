import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import '../styles/Dashboard.css';

function UserDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h2>Barangay Banus SK</h2>
        <div className="nav-links">
          <button onClick={() => navigate('/dashboard')} className="active">Dashboard</button>
          <button onClick={() => navigate('/officials')}>Officials</button>
          <button onClick={() => navigate('/concerns')}>Raise Concern</button>
          <button onClick={() => navigate('/messages')}>Messages</button>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>Welcome, {userData?.firstName}!</h1>
        
        <div className="profile-card">
          <div className="profile-header">
            <img src={userData?.photoURL} alt="Profile" className="profile-photo" />
            <div className="profile-info">
              <h2>{userData?.firstName} {userData?.lastName}</h2>
              <p className="voter-status">
                {userData?.isEligibleVoter ? '✓ Eligible Voter' : 'Not Eligible to Vote'}
              </p>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <span className="label">Email:</span>
              <span>{userData?.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Age:</span>
              <span>{userData?.age} years old</span>
            </div>
            <div className="detail-item">
              <span className="label">Birthdate:</span>
              <span>{userData?.birthdate}</span>
            </div>
            <div className="detail-item">
              <span className="label">Street:</span>
              <span>{userData?.street}</span>
            </div>
            <div className="detail-item">
              <span className="label">Contact:</span>
              <span>{userData?.contactNumber}</span>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-cards">
            <div className="action-card" onClick={() => navigate('/officials')}>
              <h4>👥 View Officials</h4>
              <p>Browse barangay officials</p>
            </div>
            <div className="action-card" onClick={() => navigate('/concerns')}>
              <h4>📝 Raise Concern</h4>
              <p>Submit your concerns</p>
            </div>
            <div className="action-card" onClick={() => navigate('/messages')}>
              <h4>💬 Messages</h4>
              <p>Contact admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
