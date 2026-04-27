# Setup Guide - Barangay Banus SK Youth Profiling System

## 🚀 Quick Start

Your Firebase project is configured and the app is running at **http://localhost:5174**

## ⚠️ Important: Create Your First Account

Since this is a fresh Firebase project, you need to create accounts first. Here are your options:

### Option 1: Register Through the App (Recommended)
1. Open http://localhost:5174
2. Click the **"Register"** button on the landing page
3. Fill in the registration form with your details
4. Upload a photo
5. Click **"Create Account"**
6. You'll see: "Registration successful! Please wait for admin approval."

**Next Step:** Approve your account in Firebase Console:
1. Go to https://console.firebase.google.com/
2. Select your project: **banus-79d06**
3. Go to **Firestore Database**
4. Find the `users` collection
5. Find your user document
6. Edit the document and change `status: "pending"` to `status: "approved"`
7. Change `role: "user"` to `role: "admin"` (if you want admin access)
8. Save the changes
9. Now you can login!

### Option 2: Create Admin Account via Firebase Console

#### Step 1: Create Authentication User
1. Go to https://console.firebase.google.com/
2. Select project: **banus-79d06**
3. Go to **Authentication** → **Users** tab
4. Click **"Add user"**
5. Enter:
   - Email: `admin@barangaybanus.com`
   - Password: `Admin123!`
6. Click **"Add user"**
7. Copy the **User UID** (you'll need this)

#### Step 2: Create Firestore User Document
1. Go to **Firestore Database**
2. Click **"Start collection"** (if no collections exist) or find the `users` collection
3. Collection ID: `users`
4. Document ID: **Paste the User UID from Step 1**
5. Add these fields:

```
firstName: "System" (string)
lastName: "Administrator" (string)
email: "admin@barangaybanus.com" (string)
age: 25 (number)
birthdate: "1999-01-01" (string)
street: "Masunurin" (string)
contactNumber: "09123456789" (string)
photoURL: "https://via.placeholder.com/150" (string)
isEligibleVoter: true (boolean)
role: "admin" (string)
status: "approved" (string)
createdAt: "2024-01-01T00:00:00.000Z" (string)
```

6. Click **"Save"**

#### Step 3: Login
1. Go to http://localhost:5174
2. Click **"Login"**
3. Enter:
   - Email: `admin@barangaybanus.com`
   - Password: `Admin123!`
4. Click **"Sign In"**
5. You should be redirected to the admin dashboard!

## 📋 Create Sample Officials (For Testing Messages)

To test the messaging feature, add some officials:

1. Go to **Firestore Database**
2. Create a new collection: `officials`
3. Add documents with auto-generated IDs:

**Official 1:**
```
name: "Juan Dela Cruz" (string)
position: "SK Chairman" (string)
contact: "09123456789" (string)
email: "sk.chairman@barangaybanus.com" (string)
photoURL: "https://via.placeholder.com/150" (string)
createdAt: "2024-01-01T00:00:00.000Z" (string)
```

**Official 2:**
```
name: "Maria Santos" (string)
position: "Barangay Captain" (string)
contact: "09987654321" (string)
email: "captain@barangaybanus.com" (string)
photoURL: "https://via.placeholder.com/150" (string)
createdAt: "2024-01-01T00:00:00.000Z" (string)
```

## 🔒 Firebase Security Rules (Important!)

Make sure your Firestore security rules allow read/write access during development:

1. Go to **Firestore Database** → **Rules** tab
2. Use these rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read officials
    match /officials/{officialId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Allow authenticated users to manage their concerns
    match /concerns/{concernId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Allow authenticated users to manage their messages
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.senderId == request.auth.uid;
    }
  }
}
```

3. For Storage rules, go to **Storage** → **Rules** tab:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /user-photos/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

4. Click **"Publish"**

## 🧪 Testing the Application

### Test User Registration Flow
1. Click "Register" on landing page
2. Fill in all fields (age must be 15-30)
3. Upload a photo (max 5MB)
4. Submit
5. Approve in Firebase Console
6. Login

### Test Login Flow
1. Click "Login" on landing page
2. Enter credentials
3. Should redirect to dashboard based on role

### Test Concerns Feature
1. Login as user
2. Go to Concerns page
3. Click "+ New Concern"
4. Fill modal and submit
5. View in concerns list

### Test Messages Feature
1. Login as user
2. Go to Messages page
3. Click "+ New Message"
4. Select official and send
5. View in message history

## 🐛 Troubleshooting

### "Invalid email or password" (400 Error)
**Cause:** User doesn't exist in Firebase Authentication
**Solution:** Create the user via Firebase Console or register through the app

### "Your account is pending admin approval"
**Cause:** User status is "pending" in Firestore
**Solution:** Change status to "approved" in Firestore Console

### "User data not found"
**Cause:** User exists in Authentication but not in Firestore
**Solution:** Create a document in the `users` collection with the user's UID

### Photo upload fails
**Cause:** Storage rules not configured
**Solution:** Set up Storage rules as shown above

### Can't see officials in message dropdown
**Cause:** No officials in Firestore
**Solution:** Add officials to the `officials` collection

## 📱 Application Features

### Landing Page
- Premium gradient design
- Feature showcase
- Statistics display
- Login/Register modals

### User Dashboard
- Profile information
- Quick stats
- Navigation to features

### Admin Dashboard
- User management
- Concern management
- Analytics
- Message responses

### Concerns
- Submit concerns via modal
- Track status (pending/in-progress/resolved/rejected)
- View submission history

### Messages
- Send messages to officials via modal
- View message history
- See admin replies

### Officials Directory
- View all barangay officials
- Contact information
- Positions and roles

## 🔗 Useful Links

- Firebase Console: https://console.firebase.google.com/project/banus-79d06
- Local App: http://localhost:5174
- Firebase Documentation: https://firebase.google.com/docs

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Verify Firebase configuration
3. Check Firestore security rules
4. Ensure user exists in both Authentication and Firestore
5. Verify user status is "approved"

---

**Ready to start?** Follow Option 1 or Option 2 above to create your first account!
