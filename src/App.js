import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Aggregates } from "./aggregates";
import { Subway } from "./subwayRef";

function App() {
  useEffect(() => {
    const { currentState } = Subway.selectAggregate(
      Aggregates.TAB
    ).observeState({
      next: payload => {
        console.log(payload);
      }
    });

    console.log(currentState);

    Subway.selectAggregate(Aggregates.TAB).sendCommand("OpenTab", {
      id: 0,
      table: 1,
      waiter: 1
    });

    const foodSample = {
      menuNumber: 10,
      description: "Hamburguesa",
      isDrink: false,
      price: 15
    };
    const drinkSample = {
      menuNumber: 20,
      description: "Zero Coke",
      isDrink: true,
      price: 3
    };
    const orderSample = {
      id: 1,
      orderedItems: [foodSample, drinkSample]
    };
    setTimeout(() => {
      Subway.selectAggregate(Aggregates.TAB).sendCommand(
        "PlaceOrder",
        orderSample
      );
    }, 500);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
