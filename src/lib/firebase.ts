import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signOut = () => firebaseSignOut(auth);
export {
  RecaptchaVerifier,
  signInWithPhoneNumber,
};

export async function logUserInteraction(actionType: string, details?: any) {
  const user = auth.currentUser;
  
  if (!user) return;

  try {
    const interactionsRef = collection(db, 'users', user.uid, 'interactions');
    await addDoc(interactionsRef, {
      type: actionType,
      details: details || {},
      timestamp: new Date()
    });
  } catch {
    // Silent fail - analytics tracking should not block user flow
  }
}
