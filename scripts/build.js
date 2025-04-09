import { menu, itemCategories } from '../data.js';

const mealBuilderContainer = document.querySelector('.order-meal-builder');
const dietaryFilters = document.querySelector('.dietary-filters');

let selectedItems = {
  protein: [],
  rice: [],
  beans: [],
  toppings: [],
  options: [],
  sides: [],
  drinks: [],
};

window.addEventListener('DOMContentLoaded', () => {
  // URL에서 'menu' 파라미터 가져오기
  const params = new URLSearchParams(window.location.search);
  const selectedMenu = params.get('menu');

  // 선택된 메뉴와 id가 일치하는 메뉴 찾기
  const menuData = menu.find((item) => item.id === selectedMenu);
  // console.log(menuData);

  if (menuData) {
    // 메뉴 데이터가 존재할 때 화면에 표시
    displayOrderMealHeader(menuData);
    // console.log(menuData);
    displayItemCategories(menuData.availableCategories);
    itemSelection();
  } else {
    console.error('해당 메뉴를 찾을 수 없습니다.');
  }
  // displayOrderSummary();

  // displayDietaryTagButtons();
  // displayItemCategory(itemCategories);
});

function displayOrderMealHeader(orderMenu) {
  const orderMealHeader = document.querySelector('.order-meal-header');

  orderMealHeader.innerHTML = `
    <img src="${orderMenu.img}" class="image" alt="${orderMenu.name}">
      <div class="text">
        <div class="heading">BUILD YOUR</div>
        <div class="name">${orderMenu.name}</div>
        <div class="desc">${orderMenu.desc}</div>
      </div>
  `;
}

// function displayItemCategory(categories) {
//   const dietaryLabels = {
//     paleo: 'P',
//     keto: 'K',
//     vegetarian: 'V',
//     vegan: 'V+',
//     soy: 'S',
//     lifestyle: 'L',
//   };

//   let display = categories.map(
//     (category) => `
//       <div class="item-category" id="${category.id}">
//       <div class="title">${category.title}</div>
//       ${category.desc ? `<div class="desc">${category.desc}</div>` : ''}
//       <div class="item-selector">
//         ${category.options
//           .map(
//             (option) => `
//           <div class="card" style="background-image: url(${option.img})">
//             <div class="info">
//               <div class="name">${option.name}</div>
//               <div class="cost-and-calories">
//                 ${option.cost ? `<span class="cost">$${option.cost.toFixed(2)}</span>` : ''}
//                 <span class="calories">${option.calories} cal</span>
//               </div>
//               <div class="dietary-tags">
//                 ${(option.dietary || []).map((tag) => `<span class="tag hidden ${tag}">${dietaryLabels[tag]}</span>`).join('')}
//               </div>
//             </div>
//           </div>
//         `
//           )
//           .join('')}
//       </div>
//     </div>
//     `
//   );

//   // itemCategory.innerHTML = display.join('');
//   itemCategory.insertAdjacentHTML('beforeend', display.join(''));
// }

// 버튼 클릭 시 해당 태그가 있는 항목을 보이거나 숨김

function displayItemCategories(availableCategories) {
  const dietaryLabels = {
    paleo: 'P',
    keto: 'K',
    vegetarian: 'V',
    vegan: 'V+',
    soy: 'S',
    lifestyle: 'L',
  };

  Object.entries(availableCategories).forEach(([categoryId, options]) => {
    // console.log(categoryId, options);
    const category = itemCategories.find(
      (itemCategory) => itemCategory.id === categoryId
    );
    // console.log(categoryData);
    if (category) {
      const categoryHTML = `
        <div class="item-category" data-category-id="${category.id}">
          <div class="title">${category.title}</div>
        ${category.desc ? `<div class="desc">${category.desc}</div>` : ''}
          <div class="item-selector">
            ${options
              .map((optionId) => {
                const option = category.options.find(
                  (opt) => opt.id === optionId
                );
                return option
                  ? `
                <div class="card" data-item-id="${option.id}" style="background-image: url(${option.img})">
                  <div class="info">
                    <div class="name">${option.name}</div>
                    <div class="cost-and-calories">
                      ${option.cost ? `<span class="cost">$${option.cost.toFixed(2)}</span>` : ''}
                      <span class="calories">${option.calories} cal</span>
                    </div>
                  </div>
                  <div class="card-selection-overlay hidden">
                    <div class="selection-button">
                      <span class="check"></span>
                    </div>
                  </div>
                </div>
              `
                  : '';
              })
              .join('')}
          </div>
        </div>
      `;
      mealBuilderContainer.insertAdjacentHTML('beforeend', categoryHTML);
    }
  });
}

function itemSelection() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const selectedCard = card.querySelector('.card-selection-overlay');
      selectedCard.classList.toggle('hidden');
    });
  });
}

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

// Order Meal Footer
// const selectedItems = {
//   protein: null,
//   toppings: [],
//   drinks: [],
// };

// function updateOrderSummary() {
//   const mealDesc = document.querySelector('.meal-description .desc');
//   // // console.log(mealDesc);

