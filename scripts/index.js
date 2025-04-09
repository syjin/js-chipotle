import { menu, itemCategories } from '../data.js';
import { selected } from './test.js';

// import { loadHeader } from './components.js';
// import { updateBagDisplay } from './bag-temp-3.js';

// import { insertPrimaryHeader } from './components-temp.js';

const init = async () => {
  // headerLoaded 이벤트 리스너
  document.addEventListener('headerLoaded', () => {
    console.log('Header loaded, initializing bag...');
    updateBagDisplay();
  });
  await loadHeader();
};

const menuContainer = document.querySelector('#menu');

const displayMenuItems = (menu) => {
  let displayMenu = menu.map((item) => {
    // console.log(item);
    return `
      <div class="menu-item" data-menu="${item.id}">
      <div class="thumbnail">
        <img src="${item.img}" alt="${item.name}" />
      </div>
      <div class="text">
        <div class="menu-name">${item.name}</div>
        <div class="order-cta">ORDER <span class="arrow-right"></span></div>
      </div>
    </div>
    `;
  });

  // console.log(displayMenu);
  displayMenu = displayMenu.join('');
  menuContainer.innerHTML = displayMenu;
};

const navigateToOrderMenuPage = () => {
  // 메뉴 아이템을 선택
  const menuItems = document.querySelectorAll('.menu-item');

  // 각 메뉴 아이템에 클릭 이벤트 리스너 추가
  // menuItems.forEach((item) => {
  //   item.addEventListener('click', () => {
  //     // data-menu 속성값 가져오기
  //     const menu = item.getAttribute('data-menu');
  //     // 해당 메뉴에 따른 URL 생성
  //     const url = `/order/${menu.toLowerCase().replace(' ', '-')}.html`;
  //     // 페이지 이동
  //     window.location.href = url;
  //   });
  // });

  menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      // data-menu 속성값 가져오기
      const menu = e.currentTarget.dataset.menu;

      // sessionStorage를 사용하여 data-menu 값을 저장
      // sessionStorage.setItem('selectedMenu', menu);

      // 해당 메뉴에 따른 URL 생성
      // const url = `/order/${menu.toLowerCase().replace(' ', '-')}.html`;
      // 페이지 이동
      // window.location.href = url;
      window.location.href = `/order/build.html?menu=${encodeURIComponent(menu)}`;
    });
  });
};

const findItemById = (itemId) => {
  return itemCategories.find((item) => item.id === itemId);
};

// function displaySelectedItems(selectedItemCategories) {
//   console.log(selectedItemCategories);
//   const sidebarContent = document.querySelector('.bag-sidebar-body');
//   sidebarContent.innerHTML = '';

//   const selectedEntree = selectedItemCategories.entree;

//   // console.log(selectedEntree);

//   Object.keys(selectedEntree).forEach((category) => {
//     const categoryData = itemCategories.find((cat) => cat.id === category);
//     // console.log(category);
//     if (categoryData) {
//       const items = categoryData.options;
//       items.forEach((item) => {});
//     }
//   });

//   // if (Object.keys(selectedEntree))
//   // console.log(findItemById(Object.keys(selectedEntree)));

//   // console.log(itemCategories.find(category => category.id === Object.keys(selectedEntree)));

//   Object.keys(selectedItemCategories).map((category) => {
//     // sidebarContent.innerHTML = category;
//     // console.log(selectedItemCategories.entree.name);
//   });
//   // console.log(Object.values(selectedItemCategories.entree));
//   // const test = Object.values(selectedItemCategories.entree).filter(
//   //   (category) => typeof category === 'object'
//   // );
//   // console.log(test);
//   sidebarContent.innerHTML = `
//     <div>${selectedEntree.name}</div>
//     <div></div>
//   `;
// }

// function displaySelectedItemss(categories) {
//   const sidebarContent = document.querySelector('.bag-sidebar-body');

//   // Clear existing content
//   sidebarContent.innerHTML = '';

//   // Loop through `items` and add to the sidebar
//   Object.keys(categories).maps((category) => {
//     // console.log('items.entree.name: ', items.entree.name);
//     // console.log('category: ', category);

//     // const itemCategory = items[category]; // entree

//     // console.log('categories: ', categories);
//     // console.log('category: ', category);

//     const itemCategory = categories[category];

//     if (typeof itemCategory === 'object' && itemCategory !== null) {
//       const selectedEntree = categories.entree;
//       const selectedSides = categories.sides;
//       const selectedDrinks = categories.drinks;

