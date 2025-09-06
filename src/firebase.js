// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc, getDoc, query, orderBy, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3MpRGk9FGjcLfzacqN8S2ndq8DYqH4J8",
  authDomain: "pharmago-8ae39.firebaseapp.com",
  projectId: "pharmago-8ae39",
  storageBucket: "pharmago-8ae39.firebasestorage.app",
  messagingSenderId: "1070978990288",
  appId: "1:1070978990288:web:b8f41a68712968901e9ed5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export onAuthStateChanged for use in AuthContext
export { onAuthStateChanged };

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

// Authentication functions
export const signUp = async (email, password, firstName, lastName, phone, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Add user data to Firestore
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      email: user.email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      createdAt: new Date(),
      profile: {
        role: role || 'user',
        name: `${firstName} ${lastName}`,
        email: user.email
      }
    });
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore, if not create profile
    const userExists = await checkUserExists(user.uid);
    if (!userExists) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        email: user.email,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        createdAt: new Date(),
        phone: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        profile: {
          role: 'user',
          name: user.displayName || '',
          email: user.email
        }
      });
    }
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Helper function to check if user exists in Firestore
const checkUserExists = async (uid) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.some(doc => doc.data().uid === uid);
  } catch (error) {
    return false;
  }
};

// Firestore functions
export const addToCart = async (userId, item) => {
  try {
    const docRef = await addDoc(collection(db, 'cart'), {
      userId: userId,
      item: item,
      addedAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserCart = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'cart'));
    const cartItems = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === userId) {
        cartItems.push({ id: doc.id, ...doc.data() });
      }
    });
    return { success: true, items: cartItems };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const removeFromCart = async (itemId) => {
  try {
    await deleteDoc(doc(db, 'cart', itemId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Export the app instance
export default app;
