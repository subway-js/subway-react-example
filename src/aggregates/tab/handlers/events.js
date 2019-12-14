import { Events, Exceptions } from "../constants";

export const evtTabOpenedHandler = {
  command: Events.TAB_OPENED,
  handler: (aggregateState, payload) => {
    return {
      proposal: { open: true }
    };
  }
};

export const evtDrinksOrderedHandler = {
  command: Events.DRINKS_ORDERED,
  handler: (aggregateState, payload) => {
    return {
      proposal: {
        ...aggregateState, // TODO no, only partial
        outstandingDrinks: payload
      }
    };
  }
};

export const evtFoodOrderedHandler = {
  command: Events.FOOD_ORDERED,
  handler: (aggregateState, payload) => {
    return {
      proposal: {
        ...aggregateState, // TODO no, only partial
        outstandingFood: payload
      }
    };
  }
};

export const evtDrinkServeddHandler = {
  command: Events.DRINK_SERVED,
  handler: (aggregateState, payload) => {
    const nextOutstandingDrinks = aggregateState.outstandingDrinks.filter(
      drink => !payload.menuNumbers.includes(drink.menuNumber)
    );
    const temp = aggregateState.outstandingDrinks.filter(drink =>
      payload.menuNumbers.includes(drink.menuNumber)
    );
    const servedItemsValue = temp.reduce((acc, curr) => acc + curr.price, 0);
    return {
      proposal: {
        ...aggregateState, // TODO no, only partial, mutate!
        servedItemsValue:
          (aggregateState.servedItemsValue || 0) + servedItemsValue,
        outstandingDrinks: nextOutstandingDrinks
      }
    };
  }
};

export const evtFoodServedHandler = {
  command: Events.FOOD_SERVED,
  handler: (aggregateState, payload) => {
    const nextOutstandingFood = aggregateState.outstandingFood.filter(
      food => !payload.menuNumbers.includes(food.menuNumber)
    );
    const temp = aggregateState.outstandingFood.filter(food =>
      payload.menuNumbers.includes(food.menuNumber)
    );
    const servedItemsValue = temp.reduce((acc, curr) => acc + curr.price, 0);
    return {
      proposal: {
        ...aggregateState,
        servedItemsValue:
          (aggregateState.servedItemsValue || 0) + servedItemsValue,
        outstandingFood: nextOutstandingFood
      }
    };
  }
};
