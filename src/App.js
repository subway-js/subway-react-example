import React, { useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import { Aggregates } from "./aggregates";
// import { Subway } from "./subwayRef";
import { Container } from "semantic-ui-react";

import TabsContainer from "./containers/tabs";

// import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

function App() {
  useEffect(() => {
    // const { currentState } = Subway.selectAggregate(
    //   Aggregates.TAB
    // ).observeState({
    //   next: payload => {
    //     console.log(payload);
    //   }
    // });
    //
    // console.log(currentState);
    // Subway.selectAggregate(Aggregates.TAB).sendCommand("OpenTab", {
    //   id: 0,
    //   table: 1,
    //   waiter: 1
    // });
    //
    // const foodSample = {
    //   menuNumber: 10,
    //   description: "Hamburguesa",
    //   isDrink: false,
    //   price: 15
    // };
    // const drinkSample = {
    //   menuNumber: 20,
    //   description: "Zero Coke",
    //   isDrink: true,
    //   price: 3
    // };
    // const orderSample = {
    //   id: 1,
    //   orderedItems: [foodSample, drinkSample]
    // };
    // setTimeout(() => {
    //   Subway.selectAggregate(Aggregates.TAB).sendCommand(
    //     "PlaceOrder",
    //     orderSample
    //   );
    // }, 500);
  }, []);

  return (
    <Container>
      <br />
      <TabsContainer />
    </Container>
  );
}

export default App;
