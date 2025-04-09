import { menu, itemCategories } from '../data.js';

const getItemDetails = (categories, itemId) => {
  let itemData;

  // 배열로 전달된 카테고리들에서 순차적으로 탐색
  for (let category of categories) {
    itemData = itemCategories
      .find((cat) => cat.id === category)
      ?.options?.find((item) => item.id === itemId);

    // console.log(itemData);
    if (itemData) break; // 항목을 찾으면 반복 중지
  }

  // 항목을 찾지 못했을 경우 기본값 반환
  if (!itemData) return { name: '', price: 0 };

  return { name: itemData.name, price: itemData.cost };
};

// 앙트레 상세 정보 가져오기
const getEntreeDetails = (entree) => {
  return [
    ...entree.protein,
    ...entree.rice,
    ...entree.beans,
    ...entree.toppings,
    ...entree.options,
  ].map((itemId) => {
    const { name, price } = getItemDetails(
      ['protein', 'rice', 'beans', 'toppings', 'options'],
      itemId
    );
    return { name, price }; // 이름과 가격을 포함하는 객체 반환
  });
};

// 엔트리 카드 생성
const createEntreeCard = (name, price, details) => `
  <div class="meal-card">
    <div class="entree">
      <div class="entree-header">
        <div class="name">${name}</div>
        <div class="price">$${price.toFixed(2)}</div>
      </div>
      <div class="entree-details">${details}</div>
    </div>
    <div class="sides-and-drinks"></div>
    <ul class="actions">
      <li>Remove</li>
    </ul>
  </div>
`;

// 사이드와 음료 추가
// const addItemsToSidebar = (itemList, categories, parent) => {
//   itemList.forEach((itemId) => {
//     const { name, price } = getItemDetails(categories, itemId);
//     const itemCard = createItemCard(name, price);
//     parent
//       .querySelector('.meal-card .sides-and-drinks')
//       .insertAdjacentHTML('beforeend', itemCard);
//   });
// };

// 순수 함수로 리팩토링한 버전
const addItemsToSidebar = (itemList, categories, parent, onItemAdded) => {
  return itemList
    .map((itemId) => {
      // 아이템 정보 가져오기
      const itemDetails = getItemDetails(categories, itemId);

      // 콜백 실행 (가격 계산 등을 위해)
      if (onItemAdded) onItemAdded(itemDetails);

      // 카드 생성하여 반환
      return createItemCard(itemDetails.name, itemDetails.price);
    })
    .forEach((itemCard) => {
      const container = parent.querySelector('.meal-card .sides-and-drinks');
      if (container) {
        container.insertAdjacentHTML('beforeend', itemCard);
      }
    });
};

// 아이템 카드 생성
const createItemCard = (name, price) => `
  <div class="side-or-drink">
    <div class="name">${name}</div>
    <div class="price">$${price.toFixed(2)}</div>
  </div>
`;

// 총 가격 HTML 생성
const createTotalHTML = (total) => `
  <div class="final-total">
    <span class="text">Total</span>
    <span class="total">$${total.toFixed(2)}</span>
  </div>
`;

// 총 가격 계산 함수
const calculateTotal = (selected) => {
  const entreePrice = selected.entree.price || 0;
  const sidesPrice = selected.sides.reduce(
    (total, sideId) =>
      total + getItemDetails(['chips-and-dips', 'single-sides'], sideId).price,
    0
  );
  const drinksPrice = selected.drinks.reduce(
    (total, drinkId) => total + getItemDetails(['drinks'], drinkId).price,
    0
  );

  return entreePrice + sidesPrice + drinksPrice;
};

// const displaySelectedItems = (selectedItems) => {
//   const bagContainer = document.querySelector('.bag-sidebar-body');
//   bagContainer.innerHTML = ''; // 기존 내용을 지움

//   // 엔트리 처리
//   if (selectedItems.entree) {
//     displayEntree(selectedItems.entree, bagContainer);
//   }

//   // 사이드 처리
//   if (selectedItems.sides && selectedItems.sides.length > 0) {
//     selectedItems.sides.forEach((sideId) => {
//       displaySide(sideId, bagContainer);
//     });
//   }

