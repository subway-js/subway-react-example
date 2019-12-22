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
  cmdOpenTabHandler,
  cmdPlaceOrderHandler,
  cmdMarkDrinkServedHandler,
  cmdMarkFoodServedHandler,
  cmdCloseTabHandler
} from "./aggregates/tab/handlers/commands";

import {
  evtTabOpenedHandler,
  evtDrinksOrderedHandler,
  evtFoodOrderedHandler,
  evtDrinkServeddHandler,
  evtFoodServedHandler,
  evtTabClosedHandler
} from "./aggregates/tab/handlers/events";

const tabAggregate = Subway.createAggregate(TabAggregateName, tabInitialState);

// tabAggregate.setCommandHandler(
//   ({ command, handler, onError = null } = cmdOpenTabHandler)
// );
tabAggregate.setCommandHandler(...Object.values(cmdOpenTabHandler));
tabAggregate.setCommandHandler(...Object.values(cmdPlaceOrderHandler));
tabAggregate.setCommandHandler(...Object.values(cmdMarkDrinkServedHandler));
tabAggregate.setCommandHandler(...Object.values(cmdMarkFoodServedHandler));
tabAggregate.setCommandHandler(...Object.values(cmdCloseTabHandler));
// tabCmdHandlers.forEach(({ command, handler, onError = null }) => {
//   tabAggregate.setCommandHandler(command, handler, onError);
// });

tabAggregate.setEventHandler(...Object.values(evtTabOpenedHandler));
tabAggregate.setEventHandler(...Object.values(evtDrinksOrderedHandler));
tabAggregate.setEventHandler(...Object.values(evtFoodOrderedHandler));
tabAggregate.setEventHandler(...Object.values(evtDrinkServeddHandler));
tabAggregate.setEventHandler(...Object.values(evtFoodServedHandler));
tabAggregate.setEventHandler(...Object.values(evtTabClosedHandler));

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
