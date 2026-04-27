import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Officials from './pages/Officials';
import Concerns from './pages/Concerns';
import Messages from './pages/Messages';
import './App.css';

// Import utilities for browser console
import { checkFirestoreAccounts, checkFirestoreOfficials, checkAllFirestoreData } from './utils/checkFirestoreAccounts';
import { createDefaultAdmin, createTestUser, createSampleOfficials, setupDefaultData } from './utils/createDefaultData';

// Make utilities available in browser console
if (typeof window !== 'undefined') {
  window.checkFirestoreAccounts = checkFirestoreAccounts;
  window.checkFirestoreOfficials = checkFirestoreOfficials;
  window.checkAllFirestoreData = checkAllFirestoreData;
  window.createDefaultAdmin = createDefaultAdmin;
  window.createTestUser = createTestUser;
  window.createSampleOfficials = createSampleOfficials;
  window.setupDefaultData = setupDefaultData;
  
  // Show helpful message in console
  console.log('%c🎉 Barangay Banus SK Youth Profiling System', 'font-size: 16px; font-weight: bold; color: #667eea;');
  console.log('%c💡 Helpful Commands:', 'font-size: 14px; font-weight: bold; color: #333;');
  console.log('%c   window.checkAllFirestoreData()     %c- Check all data in Firestore', 'color: #667eea;', 'color: #666;');
  console.log('%c   window.setupDefaultData()          %c- Create admin, user & officials', 'color: #667eea;', 'color: #666;');
  console.log('%c   window.createDefaultAdmin()        %c- Create admin account only', 'color: #667eea;', 'color: #666;');
  console.log('%c   window.createTestUser()            %c- Create test user only', 'color: #667eea;', 'color: #666;');
  console.log('%c   window.createSampleOfficials()     %c- Create sample officials', 'color: #667eea;', 'color: #666;');
  console.log(' ');
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={user ? <UserDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin" 
          element={user ? <AdminDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/officials" 
          element={user ? <Officials /> : <Navigate to="/" />} 
        />
        <Route 
          path="/concerns" 
          element={user ? <Concerns /> : <Navigate to="/" />} 
        />
        <Route 
          path="/messages" 
          element={user ? <Messages /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
