import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIRE_BASE_KEY,
  authDomain: process.env.VUE_APP_FIRE_BASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIRE_BASE_APP_ID,
  measurementId: process.env.VUE_APP_FIRE_BASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
