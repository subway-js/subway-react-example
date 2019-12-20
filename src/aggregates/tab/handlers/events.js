import { Events, Exceptions } from "../constants";

export const evtTabOpenedHandler = {
  command: Events.TAB_OPENED,
  handler: (aggregateState, payload) => {
    return {
      proposal: {
        ...aggregateState,
        tables: aggregateState.tables.map(t => {
          if (t.id === payload.table) {
            t.status = "open";
            t.numberOfPeople = payload.numberOfPeople;
          }
          return t;
        }),
        open: true
      }
    };
  }
};

export const evtDrinksOrderedHandler = {
  command: Events.DRINKS_ORDERED,
  handler: (aggregateState, { tableId, drinks }) => {
    return {
      proposal: {
        ...aggregateState, // TODO no, only partial
        tables: aggregateState.tables.map(t => {
          if (t.id === tableId) {
            t.status = "waitingOrder";
            t.outstandingDrinks = drinks;
          }
          return t;
        })
      }
    };
  }
};

export const evtFoodOrderedHandler = {
  command: Events.FOOD_ORDERED,
  handler: (aggregateState, { tableId, food }) => {
    return {
      proposal: {
        ...aggregateState, // TODO no, only partial
        tables: aggregateState.tables.map(t => {
          if (t.id === tableId) {
            t.status = "waitingOrder";
            t.outstandingFood = food;
          }
          return t;
        })
      }
    };
  }
};

export const evtDrinkServeddHandler = {
  command: Events.DRINK_SERVED,
  handler: (aggregateState, { servedItems, tableId }) => {
    const table = aggregateState.tables.filter(t => t.id === tableId)[0];
    const drinkMenuNumbers = servedItems.map(i => i.menuNumber);
    const nextOutstandingDrinks = table.outstandingDrinks.filter(
      drink => !drinkMenuNumbers.includes(drink.menuNumber)
    );
    const temp = table.outstandingDrinks.filter(drink =>
      drinkMenuNumbers.includes(drink.menuNumber)
    );
    const servedItemsValue = temp.reduce((acc, curr) => acc + curr.price, 0);
    const returnValue = {
      proposal: {
        ...aggregateState,
        tables: aggregateState.tables.map(t => {
          if (t.id === tableId) {
            let nextTable = { ...table };
            nextTable.outstandingDrinks = nextOutstandingDrinks;
            if (
              nextTable.outstandingFood.length === 0 &&
              nextTable.outstandingDrinks.length === 0
            ) {
              nextTable.status = "readyToPay";
            }
            nextTable.servedItemsValue =
              (nextTable.servedItemsValue || 0) + servedItemsValue;
            return nextTable;
          }
          return t;
        })
      }
    };
    return returnValue;
  }
};

export const evtFoodServedHandler = {
  command: Events.FOOD_SERVED,
  handler: (aggregateState, { servedItems, tableId }) => {
    const table = aggregateState.tables.filter(t => t.id === tableId)[0];
    const foodMenuNumbers = servedItems.map(i => i.menuNumber);

    const nextOutstandingFood = table.outstandingFood.filter(
      food => !foodMenuNumbers.includes(food.menuNumber)
    );
    const temp = table.outstandingFood.filter(food =>
      foodMenuNumbers.includes(food.menuNumber)
    );
    const servedItemsValue = temp.reduce((acc, curr) => acc + curr.price, 0);
    const returnValue = {
      proposal: {
        ...aggregateState,
        tables: aggregateState.tables.map(t => {
          if (t.id === tableId) {
            let nextTable = { ...table };
            nextTable.outstandingFood = nextOutstandingFood;
            if (
              nextTable.outstandingFood.length === 0 &&
              nextTable.outstandingDrinks.length === 0
            ) {
              nextTable.status = "readyToPay";
            }
            nextTable.servedItemsValue =
              (nextTable.servedItemsValue || 0) + servedItemsValue;
            return nextTable;
          }
          return t;
        })
      }
    };
    return returnValue;
  }
};
