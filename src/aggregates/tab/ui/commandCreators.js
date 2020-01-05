import { AGGREGATE_NAME } from "../index";
import { Commands } from "../verbs/commands";
import { Subway } from "../../../subwayRef";

// const tabAggregate = Subway.selectAggregate(AGGREGATE_NAME);

export const openTab = (tableId, numberOfPeople, waiterId) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.OPEN_TAB, {
    id: 0,
    table: tableId,
    numberOfPeople: numberOfPeople,
    waiter: waiterId
  });
};

export const placeOrder = (tableId, orderedItems) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.PLACE_ORDER, {
    id: 0,
    tableId: tableId,
    orderedItems: orderedItems
  });
};

export const serveFood = (tableId, food) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(
    Commands.MARK_FOOD_SERVED,
    {
      id: 0,
      tableId: tableId,
      servedItems: food
    }
  );
};

export const serveDrinks = (tableId, drinks) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(
    Commands.MARK_DRINK_SERVED,
    {
      id: 0,
      tableId: tableId,
      servedItems: drinks
    }
  );
};

export const payAndFreeTable = table => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.CLOSE_TAB, {
    id: `BILL_${Date.now()}`,
    table
  });
};
