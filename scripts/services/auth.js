import { auth } from '../config/firebase.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { ERROR_MESSAGES } from '../utils/constants.js';

// export const createAuthService = () => {
//   let currentUser = null;
//   let authStateListeners = new Set();

//   // 인증 상태 변경 감지
//   onAuthStateChanged(auth, (user) => {
//     currentUser = user;
//     notifyAuthStateChange();
//   });

//   // 인증 상태 변경 알림
//   const notifyAuthStateChange = () => {
//     authStateListeners.forEach((listener) => listener(currentUser));
//   };

//   return {
//     // 이메일 & 비밀번호로 회원가입
//     async createAccount({ email, password, name }) {
//       try {
//         const { user } = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         await updateProfile(user, { displayName: name });
//         return { success: true, user };
//       } catch (error) {
//         return {
//           success: false,
//           error: error.message,
//         };
//       }
//     },

//     // 로그인
//     async login({ email, password }) {
//       try {
//         const { user } = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         return { success: true, user };
//       } catch (error) {
//         return {
//           success: false,
//           error: error.message,
//         };
//       }
//     },

//     // 로그아웃
//     async logout() {
//       try {
//         await signOut(auth);
//         return { success: true };
//       } catch (error) {
//         return {
//           success: false,
//           error: error.message,
//         };
//       }
//     },

//     // 현재 사용자 가져오기
//     getCurrentUser() {
//       return currentUser;
//     },

//     // 인증 상태 변경 리스너 추가
//     onAuthStateChange(listener) {
//       authStateListeners.add(listener);
//       return () => authStateListeners.delete(listener);
//     },
//   };
// };

export const createAuthService = () => {
  let currentUser = null;
  let authStateListeners = new Set();

  // 인증 상태 변경 감지
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    notifyAuthStateChange();
  });

  // 인증 상태 변경 알림
  const notifyAuthStateChange = () => {
    authStateListeners.forEach((listener) => listener(currentUser));
  };

  // Firebase 에러 메세지 처리
  const getErrorMessage = (errorCode) => {
    const message = ERROR_MESSAGES[errorCode];

    // 배열 형태의 에러 메세지인 경우 줄바꿈으로 연결
    if (Array.isArray(message)) return message.join('\n');

    // 정의되지 않은 에러의 경우 기본 메세지 반환
    return (
      message ||
      'Oops! Looks like something went wrong.\nPlease try again later.'
    );
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    const isLengthValid = password.length > 5;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: isLengthValid && hasSpecialChar,
      errors: {
        length: !isLengthValid,
        special: !hasSpecialChar,
      },
    };
  };

  return {
    async signup({ email, password, name }) {
      try {
        // 비밀번호 유효성 검사
        const { isValid, errors } = validatePassword(password);

        if (!isValid) {
          const errorMessages = [];
          if (errors.length)
            errorMessages.push('Password must be at least 6 characters');
          if (errors.special)
            errorMessages.push('Password must include special characters');
          return {
            success: false,
            error: errorMessages.join('\n'),
          };
        }

        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: name });
        return { success: true, user };
      } catch (error) {
        return {
          success: false,
          error: getErrorMessage(error.code),
        };
      }
    },

    async login({ email, password }) {
      try {
        if (!password) {
          return {
            success: false,
            error: getErrorMessage('auth/missing-password'),
          };
        }

        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return { success: true, user };
      } catch (error) {
        return {
          success: false,
          error: getErrorMessage(error.code),
        };
      }
    },

    async logout() {
      try {
        await signOut(auth);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: getErrorMessage(error.code),
        };
      }
    },

    getCurrentUser() {
      return currentUser;
    },

    onAuthStateChange(listener) {
      authStateListeners.add(listener);
      return () => authStateListeners.delete(listener);
    },
  };
};
