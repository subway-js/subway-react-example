import React, { useEffect, useState } from "react";
import { Subway } from "../../../../subwayRef";

export function Kitchen() {
  useEffect(() => {
    Subway.selectAggregate("TabAggregate").spy("DrinksOrdered", {
      next: payload => {
        console.log("Drinks", payload);
      }
    });

    Subway.selectAggregate("TabAggregate").spy("FoodOrdered", {
      next: payload => {
        console.log("Food", payload);
      }
    });
  }, []);
  return <div>kitchen</div>;
}
