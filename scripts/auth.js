import { auth } from './lib/firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';

// export const initAuth = () => {
//   const modal = document.getElementById('auth-modal');
//   const loginForm = document.getElementById('login-form');
//   const closeButton = modal.querySelector('.close-button');
//   const signupButton = modal.querySelector('.switch-to-signup');

//   const toggleModal = () => {
//     modal.classList.toggle('hidden');
//   };

//   const closeModal = () => {
//     modal.classList.add('hidden');
//   };

//   const updateUIForLoggedInUser = (email) => {
//     const userText = document.querySelector('.user .text');
//     userText.textContent = email;
//   };

//   // 모달 닫기 이벤트
//   closeButton.addEventListener('click', closeModal);

//   // 배경 클릭시 모달 닫기
//   modal.addEventListener('click', (e) => {
//     if (e.target === modal) {
//       closeModal();
//     }
//   });

//   // 로그인 폼 제출
//   loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log('로그인 성공:', userCredential.user);
//       closeModal();
//       updateUIForLoggedInUser(userCredential.user.email);
//     } catch (error) {
//       console.error('로그인 에러:', error);
//       alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
//     }
//   });

//   // 회원가입 버튼 클릭
//   signupButton.addEventListener('click', async () => {
//     const email = document.getElementById('login-email').value;
//     const password = document.getElementById('login-password').value;

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log('회원가입 성공:', userCredential.user);
//       closeModal();
//       updateUIForLoggedInUser(userCredential.user.email);
//     } catch (error) {
//       console.error('회원가입 에러:', error);
//       alert('회원가입에 실패했습니다. 다시 시도해주세요.');
//     }
//   });

//   // 로그인 상태 감지
//   auth.onAuthStateChanged((user) => {
//     const userText = document.querySelector('.user .text');
//     if (user) {
//       userText.textContent = user.email;
//     } else {
//       userText.textContent = 'Sign In / Login';
//     }
//   });

//   return {
//     toggleModal,
//     closeModal,
//   };
// };

// auth.js 수정

// export const initAuth = () => {
//   const modal = document.getElementById('auth-modal');
//   const loginForm = document.getElementById('login-form');
//   const signupForm = document.getElementById('signup-form');
//   const switchToSignupBtn = document.querySelector('.switch-to-signup');
//   const switchToLoginBtn = document.querySelector('.switch-to-login');
//   const formTitle = document.querySelector('.form-title');
//   const passwordInput = document.getElementById('signup-password');
//   const passwordRequirements = document.querySelector('.password-requirements');

//   const toggleModal = () => {
//     modal.classList.toggle('hidden');
//   };

//   const switchForms = (toSignup) => {
//     if (toSignup) {
//       loginForm.classList.remove('active');
//       signupForm.classList.add('active');
//       formTitle.textContent = '회원가입';
//     } else {
//       signupForm.classList.remove('active');
//       loginForm.classList.add('active');
//       formTitle.textContent = '로그인';
//     }
//   };

//   // 비밀번호 유효성 검사
//   const validatePassword = (password) => {
//     const lengthRequirement = document.querySelector('.requirement.length');
//     const specialRequirement = document.querySelector('.requirement.special');

//     // 길이 검사
//     if (password.length >= 6) {
//       lengthRequirement.classList.add('valid');
//     } else {
//       lengthRequirement.classList.remove('valid');
//     }

//     // 특수문자 검사
//     if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       specialRequirement.classList.add('valid');
//     } else {
//       specialRequirement.classList.remove('valid');
//     }

//     return password.length >= 6 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
//   };

//   // 이벤트 리스너들
//   switchToSignupBtn.addEventListener('click', () => switchForms(true));
//   switchToLoginBtn.addEventListener('click', () => switchForms(false));

//   passwordInput.addEventListener('focus', () => {
//     passwordRequirements.classList.remove('hidden');
//   });

//   passwordInput.addEventListener('blur', () => {
//     passwordRequirements.classList.add('hidden');
//   });

//   passwordInput.addEventListener('input', (e) => {
//     validatePassword(e.target.value);
//   });

//   signupForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = document.getElementById('signup-email').value;
//     const password = document.getElementById('signup-password').value;
//     const firstName = document.getElementById('signup-firstname').value;
//     const lastName = document.getElementById('signup-lastname').value;

//     if (!validatePassword(password)) {
//       alert('비밀번호가 요구사항을 충족하지 않습니다.');
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       // 추가 사용자 정보 저장 (Firestore 사용 시)
//       // await updateProfile(userCredential.user, {
//       //   displayName: `${firstName} ${lastName}`
//       // });
//       console.log('회원가입 성공:', userCredential.user);
//       modal.classList.add('hidden');
//       updateUIForLoggedInUser(email);
//     } catch (error) {
//       console.error('회원가입 에러:', error);
//       alert('회원가입에 실패했습니다. 다시 시도해주세요.');
//     }
//   });

//   // 기존 로그인 폼 이벤트 리스너...

//   return {
//     toggleModal
//   };
// };

