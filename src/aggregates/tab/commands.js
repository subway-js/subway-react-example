import { Aggregates } from "../../aggregates";
import { Commands } from "../../aggregates/tab/constants";
import { Subway } from "../../subwayRef";

// const tabAggregate = Subway.selectAggregate(Aggregates.TAB);

export const openTab = (tableId, numberOfPeople, waiterId) => {
  Subway.selectAggregate(Aggregates.TAB).sendCommand(Commands.OPEN_TAB, {
    id: 0,
    table: tableId,
    numberOfPeople: numberOfPeople,
    waiter: waiterId
  });
};

export const placeOrder = (tableId, orderedItems) => {
  Subway.selectAggregate(Aggregates.TAB).sendCommand(Commands.PLACE_ORDER, {
    id: 0,
    tableId: tableId,
    orderedItems: orderedItems
  });
};

export const serveFood = (tableId, food) => {
  Subway.selectAggregate(Aggregates.TAB).sendCommand(
    Commands.MARK_FOOD_SERVED,
    {
      id: 0,
      tableId: tableId,
      servedItems: food
    }
  );
};

export const serveDrinks = (tableId, drinks) => {
  Subway.selectAggregate(Aggregates.TAB).sendCommand(
    Commands.MARK_DRINK_SERVED,
    {
      id: 0,
      tableId: tableId,
      servedItems: drinks
    }
  );
};

export const payAndFreeTable = table => {
  Subway.selectAggregate(Aggregates.TAB).sendCommand(Commands.CLOSE_TAB, {
    id: 0,
    table
  });
};
