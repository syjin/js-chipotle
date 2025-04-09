import { auth } from './firebase.js';
import { primaryHeaderTemplate } from './components.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';

const createHeader = () => {
  document.getElementById('primaryHeader').innerHTML = primaryHeaderTemplate;
};

const signInModalControl = {
  show: (id) => document.querySelector(`#${id}`).classList.add('visible'),
  hide: (id) => document.querySelector(`#${id}`).classList.remove('visible'),
  // switch:
};

const authHandler = {
  async signIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      signInModalControl.hide('auth-modal');
    } catch (error) {
      console.log('로그인 실패: ', error.message);
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  createHeader();
  console.log('header complete');

  // 로그인 모달 관련 코드
  const userIcon = document.querySelector('.user-actions .user');
  const bagIcon = document.querySelector('.user-actions .bag');

  userIcon.addEventListener('mouseenter', () => {
    import('./auth/login.js');
    console.log('auth module preloaded');
  });
});
