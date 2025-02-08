import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAWcZORzXAr-IrWzWu6-uwew-vlAYH8ELg",
  authDomain: "myreactapp-77a44.firebaseapp.com",
  databaseURL:
    "https://myreactapp-77a44-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "myreactapp-77a44",
  storageBucket: "myreactapp-77a44.appspot.com",
  messagingSenderId: "881028152524",
  appId: "1:881028152524:web:269573d9daaa57551a5669",
  measurementId: "G-TXQM3Q6HCP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
