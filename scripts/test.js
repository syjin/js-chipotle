import { menu, itemCategories } from '../data.js';

export let selected = {
  entree: {
    name: '',
    protein: [],
    rice: [],
    beans: [],
    toppings: [],
    options: [],
  },
  sides: [],
  drinks: [],
};
// URL에서 'menu' 파라미터 가져오기
const params = new URLSearchParams(window.location.search);
const selectedMenu = params.get('menu');

// 선택된 메뉴와 id가 일치하는 메뉴 찾기
const menuData = menu.find((item) => item.id === selectedMenu);

// 선택 수량 업데이트
// 디스플레이
// 선택 내용 저장

// const updateItemSelection = (category, itemId, isSelected) => {
//   if (category === 'protein') {
//     if (isSelected) {
//       selected.entree.protein.push(itemId);
//     } else {
//       selected.entree.protein = selected.entree.protein.filter(
//         (item) => item !== itemId
//       );
//     }
//   }

//   if (category === 'beans') {
//     if (isSelected) {
//       selected.entree.beans.push(itemId);
//     } else {
//       selected.entree.beans = selected.entree.beans.filter(
//         (item) => item !== itemId
//       );
//     }
//   }

//   if (category === 'rice') {
//     if (isSelected) {
//       selected.entree.rice.push(itemId);
//     } else {
//       selected.entree.rice = selected.entree.rice.filter(
//         (item) => item !== itemId
//       );
//     }
//   }

//   if (category === 'chips-and-dips' || category === 'single-sides') {
//     if (isSelected) {
//       selected.sides.push(itemId);
//     } else {
//       selected.sides = selected.sides.filter((item) => item !== itemId);
//     }
//   }

//   if (category === 'drinks') {
//     if (isSelected) {
//       selected.drinks.push(itemId);
//     } else {
//       selected.drinks = selected.drinks.filter((item) => item !== itemId);
//     }
//   }
// };

const updateItemSelection = (category, itemId, isSelected) => {
  const updateCategory = (array) =>
    isSelected ? [...array, itemId] : array.filter((item) => item !== itemId);

  // 앙트레 카테고리 업데이트
  if (['protein', 'rice', 'beans', 'toppings', 'options'].includes(category)) {
    selected.entree[category] = updateCategory(selected.entree[category]);
  }
  // 사이드 업데이트
  else if (category === 'chips-and-dips' || category === 'single-sides') {
    selected.sides = updateCategory(selected.sides);
  }
  // 음료 업데이트
  else if (category === 'drinks') {
    selected.drinks = updateCategory(selected.drinks);
  }
};

const updateOrderSummaryDisplay = () => {
  const mealDesc = document.querySelector('.meal-description .desc');

  // 선택된 프로틴 (배열에 들어있는 첫 번째 값을 사용, 배열이니까 다른 값도 있을 수 있음)
  const selectedProtein = selected.entree.protein[0] || null; // 예를 들어 첫 번째로 선택된 항목을 가져옴, 선택된 값이 없을 때 대비

  // itemCategories에서 'protein' 카테고리 찾기
  const proteinCategory = itemCategories.find(
    (category) => category.id === 'protein'
  );

  // 'protein' 카테고리에서 selectedProtein에 해당하는 데이터 찾기
  const selectedProteinData = selectedProtein
    ? proteinCategory.options.find((item) => item.id === selectedProtein)
    : null;

  const sideCount = selected.sides.length;
  const drinkCount = selected.drinks.length;

  let summaryText = '';

  if (!selectedProtein && sideCount === 0 && drinkCount === 0) {
    summaryText += 'Select a protein or veggie to get started';
  }

  // console.log(menuData.name);
  if (selectedProteinData) {
    summaryText += `${selectedProteinData.name} ${menuData.name}`;
    selected.entree.name = `${selectedProteinData.name} ${menuData.name}`;
  }

  if (sideCount > 0) {
    summaryText += `${selectedProteinData ? ', ' : ''}${sideCount} Side${
      sideCount > 1 ? 's' : ''
    }`;
  }

  if (drinkCount > 0) {
    const needsComma = sideCount > 0 || selectedProteinData;
    summaryText += `${needsComma ? ', ' : ''}${drinkCount} Drink${
      drinkCount > 1 ? 's' : ''
    }`;
  }
  // console.log(selectedProtein);
  mealDesc.innerHTML = summaryText;
};

const handleItemCardClick = (e) => {
  const selectedItemId = e.currentTarget.dataset.itemId;
  const itemSelector = e.currentTarget.closest('.item-selector');
  const itemCategory =
    itemSelector.closest('.item-category').dataset.categoryId;

  const isSelected = e.currentTarget.classList.toggle('.selected'); // 선택 상태 확인

  updateItemSelection(itemCategory, selectedItemId, isSelected);
  updateOrderSummaryDisplay();
  console.log(selected);
};

const displayOrderSummary = () => {
  document.querySelectorAll('.item-selector .card').forEach((option) => {
    option.addEventListener('click', handleItemCardClick);
  });
};

const handleAddToBag = () => {
  const addToBagBtn = document.querySelector('.add-to-bag');

  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      // Store selected data in sessionStorage (or you can use localStorage)
      sessionStorage.setItem('selectedItems', JSON.stringify(selected));

      // Redirect to index.html
      window.location.href = '/index.html';
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  displayOrderSummary();
  handleAddToBag();
});
