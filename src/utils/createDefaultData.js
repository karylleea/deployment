import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

/**
 * Create a default admin account
 * Run in browser console: window.createDefaultAdmin()
 */
export async function createDefaultAdmin() {
  const adminData = {
    email: 'admin@barangaybanus.com',
    password: 'Admin123!',
    firstName: 'System',
    lastName: 'Administrator',
    age: 25,
    birthdate: '1999-01-01',
    street: 'Masunurin',
    contactNumber: '09123456789',
    photoURL: 'https://via.placeholder.com/150',
    isEligibleVoter: true,
    role: 'admin',
    status: 'approved'
  };

  try {
    console.log('🔧 Creating default admin account...');
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`🔑 Password: ${adminData.password}\n`);

    // Create authentication user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      adminData.email,
      adminData.password
    );

    console.log('✅ Authentication user created!');
    console.log(`👤 UID: ${userCredential.user.uid}\n`);

    // Create Firestore document
    const { password, ...firestoreData } = adminData;
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      ...firestoreData,
      createdAt: new Date().toISOString()
    });

    console.log('✅ Firestore document created!');
    console.log('\n🎉 SUCCESS! Admin account created and approved.');
    console.log('\n📝 Login credentials:');
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Password: ${adminData.password}`);
    console.log('\n💡 You can now login at http://localhost:5174');

    // Sign out the newly created user
    await auth.signOut();

    return {
      success: true,
      email: adminData.email,
      password: adminData.password,
      uid: userCredential.user.uid
    };
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n⚠️  This email is already registered.');
      console.log('💡 Try logging in with:');
      console.log(`   Email: ${adminData.email}`);
      console.log(`   Password: ${adminData.password}`);
      console.log('\n💡 Or check if the account exists: window.checkFirestoreAccounts()');
    } else if (error.code === 'auth/weak-password') {
      console.log('\n⚠️  Password is too weak. Use at least 6 characters.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('\n⚠️  Invalid email format.');
    } else {
      console.log('\n💡 Make sure Firebase is properly configured.');
    }

    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Create a test user account
 * Run in browser console: window.createTestUser()
 */
export async function createTestUser() {
  const userData = {
    email: 'user@test.com',
    password: 'User123!',
    firstName: 'Test',
    lastName: 'User',
    age: 20,
    birthdate: '2004-01-01',
    street: 'Ilang-Ilang',
    contactNumber: '09987654321',
    photoURL: 'https://via.placeholder.com/150',
    isEligibleVoter: true,
    role: 'user',
    status: 'approved'
  };

  try {
    console.log('🔧 Creating test user account...');
    console.log(`📧 Email: ${userData.email}`);
    console.log(`🔑 Password: ${userData.password}\n`);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    console.log('✅ Authentication user created!');
    console.log(`👤 UID: ${userCredential.user.uid}\n`);

    const { password, ...firestoreData } = userData;
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      ...firestoreData,
      createdAt: new Date().toISOString()
    });

    console.log('✅ Firestore document created!');
    console.log('\n🎉 SUCCESS! Test user created and approved.');
    console.log('\n📝 Login credentials:');
    console.log(`   Email: ${userData.email}`);
    console.log(`   Password: ${userData.password}`);

    await auth.signOut();

    return {
      success: true,
      email: userData.email,
      password: userData.password,
      uid: userCredential.user.uid
    };
  } catch (error) {
    console.error('❌ Error creating test user:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('\n⚠️  This email is already registered.');
      console.log('💡 Try logging in with:');
      console.log(`   Email: ${userData.email}`);
      console.log(`   Password: ${userData.password}`);
    }

    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Create sample officials
 * Run in browser console: window.createSampleOfficials()
 */
export async function createSampleOfficials() {
  const officials = [
    {
      name: 'Juan Dela Cruz',
      position: 'SK Chairman',
      contact: '09123456789',
      email: 'sk.chairman@barangaybanus.com',
      photoURL: 'https://via.placeholder.com/150'
    },
    {
      name: 'Maria Santos',
      position: 'Barangay Captain',
      contact: '09987654321',
      email: 'captain@barangaybanus.com',
      photoURL: 'https://via.placeholder.com/150'
    },
    {
      name: 'Pedro Reyes',
      position: 'SK Kagawad',
      contact: '09111222333',
      email: 'kagawad1@barangaybanus.com',
      photoURL: 'https://via.placeholder.com/150'
    },
    {
      name: 'Ana Garcia',
      position: 'SK Secretary',
      contact: '09444555666',
      email: 'secretary@barangaybanus.com',
      photoURL: 'https://via.placeholder.com/150'
    }
  ];

  try {
    console.log('🔧 Creating sample officials...\n');

    let successCount = 0;
    for (const official of officials) {
      const docRef = await addDoc(collection(db, 'officials'), {
        ...official,
        createdAt: new Date().toISOString()
      });

      console.log(`✅ Created: ${official.name} - ${official.position}`);
      console.log(`   ID: ${docRef.id}`);
      successCount++;
    }

    console.log(`\n🎉 SUCCESS! Created ${successCount} officials.`);
    console.log('\n💡 You can now send messages to these officials.');
    console.log('💡 Check officials: window.checkFirestoreOfficials()');

    return {
      success: true,
      count: successCount
    };
  } catch (error) {
    console.error('❌ Error creating officials:', error);
    console.log('\n💡 Make sure Firestore security rules allow writing to officials collection.');
    
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Create all default data at once
 * Run in browser console: window.setupDefaultData()
 */
export async function setupDefaultData() {
  console.log('🚀 SETTING UP DEFAULT DATA\n');
  console.log('═══════════════════════════════════════\n');

  console.log('Step 1: Creating Admin Account\n');
  const adminResult = await createDefaultAdmin();
  
  console.log('\n═══════════════════════════════════════\n');
  console.log('Step 2: Creating Test User\n');
  const userResult = await createTestUser();
  
  console.log('\n═══════════════════════════════════════\n');
  console.log('Step 3: Creating Sample Officials\n');
  const officialsResult = await createSampleOfficials();

  console.log('\n═══════════════════════════════════════');
  console.log('✅ SETUP COMPLETE!\n');

  if (adminResult.success) {
    console.log('👨‍💼 Admin Account:');
    console.log(`   Email: ${adminResult.email}`);
    console.log(`   Password: ${adminResult.password}\n`);
  }

  if (userResult.success) {
    console.log('👤 Test User:');
    console.log(`   Email: ${userResult.email}`);
    console.log(`   Password: ${userResult.password}\n`);
  }

  if (officialsResult.success) {
    console.log(`👔 Officials: ${officialsResult.count} created\n`);
  }

  console.log('💡 Next steps:');
  console.log('1. Go to http://localhost:5174');
  console.log('2. Click "Login"');
  console.log('3. Use admin or test user credentials');
  console.log('4. Start using the application!');

  return {
    admin: adminResult,
    user: userResult,
    officials: officialsResult
  };
}

// Make functions available in browser console
if (typeof window !== 'undefined') {
  window.createDefaultAdmin = createDefaultAdmin;
  window.createTestUser = createTestUser;
  window.createSampleOfficials = createSampleOfficials;
  window.setupDefaultData = setupDefaultData;
}