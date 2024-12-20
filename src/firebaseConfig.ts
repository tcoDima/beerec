import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzhyRFd5IXAVLekrax-i-BBOd1JNu5oAU",
  authDomain: "beerec-867c3.firebaseapp.com",
  projectId: "beerec-867c3",
  storageBucket: "beerec-867c3.firebasestorage.app",
  messagingSenderId: "1053806395596",
  appId: "1:1053806395596:web:4e2a835ee0dea3c4e10269",
  measurementId: "G-CK7T3H566K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const playersCollectionRef = collection(db, "players")
// export const gamesCollectionRef = collection(db, "games")