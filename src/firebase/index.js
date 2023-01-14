import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAftiFDAJD7XcLCiMc1-0FCegTrID1cfco",
  authDomain: "saylani-firebase-class.firebaseapp.com",
  projectId: "saylani-firebase-class",
  storageBucket: "saylani-firebase-class.appspot.com",
  messagingSenderId: "1077349181232",
  appId: "1:1077349181232:web:7cc0be3b431336d31d0af5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
