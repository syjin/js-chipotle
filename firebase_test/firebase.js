import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyARgsJ_aCia3NMyeB59_E8e0p5a4juKKG0',
  authDomain: 'js-chipotle.firebaseapp.com',
  projectId: 'js-chipotle',
  storageBucket: 'js-chipotle.appspot.com',
  messagingSenderId: '829004839753',
  appId: '1:829004839753:web:1129aaa635e93f25d97898',
  measurementId: 'G-MQ8V7WQVEC',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
