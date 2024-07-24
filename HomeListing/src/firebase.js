// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW4w0ILbNOujBu7HrFPy8kk5PEAHVP2oA",
  authDomain: "mern-estate-ba897.firebaseapp.com",
  projectId: "mern-estate-ba897",
  storageBucket: "mern-estate-ba897.appspot.com",
  messagingSenderId: "396138964836",
  appId: "1:396138964836:web:cdcfbeaeac1d4e3585fc71",
  measurementId: "G-3WR2NVXFE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth=getAuth(app);
export default auth;