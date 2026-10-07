const products = [
  {
    id: 1,
    name: "Rice",
    category: "Food",
    price: 55,
    stock: 20,

    demand: 500,
    orderingCost: 50,
    holdingCost: 2,

    dailyDemand: 12,
    leadTime: 4
  },

  {
    id: 2,
    name: "Coffee",
    category: "Beverage",
    price: 120,
    stock: 80,

    demand: 250,
    orderingCost: 30,
    holdingCost: 2,

    dailyDemand: 11,
    leadTime: 3
  },

  {
    id: 3,
    name: "Soap",
    category: "Personal Care",
    price: 45,
    stock: 20,

    demand: 630,
    orderingCost: 45,
    holdingCost: 3,

    dailyDemand: 5,
    leadTime: 3
  }
];

export default products;