import { Commands } from "../verbs/commands";
import { Events } from "../verbs/events";

export const cmdAddDrinkOrder = {
  command: Commands.ADD_DRINK_ORDER,
  handler: (aggregateState, payload) => {
    return {
      events: [{ id: Events.DRINKS_ORDER_ADDED, payload }]
    };
  }
};

export const cmdAddFoodOrder = {
  command: Commands.ADD_FOOD_ORDER,
  handler: (aggregateState, payload) => {
    return {
      events: [{ id: Events.FOOD_ORDER_ADDED, payload }]
    };
  }
};
