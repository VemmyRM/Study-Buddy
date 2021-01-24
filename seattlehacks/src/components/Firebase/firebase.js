import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import dotenv from 'dotenv';
// dotenv.config();

const config = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  
  apiKey: "AIzaSyAdIOyeLuMyCT_gX2FkwvP_6jcRrVGL3HA",
    authDomain: "seattlehacks-965b3.firebaseapp.com",
    databaseURL: "https://seattlehacks-965b3-default-rtdb.firebaseio.com",
    projectId: "seattlehacks-965b3",
    storageBucket: "seattlehacks-965b3.appspot.com",
    messagingSenderId: "906793229373",
    appId: "1:906793229373:web:28ef90ebb12f0e9cdd9e54",
    measurementId: "G-EYQL1CWB1V"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }


  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);


    createQueue = (username, course) =>
    this.auth.createUserWithEmailAndPassword(username, course);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

      // *** User API ***
 
  user = uid => this.db.ref(`users/${uid}`);
 
  users = () => this.db.ref('users');
}

export default Firebase;