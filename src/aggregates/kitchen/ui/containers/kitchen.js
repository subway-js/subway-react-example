import React, { useEffect, useState } from "react";
import { Subway } from "../../../../subwayRef";

import {
  addDrinkOrder,
  addFoodOrder,
  prepareDrink,
  prepareFood
} from "../commandCreators";

export function Kitchen() {
  useEffect(() => {
    Subway.selectAggregate("TabAggregate").spy("DrinksOrdered", {
      next: ({ tableId, drinks }) => {
        addDrinkOrder(tableId, drinks);
      }
    });

    Subway.selectAggregate("TabAggregate").spy("FoodOrdered", {
      next: ({ tableId, food }) => {
        addFoodOrder(tableId, food);
      }
    });
  }, []);
  return <div>kitchen</div>;
}
