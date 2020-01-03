import { Events } from "../verbs/events";

export const evtDrinksOrderAddeddHandler = {
  command: Events.DRINKS_ORDER_ADDED,
  handler: (aggregateState, payload) => {
    return {
      proposal: {
        ...aggregateState,
        orders: aggregateState.orders.concat(payload)
      }
    };
  }
};

export const evtFoodOrderAddeddHandler = {
  command: Events.FOOD_ORDER_ADDED,
  handler: (aggregateState, payload) => {
    return {
      proposal: {
        ...aggregateState,
        orders: aggregateState.orders.concat(payload)
      }
    };
  }
};
