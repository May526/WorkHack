import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/analytics";

const firebase_config = {
  apiKey: "AIzaSyAG_D8XJ5V7PXLFfM675dIOfNp81ztE368",
  authDomain: "workhack-cff25.firebaseapp.com",
  databaseURL: "https://workhack-cff25-default-rtdb.firebaseio.com",
  projectId: "workhack-cff25",
  storageBucket: "workhack-cff25.appspot.com",
  messagingSenderId: "400953260715",
  appId: "1:400953260715:web:cc863d2c164eaf7a2215ee",
  measurementId: "G-T475T5ZJTQ",
};

export const app = firebase.initializeApp(firebase_config);
export const database = firebase.database();
