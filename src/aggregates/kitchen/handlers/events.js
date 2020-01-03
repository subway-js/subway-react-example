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

export const evtDrinksPreparedHandler = {
  command: Events.DRINKS_PREPARED,
  handler: (aggregateState, payload) => {
    return {
      proposal: {
        ...aggregateState,
        orders: aggregateState.orders.filter(o => o.id !== payload.id)
      }
    };
  }
};

export const evtFoodPreparedHandler = {
  command: Events.FOOD_PREPARED,
  handler: (aggregateState, payload) => {
    return {
      proposal: {
        ...aggregateState,
        orders: aggregateState.orders.filter(o => o.id !== payload.id)
      }
    };
  }
};
