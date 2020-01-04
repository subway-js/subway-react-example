import { getAggregateInitialState } from "./data";

import {
  cmdOpenTabHandler,
  cmdPlaceOrderHandler,
  cmdMarkDrinkServedHandler,
  cmdMarkFoodServedHandler,
  cmdCloseTabHandler
} from "./handlers/commands";

import {
  evtTabOpenedHandler,
  evtDrinksOrderedHandler,
  evtFoodOrderedHandler,
  evtDrinkServeddHandler,
  evtFoodServedHandler,
  evtTabClosedHandler
} from "./handlers/events";

export { RestaurantFloor } from "./ui/containers/restaurantFloor";

export const AGGREGATE_NAME = "TabAggregate";
export const initialState = getAggregateInitialState();

export const commandHandlers = [
  cmdOpenTabHandler,
  cmdPlaceOrderHandler,
  cmdMarkDrinkServedHandler,
  cmdMarkFoodServedHandler,
  cmdCloseTabHandler
];

export const eventHandlers = [
  evtTabOpenedHandler,
  evtDrinksOrderedHandler,
  evtFoodOrderedHandler,
  evtDrinkServeddHandler,
  evtFoodServedHandler,
  evtTabClosedHandler
];
