// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Ensure Storage uses a valid gs:// bucket to avoid CORS/wrong host
const bucketFromEnv = firebaseConfig.storageBucket; // e.g., kotlin-kotlin.firebasestorage.app
const inferredBucket = firebaseConfig.projectId ? `${firebaseConfig.projectId}.appspot.com` : undefined;
const isValidBucket = (b) => typeof b === 'string' && /\.appspot\.com$/.test(b);
const finalBucket = isValidBucket(bucketFromEnv) ? bucketFromEnv : inferredBucket;
export const storage = finalBucket
  ? getStorage(app, `gs://${finalBucket}`)
  : getStorage(app);

export default app;
