import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database';

//Configuring Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAr9h9xAhnc3Je0SbeE2PI1Q9uGGcEeVrM",
    authDomain: "seen-bb21c.firebaseapp.com",
    databaseURL: "https://seen-bb21c-default-rtdb.firebaseio.com",
    projectId: "seen-bb21c",
    storageBucket: "seen-bb21c.appspot.com",
    messagingSenderId: "111074571899",
    appId: "1:111074571899:web:fc1491dbf4152287c314de",
    measurementId: "G-Y0T2NXDHJP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export { firebase, database as default, googleAuthProvider };

