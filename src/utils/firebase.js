import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSvu_wKssYcm4puccW-fLgYY2aosawlEg",
  authDomain: "noorec-mdt-kmutt.firebaseapp.com",
  databaseURL: "https://noorec-mdt-kmutt.firebaseio.com",
  projectId: "noorec-mdt-kmutt",
  storageBucket: "noorec-mdt-kmutt.appspot.com",
  messagingSenderId: "970525056087",
  appId: "1:970525056087:web:b87815a2218b8b86861712",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore;
export const db = firebase.firestore();
