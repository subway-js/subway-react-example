import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Subway } from "./subwayRef"; // TODO create react helper
import { Aggregates, InitialStates } from "./aggregates";

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
  evtFoodServedHandler
} from "./aggregates/tab/handlers/events";

const tabAggregate = Subway.createAggregate(Aggregates.TAB, InitialStates.TAB);

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

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
