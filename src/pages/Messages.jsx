import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import MessageModal from '../components/MessageModal';
import '../styles/Messages.css';

function Messages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const q = query(
        collection(db, 'messages'),
        where('senderId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );
      const messagesSnapshot = await getDocs(q);
      setMessages(messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMessageSuccess = () => {
    fetchMessages();
    alert('Message sent successfully!');
  };

  return (
    <div className="messages-container">
      <nav className="page-nav">
        <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
        <h2>Messages</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowMessageModal(true)}
        >
          + New Message
        </button>
      </nav>

      <div className="messages-content">
        <div className="message-history-section">
          <div className="section-header">
            <h1>My Messages</h1>
            <p>Communicate directly with barangay and SK officials</p>
          </div>
          
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <h3>No messages yet</h3>
              <p>Start a conversation with your barangay officials. Send your first message to get started.</p>
              <button 
                className="btn-primary"
                onClick={() => setShowMessageModal(true)}
              >
                Send Your First Message
              </button>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map(msg => (
                <div key={msg.id} className="message-card">
                  <div className="message-header">
                    <div className="message-info">
                      <span className="recipient">To: {msg.recipientName}</span>
                      <span className="subject">{msg.subject}</span>
                    </div>
                    <span className="message-date">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="message-text">{msg.message}</p>
                  
                  {msg.adminReply && (
                    <div className="admin-reply">
                      <div className="reply-header">
                        <span className="reply-label">Reply:</span>
                        <span className="reply-date">
                          {new Date(msg.repliedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="reply-text">{msg.adminReply}</p>
                    </div>
                  )}
                  
                  {!msg.adminReply && (
                    <span className="pending-reply">Waiting for response...</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showMessageModal && (
        <MessageModal 
          onClose={() => setShowMessageModal(false)}
          onSuccess={handleMessageSuccess}
        />
      )}
    </div>
  );
}

export default Messages;