//       Object.keys(selectedEntree).forEach((itemCategories) => {
//         // console.log(selectedEntree.name);
//         sidebarContent.innerHTML += `${selectedEntree.name}`;
//       });
//     }
//     // console.log(typeof categories[category]);
//     // 다시 시작
//     // selected 구조 분해

//     // console.log(itemCategory);

//     // For entree categories like protein, rice, etc.
//     // if (typeof itemCategory === 'object' && itemCategory !== null) {
//     //   Object.keys(itemCategory).forEach((subCategory) => {
//     //     // console.log('itemCat');

//     //     const test = findItemById(itemCategory);
//     //     // console.log(itemCategory);

//     //     const selectedSubItems = itemCategory[subCategory];
//     //     selectedSubItems.forEach((itemId) => {
//     //       const itemData = findItemById(itemId); // Custom function to get item details
//     //       sidebarContent.innerHTML += `<div>${itemData.name}</div>`;
//     //     });
//     //   });
//     // }
//   });
// }

// 아이템의 이름을 가져오는 함수

// 아이템 이름과 가격 가져오기
const getItemDetails = (category, itemId, includePrice = false) => {
  const itemData = itemCategories
    .find((cat) => cat.id === category)
    ?.options?.find((item) => item.id === itemId);

  if (!itemData) return includePrice ? { name: '', price: 0 } : '';

  return includePrice
    ? { name: itemData.name, price: itemData.price }
    : itemData.name;
};

// 선택된 아이템의 상세 정보 표시
// const displaySelectedItems = (selectedItems) => {
//   const entreeDetails = [];
//   const sideDetails = [];
//   const drinkDetails = [];

//   // 선택된 프로틴, 밥, 콩의 정보를 가져오기
//   const { protein, rice, beans } = selectedItems.entree;

//   // 선택된 프로틴, 밥, 콩을 처리
//   const selectedItemsArray = [
//     { category: 'protein', items: protein },
//     { category: 'rice', items: rice },
//     { category: 'beans', items: beans },
//   ];

//   selectedItemsArray.forEach(({ category, items }) => {
//     items.forEach((itemId) => {
//       const itemDetails = getItemDetails(category, itemId, true);
//       if (itemDetails) {
//         entreeDetails.push(itemDetails);
//       }
//     });
//   });

//   // 선택된 사이드와 음료의 정보 가져오기
//   selectedItems.sides.forEach((itemId) => {
//     const itemDetails = getItemDetails('sides', itemId, true);
//     if (itemDetails) {
//       sideDetails.push(itemDetails);
//     }
//   });

//   selectedItems.drinks.forEach((itemId) => {
//     const itemDetails = getItemDetails('drinks', itemId, true);
//     if (itemDetails) {
//       drinkDetails.push(itemDetails);
//     }
//   });

//   // 모든 선택된 아이템 정보 합치기
//   const allDetails = [...entreeDetails, ...sideDetails, ...drinkDetails];

//   // 최종적으로 정보를 표시
//   const summaryContainer = document.querySelector('.bag-sidebar-body');
//   summaryContainer.innerHTML = ''; // Clear previous content
//   allDetails.forEach((item) => {
//     const detailsText = item.price
//       ? `<h3>${item.name}</h3><p>${item.price} 원</p>`
//       : `<h3>${item}</h3>`;
//     summaryContainer.innerHTML += detailsText;
//   });
// };

// const displaySelectedItems = (selectedItems) => {
//   const bagSidebarContent = document.querySelector('.bag-sidebar-body'); // 사이드바 내용을 담는 요소 선택
//   bagSidebarContent.innerHTML = ''; // 이전 내용 지우기

//   // 앙트레 항목 표시
//   if (selectedItems.entree) {
//     const { protein, rice, beans, toppings, name } = selectedItems.entree;
//     if (protein.length > 0) {
//       const proteinName = getItemDetails('protein', protein[0], true); // 단백질 이름과 가격 가져오기
//       bagSidebarContent.innerHTML += `<h3>${name}</h3>`;
//       bagSidebarContent.innerHTML += `<p>${proteinName.name}</p>`;
//     }
//     // 다른 항목들도 추가
//     if (rice.length > 0) {
//       const riceName = getItemDetails('rice', rice[0]);
//       bagSidebarContent.innerHTML += `<p>${riceName}</p>`;
//     }
//     if (beans.length > 0) {
//       const beansName = getItemDetails('beans', beans[0]);
//       bagSidebarContent.innerHTML += `<p>${beansName}</p>`;
//     }
//     // 토핑 표시 (여러 개일 경우 루프)
//     toppings.forEach((toppingId) => {
//       const toppingName = getItemDetails('toppings', toppingId);
//       bagSidebarContent.innerHTML += `<p>${toppingName}</p>`;
//     });
//   }

