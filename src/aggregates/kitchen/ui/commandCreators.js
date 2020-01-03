import { AGGREGATE_NAME } from "../index";
import { Commands } from "../verbs/commands";
import { Subway } from "../../../subwayRef";

export const addDrinkOrder = (tableId, drinks) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.ADD_DRINK_ORDER, {
    id: `D${Date.now()}`,
    table: tableId,
    drinks
  });
};

export const addFoodOrder = (tableId, food) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.ADD_FOOD_ORDER, {
    id: `F${Date.now()}`,
    table: tableId,
    food
  });
};

export const prepareDrink = (orderId, tableId, drinks) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.PREPARE_DRINKS, {
    id: orderId,
    table: tableId,
    drinks
  });
};

export const prepareFood = (orderId, tableId, food) => {
  Subway.selectAggregate(AGGREGATE_NAME).sendCommand(Commands.PREPARE_FOOD, {
    id: orderId,
    table: tableId,
    food
  });
};
