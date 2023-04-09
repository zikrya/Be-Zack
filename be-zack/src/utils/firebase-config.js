import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { ref, set, get, child } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6lDcZbcWaF9R9h2uuXTwXXjIwrFeNNSo",
    authDomain: "be-zack-7d880.firebaseapp.com",
    projectId: "be-zack-7d880",
    storageBucket: "be-zack-7d880.appspot.com",
    messagingSenderId: "796870705800",
    appId: "1:796870705800:web:b36f8b70a4443feb70553d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const storage = getStorage(app);
export const database = getDatabase(app);
export async function updateUserName(uid, name) {
    await set(ref(database, `users/${uid}/name`), name);
  }

  export async function getUserName(uid) {
    const snapshot = await get(child(ref(database), `users/${uid}/name`));
    return snapshot.val();
  }