//   // if (true) {
//   //   const proteinName = selectedItems.protein.name;
//   //   const drinkCount = selectedItems.drinks.length;
//   //   const toppingCount = selectedItems.toppings.length;

//   //   let summaryText = `${proteinName} Burrito`;

//   //   // if (drinkCount > 0) {
//   //   //   summaryText += `, ${drinkCount} Drinks`;
//   //   // }
//   //   if (toppingCount > 0) {
//   //     summaryText += `, ${toppingCount} Toppings`;
//   //   }

//   //   mealDesc.textContent = summaryText;
//   // } else {
//   //   mealDesc.textContent = 'Select a protein or veggie to get started';
//   // }
//   // console.log(selectedItems.toppings.length);

//   //

//   // let summaryText = '';
//   // console.log(selectedItems.toppings);
//   // if (selectedItems.toppings) {
//   //   mealDesc.textContent = 'Select a protein or veggie to get started';
//   // }
//   // if (selectedItems.toppings) {
//   //   // console.log(selectedItems.toppings);
//   //   const toppingCount = selectedItems.toppings.length;

//   //   if (selectedItems.toppings.length > 0) {
//   //     summaryText += `, ${toppingCount} Topping(s)`;
//   //   }
//   //   mealDesc.textContent = summaryText;
//   // }

//   //

//   const { protein, drinks, toppings, sides } = selectedItems;

//   // 프로틴 선택 여부 확인
//   const proteinName = protein ? protein.name : '';

//   // 음료 및 사이드 갯수 계산
//   const drinkCount = drinks.length;
//   const sideCount = sides ? sides.length : 0;

//   // 토핑 목록 만들기
//   const selectedToppingsNames = toppings.map((topping) => topping.name);

//   // 주문 요약 텍스트 생성
//   let summaryText = proteinName
//     ? `${proteinName} Burrito`
//     : 'Select a protein or veggie to get started';

//   if (proteinName) {
//     if (drinkCount > 0) {
//       summaryText += `, ${drinkCount} Drink${drinkCount > 1 ? 's' : ''}`;
//     }
//     if (sideCount > 0) {
//       summaryText += `, ${sideCount} Side${sideCount > 1 ? 's' : ''}`;
//     }

//     if (selectedToppingsNames.length > 0) {
//       summaryText += ` with ${selectedToppingsNames.join(', ')}`;
//     }
//   }

//   // 요약 텍스트를 UI에 반영
//   descriptionElement.textContent = summaryText;
// }

// function updateOrderSummary() {
//   const descriptionElement = document.querySelector('.meal-description .desc');

//   // 선택된 프로틴
//   const selectedProtein =
//     selectedItems.protein?.map((item) => item.name).join(' and ') || '';
//   // 선택된 음료 수
//   const drinkCount = selectedItems.drinks?.length || 0;
//   // 선택된 토핑들
//   const selectedToppings =
//     selectedItems.toppings?.map((item) => item.name).join(', ') || '';

//   let summaryText = selectedProtein
//     ? `${selectedProtein} Burrito`
//     : 'Select a protein or veggie to get started';

//   if (drinkCount > 0) {
//     summaryText += `, ${drinkCount} Drinks`;
//   }

//   if (selectedToppings) {
//     summaryText += `, with ${selectedToppings}`;
//   }

//   descriptionElement.textContent = summaryText;
// }

function updateOrderSummary() {
  const descriptionElement = document.querySelector('.meal-description .desc');

  // 선택된 프로틴과 음료 및 사이드 수를 가져옵니다.
  const proteinName = selectedItems.protein ? selectedItems.protein.name : null;
  const drinkCount = selectedItems.drinks.length;
  const sideCount = selectedItems.sides.length;

  let summaryText = '';

  // 프로틴이 선택되지 않았을 경우 기본 메시지를 설정합니다.
  if (!proteinName) {
    summaryText = 'Select a protein or veggie to get started';
  } else {
    summaryText = `${proteinName} Burrito`; // 기본 메시지

    // 사이드와 음료 수를 기반으로 추가 메시지 설정
    if (sideCount > 0) {
      summaryText += `, ${sideCount} Side${sideCount > 1 ? 's' : ''}`;
    }

    if (drinkCount > 0) {
      summaryText += `, ${drinkCount} Drink${drinkCount > 1 ? 's' : ''}`;
    }
  }

  descriptionElement.textContent = summaryText; // 요약 텍스트 업데이트
}

// document.querySelectorAll('#toppings .card').forEach((option) => {
//   console.log(option);
// });

// function displayOrderSummary() {
//   document.querySelectorAll('#toppings .card').forEach((option) => {
//     option.addEventListener('click', (e) => {
//       const selectedToppingsId = e.currentTarget.dataset.itemId;
//       const toppingsCategory = itemCategories.find(
//         (category) => category.id === 'toppings'
//       );
//       const selectedTopping = toppingsCategory
//         ? toppingsCategory.options.find(
//             (item) => item.id === selectedToppingsId
//           )
//         : null;

