# 🔧 Fix: Firebase Authentication Not Enabled

## ❌ Error You're Seeing

```
Firebase: Error (auth/configuration-not-found)
POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword 400
```

## ✅ What This Means

Firebase Authentication is **not enabled** in your Firebase project. This is a quick fix!

---

## 🚀 Quick Fix (2 Minutes)

### Step 1: Go to Firebase Console
Open: https://console.firebase.google.com/project/banus-79d06/authentication

### Step 2: Enable Authentication
1. You'll see a **"Get Started"** button
2. Click **"Get Started"**
3. Firebase Authentication is now initialized!

### Step 3: Enable Email/Password Sign-In
1. Click on the **"Sign-in method"** tab
2. Find **"Email/Password"** in the list
3. Click on it
4. Toggle **"Enable"** to ON
5. Click **"Save"**

### Step 4: Test It
1. Go back to http://localhost:5174
2. Open console (F12)
3. Run: `window.setupDefaultData()`
4. Login with: admin@barangaybanus.com / Admin123!

**Done! Authentication is now working! ✅**

---

## 📸 Visual Guide

### What You'll See in Firebase Console

#### Before Enabling:
```
┌─────────────────────────────────────┐
│  Authentication                      │
├─────────────────────────────────────┤
│                                      │
│     [Get Started Button]             │
│                                      │
│  Set up sign-in methods for your    │
│  app                                 │
│                                      │
└─────────────────────────────────────┘
```

#### After Clicking "Get Started":
```
┌─────────────────────────────────────┐
│  Authentication                      │
├─────────────────────────────────────┤
│  Users  Sign-in method  Templates   │
│                                      │
│  No users yet                        │
│                                      │
└─────────────────────────────────────┘
```

#### Sign-in Method Tab:
```
┌─────────────────────────────────────┐
│  Sign-in providers                   │
├─────────────────────────────────────┤
│  Email/Password        [Disabled]    │  ← Click this
│  Phone                 [Disabled]    │
│  Google                [Disabled]    │
│  Facebook              [Disabled]    │
│  ...                                 │
└─────────────────────────────────────┘
```

#### Enable Email/Password:
```
┌─────────────────────────────────────┐
│  Email/Password                      │
├─────────────────────────────────────┤
│  Enable                              │
│  ○ Disabled                          │
│  ● Enabled          ← Toggle this    │
│                                      │
│  Email link (passwordless sign-in)  │
│  ○ Disabled                          │
│  ○ Enabled                           │
│                                      │
│         [Cancel]  [Save]             │
└─────────────────────────────────────┘
```

---

## 🎯 Step-by-Step with Screenshots

### 1. Open Firebase Console
**URL:** https://console.firebase.google.com/project/banus-79d06

### 2. Click "Authentication" in Left Menu
Look for the 🔐 icon with "Authentication" text

### 3. Click "Get Started"
If you see this button, click it to initialize Authentication

### 4. Go to "Sign-in method" Tab
At the top of the page, you'll see tabs:
- Users
- **Sign-in method** ← Click this
- Templates
- Settings
- Usage

### 5. Enable Email/Password
1. Find "Email/Password" in the providers list
2. Click on the row
3. Toggle "Enable" to ON
4. Click "Save"

### 6. Verify It's Enabled
You should see:
```
Email/Password    [Enabled] ✓
```

---

## 🧪 Test Authentication

### Option 1: Use Console Commands (Recommended)
```javascript
// Open browser console (F12)
window.setupDefaultData()
```

This will:
- Create admin account
- Create test user
- Create sample officials
- Show you the credentials

### Option 2: Register Through App
1. Go to http://localhost:5174
2. Click "Register"
3. Fill in the form
4. Submit
5. Check Firebase Console → Authentication → Users
6. You should see your new user!

### Option 3: Manual Creation
1. Go to Firebase Console → Authentication → Users
2. Click "Add user"
3. Enter email and password
4. Click "Add user"
5. Then create Firestore document (see SETUP_GUIDE.md)

---

## ✅ Verification Checklist

After enabling Authentication, verify:

- [ ] Firebase Console → Authentication shows "Get Started" is gone
- [ ] "Sign-in method" tab is visible
- [ ] Email/Password shows "Enabled" status
- [ ] Can run `window.setupDefaultData()` without errors
- [ ] Can see created users in Authentication → Users tab
- [ ] Can login at http://localhost:5174

---

## 🔒 Additional Setup (Optional but Recommended)

### Enable Email Verification (Optional)
1. Go to Authentication → Templates
2. Customize email verification template
3. Enable in your app code

### Set Password Requirements (Optional)
1. Go to Authentication → Settings
2. Set password policy
3. Configure password strength

### Add Authorized Domains
1. Go to Authentication → Settings
2. Scroll to "Authorized domains"
3. Add your production domain when deploying

---

## 🐛 Still Having Issues?

### Error: "auth/configuration-not-found"
**Solution:** Follow steps above to enable Authentication

### Error: "auth/operation-not-allowed"
**Solution:** Enable Email/Password sign-in method

### Error: "auth/invalid-api-key"
**Solution:** Check `src/firebase/config.js` has correct API key

### Can't find Authentication in menu
**Solution:** 
1. Make sure you're in the correct project (banus-79d06)
2. Look for 🔐 icon in left sidebar
3. Scroll down if needed

### "Get Started" button doesn't appear
**Solution:** Authentication might already be enabled. Check "Sign-in method" tab.

---

## 📋 Quick Reference

### Firebase Console Links
- **Authentication:** https://console.firebase.google.com/project/banus-79d06/authentication
- **Sign-in Methods:** https://console.firebase.google.com/project/banus-79d06/authentication/providers
- **Users:** https://console.firebase.google.com/project/banus-79d06/authentication/users

### After Enabling Auth
```javascript
// Create accounts
window.setupDefaultData()

// Check what was created
window.checkAllFirestoreData()

// Login credentials
Email: admin@barangaybanus.com
Password: Admin123!
```

---

## 🎯 Summary

**The Problem:** Firebase Authentication not enabled  
**The Solution:** Enable it in Firebase Console (2 minutes)  
**The Steps:**
1. Go to Firebase Console → Authentication
2. Click "Get Started"
3. Enable Email/Password sign-in method
4. Run `window.setupDefaultData()` in browser console
5. Login and enjoy!

---

## 🚀 Next Steps After Fixing

1. ✅ Enable Authentication (you're doing this now)
2. ✅ Run `window.setupDefaultData()` in console
3. ✅ Login at http://localhost:5174
4. ✅ Test all features
5. ✅ Customize the app for your needs

---

## 💡 Pro Tip

**Bookmark these pages:**
- Firebase Authentication: https://console.firebase.google.com/project/banus-79d06/authentication
- Firestore Database: https://console.firebase.google.com/project/banus-79d06/firestore

You'll use them often during development!

---

## 🎉 You're Almost There!

Just enable Authentication in Firebase Console and you'll be up and running!

**Need help?** The Firebase Console has helpful tooltips and documentation links.

**Ready?** Go to: https://console.firebase.google.com/project/banus-79d06/authentication
