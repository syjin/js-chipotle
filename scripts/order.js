import { menu, itemCategories } from '../data.js';

const itemCategory = document.querySelector('.order-meal-builder');
const dietaryFilters = document.querySelector('.dietary-filters');

window.addEventListener('DOMContentLoaded', function () {
  console.log('order.js');
  const selectedMenu = sessionStorage.getItem('selectedMenu');

  if (selectedMenu) {
    console.log(`Selected menu: ${selectedMenu}`);
    // 해당 메뉴에 따른 페이지 표시 작업 수행
  }

  displayItemCategory(itemCategories);
  displayDietaryTagButtons();
});

function displayItemCategory(categories) {
  const dietaryLabels = {
    paleo: 'P',
    keto: 'K',
    vegetarian: 'V',
    vegan: 'V+',
    soy: 'S',
    lifestyle: 'L',
  };

  let display = categories.map(
    (category) => `
      <div class="item-category" id="${category.id}">
      <div class="title">${category.title}</div>
      ${category.desc ? `<div class="desc">${category.desc}</div>` : ''}
      <div class="item-selector">
        ${category.options
          .map(
            (option) => `
          <div class="card" style="background-image: url(${option.img})">
            <div class="info">
              <div class="name">${option.name}</div>
              <div class="cost-and-calories">
                ${option.cost ? `<span class="cost">$${option.cost.toFixed(2)}</span>` : ''}
                <span class="calories">${option.calories} cal</span>
              </div>
              <div class="dietary-tags">
                ${(option.dietary || []).map((tag) => `<span class="tag hidden ${tag}">${dietaryLabels[tag]}</span>`).join('')}
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
    `
  );

  // itemCategory.innerHTML = display.join('');
  itemCategory.insertAdjacentHTML('beforeend', display.join(''));
}

// 버튼 클릭 시 해당 태그가 있는 항목을 보이거나 숨김
function toggleDietaryTags(tag) {
  const tags = document.querySelectorAll(`.dietary-tags .tag`);

  tags.forEach((tagElement) => {
    // 태그 버튼과 관련된 태그인지 확인
    if (tagElement.classList.contains(tag)) {
      // hidden 클래스를 토글하여 보이거나 숨기기
      tagElement.classList.toggle('hidden');
    }
  });
}

function displayDietaryTagButtons() {
  const dietaryTags = [
    ...new Set(
      categories.flatMap((category) =>
        category.options.flatMap((option) => option.dietary || [])
      )
    ),
  ];

  const dietaryTagBtns = dietaryTags
    .map(
      (tag) => `
      <button class="dietary-tag-btn" type="button" data-dietary-tag="${tag}">${tag}</button>`
    )
    .join('');

  dietaryFilters.innerHTML = dietaryTagBtns;

  // filter
  const filterTagBtns = dietaryFilters.querySelectorAll('.dietary-tag-btn');
  filterTagBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selectedTag = e.currentTarget.dataset.dietaryTag;
      e.currentTarget.classList.toggle('active');

      toggleDietaryTags(selectedTag);
    });
  });
}
