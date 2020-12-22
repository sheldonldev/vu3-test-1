import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBS9Ag1_PkMnvF9ztVAo7zZApUNYBPGW9c",
  authDomain: "test-auth-28951.firebaseapp.com",
  databaseURL: "https://test-auth-28951.firebaseio.com",
  projectId: "test-auth-28951",
  storageBucket: "test-auth-28951.appspot.com",
  messagingSenderId: "433260702079",
  appId: "1:433260702079:web:a0f68b9ae7444f254e124a",
  measurementId: "G-YQQ9PPZ6BC",
};

firebase.initializeApp(firebaseConfig);
export const chatsRef = firebase.database().ref("chats");

export default firebase;
