// Import Firebase SDK
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1IHMaOtC0jZ94aVxjovdxUwSxEcrLKNE",
  authDomain: "finance-chatbot-59374.firebaseapp.com",
  projectId: "finance-chatbot-59374",
  storageBucket: "finance-chatbot-59374.firebasestorage.app",
  messagingSenderId: "997991958649",
  appId: "1:997991958649:web:0a4a9abae41b68c6376ca8",
};

// ✅ Prevent re-initializing Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const chatbotDB = getFirestore(app);
