import {
  cmdAddDrinkOrderHandler,
  cmdAddFoodOrderHandler,
  cmdPrepareDrinksHandler,
  cmdPrepareFoodHandler
} from "./handlers/commands";

import {
  evtDrinksOrderAddeddHandler,
  evtFoodOrderAddeddHandler,
  evtDrinksPreparedHandler,
  evtFoodPreparedHandler
} from "./handlers/events";

export { Kitchen } from "./ui/containers/kitchen";

export const AGGREGATE_NAME = "KitchenAggregate";
export const initialState = { orders: [] };

export const commandHandlers = [
  cmdAddDrinkOrderHandler,
  cmdAddFoodOrderHandler,
  cmdPrepareDrinksHandler,
  cmdPrepareFoodHandler
];

export const eventHandlers = [
  evtDrinksOrderAddeddHandler,
  evtFoodOrderAddeddHandler,
  evtDrinksPreparedHandler,
  evtFoodPreparedHandler
];
