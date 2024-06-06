import  firebase  from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbjp-9VRiBWqH8jJ62b2gXFGJTEtV_Zs8",
  authDomain: "finalspd1.firebaseapp.com",
  projectId: "finalspd1",
  storageBucket: "finalspd1.appspot.com",
  messagingSenderId: "127716280588",
  appId: "1:127716280588:web:312adff10c282426286129",
  measurementId: "G-5XTZ4LJVYF"
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
