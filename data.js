// const category = {
//   protein: {
//     title: 'protein or veggie',
//     desc: 'choose up to two.',
//     options: [
//       {
//         name: 'chicken',
//         cost: 9.9,
//         calories: 180,
//         dietary: ['paleo', 'keto'],
//       },
//       {
//         name: 'steak',
//         cost: 11.65,
//         calories: 170,
//         dietary: ['paleo', 'keto'],
//       },
//       {
//         name: 'sofritas',
//         cost: 9.9,
//         calories: 150,
//         dietary: ['soy'],
//       },
//     ],
//   },
//   rice: {
//     title: 'rice',
//     options: [
//       {
//         name: 'white rice',
//         calories: 210,
//         dietary: ['vegetarian', 'vegan'],
//       },
//       {
//         name: 'brown rice',
//         calories: 210,
//         dietary: ['vegetarian', 'vegan'],
//       },
//     ],
//   },
// };

export const itemCategories = [
  {
    id: 'protein',
    title: 'Protein or Veggie',
    desc: 'Choose up to two.',
    options: [
      {
        id: 'chicken',
        name: 'Chicken',
        img: '/assets/images/menu/menu-items/protein/chicken.png',
        cost: 9.9,
        calories: 180,
        dietary: ['paleo', 'keto', 'lifestyle'],
      },
      {
        id: 'steak',
        name: 'Steak',
        img: '/assets/images/menu/menu-items/protein/steak.png',
        cost: 11.65,
        calories: 170,
        dietary: ['paleo', 'keto'],
      },
      {
        id: 'sofritas',
        name: 'Sofritas',
        img: '/assets/images/menu/menu-items/protein/sofritas.png',
        cost: 9.9,
        calories: 150,
        dietary: ['soy'],
      },
      {
        id: 'carnitas',
        name: 'Carnitas',
        img: '/assets/images/menu/menu-items/protein/carnitas.png',
        cost: 9.9,
        calories: 150,
        dietary: ['soy'],
      },
    ],
  },
  {
    id: 'rice',
    title: 'Rice',
    options: [
      {
        id: 'white-rice',
        name: 'White Rice',
        calories: 210,
        dietary: ['vegetarian', 'vegan'],
      },
      {
        id: 'brown-rice',
        name: 'Brown Rice',
        calories: 210,
        dietary: ['vegetarian', 'vegan'],
      },
      {
        id: 'no-rice',
        name: 'No Rice',
        calories: 0,
      },
    ],
  },
  {
    id: 'beans',
    title: 'Beans',
    options: [
      {
        id: 'black-beans',
        name: 'Black Beans',
        calories: 130,
        dietary: ['vegetarian', 'vegan'],
      },
      {
        id: 'pinto-beans',
        name: 'Pinto Beans',
        calories: 130,
        dietary: ['vegetarian', 'vegan'],
      },
      {
        id: 'no-beans',
        name: 'No Beans',
        calories: 0,
      },
    ],
  },
  {
    id: 'toppings',
    title: 'Top Things Off',
    options: [
      {
        id: 'guac',
        name: 'Guacamole',
        cost: 2.9,
        calories: 230,
        dietary: ['vegetarian', 'vegan'],
      },
      {
        id: 'tomato-salsa',
        name: 'Fresh Tomato Salsa',
        tagline: 'Mild',
        calories: 25,
        dietary: ['vegetarian', 'vegan'],
      },
      {
        id: 'chili-corn-salsa',
        name: 'Roasted Chili-Corn Salsa',
        tagline: 'Medium',
        calories: 80,
        dietary: ['vegetarian', 'vegan'],
      },
      {
        id: 'tomatillo-green-chili-salsa',
        name: 'Tomatillo-Green Chili Salsa',
        tagline: 'Medium',
        calories: 15,
        dietary: ['vegetarian', 'vegan'],
      },
      {
        id: 'tomatillo-red-chili-salsa',
        name: 'Tomatillo-Red Chili Salsa',
        tagline: 'Hot',
        calories: 30,
        dietary: ['vegetarian', 'vegan'],
      },
      {
        id: 'sour-cream',
        name: 'Sour Cream',
        calories: 110,
      },
      {
        id: 'fajita-veggies',
        name: 'Fajita Veggies',
        calories: 20,
      },
      {
        id: 'cheese',
        name: 'Cheese',
        calories: 110,
      },
      {
        id: 'romnaine-lettuce',
        name: 'Romaine Lettuce',
        calories: 5,
      },
      {
        id: 'queso-blanco',
        name: 'Queso Blanco',
        cost: 1.7,
        calories: 120,
      },
    ],
  },
  {
    id: 'chips-and-dips',
    title: 'Chips & Dips',
    options: [
      {
        id: 'chips',
        name: 'Chips',
        cost: 2,
        calories: 540,
      },
      {
        id: 'chips-and-guac',
        name: 'Chips & Guacamole',
        cost: 4.9,
        calories: 770,
      },
    ],
  },
  {
    id: 'single-sides',
    title: 'Single Sides',
    options: [
      {
        id: 'side-guac',
        name: 'Side of Guacamole',
        cost: 2.9,
        calories: 230,
      },
      {
        id: 'large-side-guac',
        name: 'Large Side of Guacamole',
        cost: 5.8,
        calories: 460,
      },
      {
        id: 'tortilla-side',
        name: 'Tortilla on the Side',
        cost: 0.5,
        calories: 320,
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Drinks',
    options: [
      {
        id: 'watermelon-limeade',
        name: 'Organic Watermelon Limeade',
        tagline: 'Seasonal Flavor',
        img: '/assets/images/menu/menu-items/drinks/organic-watermelon-limeade.png',
        cost: 3.1,
        calories: 230,
      },
      {
        id: 'mexican-coca-cola',
        name: 'Mexican Coca-Cola',
        cost: 3.45,
        calories: 150,
      },
      {
        id: 'coke-zero',
        name: 'Coke Zero',
        cost: 3.45,
        calories: 0,
      },
    ],
  },
];

export const menu = [
  {
    id: 'burrito',
    name: 'Burrito',
    img: '/assets/images/menu/burrito.png',
    desc: 'Your choice of freshly grilled meat or sofritas wrapped in a warm flour tortilla with rice, beans, or fajita veggies, and topped with guac, salsa, queso blanco, sour cream or cheese.',
    availableCategories: {
      protein: ['chicken', 'steak'],
      rice: ['white-rice', 'no-rice'],
      toppings: ['guac', 'tomato-salsa'],
      'chips-and-dips': ['chips', 'chips-and-guac'],
      'single-sides': ['side-guac', 'large-side-guac', 'tortilla-side'],
      drinks: ['watermelon-limeade', 'mexican-coca-cola', 'coke-zero'],
    },
  },
  {
    id: 'burrito-bowl',
    name: 'Burrito Bowl',
    img: '/assets/images/menu/burrito-bowl.png',
    desc: 'Your choice of freshly grilled meat or sofritas served in a delicious bowl with rice, beans, or fajita veggies, and topped with guac, salsa, queso blanco, sour cream or cheese.',
    availableCategories: {
      protein: ['chicken', 'steak', 'sofritas'],
      rice: ['white-rice', 'brown-rice', 'no-rice'],
      drinks: ['watermelon-limeade'],
    },
  },
  {
    id: 'lifestyle-bowl',
    name: 'Lifestyle Bowl',
    img: '/assets/images/menu/lifestyle-bowl.png',
  },
  {
    id: 'quesadilla',
    name: 'Quesadilla',
    img: '/assets/images/menu/quesadilla.png',
  },
  {
    id: 'salad',
    name: 'Salad',
    img: '/assets/images/menu/salad.png',
  },
  {
    id: 'tacos',
    name: 'Tacos',
    img: '/assets/images/menu/tacos.png',
  },
  {
    id: 'kids-meal',
    name: "Kid's Meal",
    img: '/assets/images/menu/kids-meal.png',
  },
  {
    id: 'chips-and-sides',
    name: 'Chips & Sides',
    img: '/assets/images/menu/chips-and-sides.png',
  },
  {
    id: 'drinks',
    name: 'Drinks',
    img: '/assets/images/menu/drinks.png',
  },
];
