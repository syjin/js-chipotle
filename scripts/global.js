// 전역 함수
document.body.classList.add('preload');
const bagSidebar = document.querySelector('#sidebar .bag');

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.remove('preload');
  }, 100);

  document.body.addEventListener('click', (e) => {
    // 장바구니 메뉴 추가시 #메뉴로 이동 & 장바구니 닫기
    if (e.target.dataset.action === 'add-menu-item') {
      window.location.href = '/index.html#menu';
      bagSidebar.classList.remove('visible');
    }
  });
});
