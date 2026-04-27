import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Check what user accounts exist in Firestore
 * Run this in browser console: window.checkFirestoreAccounts()
 */
export async function checkFirestoreAccounts() {
  try {
    console.log('🔍 Checking Firestore for user accounts...\n');
    
    const usersSnapshot = await getDocs(collection(db, 'users'));
    
    if (usersSnapshot.empty) {
      console.log('❌ No users found in Firestore database.');
      console.log('\n📝 To create an account:');
      console.log('1. Click "Register" on the landing page');
      console.log('2. Fill in the form and submit');
      console.log('3. Go to Firebase Console and approve the user');
      console.log('\nOr run: window.createDefaultAdmin()');
      return [];
    }
    
    console.log(`✅ Found ${usersSnapshot.size} user(s) in Firestore:\n`);
    
    const users = [];
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        uid: doc.id,
        ...userData
      });
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`👤 User ID: ${doc.id}`);
      console.log(`📧 Email: ${userData.email}`);
      console.log(`👨 Name: ${userData.firstName} ${userData.lastName}`);
      console.log(`🎭 Role: ${userData.role}`);
      console.log(`📊 Status: ${userData.status}`);
      console.log(`📅 Created: ${userData.createdAt}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    });
    
    // Check for approved admins
    const approvedAdmins = users.filter(u => u.role === 'admin' && u.status === 'approved');
    const pendingUsers = users.filter(u => u.status === 'pending');
    
    if (approvedAdmins.length > 0) {
      console.log(`✅ ${approvedAdmins.length} approved admin(s) found. You can login with:`);
      approvedAdmins.forEach(admin => {
        console.log(`   📧 ${admin.email}`);
      });
    } else {
      console.log('⚠️  No approved admin accounts found.');
    }
    
    if (pendingUsers.length > 0) {
      console.log(`\n⏳ ${pendingUsers.length} pending user(s) need approval in Firebase Console.`);
    }
    
    return users;
  } catch (error) {
    console.error('❌ Error checking Firestore:', error);
    console.log('\n💡 Make sure:');
    console.log('1. Firebase is properly configured');
    console.log('2. Firestore security rules allow reading users collection');
    return [];
  }
}

/**
 * Check officials in Firestore
 */
export async function checkFirestoreOfficials() {
  try {
    console.log('🔍 Checking Firestore for officials...\n');
    
    const officialsSnapshot = await getDocs(collection(db, 'officials'));
    
    if (officialsSnapshot.empty) {
      console.log('❌ No officials found in Firestore database.');
      console.log('\n📝 To add officials, run: window.createSampleOfficials()');
      return [];
    }
    
    console.log(`✅ Found ${officialsSnapshot.size} official(s):\n`);
    
    const officials = [];
    officialsSnapshot.forEach((doc) => {
      const officialData = doc.data();
      officials.push({
        id: doc.id,
        ...officialData
      });
      
      console.log(`👔 ${officialData.name} - ${officialData.position}`);
      console.log(`   📧 ${officialData.email}`);
      console.log(`   📱 ${officialData.contact}\n`);
    });
    
    return officials;
  } catch (error) {
    console.error('❌ Error checking officials:', error);
    return [];
  }
}

/**
 * Check all collections
 */
export async function checkAllFirestoreData() {
  console.log('🔍 CHECKING ALL FIRESTORE DATA\n');
  console.log('═══════════════════════════════════════\n');
  
  await checkFirestoreAccounts();
  console.log('\n═══════════════════════════════════════\n');
  await checkFirestoreOfficials();
  
  console.log('\n═══════════════════════════════════════');
  console.log('✅ Check complete!');
  console.log('\n💡 Available commands:');
  console.log('   window.checkFirestoreAccounts()');
  console.log('   window.checkFirestoreOfficials()');
  console.log('   window.checkAllFirestoreData()');
  console.log('   window.createDefaultAdmin()');
  console.log('   window.createSampleOfficials()');
}

// Make functions available in browser console
if (typeof window !== 'undefined') {
  window.checkFirestoreAccounts = checkFirestoreAccounts;
  window.checkFirestoreOfficials = checkFirestoreOfficials;
  window.checkAllFirestoreData = checkAllFirestoreData;
}