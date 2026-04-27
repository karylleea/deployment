# ✅ Setup Checklist - Barangay Banus SK

## 🎯 Complete Setup in 5 Minutes

Follow this checklist to get your app running:

---

## Step 1: Enable Firebase Authentication ⚠️ REQUIRED

### Status: ⬜ Not Done

**What:** Enable Authentication in Firebase Console  
**Why:** Required for login/register to work  
**Time:** 2 minutes

### Instructions:
1. Go to: https://console.firebase.google.com/project/banus-79d06/authentication
2. Click **"Get Started"** button (if you see it)
3. Click **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** to ON
6. Click **"Save"**

### Verify:
- [ ] "Email/Password" shows "Enabled" status
- [ ] No more "auth/configuration-not-found" errors

**Need help?** See: `FIX_AUTH_ERROR.md`

---

## Step 2: Create Default Accounts

### Status: ⬜ Not Done

**What:** Create admin, user, and officials  
**Why:** You need accounts to login  
**Time:** 30 seconds

### Instructions:
1. Open your app: http://localhost:5174
2. Press **F12** to open browser console
3. Copy and paste this command:
   ```javascript
   window.setupDefaultData()
   ```
4. Press Enter
5. Wait for success message

### Verify:
- [ ] Console shows "✅ SETUP COMPLETE!"
- [ ] Admin credentials displayed
- [ ] Test user credentials displayed
- [ ] 4 officials created

**Need help?** See: `CONSOLE_COMMANDS.md`

---

## Step 3: Test Login

### Status: ⬜ Not Done

**What:** Login with admin account  
**Why:** Verify everything works  
**Time:** 30 seconds

### Instructions:
1. Go to: http://localhost:5174
2. Click **"Login"** button
3. Enter:
   - Email: `admin@barangaybanus.com`
   - Password: `Admin123!`
4. Click **"Sign In"**

### Verify:
- [ ] No errors in console
- [ ] Redirected to admin dashboard
- [ ] Can see navigation menu
- [ ] Profile information displays

**Need help?** See: `START_HERE.md`

---

## Step 4: Configure Firestore Rules (Optional but Recommended)

### Status: ⬜ Not Done

**What:** Set up database security rules  
**Why:** Control who can read/write data  
**Time:** 2 minutes

### Instructions:
1. Go to: https://console.firebase.google.com/project/banus-79d06/firestore/rules
2. Replace existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Officials collection
    match /officials/{officialId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Concerns collection
    match /concerns/{concernId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                               resource.data.userId == request.auth.uid;
    }
    
    // Messages collection
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
                       (resource.data.senderId == request.auth.uid || 
                        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

3. Click **"Publish"**

### Verify:
- [ ] Rules published successfully
- [ ] No errors shown
- [ ] App still works after publishing

**Need help?** See: `SETUP_GUIDE.md`

---

## Step 5: Configure Storage Rules (Optional)

### Status: ⬜ Not Done

**What:** Set up file storage security  
**Why:** Control who can upload photos  
**Time:** 1 minute

### Instructions:
1. Go to: https://console.firebase.google.com/project/banus-79d06/storage/rules
2. Replace existing rules with:

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

3. Click **"Publish"**

### Verify:
- [ ] Rules published successfully
- [ ] Can still upload photos during registration

---

## Step 6: Test All Features

### Status: ⬜ Not Done

**What:** Test each feature of the app  
**Why:** Make sure everything works  
**Time:** 5 minutes

### Test as Admin:
- [ ] Login as admin
- [ ] View admin dashboard
- [ ] See user management section
- [ ] View all concerns
- [ ] View all messages
- [ ] View officials directory

### Test as User:
- [ ] Logout from admin
- [ ] Login as user (user@test.com / User123!)
- [ ] View user dashboard
- [ ] Submit a concern (click "+ New Concern")
- [ ] Send a message (click "+ New Message")
- [ ] View officials directory

### Test Registration:
- [ ] Logout
- [ ] Click "Register" on landing page
- [ ] Fill in Step 1 (account info)
- [ ] Fill in Step 2 (personal details)
- [ ] Upload a photo
- [ ] Submit registration
- [ ] Check Firebase Console for new user

**Need help?** See: `README_NEW_FEATURES.md`

---

## 🎉 Completion Summary

### When All Steps Are Done:

✅ Firebase Authentication enabled  
✅ Default accounts created  
✅ Successfully logged in  
✅ Firestore rules configured  
✅ Storage rules configured  
✅ All features tested  

**Congratulations! Your app is fully set up! 🚀**

---

## 📊 Quick Status Check

Run this in browser console to check your setup:

```javascript
window.checkAllFirestoreData()
```

**Should show:**
- Admin account (approved)
- Test user (approved)
- 4 Officials

---

## 🐛 Troubleshooting

### Step 1 Issues
**Error:** "auth/configuration-not-found"  
**Fix:** See `FIX_AUTH_ERROR.md`

### Step 2 Issues
**Error:** "Email already in use"  
**Fix:** Accounts already exist. Try logging in.

**Error:** "Permission denied"  
**Fix:** Update Firestore rules (Step 4)

### Step 3 Issues
**Error:** "Invalid credentials"  
**Fix:** Run `window.checkFirestoreAccounts()` to see existing accounts

**Error:** "User data not found"  
**Fix:** User exists in Auth but not Firestore. Run `window.setupDefaultData()`

### Step 4 Issues
**Error:** Rules won't publish  
**Fix:** Check for syntax errors in rules

### Step 5 Issues
**Error:** Photo upload fails  
**Fix:** Make sure Storage rules are published

### Step 6 Issues
**Error:** Features not working  
**Fix:** Check browser console for specific errors

---

## 📚 Documentation Reference

| Document | Purpose |
|----------|---------|
| **START_HERE.md** | Quick start guide |
| **FIX_AUTH_ERROR.md** | Fix authentication errors |
| **CONSOLE_COMMANDS.md** | All console commands |
| **FIRESTORE_QUICK_REFERENCE.md** | Firestore structure |
| **SETUP_GUIDE.md** | Comprehensive setup |
| **QUICK_START.md** | 2-minute setup |
| **DEFAULT_CREDENTIALS.md** | All credentials |
| **README_NEW_FEATURES.md** | Feature overview |

---

## 🎯 Priority Order

If you're short on time, do these in order:

1. **Step 1** (REQUIRED) - Enable Authentication
2. **Step 2** (REQUIRED) - Create accounts
3. **Step 3** (REQUIRED) - Test login
4. **Step 6** (RECOMMENDED) - Test features
5. **Step 4** (OPTIONAL) - Firestore rules
6. **Step 5** (OPTIONAL) - Storage rules

---

## 💡 Pro Tips

1. **Do Step 1 first** - Nothing works without Authentication enabled
2. **Keep console open** - See helpful messages and errors
3. **Use console commands** - Much faster than manual setup
4. **Test as you go** - Don't wait until the end
5. **Save credentials** - Write them down or save in password manager

---

## 🚀 Ready to Start?

Begin with **Step 1**: Enable Firebase Authentication

Go to: https://console.firebase.google.com/project/banus-79d06/authentication

**Good luck! You've got this! 💪**
