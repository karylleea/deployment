import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch pending users
      const pendingQuery = query(collection(db, 'users'), where('status', '==', 'pending'));
      const pendingSnapshot = await getDocs(pendingQuery);
      setPendingUsers(pendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch all users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      setAllUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch concerns
      const concernsSnapshot = await getDocs(collection(db, 'concerns'));
      setConcerns(concernsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch messages
      const messagesSnapshot = await getDocs(collection(db, 'messages'));
      setMessages(messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        status: 'approved'
      });
      alert('User approved successfully');
      fetchData();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleRejectUser = async (userId) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        status: 'rejected'
      });
      alert('User rejected');
      fetchData();
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

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
    <div className="admin-container">
      <nav className="admin-nav">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </nav>

      <div className="admin-content">
        <div className="tabs">
          <button 
            className={activeTab === 'pending' ? 'active' : ''} 
            onClick={() => setActiveTab('pending')}
          >
            Pending Approvals ({pendingUsers.length})
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            All Users ({allUsers.length})
          </button>
          <button 
            className={activeTab === 'concerns' ? 'active' : ''} 
            onClick={() => setActiveTab('concerns')}
          >
            Concerns ({concerns.length})
          </button>
          <button 
            className={activeTab === 'messages' ? 'active' : ''} 
            onClick={() => setActiveTab('messages')}
          >
            Messages ({messages.length})
          </button>
        </div>

        {activeTab === 'pending' && (
          <div className="pending-users">
            <h3>Pending User Approvals</h3>
            {pendingUsers.length === 0 ? (
              <p>No pending approvals</p>
            ) : (
              <div className="users-grid">
                {pendingUsers.map(user => (
                  <div key={user.id} className="user-card">
                    <img src={user.photoURL} alt={user.firstName} />
                    <h4>{user.firstName} {user.lastName}</h4>
                    <p>Age: {user.age}</p>
                    <p>Street: {user.street}</p>
                    <p>Email: {user.email}</p>
                    <p>Contact: {user.contactNumber}</p>
                    <p className={user.isEligibleVoter ? 'eligible' : 'not-eligible'}>
                      {user.isEligibleVoter ? 'Eligible Voter' : 'Not Eligible'}
                    </p>
                    <div className="card-actions">
                      <button 
                        className="btn-approve" 
                        onClick={() => handleApproveUser(user.id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn-reject" 
                        onClick={() => handleRejectUser(user.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="all-users">
            <h3>All Registered Users</h3>
            <div className="users-grid">
              {allUsers.filter(u => u.role !== 'admin').map(user => (
                <div key={user.id} className="user-card">
                  <img src={user.photoURL} alt={user.firstName} />
                  <h4>{user.firstName} {user.lastName}</h4>
                  <p>Age: {user.age}</p>
                  <p>Street: {user.street}</p>
                  <p>Status: <span className={`status-${user.status}`}>{user.status}</span></p>
                  <p className={user.isEligibleVoter ? 'eligible' : 'not-eligible'}>
                    {user.isEligibleVoter ? 'Eligible Voter' : 'Not Eligible'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'concerns' && (
          <div className="concerns-list">
            <h3>User Concerns</h3>
            {concerns.length === 0 ? (
              <p>No concerns submitted</p>
            ) : (
              concerns.map(concern => (
                <div key={concern.id} className="concern-card">
                  <h4>{concern.title}</h4>
                  <p>{concern.description}</p>
                  <small>From: {concern.userName} | {new Date(concern.createdAt).toLocaleString()}</small>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages-list">
            <h3>User Messages</h3>
            {messages.length === 0 ? (
              <p>No messages</p>
            ) : (
              messages.map(message => (
                <div key={message.id} className="message-card">
                  <p><strong>From:</strong> {message.userName}</p>
                  <p>{message.message}</p>
                  <small>{new Date(message.createdAt).toLocaleString()}</small>
                  {message.adminReply && (
                    <div className="admin-reply">
                      <strong>Admin Reply:</strong>
                      <p>{message.adminReply}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
