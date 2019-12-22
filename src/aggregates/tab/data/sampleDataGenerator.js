import { menu } from "./data";

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomNumberOfCustomers = () => getRandomInt(2, 6);

export const getRandomOrder = nCustomers => {
  const food = Array(nCustomers)
    .fill(1)
    .map(_ => menu.foodMenu[getRandomInt(0, menu.foodMenu.length - 1)]);

  const drinks = Array(nCustomers)
    .fill(1)
    .map(_ => menu.drinksMenu[getRandomInt(0, menu.drinksMenu.length - 1)]);

  return {
    food,
    drinks
  };
};
