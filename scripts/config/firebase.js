// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';

// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyARgsJ_aCia3NMyeB59_E8e0p5a4juKKG0',
  authDomain: 'js-chipotle.firebaseapp.com',
  projectId: 'js-chipotle',
  storageBucket: 'js-chipotle.appspot.com',
  messagingSenderId: '829004839753',
  appId: '1:829004839753:web:1129aaa635e93f25d97898',
  measurementId: 'G-MQ8V7WQVEC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { app, analytics, auth };
