import { tables, menu } from "./sampleData";
import { getRandomInt } from "./randomUtils";

export const getTablesInitialState = () =>
  tables.map(t => ({ ...t, status: "available" }));

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
