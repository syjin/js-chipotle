// 에러 메시지 정의
export const ERROR_MESSAGES = {
  'auth/app-offline': [
    'You appear to be offline.',
    'Please check your internet connection and try again.',
  ],
  'installations/app-offline': [
    'Network connection lost.',
    'Please check your internet connection.',
  ],

  'auth/invalid-email': 'Looks like an invalid email. Try again?',

  'auth/user-disabled': '비활성화된 계정입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/too-many-requests': [
    'Oops! Looks like something went wrong.',
    'Please try again later.',
  ],
  'auth/network-request-failed': '네트워크 연결을 확인해주세요.',
  'auth/invalid-login-credentials': [
    'Oops! Looks like something went wrong.',
    'Please try again later.',
  ],
  'auth/missing-password': 'Password required',
  'auth/user-not-found': [
    'Oops! Looks like your new to Chipotle.',
    'Please join us!',
  ],
  'auth/invalid-credential': 'Please check your Email or Password',
};
