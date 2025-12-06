import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyDwWUshCbqUEO_-Izn-rou73KwVKy7Iazw",
  authDomain: "beto-mobile-v2.firebaseapp.com",
  projectId: "beto-mobile-v2",
  storageBucket: "beto-mobile-v2.appspot.com",
  messagingSenderId: "551079837130",
  appId: "1:551079837130:web:b53207ec6545493912e333"
};

const app = getApps().length===0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);