// const loginModalHTML = `
//   <div class="sign-in-modal">
//     <div class="modal-container">
//       <button class="close-modal-btn" aria-label="Close modal">
//         <img src="/assets/images/icons/dark-brown-x.png" />
//       </button>
//       <div class="modal-heading">
//         <img src="assets/images/logos/medallion-fluted-2x.png" class="modal-image" alt="Modal" />
//       </div>
//       <div class="form-container">
//         <!-- 로그인 폼 -->
//         <form id="sign-in-form" class="user-input-form active" novalidate>
//           <div class="form-title">Sign In</div>
//           <div class="input-group">
//             <input type="email" id="login-email" class="input-field" placeholder=" ">
//             <label for="login-email" class="input-label">Email</label>
//           </div>
//           <div class="input-group">
//             <input type="password" id="login-password" class="input-field" placeholder=" ">
//             <label for="login-password" class="input-label">Password</label>
//           </div>
//           <div id="error-message" class="error"></div>
//           <button type="submit" class="submit-btn button type-primary">Sign In</button>
//           <div class="separator"></div>
//           <div class="create-account-section">
//             <h1 class="heading">Not a Member?</h1>
//             <h2 class="subheading">Join rewards. Get rewarded.</h2>
//             <button type="button" class="switch-to-create-account button type-secondary">Create an Account</button>
//           </div>
//         </form>

//         <!-- 회원가입 폼 -->
//         <form id="create-account-form" class="user-input-form" novalidate>
//           <div class="form-title" role="heading">Create an Account</div>
//           <div class="form-text">Create an account so you can order your favorites even faster.</div>
//           <div class="input-group">
//             <input type="text" id="new-firstname" class="input-field" placeholder=" " required>
//             <label for="new-firstname" class="input-label">First Name</label>
//           </div>
//           <div class="input-group">
//             <input type="text" id="new-lastname" class="input-field" placeholder=" ">
//             <label for="new-firstname" class="input-label">Last Name</label>
//           </div>
//           <div class="input-group">
//             <input type="email" id="new-email" class="input-field" placeholder=" " required>
//             <label for="new-email" class="input-label">Email</label>
//           </div>
//           <div class="input-group">
//             <input type="password" id="new-password" class="input-field" minlength="6" maxlength="4096" placeholder=" "
//               required>
//             <label for="new-password" class="input-label">Password</label>
//             <div class="password-requirements hidden">
//               <p>Create a password with these requirements:</p>
//               <ul>
//                 <li class="requirement length">최소 6자 이상</li>
//                 <li class="requirement special">특수문자 포함</li>
//               </ul>
//             </div>
//           </div>
//           <button type="submit" class="submit-btn button type-primary">Create an Account</button>
//           <div class="sign-in-section">
//             <span class="text">Already a Member?</span>
//             <button type="button" class="switch-to-sign-in">Sign In</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// `;

// export const initAuth = () => {
//   // 모달이 없으면 생성
//   if (!document.querySelector('.sign-in-modal')) {
//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = loginModalHTML;
//     document.body.appendChild(tempDiv.firstElementChild);
//   }

//   const modal = document.querySelector('.sign-in-modal');
//   const closeBtn = modal.querySelector('.close-modal-btn');
//   const overlay = document.querySelector('#sidebar-overlay');

//   // Form elements
//   const signInForm = document.getElementById('sign-in-form');
//   const createAccountForm = document.getElementById('create-account-form');
//   const createAccountBtn = document.querySelector('.switch-to-create-account');
//   const signInBtn = document.querySelector('.switch-to-sign-in');
//   const formContainer = document.querySelector('.form-container');

//   // Toggle modal visibility
//   const toggleModal = () => {
//     modal.classList.toggle('visible');
//     overlay.classList.toggle('visible');
//   };

//   const closeModal = () => {
//     const isVisible = modal.classList.contains('visible');
//     // Reset forms when closing modal
//     if (isVisible) {
//       signInForm.reset();
//       createAccountForm.reset();
//       formContainer.classList.remove('switch');
//       // Remove any error states
//       const errorInputs = modal.querySelectorAll('.error');
//       errorInputs.forEach((input) => input.classList.remove('error'));
//       const errorMessage = document.getElementById('error-message');
//       if (errorMessage) errorMessage.classList.remove('show');
//     }
//     modal.classList.remove('visible');
//     overlay.classList.remove('visible');
//     // Set appropriate aria-hidden
//     // modal.setAttribute('aria-hidden', !isVisible);
//     // overlay.setAttribute('aria-hidden', !isVisible);
//   };

//   // Switch between sign in and create account forms
//   const handleSwitchForm = () => {
//     formContainer.classList.toggle('switch');
//     // Reset forms when switching
//     signInForm.reset();
//     createAccountForm.reset();
//     // Clear any error states
//     const errorInputs = modal.querySelectorAll('.error');
//     errorInputs.forEach((input) => input.classList.remove('error'));
//     const errorMessage = document.getElementById('error-message');
//     if (errorMessage) errorMessage.classList.remove('show');
//   };

//   // Event Listeners
//   closeBtn.addEventListener('click', closeModal);
//   overlay.addEventListener('click', closeModal);

//   // Form switch buttons
//   // createAccountBtn.addEventListener('click', handleSwitchForm);
//   // signInBtn.addEventListener('click', handleSwitchForm);

//   // Close modal on escape key
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && modal.classList.contains('visible')) {
//       closeModal();
//     }
//   });

//   // Initialize form handlers
//   // const { initLoginForm } = await import('./login.js');
//   // initLoginForm();

//   return { toggleModal };
// };
