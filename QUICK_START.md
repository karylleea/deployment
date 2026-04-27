# 🚀 Quick Start - First Time Setup

## The 400 Error You're Seeing

**Error:** `POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword 400`

**What it means:** No user account exists with those credentials in Firebase yet.

**Solution:** You need to create an account first!

---

## ⚡ Fastest Way to Get Started (2 Minutes)

### Step 1: Register Your First Account
1. Go to http://localhost:5174
2. Click the **"Register"** button (purple button on the right)
3. Fill in the form:
   - First Name: Your name
   - Last Name: Your last name
   - Email: your.email@example.com
   - Password: YourPassword123! (min 6 characters)
   - Confirm Password: (same as above)
   - Age: 18-30 (any number in this range)
   - Birthdate: Pick any date
   - Street: Select from dropdown
   - Contact: 09123456789
   - Photo: Upload any image (max 5MB)
4. Click **"Create Account"**
5. You'll see: "Registration successful! Please wait for admin approval."

### Step 2: Approve Your Account
1. Open Firebase Console: https://console.firebase.google.com/project/banus-79d06/firestore
2. Click on **Firestore Database** in the left menu
3. You'll see a `users` collection - click on it
4. Find your user document (it will have your email)
5. Click on the document to edit it
6. Find the field `status` with value `"pending"`
7. Change it to `"approved"`
8. **Optional:** Change `role` from `"user"` to `"admin"` for full access
9. Click **"Update"** or press Enter

### Step 3: Login
1. Go back to http://localhost:5174
2. Click **"Login"** button
3. Enter your email and password
4. Click **"Sign In"**
5. ✅ You're in!

---

## 🎯 What You Can Do Now

### As a User:
- ✅ View your dashboard
- ✅ Submit concerns (click "+ New Concern")
- ✅ Send messages to officials (click "+ New Message")
- ✅ View officials directory

### As an Admin (if you changed role to "admin"):
- ✅ All user features PLUS:
- ✅ Approve/reject user registrations
- ✅ Manage concerns
- ✅ Reply to messages
- ✅ View analytics

---

## 📝 Create Sample Officials (Optional)

To test the messaging feature, add officials in Firebase:

1. Go to Firestore Database
2. Click **"Start collection"** or find `officials` collection
3. Collection ID: `officials`
4. Click **"Add document"** with auto-generated ID
5. Add these fields:

```
name: "Juan Dela Cruz"
position: "SK Chairman"
contact: "09123456789"
email: "sk.chairman@test.com"
photoURL: "https://via.placeholder.com/150"
createdAt: "2024-01-01T00:00:00.000Z"
```

6. Click **"Save"**
7. Repeat for more officials

---

## 🔥 Firebase Console Quick Links

- **Authentication:** https://console.firebase.google.com/project/banus-79d06/authentication/users
- **Firestore Database:** https://console.firebase.google.com/project/banus-79d06/firestore
- **Storage:** https://console.firebase.google.com/project/banus-79d06/storage

---

## ❓ Common Issues

### "Your account is pending admin approval"
→ Go to Firestore and change `status` to `"approved"`

### "User data not found"
→ The user exists in Authentication but not in Firestore. Register through the app instead.

### "No officials in dropdown"
→ Add officials to the `officials` collection in Firestore

### Photo upload fails
→ Check Storage rules in Firebase Console

---

## 💡 Pro Tips

1. **First account should be admin** - Change `role` to `"admin"` in Firestore
2. **Use Chrome DevTools** - Press F12 to see detailed error messages
3. **Check Firestore Rules** - Make sure they allow read/write access
4. **Keep Firebase Console open** - You'll need it for approvals and data management

---

**That's it!** You should now be able to login and use the application. 🎉

Need more details? Check `SETUP_GUIDE.md` for comprehensive instructions.
