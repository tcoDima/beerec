import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJpvxFAPlc6qIGPpcpdUBZVIvs_HuAalQ",
  authDomain: "fir-tutorial-f01fc.firebaseapp.com",
  projectId: "fir-tutorial-f01fc",
  storageBucket: "fir-tutorial-f01fc.firebasestorage.app",
  messagingSenderId: "32306004770",
  appId: "1:32306004770:web:b21bb4183fdddbfdc65b7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const playerCollectionRef = collection(db, "players")
export const gameCollectionRef = collection(db, "games")