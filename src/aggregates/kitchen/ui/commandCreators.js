import { AGGREGATE_NAME } from "../index";
import { Commands } from "../verbs/commands";
import { Subway } from "../../../subwayRef";

export const addDrinkOrder = (tableId, drinks) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.ADD_DRINK_ORDER, {
    id: 0,
    table: tableId,
    drinks
  });
};

export const addFoodOrder = (tableId, food) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.ADD_FOOD_ORDER, {
    id: 0,
    table: tableId,
    food
  });
};

export const prepareDrink = (tableId, drink) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.PREPARE_DRINK, {
    id: 0,
    table: tableId,
    drink
  });
};

export const prepareFood = (tableId, food) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.PREPARE_FOOD, {
    id: 0,
    table: tableId,
    food
  });
};
