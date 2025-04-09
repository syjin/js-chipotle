import { auth } from '../lib/firebase.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { ERROR_MESSAGES } from '../utils/constants.js';

const signInEmail = document.getElementById('sign-in-email');
const signInPW = document.getElementById('sign-in-password');

const createAccountForm = document.getElementById('create-account-form');

const errorMsg = document.getElementById('error-message');

const createAccountBtn = document.querySelector('.switch-to-create-account');
const signInBtn = document.querySelector('.switch-to-sign-in');

const formContainer = document.querySelector('.form-container');

const getErrorMsg = (errorCode) =>
  ERROR_MESSAGES[errorCode] ?? [
    'Oops! Looks like something went wrong.',
    'Please try again later.',
  ];

const toggleError = (show, message = '') => {
  if (show) {
    errorMsg.textContent = Array.isArray(message)
      ? message.join('\n')
      : message;
    errorMsg.style.whiteSpace = 'pre-line';
  }
  errorMsg.classList.toggle('show', show);
};

const toggleInputError = (element, show) =>
  element.classList.toggle('error', show);

const resetFormState = () => {
  toggleError(false);
  [signInEmail, signInPW].forEach((el) => toggleInputError(el, false));
};

const handleLogin = async (e) => {
  e.preventDefault();
  resetFormState();

  try {
    await signInWithEmailAndPassword(
      auth,
      signInEmail.value.trim(),
      signInPW.value
    );
    console.log('Login Success!');
  } catch (error) {
    console.log('FB Error: ', error);

    const errorCode = error.code;
    toggleError(true, getErrorMsg(errorCode));

    if (errorCode?.includes('email')) toggleInputError(signInEmail, true);
    if (errorCode?.includes('password')) toggleInputError(signInPW, true);
  }
};

const handleInput = ({ target }) => {
  toggleInputError(target, false);

  const hasErrors = [signInEmail, signInPW].some((el) =>
    el.classList.contains('error')
  );
  if (!hasErrors) toggleError(false);
};

const handleSwitchForm = () => {
  formContainer.classList.toggle('switch');
  console.log('switch');
};

const signInModalHTML = `
  <div class="sign-in-modal">
    <div class="modal-container">
      <button class="close-modal-btn" aria-label="Close modal">
        <img src="/assets/images/icons/dark-brown-x.png" />
      </button>
      <div class="modal-heading">
        <img src="assets/images/logos/medallion-fluted-2x.png" class="modal-image" alt="Modal" />
      </div>
      <div class="form-container">
        <!-- 로그인 폼 -->
        <form id="sign-in-form" class="user-input-form active" novalidate>
          <div class="form-title">Sign In</div>
          <div class="input-group">
            <input type="email" id="login-email" class="input-field" placeholder=" ">
            <label for="login-email" class="input-label">Email</label>
          </div>
          <div class="input-group">
            <input type="password" id="login-password" class="input-field" placeholder=" ">
            <label for="login-password" class="input-label">Password</label>
          </div>
          <div id="error-message" class="error"></div>
          <button type="submit" class="submit-btn button type-primary">Sign In</button>
          <div class="separator"></div>
          <div class="create-account-section">
            <h1 class="heading">Not a Member?</h1>
            <h2 class="subheading">Join rewards. Get rewarded.</h2>
            <button type="button" class="switch-to-create-account button type-secondary">Create an Account</button>
          </div>
        </form>

        <!-- 회원가입 폼 -->
        <form id="create-account-form" class="user-input-form" novalidate>
          <div class="form-title" role="heading">Create an Account</div>
          <div class="form-text">Create an account so you can order your favorites even faster.</div>
          <div class="input-group">
            <input type="text" id="new-firstname" class="input-field" placeholder=" " required>
            <label for="new-firstname" class="input-label">First Name</label>
          </div>
          <div class="input-group">
            <input type="text" id="new-lastname" class="input-field" placeholder=" ">
            <label for="new-firstname" class="input-label">Last Name</label>
          </div>
          <div class="input-group">
            <input type="email" id="new-email" class="input-field" placeholder=" " required>
            <label for="new-email" class="input-label">Email</label>
          </div>
          <div class="input-group">
            <input type="password" id="new-password" class="input-field" minlength="6" maxlength="4096" placeholder=" "
              required>
            <label for="new-password" class="input-label">Password</label>
            <div class="password-requirements hidden">
              <p>Create a password with these requirements:</p>
              <ul>
                <li class="requirement length">최소 6자 이상</li>
                <li class="requirement special">특수문자 포함</li>
              </ul>
            </div>
          </div>
          <button type="submit" class="submit-btn button type-primary">Create an Account</button>
          <div class="sign-in-section">
            <span class="text">Already a Member?</span>
            <button type="button" class="switch-to-sign-in">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

export const initSignInForm = () => {
  console.log('init');
  // console.log(createAccountBtn);

  const modal = document.querySelector('.sign-in-modal');

  // 모달이 없으면 생성
  if (!modal) {
    console.log('modal');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = signInModalHTML;
    document.body.appendChild(tempDiv.firstElementChild);
    console.log('modal complete');
  }
  const signInForm = document.getElementById('sign-in-form');
  const closeBtn = modal.querySelector('.close-modal-btn');

  // 사이드바와 오버레이 함께 토글
  const toggleModal = () => {
    modal.classList.toggle('visible');
    // overlay.classList.toggle('visible');
  };

  // 사이드바와 오버레이 닫기
  const closeModal = () => {
    modal.classList.remove('visible');
    // overlay.classList.remove('visible');
  };

  // 이벤트 리스너
  closeBtn.addEventListener('click', closeModal);
  // overlay.addEventListener('click', closeModal);

  console.log('loaded!');
  return {
    toggleModal,
    closeModal,
  };

  // signInForm.addEventListener('submit', handleLogin);
  // signInForm.addEventListener('input', handleInput);

  // createAccountBtn.addEventListener('click', handleSwitchForm);
  // signInBtn.addEventListener('click', handleSwitchForm);
};

// window.addEventListener('load', () => {
//   initLoginForm();
// });

// window.addEventListener('DOMContentLoaded', () => {
//   console.log('initLoginForm');
//   initLoginForm();
// });
