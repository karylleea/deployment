# 🔥 Firestore Quick Reference

## 🎯 The Fastest Way to Get Started

### Open Console → Run One Command → Done!

```javascript
window.setupDefaultData()
```

**That's it!** This creates everything you need.

---

## 📦 What Gets Created

### 👨‍💼 Admin Account
- **Email:** admin@barangaybanus.com
- **Password:** Admin123!
- **Role:** admin
- **Status:** approved ✅
- **Access:** Full system access

### 👤 Test User
- **Email:** user@test.com
- **Password:** User123!
- **Role:** user
- **Status:** approved ✅
- **Access:** User features

### 👔 Officials (4 people)
1. Juan Dela Cruz - SK Chairman
2. Maria Santos - Barangay Captain
3. Pedro Reyes - SK Kagawad
4. Ana Garcia - SK Secretary

---

## 🎮 Console Commands Cheat Sheet

| Command | What It Does |
|---------|--------------|
| `window.setupDefaultData()` | 🚀 Create everything (recommended) |
| `window.checkAllFirestoreData()` | 🔍 See what's in Firestore |
| `window.createDefaultAdmin()` | 👨‍💼 Create admin only |
| `window.createTestUser()` | 👤 Create test user only |
| `window.createSampleOfficials()` | 👔 Create officials only |
| `window.checkFirestoreAccounts()` | 📋 List all users |
| `window.checkFirestoreOfficials()` | 📋 List all officials |

---

## 🚀 Quick Start Steps

### Step 1: Open Console
Press **F12** in your browser

### Step 2: Run Setup
```javascript
window.setupDefaultData()
```

### Step 3: Login
1. Go to http://localhost:5174
2. Click "Login"
3. Use: admin@barangaybanus.com / Admin123!

### Step 4: Explore
✅ You're in! Try all features.

---

## 🔍 Check Your Firestore Data

### See Everything
```javascript
window.checkAllFirestoreData()
```

**Output shows:**
- All users with their roles and status
- All officials with their positions
- Helpful tips if data is missing

---

## 🎯 Common Use Cases

### "I need to start fresh"
```javascript
// 1. Delete users in Firebase Console (Authentication)
// 2. Delete documents in Firestore
// 3. Run setup again
window.setupDefaultData()
```

### "I just need an admin account"
```javascript
window.createDefaultAdmin()
```

### "I need to test messaging"
```javascript
// Make sure you have officials
window.createSampleOfficials()
```

### "What accounts exist?"
```javascript
window.checkFirestoreAccounts()
```

---

## 📊 Firestore Collections Structure

### `users` Collection
```
users/
  └── {userId}/
      ├── firstName: string
      ├── lastName: string
      ├── email: string
      ├── age: number
      ├── birthdate: string
      ├── street: string
      ├── contactNumber: string
      ├── photoURL: string
      ├── isEligibleVoter: boolean
      ├── role: "admin" | "user"
      ├── status: "pending" | "approved" | "rejected"
      └── createdAt: string (ISO date)
```

### `officials` Collection
```
officials/
  └── {officialId}/
      ├── name: string
      ├── position: string
      ├── contact: string
      ├── email: string
      ├── photoURL: string
      └── createdAt: string (ISO date)
```

### `concerns` Collection
```
concerns/
  └── {concernId}/
      ├── title: string
      ├── description: string
      ├── category: string
      ├── userId: string
      ├── userName: string
      ├── status: "pending" | "in-progress" | "resolved" | "rejected"
      └── createdAt: string (ISO date)
```

### `messages` Collection
```
messages/
  └── {messageId}/
      ├── subject: string
      ├── message: string
      ├── senderId: string
      ├── senderName: string
      ├── recipientId: string
      ├── recipientName: string
      ├── status: "sent" | "read"
      ├── read: boolean
      ├── adminReply: string (optional)
      ├── repliedAt: string (optional)
      └── createdAt: string (ISO date)
```

---

## 🔒 Firestore Security Rules

### Development Rules (Permissive)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Production Rules (Secure)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    match /officials/{officialId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /concerns/{concernId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if resource.data.userId == request.auth.uid;
    }
    
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if resource.data.senderId == request.auth.uid || 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Email already in use" | Account exists. Try logging in or check: `window.checkFirestoreAccounts()` |
| "Permission denied" | Update Firestore security rules in Firebase Console |
| Commands not working | Refresh page (F5) and try again |
| Can't see officials | Run: `window.createSampleOfficials()` |
| Login fails | Check if user exists: `window.checkFirestoreAccounts()` |

---

## 📱 Firebase Console Links

### Your Project: banus-79d06

- **Dashboard:** https://console.firebase.google.com/project/banus-79d06
- **Authentication:** https://console.firebase.google.com/project/banus-79d06/authentication/users
- **Firestore:** https://console.firebase.google.com/project/banus-79d06/firestore
- **Storage:** https://console.firebase.google.com/project/banus-79d06/storage

---

## 💡 Pro Tips

1. **Always check first:** `window.checkAllFirestoreData()` before creating
2. **Keep console open:** See real-time feedback
3. **One command setup:** `window.setupDefaultData()` does everything
4. **Copy passwords:** Console shows them - save them!
5. **Refresh on errors:** F5 and try again

---

## 🎓 Understanding Firestore

### Firebase Authentication vs Firestore

**Firebase Authentication:**
- Handles login/logout
- Stores email and password
- Manages user sessions

**Firestore Database:**
- Stores user profile data
- Stores application data
- Stores relationships

**Both are needed!** Authentication for login, Firestore for data.

### Why Console Commands?

✅ **Fast** - One command vs many clicks  
✅ **Accurate** - No typos or missing fields  
✅ **Consistent** - Same setup every time  
✅ **Easy** - No Firebase Console navigation  
✅ **Complete** - Creates everything at once  

---

## 🚀 Ready?

Open console (F12) and run:

```javascript
window.setupDefaultData()
```

Then login at http://localhost:5174 with:
- **Email:** admin@barangaybanus.com
- **Password:** Admin123!

**Enjoy your app! 🎉**

---

## 📚 More Help

- **CONSOLE_COMMANDS.md** - Detailed command guide
- **QUICK_START.md** - Manual setup alternative
- **SETUP_GUIDE.md** - Comprehensive guide
- **DEFAULT_CREDENTIALS.md** - All default credentials