//   // 사이드 및 음료 항목 표시
//   if (selectedItems.sides.length > 0) {
//     selectedItems.sides.forEach((sideId) => {
//       const sideName =
//         getItemDetails('chips-and-dips', sideId) ||
//         getItemDetails('single-sides', sideId);
//       bagSidebarContent.innerHTML += `<h3>${sideName}</h3>`;
//     });
//   }

//   if (selectedItems.drinks.length > 0) {
//     selectedItems.drinks.forEach((drinkId) => {
//       const drinkName = getItemDetails('drinks', drinkId);
//       bagSidebarContent.innerHTML += `<h3>${drinkName}</h3>`;
//     });
//   }
// };

const displaySelectedItems = (selectedItems) => {
  const sidebarBody = document.querySelector('.bag-sidebar-body');
  sidebarBody.innerHTML = ''; // Clear existing content

  let totalPrice = 0;

  selectedItems.forEach((item) => {
    const { entree, sides, drinks } = item;

    // Get entree details and price
    const entreeName = entree.name;
    const entreeDetails = [
      ...entree.protein.map((id) => getItemDetails('protein', id)),
      ...entree.rice.map((id) => getItemDetails('rice', id)),
      ...entree.beans.map((id) => getItemDetails('beans', id)),
      ...entree.toppings.map((id) => getItemDetails('toppings', id, true)), // Include price for toppings
    ];
    const entreePrice = entreeDetails.reduce(
      (sum, detail) => sum + detail.price || 0,
      0
    );

    // Calculate total price for entree
    const entreeTotal =
      entreePrice +
      entree.options.reduce(
        (sum, id) => sum + getItemDetails('options', id).price,
        0
      );

    // Add sides and drinks
    let sidesHTML = '';
    sides.forEach((sideId) => {
      const sideDetail = getItemDetails('single-sides', sideId, true);
      sidesHTML += `
        <div class="side">
          <div class="name">${sideDetail.name}</div>
          <div class="price">$${sideDetail.price.toFixed(2)}</div>
        </div>
      `;
      totalPrice += sideDetail.price;
    });

    drinks.forEach((drinkId) => {
      const drinkDetail = getItemDetails('drinks', drinkId, true);
      sidesHTML += `
        <div class="drink">
          <div class="name">${drinkDetail.name}</div>
          <div class="price">$${drinkDetail.price.toFixed(2)}</div>
        </div>
      `;
      totalPrice += drinkDetail.price;
    });

    // Build HTML for the current meal
    const mealCardHTML = `
      <div class="meal-card">
        <div class="entree">
          <div class="entree-header">
            <div class="name">${entreeName}</div>
            <div class="price">$${entreeTotal.toFixed(2)}</div>
          </div>
          <div class="entree-details">
            ${entreeDetails.map((detail) => detail.name).join(', ')}
          </div>
        </div>
        <div class="sides-and-drinks">
          ${sidesHTML}
        </div>
        <button class="remove-btn">Remove</button>
      </div>
    `;

    sidebarBody.insertAdjacentHTML('beforeend', mealCardHTML);
    totalPrice += entreeTotal;
  });

  // Final total
  const totalHTML = `
    <div class="final-total">
      <span class="text">Total</span>
      <span class="total">$${totalPrice.toFixed(2)}</span>
    </div>
  `;

  sidebarBody.insertAdjacentHTML('beforeend', totalHTML);
};

document.addEventListener('DOMContentLoaded', () => {
  // // Check if there are selected items in sessionStorage
  // const storedSelectedItems = sessionStorage.getItem('selectedItems');
  // if (storedSelectedItems) {
  //   const selectedItems = JSON.parse(storedSelectedItems);
  //   // Open the bag sidebar
  //   document.querySelector('.bag-sidebar').classList.add('visible');
  //   // Populate the sidebar with selected items
  //   // console.log(selectedItems);
  //   displaySelectedItems(selectedItems);
  // }

  // init();
  // insertPrimaryHeader();
  displayMenuItems(menu);
  navigateToOrderMenuPage();
});
