// import { Aggregates } from "../../../aggregates";
import { Commands, Events, Exceptions } from "../constants";

export const cmdOpenTabHandler = {
  command: Commands.OPEN_TAB,
  handler: (aggregateState, payload) => {
    return {
      events: [
        { id: Events.TAB_OPENED, payload: { id: 0, table: 1, waiter: 1 } }
      ]
    };
  }
};

export const cmdPlaceOrderHandler = {
  command: Commands.PLACE_ORDER,
  handler: (aggregateState, payload) => {
    if (!aggregateState.open) throw Error(Exceptions.TAB_NOT_OPEN);
    const drinkSample = payload.orderedItems.filter(i => i.isDrink);
    const foodSample = payload.orderedItems.filter(i => !i.isDrink);
    return {
      events: [
        { id: Events.DRINKS_ORDERED, payload: drinkSample },
        { id: Events.FOOD_ORDERED, payload: foodSample }
      ]
    };
  }
};

export const cmdMarkDrinkServedHandler = {
  command: Commands.MARK_DRINK_SERVED,
  handler: (aggregateState, payload) => {
    if (!aggregateState.open) throw Error(Exceptions.TAB_NOT_OPEN);
    if (aggregateState.outstandingDrinks) {
      // TODO check we ordered what we are trying to serve
      // if( ... ) throw Error(Exceptions.DRINKS_NOT_OUTSTANDING)
    } else {
      throw Error(Exceptions.DRINKS_NOT_OUTSTANDING);
    }
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
    if (!aggregateState.open) throw Error(Exceptions.TAB_NOT_OPEN);
    if (aggregateState.outstandingFood) {
      // TODO check we ordered what we are trying to serve
      // if( ... ) throw Error(EX.DRINKS_NOT_OUTSTANDING)
    } else {
      throw Error(Exceptions.FOOD_NOT_OUTSTANDING);
    }
    return {
      events: [{ id: Events.FOOD_SERVED, payload }]
    };
  }
};

export const cmdCloseTabHandler = {
  command: Commands.CLOSE_TAB,
  handler: (aggregateState, { id, amountPaid }) => {
    const orderValue = aggregateState.servedItemsValue;
    const tip = amountPaid - orderValue;
    return {
      events: [
        {
          id: Events.TAB_CLOSED,
          payload: { id: 0, amountPaid, orderValue, tip }
        }
      ]
    };
  }
};

export const commmandHandlers = [
  {
    command: Commands.OPEN_TAB,
    handler: (aggregateState, payload) => {
      return {
        events: [
          { id: Events.TAB_OPENED, payload: { id: 0, table: 1, waiter: 1 } }
        ]
      };
    }
  },
  {
    command: Commands.PLACE_ORDER,
    handler: (aggregateState, payload) => {
      if (!aggregateState.open) throw Error(Exceptions.TAB_NOT_OPEN);
      const drinkSample = payload.orderedItems.filter(i => i.isDrink);
      const foodSample = payload.orderedItems.filter(i => !i.isDrink);
      return {
        events: [
          { id: Events.DRINKS_ORDERED, payload: drinkSample },
          { id: Events.FOOD_ORDERED, payload: foodSample }
        ]
      };
    }
  },
  {
    command: Commands.MARK_DRINK_SERVED,
    handler: (aggregateState, payload) => {
      if (!aggregateState.open) throw Error(Exceptions.TAB_NOT_OPEN);
      if (aggregateState.outstandingDrinks) {
        // TODO check we ordered what we are trying to serve
        // if( ... ) throw Error(Exceptions.DRINKS_NOT_OUTSTANDING)
      } else {
        throw Error(Exceptions.DRINKS_NOT_OUTSTANDING);
      }
      return {
        events: [{ id: Events.DRINK_SERVED, payload }]
      };
    },
    onError: error => {
      console.log("# Error sending command:", error);
    }
  },
  {
    command: Commands.MARK_FOOD_SERVED,
    handler: (aggregateState, payload) => {
      if (!aggregateState.open) throw Error(Exceptions.TAB_NOT_OPEN);
      if (aggregateState.outstandingFood) {
        // TODO check we ordered what we are trying to serve
        // if( ... ) throw Error(EX.DRINKS_NOT_OUTSTANDING)
      } else {
        throw Error(Exceptions.FOOD_NOT_OUTSTANDING);
      }
      return {
        events: [{ id: Events.FOOD_SERVED, payload }]
      };
    }
  },
  {
    command: Commands.CLOSE_TAB,
    handler: (aggregateState, { id, amountPaid }) => {
      const orderValue = aggregateState.servedItemsValue;
      const tip = amountPaid - orderValue;
      return {
        events: [
          {
            id: Events.TAB_CLOSED,
            payload: { id: 0, amountPaid, orderValue, tip }
          }
        ]
      };
    }
  }
];
