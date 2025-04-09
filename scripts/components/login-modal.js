// js/components/modal/modal.js
export const createModal = ({ title, content }) => {
  const modalTemplate = `
      <div class="modal-overlay">
          <div class="modal-content">
              <button class="modal-close">&times;</button>
              <h2>${title}</h2>
              ${content}
          </div>
      </div>
  `;

  let modalElement = null;

  const initialize = () => {
      const div = document.createElement('div');
      div.innerHTML = modalTemplate;
      modalElement = div.firstElementChild;
      document.body.appendChild(modalElement);

      const closeBtn = modalElement.querySelector('.modal-close');
      closeBtn.addEventListener('click', close);
      modalElement.addEventListener('click', (e) => {
          if (e.target === modalElement) close();
      });
  };

  const open = () => {
      if (!modalElement) initialize();
      modalElement.style.display = 'block';
  };

  const close = () => {
      if (modalElement) {
          modalElement.style.display = 'none';
      }
  };

  return { open, close };
};