import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Subway } from "./subwayRef"; // TODO create react helper
import {
  AGGREGATE_NAME as TabAggregateName,
  initialState as tabInitialState,
  commandHandlers as tabCommandHandlers,
  eventHandlers as tabEventHandlers
} from "./aggregates/tab";

import {
  AGGREGATE_NAME as KitchenAggregateName,
  initialState as kitchenInitialState,
  commandHandlers as kitchenCommandHandlers,
  eventHandlers as kitchenEventHandlers
} from "./aggregates/kitchen";

const initAggregate = (aggregate, cmdHandlers, evtHandlers) => {
  cmdHandlers.forEach(({ command, handler, onError = null }) => {
    aggregate.setCommandHandler(command, handler, onError);
  });
  evtHandlers.forEach(({ command, handler, onError = null }) => {
    aggregate.setEventHandler(command, handler, onError);
  });
};

const tabAggregate = Subway.createAggregate(TabAggregateName, tabInitialState);

const kitchenAggregate = Subway.createAggregate(
  KitchenAggregateName,
  kitchenInitialState
);

initAggregate(tabAggregate, tabCommandHandlers, tabEventHandlers);
initAggregate(kitchenAggregate, kitchenCommandHandlers, kitchenEventHandlers);

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
