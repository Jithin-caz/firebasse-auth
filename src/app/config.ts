// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "authsamp-e4130.firebaseapp.com",
  projectId: "authsamp-e4130",
  storageBucket: "authsamp-e4130.appspot.com",
  messagingSenderId: "787014380027",
  appId: "1:787014380027:web:c8453d4ceab836bdb7435e",
  measurementId: "G-DYB5V02CT9"
};


const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
const auth=getAuth(app)
const provider=new GoogleAuthProvider()
export {auth,provider,db}