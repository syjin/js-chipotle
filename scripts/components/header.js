import { createAuthService } from '../services/auth.js';
import { primaryHeaderTemplate } from './components.template.js';

export const createHeader = () => {
  const authService = createAuthService();
  let headerElement = null;
  let bagSidebar = null;
  let overlay = null;
  let signInModal = null;
  let currentForm = 'signIn'; // 'signIn' 또는 'createAccount'

  const initializeModal = () => {
    signInModal = document.querySelector('.sign-in-modal');
    const signInForm = document.getElementById('sign-in-form');
    const createAccountForm = document.getElementById('create-account-form');
    const closeModalBtn = signInModal.querySelector('.close-modal-btn');
    const switchToCreateAccountBtn = signInModal.querySelector(
      '.switch-to-create-account'
    );
    const switchToSignInBtn = signInModal.querySelector('.switch-to-sign-in');
    const newPasswordInput = document.getElementById('new-password');
    const passwordRequirements = signInModal.querySelector(
      '.password-requirements'
    );

    // 비밀번호 입력 필드 포커스 시 요구사항 표시
    newPasswordInput?.addEventListener('focus', () => {
      passwordRequirements?.classList.remove('hidden');
    });

    newPasswordInput?.addEventListener('blur', () => {
      passwordRequirements?.classList.add('hidden');
    });

    // 비밀번호 유효성 검사
    newPasswordInput?.addEventListener('input', (e) => {
      const password = e.target.value;
      const lengthRequirement = passwordRequirements?.querySelector('.length');
      const specialRequirement =
        passwordRequirements?.querySelector('.special');

      if (lengthRequirement) {
        lengthRequirement.classList.toggle('met', password.length >= 6);
      }

      if (specialRequirement) {
        specialRequirement.classList.toggle(
          'met',
          /[!@#$%^&*(),.?":{}|<>]/.test(password)
        );
      }
    });

    // 로그인 폼 제출 부분
    signInForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const errorMessage = document.getElementById('error-message');

      try {
        const result = await authService.login({ email, password });
        if (result.success) {
          closeModal();
          signInForm.reset();
          errorMessage.textContent = ''; // 에러 메시지 초기화
        } else {
          errorMessage.textContent = result.error;
          // 여러 줄 메시지 처리
          if (result.error.includes('\n')) {
            errorMessage.innerHTML = result.error
              .split('\n')
              .map((msg) => `<div>${msg}</div>`)
              .join('');
          } else {
            errorMessage.textContent = result.error;
          }
        }
      } catch (error) {
        errorMessage.textContent = 'Something went wrong. Please try again.';
      }
    });

    // 회원가입 폼 제출 부분
    createAccountForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const firstName = document.getElementById('new-firstname').value;
      const lastName = document.getElementById('new-lastname').value;
      const email = document.getElementById('new-email').value;
      const password = document.getElementById('new-password').value;
      const errorMessage =
        createAccountForm.querySelector('.error-message') ||
        document.createElement('div');

      if (!errorMessage.classList.contains('error-message')) {
        errorMessage.classList.add('error-message', 'error');
        createAccountForm.querySelector('.submit-btn').before(errorMessage);
      }

      try {
        const result = await authService.signup({
          email,
          password,
          name: `${firstName} ${lastName}`.trim(),
        });

        if (result.success) {
          closeModal();
          createAccountForm.reset();
          errorMessage.textContent = ''; // 에러 메시지 초기화
        } else {
          // 여러 줄 메시지 처리
          if (result.error.includes('\n')) {
            errorMessage.innerHTML = result.error
              .split('\n')
              .map((msg) => `<div>${msg}</div>`)
              .join('');
          } else {
            errorMessage.textContent = result.error;
          }
        }
      } catch (error) {
        errorMessage.textContent = 'Something went wrong. Please try again.';
      }
    });

    // 모달 닫기
    closeModalBtn?.addEventListener('click', closeModal);

    // 폼 전환 버튼들
    switchToCreateAccountBtn?.addEventListener('click', () => {
      signInForm?.classList.remove('active');
      createAccountForm?.classList.add('active');
      currentForm = 'createAccount';
    });

    switchToSignInBtn?.addEventListener('click', () => {
      createAccountForm?.classList.remove('active');
      signInForm?.classList.add('active');
      currentForm = 'signIn';
    });

    // 모달 외부 클릭 시 닫기
    signInModal?.addEventListener('click', (e) => {
      if (e.target === signInModal) {
        closeModal();
      }
    });
  };

  const openModal = () => {
    signInModal?.classList.add('visible');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
  };

  const closeModal = () => {
    signInModal?.classList.remove('visible');
    document.body.style.overflow = '';
  };

  // 헤더 UI 업데이트
  const updateUI = (user) => {
    if (!headerElement) return;

    const userButton = headerElement.querySelector('.user');
    if (!userButton) return;

    if (user) {
      // 로그인 상태일 때
      userButton.querySelector('.text').textContent =
        user.displayName || '내 계정';
      userButton.classList.add('logged-in');
    } else {
      // 로그아웃 상태일 때
      userButton.querySelector('.text').textContent = 'Sign In / Login';
      userButton.classList.remove('logged-in');
    }
  };

  // 이벤트 핸들러들
  const handleUserClick = () => {
    const user = authService.getCurrentUser();
    if (user) {
      // 사용자 메뉴 표시 로직
      console.log('Show user menu');
    } else {
      openModal();
    }
  };

  const handleBagClick = () => {
    bagSidebar?.classList.add('open');
    overlay?.classList.add('visible');
  };

  const handleOverlayClick = () => {
    bagSidebar?.classList.remove('open');
    overlay?.classList.remove('visible');
  };

  // 컴포넌트 마운트
  const mount = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // HTML 삽입
    container.innerHTML = primaryHeaderTemplate;
    headerElement = container.querySelector('.header-wrapper');
    bagSidebar = document.querySelector('.bag-sidebar');
    overlay = document.getElementById('sidebar-overlay');

    // 이벤트 리스너 초기화
    const userButton = headerElement?.querySelector('.user');
    const bagButton = headerElement?.querySelector('.bag');
    const closeButton = bagSidebar?.querySelector('.close-btn');

    userButton?.addEventListener('click', handleUserClick);
    bagButton?.addEventListener('click', handleBagClick);
    overlay?.addEventListener('click', handleOverlayClick);
    closeButton?.addEventListener('click', handleOverlayClick);

    // 모달 초기화
    initializeModal();

    // 인증 상태 변경 감지
    const unsubscribe = authService.onAuthStateChange(updateUI);

    // 초기 UI 상태 설정
    updateUI(authService.getCurrentUser());

    // 클린업 함수 반환
    return () => {
      userButton?.removeEventListener('click', handleUserClick);
      bagButton?.removeEventListener('click', handleBagClick);
      overlay?.removeEventListener('click', handleOverlayClick);
      closeButton?.removeEventListener('click', handleOverlayClick);
      unsubscribe();
    };
  };

  return { mount };
};