//   // 음료 처리
//   if (selectedItems.drinks && selectedItems.drinks.length > 0) {
//     selectedItems.drinks.forEach((drinkId) => {
//       displayDrink(drinkId, bagContainer);
//     });
//   }

//   // 총합 계산
//   displayTotal(selectedItems, bagContainer);
// };

// 총 가격 계산 함수는 그대로 유지
// const calculateTotal = (selected) => {
//   let total = 0;

//   // 엔트리 가격
//   if (selected.entree.price) {
//     total += selected.entree.price;
//   }

//   // 사이드와 음료 가격 합산
//   const getItemPrice = (categories, itemId) => {
//     const { price } = getItemDetails(categories, itemId);
//     return price;
//   };

//   selected.sides.forEach((sideId) => {
//     total += getItemPrice(['chips-and-dips', 'single-sides'], sideId);
//   });

//   selected.drinks.forEach((drinkId) => {
//     total += getItemPrice(['drinks'], drinkId);
//   });

//   return total;
// };

// 엔트리 카드 생성

const displaySelectedItems = (selected) => {
  const bagSidebarBody = document.querySelector('.bag-sidebar-body');
  bagSidebarBody.innerHTML = ''; // 기존 내용 초기화

  const mealName = selected.entree.name;

  // 선택된 항목이 없을 경우 처리 종료
  if (
    !mealName &&
    selected.sides.length === 0 &&
    selected.drinks.length === 0
  ) {
    bagSidebarBody.innerHTML = '<div>No items selected.</div>';
    return;
  }

  // 1. has-meals 요소 생성
  const hasMeals = document.createElement('div');
  hasMeals.classList.add('has-meals');
  bagSidebarBody.appendChild(hasMeals); // has-meals를 bag-sidebar-body 안에 추가

  // 2. 엔트리 추가
  let totalEntreePrice = 0; // 엔트리 가격을 계산할 변수

  if (mealName) {
    const entreeDetails = getEntreeDetails(selected.entree)
      .map((item) => item.name)
      .join(', ')
      .replace(/,([^,]*)$/, ' and$1'); // 마지막 콤마를 'and'로 변경

    totalEntreePrice = getEntreeDetails(selected.entree).reduce(
      (sum, item) => sum + (item.price ?? 0),
      0
    );

    hasMeals.insertAdjacentHTML(
      'beforeend',
      createEntreeCard(mealName, totalEntreePrice, entreeDetails)
    );
  }

  // 3. 사이드 추가
  let totalSidesPrice = 0; // 사이드 가격을 계산할 변수
  // addItemsToSidebar(
  //   selected.sides,
  //   ['chips-and-dips', 'single-sides'],
  //   hasMeals,
  //   (sideId) => {
  //     const { price } = getItemDetails(
  //       ['chips-and-dips', 'single-sides'],
  //       sideId
  //     );
  //     totalSidesPrice += price; // 사이드 가격을 누적
  //   }
  // );
  addItemsToSidebar(
    selected.sides,
    ['chips-and-dips', 'single-sides'],
    hasMeals,
    ({ price }) => {
      totalSidesPrice += price;
    }
  );

  // 4. 음료 추가
  let totalDrinksPrice = 0; // 음료 가격을 계산할 변수
  // addItemsToSidebar(selected.drinks, ['drinks'], hasMeals, (drinkId) => {
  //   const { price } = getItemDetails(['drinks'], drinkId);
  //   totalDrinksPrice += price; // 음료 가격을 누적
  // });
  addItemsToSidebar(selected.drinks, ['drinks'], hasMeals, ({ price }) => {
    totalDrinksPrice += price;
  });

  // 5. 총 가격 계산
  const finalPrice = totalEntreePrice + totalSidesPrice + totalDrinksPrice;
  hasMeals.insertAdjacentHTML('beforeend', createTotalHTML(finalPrice));
};

window.addEventListener('DOMContentLoaded', () => {
  // Check if there are selected items in sessionStorage
  const storedSelectedItems = sessionStorage.getItem('selectedItems');
  if (storedSelectedItems) {
    const selectedItems = JSON.parse(storedSelectedItems);
    // Open the bag sidebar
    document.querySelector('.bag-sidebar').classList.add('visible');
    // Populate the sidebar with selected items
    // console.log(selectedItems);
    displaySelectedItems(selectedItems);
  }
});
