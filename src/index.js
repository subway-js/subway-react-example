import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Subway } from "./subwayRef"; // TODO create react helper
import {
  AGGREGATE_NAME as TabAggregateName,
  initialState as tabInitialState
} from "./aggregates/tab";

import {
  AGGREGATE_NAME as KitchenAggregateName,
  initialState as kitchenInitialState
} from "./aggregates/kitchen";

import {
  cmdOpenTabHandler,
  cmdPlaceOrderHandler,
  cmdMarkDrinkServedHandler,
  cmdMarkFoodServedHandler,
  cmdCloseTabHandler
} from "./aggregates/tab/handlers/commands";

import {
  cmdAddDrinkOrderHandler,
  cmdAddFoodOrderHandler,
  cmdPrepareDrinksHandler,
  cmdPrepareFoodHandler
} from "./aggregates/kitchen/handlers/commands";

import {
  evtTabOpenedHandler,
  evtDrinksOrderedHandler,
  evtFoodOrderedHandler,
  evtDrinkServeddHandler,
  evtFoodServedHandler,
  evtTabClosedHandler
} from "./aggregates/tab/handlers/events";

import {
  evtDrinksOrderAddeddHandler,
  evtFoodOrderAddeddHandler,
  evtDrinksPreparedHandler,
  evtFoodPreparedHandler
} from "./aggregates/kitchen/handlers/events";

const tabAggregate = Subway.createAggregate(TabAggregateName, tabInitialState);

const kitchenAggregate = Subway.createAggregate(
  KitchenAggregateName,
  kitchenInitialState
);

// tabAggregate.setCommandHandler(
//   ({ command, handler, onError = null } = cmdOpenTabHandler)
// );
tabAggregate.setCommandHandler(...Object.values(cmdOpenTabHandler));
tabAggregate.setCommandHandler(...Object.values(cmdPlaceOrderHandler));
tabAggregate.setCommandHandler(...Object.values(cmdMarkDrinkServedHandler));
tabAggregate.setCommandHandler(...Object.values(cmdMarkFoodServedHandler));
tabAggregate.setCommandHandler(...Object.values(cmdCloseTabHandler));

kitchenAggregate.setCommandHandler(...Object.values(cmdAddDrinkOrderHandler));
kitchenAggregate.setCommandHandler(...Object.values(cmdAddFoodOrderHandler));
kitchenAggregate.setCommandHandler(...Object.values(cmdPrepareDrinksHandler));
kitchenAggregate.setCommandHandler(...Object.values(cmdPrepareFoodHandler));
// tabCmdHandlers.forEach(({ command, handler, onError = null }) => {
//   tabAggregate.setCommandHandler(command, handler, onError);
// });

tabAggregate.setEventHandler(...Object.values(evtTabOpenedHandler));
tabAggregate.setEventHandler(...Object.values(evtDrinksOrderedHandler));
tabAggregate.setEventHandler(...Object.values(evtFoodOrderedHandler));
tabAggregate.setEventHandler(...Object.values(evtDrinkServeddHandler));
tabAggregate.setEventHandler(...Object.values(evtFoodServedHandler));
tabAggregate.setEventHandler(...Object.values(evtTabClosedHandler));

kitchenAggregate.setEventHandler(...Object.values(evtDrinksOrderAddeddHandler));
kitchenAggregate.setEventHandler(...Object.values(evtFoodOrderAddeddHandler));
kitchenAggregate.setEventHandler(...Object.values(evtDrinksPreparedHandler));
kitchenAggregate.setEventHandler(...Object.values(evtFoodPreparedHandler));

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
