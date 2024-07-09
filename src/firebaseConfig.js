import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_MULTIMART_API_KEY,
  authDomain: "multimart-ecommerce-191cf.firebaseapp.com",
  projectId: "multimart-ecommerce-191cf",
  storageBucket: "multimart-ecommerce-191cf.appspot.com",
  messagingSenderId: "379972627337",
  appId: "1:379972627337:web:50a0189811144ef9e04f58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);

export default app;