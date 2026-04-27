# Default Credentials for Barangay Banus SK Youth Profiling System

## Important Note
These are default credentials for testing purposes. In production, you should:
1. Create proper admin accounts through Firebase Console
2. Change all default passwords
3. Remove this file from the repository

## Admin Account
**Email:** admin@barangaybanus.com  
**Password:** Admin123!  
**Role:** Administrator  
**Access:** Full system access including:
- User approval/rejection
- Concern management
- Message responses
- Official management
- Analytics dashboard

## Test User Account
**Email:** user@test.com  
**Password:** User123!  
**Role:** Regular User  
**Access:** 
- Submit concerns
- Send messages to officials
- View officials directory
- Personal dashboard

## Setting Up Default Accounts

### Option 1: Manual Setup via Firebase Console
1. Go to Firebase Console → Authentication
2. Add users with the emails above
3. Set their passwords
4. Go to Firestore Database
5. Create documents in the `users` collection:

**Admin User Document:**
```json
{
  "firstName": "System",
  "lastName": "Administrator",
  "email": "admin@barangaybanus.com",
  "age": 25,
  "birthdate": "1999-01-01",
  "street": "Masunurin",
  "contactNumber": "09123456789",
  "photoURL": "https://via.placeholder.com/150",
  "isEligibleVoter": true,
  "role": "admin",
  "status": "approved",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Test User Document:**
```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "user@test.com",
  "age": 20,
  "birthdate": "2004-01-01",
  "street": "Ilang-Ilang",
  "contactNumber": "09987654321",
  "photoURL": "https://via.placeholder.com/150",
  "isEligibleVoter": true,
  "role": "user",
  "status": "approved",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Option 2: Register Through the Application
1. Open the application at http://localhost:5174
2. Click "Register" button
3. Fill in the registration form
4. Wait for admin approval (you'll need to manually approve in Firestore)
5. Login with your credentials

## Quick Test Flow

### Testing User Registration
1. Click "Register" on landing page
2. Fill in all required fields:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@test.com
   - Password: Test123!
   - Age: 18-30
   - Birthdate: Select a date
   - Street: Choose from dropdown
   - Contact: 09123456789
   - Photo: Upload any image
3. Submit and wait for approval message

### Testing Login
1. Click "Login" on landing page
2. Enter email and password
3. Click "Sign In"
4. You'll be redirected based on your role:
   - Admin → `/admin` dashboard
   - User → `/dashboard` user dashboard

### Testing Concerns (User)
1. Login as user
2. Navigate to Concerns page
3. Click "+ New Concern" button
4. Fill in the modal form
5. Submit and view in your concerns list

### Testing Messages (User)
1. Login as user
2. Navigate to Messages page
3. Click "+ New Message" button
4. Select an official from dropdown
5. Write your message
6. Submit and view in message history

## Firebase Configuration Required

Make sure your `src/firebase/config.js` is properly configured with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## Troubleshooting

### "Account pending admin approval"
- The user status in Firestore is set to "pending"
- Change it to "approved" in Firestore Console

### "User data not found"
- The user exists in Authentication but not in Firestore
- Create a document in the `users` collection with the user's UID

### "Invalid email or password"
- Check if the user exists in Firebase Authentication
- Verify the password is correct (minimum 6 characters)

## Security Reminders

⚠️ **IMPORTANT:**
- Never commit real credentials to version control
- Use environment variables for sensitive data
- Implement proper password policies
- Enable Firebase security rules
- Add rate limiting for authentication
- Implement email verification for production
- Use HTTPS in production
- Regular security audits

## Sample Officials Data

To test the messaging feature, add some officials to the `officials` collection:

```json
{
  "name": "Juan Dela Cruz",
  "position": "SK Chairman",
  "contact": "09123456789",
  "email": "sk.chairman@barangaybanus.com",
  "photoURL": "https://via.placeholder.com/150",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

```json
{
  "name": "Maria Santos",
  "position": "Barangay Captain",
  "contact": "09987654321",
  "email": "captain@barangaybanus.com",
  "photoURL": "https://via.placeholder.com/150",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```