//       if (!selectedItems.toppings.includes(selectedTopping)) {
//         selectedItems.toppings.push(selectedTopping);
//       }
//       updateOrderSummary();
//     });
//   });
// }

// function displayOrderSummary() {
//   document.querySelectorAll('#toppings .card').forEach((option) => {
//     option.addEventListener('click', (e) => {
//       const selectedToppingsId = e.currentTarget.dataset.itemId;
//       const toppingsCategory = itemCategories.find(
//         (category) => category.id === 'toppings'
//       );
//       const selectedTopping = toppingsCategory
//         ? toppingsCategory.options.find(
//             (item) => item.id === selectedToppingsId
//           )
//         : null;

//       if (selectedTopping) {
//         const index = selectedItems.toppings.findIndex(
//           (item) => item.id === selectedTopping.id
//         );

//         if (index === -1) {
//           // 배열에 없으면 추가
//           selectedItems.toppings.push(selectedTopping);
//         } else {
//           // 배열에 있으면 제거
//           selectedItems.toppings.splice(index, 1);
//         }

//         updateOrderSummary();
//       }
//     });
//   });
// }

// function displayOrderSummary() {
//   const toppingsCategory = itemCategories.find(
//     (category) => category.id === 'toppings'
//   );

//   if (!toppingsCategory) return; // 카테고리가 없으면 함수 종료

//   document.querySelectorAll('#toppings .card').forEach((option) => {
//     option.addEventListener('click', (e) => {
//       const selectedTopping = toppingsCategory.options.find(
//         (item) => item.id === e.currentTarget.dataset.itemId
//       );

//       if (!selectedTopping) return; // 선택된 토핑이 없으면 종료

//       selectedItems.toppings = selectedItems.toppings.some(
//         (item) => item.id === selectedTopping.id
//       )
//         ? selectedItems.toppings.filter(
//             (item) => item.id !== selectedTopping.id
//           ) // 이미 있으면 제거
//         : [...selectedItems.toppings, selectedTopping]; // 없으면 추가

//       updateOrderSummary();
//     });
//   });
// }

// function displayOrderSummary() {
//   // 모든 카테고리를 순회하며 카드 요소에 이벤트 리스너 추가
//   itemCategories.forEach((category) => {
//     document.querySelectorAll(`#${category.id} .card`).forEach((option) => {
//       option.addEventListener('click', (e) => {
//         const selectedItemId = e.currentTarget.dataset.itemId;

//         // 선택한 카테고리에서 선택된 아이템을 찾음
//         const selectedCategory = itemCategories.find(
//           (cat) => cat.id === category.id
//         );
//         const selectedItem = selectedCategory
//           ? selectedCategory.options.find((item) => item.id === selectedItemId)
//           : null;

//         if (!selectedItem) return;

//         // 카테고리별로 선택된 항목 관리
//         const categorySelectedItems = selectedItems[category.id] || [];
//         const index = categorySelectedItems.findIndex(
//           (item) => item.id === selectedItem.id
//         );

//         if (index === -1) {
//           // 선택되지 않은 경우 추가
//           if (category.id === 'protein' && categorySelectedItems.length >= 2) {
//             alert('You can only select up to two proteins.');
//             return;
//           }
//           categorySelectedItems.push(selectedItem);
//         } else {
//           // 이미 선택된 경우 해제
//           categorySelectedItems.splice(index, 1);
//         }

//         // 선택된 항목을 상태에 저장
//         selectedItems[category.id] = categorySelectedItems;

//         // 주문 요약 정보 업데이트
//         updateOrderSummary();
//       });
//     });
//   });
// }

function displayOrderSummary() {
  const categoryIds = ['protein', 'chips-and-dips', 'single-sides', 'drinks'];

  categoryIds.forEach((categoryId) => {
    document.querySelectorAll(`#${categoryId} .card`).forEach((option) => {
      option.addEventListener('click', (e) => {
        const selectedItemId = e.currentTarget.dataset.itemId;
        const category = itemCategories.find((cat) => cat.id === categoryId);
        const selectedItem = category.options.find(
          (item) => item.id === selectedItemId
        );

        // 선택한 항목 추가 또는 제거
        if (categoryId === 'protein') {
          selectedItems.protein = selectedItem; // 프로틴은 하나만 선택
        } else if (categoryId === 'drinks') {
          const drinkIndex = selectedItems.drinks.findIndex(
            (item) => item.id === selectedItemId
          );
          if (drinkIndex >= 0) {
            selectedItems.drinks.splice(drinkIndex, 1); // 선택된 음료가 있다면 제거
          } else {
            selectedItems.drinks.push(selectedItem); // 선택되지 않은 경우 추가
          }
        } else {
          const sideIndex = selectedItems.sides.findIndex(
            (item) => item === selectedItemId
          );
          if (sideIndex >= 0) {
            selectedItems.sides.splice(sideIndex, 1); // 선택된 사이드가 있다면 제거
          } else {
            selectedItems.sides.push(selectedItemId); // 선택되지 않은 경우 추가
          }
        }

        updateOrderSummary(); // 요약 업데이트
      });
    });
  });

  updateOrderSummary(); // 초기 업데이트
}
