# 🎮 Browser Console Commands

## Quick Setup (30 Seconds!)

### 1. Open Browser Console
- **Chrome/Edge:** Press `F12` or `Ctrl+Shift+J` (Windows) / `Cmd+Option+J` (Mac)
- **Firefox:** Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)

### 2. Run Setup Command
Copy and paste this into the console:

```javascript
window.setupDefaultData()
```

**This will create:**
- ✅ Admin account (admin@barangaybanus.com / Admin123!)
- ✅ Test user (user@test.com / User123!)
- ✅ 4 Sample officials

### 3. Login
- Go to http://localhost:5174
- Click "Login"
- Use admin credentials to login

**That's it! You're ready to use the app! 🎉**

---

## 📋 Available Commands

### Check What's in Firestore

#### Check All Data
```javascript
window.checkAllFirestoreData()
```
Shows all users and officials in your Firestore database.

#### Check Users Only
```javascript
window.checkFirestoreAccounts()
```
Shows all user accounts with their status and roles.

#### Check Officials Only
```javascript
window.checkFirestoreOfficials()
```
Shows all officials in the system.

---

### Create Accounts

#### Create Everything at Once
```javascript
window.setupDefaultData()
```
Creates admin, test user, and sample officials.

#### Create Admin Only
```javascript
window.createDefaultAdmin()
```
Creates: admin@barangaybanus.com / Admin123!

#### Create Test User Only
```javascript
window.createTestUser()
```
Creates: user@test.com / User123!

#### Create Sample Officials Only
```javascript
window.createSampleOfficials()
```
Creates 4 sample officials for testing messages.

---

## 🎯 Common Scenarios

### Scenario 1: First Time Setup
```javascript
// Check if any data exists
window.checkAllFirestoreData()

// If empty, create everything
window.setupDefaultData()

// Verify it worked
window.checkAllFirestoreData()
```

### Scenario 2: Already Have Users, Need Officials
```javascript
// Check current officials
window.checkFirestoreOfficials()

// Create officials if needed
window.createSampleOfficials()
```

### Scenario 3: Need Admin Account
```javascript
// Check existing users
window.checkFirestoreAccounts()

// Create admin if needed
window.createDefaultAdmin()
```

### Scenario 4: Verify Everything is Set Up
```javascript
window.checkAllFirestoreData()
```

---

## 📊 Example Output

### When Running `window.setupDefaultData()`

```
🚀 SETTING UP DEFAULT DATA

═══════════════════════════════════════

Step 1: Creating Admin Account

🔧 Creating default admin account...
📧 Email: admin@barangaybanus.com
🔑 Password: Admin123!

✅ Authentication user created!
👤 UID: abc123xyz...

✅ Firestore document created!

🎉 SUCCESS! Admin account created and approved.

📝 Login credentials:
   Email: admin@barangaybanus.com
   Password: Admin123!

═══════════════════════════════════════

Step 2: Creating Test User

🔧 Creating test user account...
📧 Email: user@test.com
🔑 Password: User123!

✅ Authentication user created!
✅ Firestore document created!

═══════════════════════════════════════

Step 3: Creating Sample Officials

🔧 Creating sample officials...

✅ Created: Juan Dela Cruz - SK Chairman
✅ Created: Maria Santos - Barangay Captain
✅ Created: Pedro Reyes - SK Kagawad
✅ Created: Ana Garcia - SK Secretary

🎉 SUCCESS! Created 4 officials.

═══════════════════════════════════════
✅ SETUP COMPLETE!

👨‍💼 Admin Account:
   Email: admin@barangaybanus.com
   Password: Admin123!

👤 Test User:
   Email: user@test.com
   Password: User123!

👔 Officials: 4 created

💡 Next steps:
1. Go to http://localhost:5174
2. Click "Login"
3. Use admin or test user credentials
4. Start using the application!
```

---

## 🔧 Troubleshooting

### "Email already in use"
**Meaning:** Account already exists
**Solution:** Try logging in with those credentials, or check existing accounts:
```javascript
window.checkFirestoreAccounts()
```

### "Permission denied"
**Meaning:** Firestore security rules are blocking the operation
**Solution:** 
1. Go to Firebase Console
2. Navigate to Firestore Database → Rules
3. Temporarily use these rules for development:
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

### "Firebase not configured"
**Meaning:** Firebase configuration is missing or incorrect
**Solution:** Check `src/firebase/config.js` has valid credentials

### Commands not working
**Solution:** 
1. Refresh the page (F5)
2. Open console again
3. Try the command again

---

## 💡 Pro Tips

1. **Always check first:** Run `window.checkAllFirestoreData()` before creating accounts
2. **Console is your friend:** Keep it open while developing
3. **Copy credentials:** The console shows passwords - copy them!
4. **Refresh after errors:** If something fails, refresh and try again
5. **One command does it all:** `window.setupDefaultData()` is usually all you need

---

## 🎓 Understanding the Commands

### What happens when you run `setupDefaultData()`?

1. **Creates Firebase Auth users** - Accounts in Authentication
2. **Creates Firestore documents** - User data in database
3. **Sets status to "approved"** - No manual approval needed
4. **Sets role to "admin"** - Full access for admin account
5. **Creates officials** - For testing messages feature

### Why use console commands?

- ⚡ **Faster** than manual Firebase Console setup
- 🎯 **Accurate** - No typos or missing fields
- 🔄 **Repeatable** - Same setup every time
- 🧪 **Perfect for testing** - Quick reset and recreate

---

## 📚 Related Files

- **QUICK_START.md** - Manual setup guide
- **SETUP_GUIDE.md** - Comprehensive setup instructions
- **DEFAULT_CREDENTIALS.md** - List of default credentials
- **src/utils/checkFirestoreAccounts.js** - Check functions source code
- **src/utils/createDefaultData.js** - Create functions source code

---

## 🚀 Ready to Start?

1. Open browser console (F12)
2. Run: `window.setupDefaultData()`
3. Wait for success message
4. Login at http://localhost:5174
5. Enjoy! 🎉

**Questions?** All commands show helpful output and error messages!
