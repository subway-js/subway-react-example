import { AGGREGATE_NAME } from "../index";
import { Commands } from "../verbs/commands";
import { Subway } from "../../../subwayRef";

export const addDrinkOrder = (tableId, waiterId, drink) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.ADD_DRINK_ORDER, {
    id: 0,
    table: tableId,
    drink,
    waiter: waiterId
  });
};

export const addFoodOrder = (tableId, waiterId, food) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.ADD_FOOD_ORDER, {
    id: 0,
    table: tableId,
    food,
    waiter: waiterId
  });
};

export const prepareDrink = (tableId, waiterId, drink) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.PREPARE_DRINK, {
    id: 0,
    table: tableId,
    drink,
    waiter: waiterId
  });
};

export const prepareFood = (tableId, waiterId, food) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.PREPARE_FOOD, {
    id: 0,
    table: tableId,
    food,
    waiter: waiterId
  });
};
