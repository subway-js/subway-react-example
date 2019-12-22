import { Commands } from "../verbs/commands";
import { Events } from "../verbs/events";
import { Exceptions } from "../verbs/exceptions";

export const cmdOpenTabHandler = {
  command: Commands.OPEN_TAB,
  handler: (aggregateState, payload) => {
    return {
      events: [{ id: Events.TAB_OPENED, payload }]
    };
  }
};

export const cmdPlaceOrderHandler = {
  command: Commands.PLACE_ORDER,
  handler: (aggregateState, payload) => {
    // TODO if (!aggregateState.open) throw Error(Exceptions.TAB_NOT_OPEN);
    const { tableId } = payload;
    const { food, drinks } = payload.orderedItems;
    return {
      events: [
        { id: Events.DRINKS_ORDERED, payload: { tableId, drinks } },
        { id: Events.FOOD_ORDERED, payload: { tableId, food } }
      ]
    };
  }
};

export const cmdMarkDrinkServedHandler = {
  command: Commands.MARK_DRINK_SERVED,
  handler: (aggregateState, payload) => {
    // if (!aggregateState.open) throw Error(Exceptions.TAB_NOT_OPEN);
    // if (aggregateState.outstandingDrinks) {
    //   // TODO check we ordered what we are trying to serve
    //   // if( ... ) throw Error(Exceptions.DRINKS_NOT_OUTSTANDING)
    // } else {
    //   throw Error(Exceptions.DRINKS_NOT_OUTSTANDING);
    // }
    return {
      events: [{ id: Events.DRINK_SERVED, payload }]
    };
  },
  onError: error => {
    console.log("# Error sending command:", error);
  }
};

export const cmdMarkFoodServedHandler = {
  command: Commands.MARK_FOOD_SERVED,
  handler: (aggregateState, payload) => {
    // if (!aggregateState.open) throw Error(Exceptions.TAB_NOT_OPEN);
    // if (aggregateState.outstandingFood) {
    //   // TODO check we ordered what we are trying to serve
    //   // if( ... ) throw Error(EX.DRINKS_NOT_OUTSTANDING)
    // } else {
    //   throw Error(Exceptions.FOOD_NOT_OUTSTANDING);
    // }
    return {
      events: [{ id: Events.FOOD_SERVED, payload }]
    };
  }
};

export const cmdCloseTabHandler = {
  command: Commands.CLOSE_TAB,
  handler: (aggregateState, { table }) => {
    const { id, servedItemsValue, tipPercentage, tip, bill, waiter } = table;
    return {
      events: [
        {
          id: Events.TAB_CLOSED,
          payload: {
            id: 0,
            tableId: id,
            amountPaid: bill,
            orderValue: servedItemsValue,
            tipPercentage,
            tip,
            waiter
          }
        }
      ]
    };
  }
};
