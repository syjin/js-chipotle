import { createHeader } from './components/header.js';

const initApp = async () => {
  const cleanup = new Set();

  try {
    // Firebase 상태 확인
    // const { isInitialized } = checkFirebaseAvailability();
    // if (!isInitialized) {
    //   throw new Error('Firebase initialization failed');
    // }

    // 오프라인 알림 설정
    // const offlineAlert = createOfflineAlert();
    // document.body.appendChild(offlineAlert);
    // cleanup.add(setupNetworkHandlers(offlineAlert));

    // 헤더 마운트
    const header = createHeader();
    const headerCleanup = await header.mount('header');
    if (headerCleanup) cleanup.add(headerCleanup);

    // 클린업 함수 등록
    const handleUnload = () => {
      cleanup.forEach((fn) => fn());
      cleanup.clear();
    };

    window.addEventListener('unload', handleUnload);
    cleanup.add(() => window.removeEventListener('unload', handleUnload));
  } catch (error) {
    console.error('App initialization failed:', error);
    const message = error.message || '앱 초기화 중 오류가 발생했습니다.';
    console.error(message);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
