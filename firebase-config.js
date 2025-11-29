// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmxdm07zPOSauBNeCM4dxWOVw2PyCw1Zk",
  authDomain: "spanishwithignacio-43149.firebaseapp.com",
  projectId: "spanishwithignacio-43149",
  storageBucket: "spanishwithignacio-43149.firebasestorage.app",
  messagingSenderId: "430652609722",
  appId: "1:430652609722:web:5d5824e209c620c1709e83"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Suscribe a los cambios de autenticación del usuario.
 * @param {(user: import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js").User|null) => void} callback
 * @returns {import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js").Unsubscribe}
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export function signOutUser() {
  return signOut(auth);
}

export { app, auth, db };
