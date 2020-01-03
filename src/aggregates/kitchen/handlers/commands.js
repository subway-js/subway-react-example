import { Commands } from "../verbs/commands";
import { Events } from "../verbs/events";

export const cmdAddDrinkOrderHandler = {
  command: Commands.ADD_DRINK_ORDER,
  handler: (aggregateState, payload) => {
    return {
      events: [{ id: Events.DRINKS_ORDER_ADDED, payload }]
    };
  }
};

export const cmdAddFoodOrderHandler = {
  command: Commands.ADD_FOOD_ORDER,
  handler: (aggregateState, payload) => {
    return {
      events: [{ id: Events.FOOD_ORDER_ADDED, payload }]
    };
  }
};

export const cmdPrepareDrinksHandler = {
  command: Commands.PREPARE_DRINKS,
  handler: (aggregateState, payload) => {
    return {
      events: [{ id: Events.DRINKS_PREPARED, payload }]
    };
  }
};

export const cmdPrepareFoodHandler = {
  command: Commands.PREPARE_FOOD,
  handler: (aggregateState, payload) => {
    return {
      events: [{ id: Events.FOOD_PREPARED, payload }]
    };
  }
};
