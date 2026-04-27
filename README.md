# 🏘️ Barangay Banus SK Youth Profiling System

A modern, premium web application for managing youth profiles, concerns, and communications in Barangay Banus.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![Firebase](https://img.shields.io/badge/firebase-enabled-orange)
![React](https://img.shields.io/badge/react-18.2.0-blue)

---

## 🚨 IMPORTANT: First Time Setup

### You're seeing a 400 error? Here's the fix:

**The error `auth/configuration-not-found` means Firebase Authentication is not enabled yet.**

### Quick Fix (2 minutes):

1. **Enable Authentication:**
   - Go to: https://console.firebase.google.com/project/banus-79d06/authentication
   - Click "Get Started"
   - Enable "Email/Password" sign-in method

2. **Create Accounts:**
   - Open browser console (F12)
   - Run: `window.setupDefaultData()`

3. **Login:**
   - Go to http://localhost:5174
   - Email: admin@barangaybanus.com
   - Password: Admin123!

**📖 Detailed instructions:** See `FIX_AUTH_ERROR.md` or `SETUP_CHECKLIST.md`

---

## ✨ Features

### 🎨 Premium Landing Page
- Modern gradient design with animations
- Hero section with compelling CTAs
- Feature showcase and statistics
- Fully responsive design

### 🔐 Authentication System
- Email/password authentication
- Two-step registration with progress indicator
- Role-based access (Admin/User)
- Account approval workflow

### 👥 User Management
- Youth profile registration (ages 15-30)
- Photo upload capability
- Street-based organization
- Voter eligibility tracking

### 📋 Concerns Management
- Submit community concerns via modal
- Category-based organization
- Status tracking (pending/in-progress/resolved/rejected)
- User-specific concern history

### 💬 Messaging System
- Direct messaging to officials via modal
- Message history tracking
- Admin reply functionality
- Read/unread status

### 👔 Officials Directory
- View barangay and SK officials
- Contact information
- Position and role display

### 📊 Admin Dashboard
- User approval/rejection
- Concern management
- Message responses
- Analytics and statistics

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Firebase project (already configured)
- Modern web browser

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App will run at: http://localhost:5174

### First Time Setup

Follow the **SETUP_CHECKLIST.md** for a complete walkthrough, or:

1. **Enable Firebase Authentication** (REQUIRED)
   - See: `FIX_AUTH_ERROR.md`

2. **Create Default Accounts**
   ```javascript
   // Open browser console (F12)
   window.setupDefaultData()
   ```

3. **Login and Explore**
   - Email: admin@barangaybanus.com
   - Password: Admin123!

---

## 📚 Documentation

### Quick Start Guides
- **START_HERE.md** - Start here for quickest setup
- **SETUP_CHECKLIST.md** - Step-by-step checklist
- **FIX_AUTH_ERROR.md** - Fix authentication errors
- **QUICK_START.md** - 2-minute manual setup

### Reference Guides
- **CONSOLE_COMMANDS.md** - Browser console commands
- **FIRESTORE_QUICK_REFERENCE.md** - Database structure
- **DEFAULT_CREDENTIALS.md** - Default login credentials
- **README_NEW_FEATURES.md** - New features overview
- **SETUP_GUIDE.md** - Comprehensive setup guide

---

## 🎮 Browser Console Commands

Open console (F12) and use these helpful commands:

```javascript
// Create everything at once (recommended)
window.setupDefaultData()

// Check what's in Firestore
window.checkAllFirestoreData()

// Create admin only
window.createDefaultAdmin()

// Create test user only
window.createTestUser()

// Create officials only
window.createSampleOfficials()

// Check users
window.checkFirestoreAccounts()

// Check officials
window.checkFirestoreOfficials()
```

---

## 🔑 Default Credentials

### Admin Account
- **Email:** admin@barangaybanus.com
- **Password:** Admin123!
- **Access:** Full system access

### Test User
- **Email:** user@test.com
- **Password:** User123!
- **Access:** User features only

---

## 🏗️ Tech Stack

- **Frontend:** React 18.2.0
- **Routing:** React Router DOM 6.20.1
- **Backend:** Firebase
  - Authentication
  - Firestore Database
  - Cloud Storage
- **Styling:** Custom CSS with modern features
  - CSS Grid & Flexbox
  - CSS Animations
  - Gradient backgrounds
  - Glass morphism effects

---

## 📁 Project Structure

```
barangay-banus-youth-profiling/
├── src/
│   ├── components/          # Reusable components
│   │   ├── LoginModal.jsx
│   │   ├── RegisterModal.jsx
│   │   ├── ConcernModal.jsx
│   │   ├── MessageModal.jsx
│   │   └── Modal.css
│   ├── pages/              # Page components
│   │   ├── LandingPage.jsx
│   │   ├── Login.jsx
│   │   ├── Registration.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Concerns.jsx
│   │   ├── Messages.jsx
│   │   └── Officials.jsx
│   ├── styles/             # Page-specific styles
│   │   ├── LandingPage.css
│   │   ├── Concerns.css
│   │   ├── Messages.css
│   │   └── ...
│   ├── firebase/           # Firebase configuration
│   │   └── config.js
│   ├── utils/              # Utility functions
│   │   ├── checkFirestoreAccounts.js
│   │   └── createDefaultData.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── Documentation files     # Setup and reference guides
└── package.json           # Dependencies
```

---

## 🗄️ Firestore Collections

### `users`
User profiles and authentication data
- firstName, lastName, email
- age, birthdate, street
- contactNumber, photoURL
- role (admin/user)
- status (pending/approved/rejected)
- isEligibleVoter

### `officials`
Barangay and SK officials
- name, position
- contact, email
- photoURL

### `concerns`
Community concerns submitted by users
- title, description, category
- userId, userName
- status (pending/in-progress/resolved/rejected)

### `messages`
Messages between users and officials
- subject, message
- senderId, senderName
- recipientId, recipientName
- adminReply, read status

---

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface
- **Gradient Backgrounds** - Purple/blue color scheme
- **Smooth Animations** - Slide, fade, and hover effects
- **Glass Morphism** - Translucent elements with blur
- **Responsive Design** - Works on all screen sizes
- **Modal System** - Non-intrusive form interactions
- **Empty States** - Helpful messages when no data
- **Loading States** - Visual feedback during operations

---

## 🔒 Security

### Authentication
- Firebase Authentication for secure login
- Password requirements (min 6 characters)
- Session management

### Authorization
- Role-based access control (Admin/User)
- Account approval workflow
- Firestore security rules

### Data Protection
- User data validation
- Secure file uploads
- Protected API endpoints

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy
```

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| 400 Error on login | Enable Firebase Authentication |
| "auth/configuration-not-found" | See `FIX_AUTH_ERROR.md` |
| "Email already in use" | Account exists, try logging in |
| "User data not found" | Run `window.setupDefaultData()` |
| "Permission denied" | Update Firestore security rules |
| Photo upload fails | Check Storage security rules |
| No officials in dropdown | Run `window.createSampleOfficials()` |

### Getting Help

1. Check browser console for errors
2. Review documentation files
3. Run `window.checkAllFirestoreData()` to verify setup
4. Check Firebase Console for configuration issues

---

## 📊 Development Status

- ✅ Landing page with premium design
- ✅ Authentication system
- ✅ User registration with photo upload
- ✅ Admin dashboard
- ✅ User dashboard
- ✅ Concerns management with modals
- ✅ Messaging system with modals
- ✅ Officials directory
- ✅ Role-based access control
- ✅ Responsive design
- ✅ Browser console utilities

---

## 🎯 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] Export data to PDF/Excel
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app version

---

## 📝 License

This project is for Barangay Banus SK use.

---

## 👥 Credits

Developed for Barangay Banus Sangguniang Kabataan

---

## 🆘 Need Help?

### Quick Links
- **Setup Issues:** See `SETUP_CHECKLIST.md`
- **Auth Errors:** See `FIX_AUTH_ERROR.md`
- **Console Commands:** See `CONSOLE_COMMANDS.md`
- **Firestore Help:** See `FIRESTORE_QUICK_REFERENCE.md`

### Firebase Console
- **Project:** https://console.firebase.google.com/project/banus-79d06
- **Authentication:** https://console.firebase.google.com/project/banus-79d06/authentication
- **Firestore:** https://console.firebase.google.com/project/banus-79d06/firestore

---

## 🎉 Ready to Start?

1. **Enable Authentication** - See `FIX_AUTH_ERROR.md`
2. **Run Setup Command** - `window.setupDefaultData()`
3. **Login** - admin@barangaybanus.com / Admin123!
4. **Explore** - Try all features!

**Your premium youth profiling system is ready! 🚀**
