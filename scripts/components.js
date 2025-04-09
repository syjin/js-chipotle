// assets/js/components.js

export const HEADER_TYPES = {
  default: '/components/header.html',
  secondary: '/components/header-secondary.html',
};

// 컴포넌트 로드를 위한 순수 함수
export const loadComponent = async (elementId, path) => {
  try {
    const response = await fetch(path);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error('Failed to load component:', error);
  }
};

// 현재 페이지의 경로에 따라 헤더 타입 결정
export const getHeaderTypeByPath = (path) =>
  path.includes('/order/') ? 'secondary' : 'default';

// 헤더 로드 함수
export const loadHeader = async () => {
  const path = window.location.pathname;
  const headerType = getHeaderTypeByPath(path);
  await loadComponent('site-header', HEADER_TYPES[headerType]);
  console.log('Header type:', getHeaderTypeByPath(window.location.pathname));
  console.log('Loaded HTML:', HEADER_TYPES[headerType]);
  // DOM 업데이트를 위한 짧은 딜레이
  // await new Promise(resolve => setTimeout(resolve, 0));

  // 헤더 로드 완료 후 이벤트 발생
  document.dispatchEvent(new CustomEvent('headerLoaded'));
};

// 아래 부분은 제거 (각 파일에서 직접 호출하도록)
// // 컴포넌트 초기화
// const initComponents = () => {
//   loadHeader();
// };

// // 페이지 로드 시 초기화
// document.addEventListener('DOMContentLoaded', initComponents);
