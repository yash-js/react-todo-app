import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsPq1GVCgvQvIGNLgGLjqN3vB7N95jvco",
  authDomain: "todo-5d55e.firebaseapp.com",
  projectId: "todo-5d55e",
  storageBucket: "todo-5d55e.appspot.com",
  messagingSenderId: "1018427328865",
  appId: "1:1018427328865:web:8b0bc208e316a85057dd20",
  measurementId: "G-8BSN9XGDW3",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
