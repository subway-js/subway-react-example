import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";

import { Subway } from "../../../../subwayRef";
import { Events } from "../../verbs/events";
import {
  getRandomInt,
  getRandomOrder,
  getRandomNumberOfCustomers
} from "../../data/sampleDataGenerator";
import { AGGREGATE_NAME as TAB_AGGREGATE_NAME } from "../../";

import * as TabCommands from "../commandCreators";

import { Table } from "../components/table";

export function RestaurantFloor() {
  const [tables, setTables] = useState(null);
  useEffect(() => {
    const tabAggregate = Subway.selectAggregate(TAB_AGGREGATE_NAME);
    const { currentState } = tabAggregate.observeState({
      next: ({ nextState }) => {
        console.log(" > TAB new state:", nextState);
        const { tables } = nextState;
        setTables(tables);
        simulateOrders(tables);
      }
    });
    console.log(" > TAB initial state:", currentState);
    setTables(currentState.tables);

    // simulate kitchen working on orders
    simulateKitchenAndWaiter(tabAggregate);
  }, []);

  const simulateOrders = tables => {
    // simulate orders
    tables &&
      tables.forEach(t => {
        // table "open": customer are sitting, waiting to order
        if (t.status === "open") {
          setTimeout(() => {
            TabCommands.placeOrder(t.id, getRandomOrder(t.numberOfPeople));
          }, 1000);
        }
      });
  };
  const simulateKitchenAndWaiter = aggregate => {
    aggregate.spy(Events.DRINKS_ORDERED, {
      next: ({ tableId, drinks }) => {
        drinks.forEach(d => {
          setTimeout(() => {
            console.log(d);
            TabCommands.serveDrinks(tableId, [d]);
          }, getRandomInt(200, 4000));
        });
      }
    });
    aggregate.spy(Events.FOOD_ORDERED, {
      next: ({ tableId, food }) => {
        food.forEach(f => {
          setTimeout(() => {
            console.log(f);
            TabCommands.serveFood(tableId, [f]);
          }, getRandomInt(2000, 4000));
        });
      }
    });
  };

  const simulateCustomers = ({ id }) => {
    TabCommands.openTab(id, getRandomNumberOfCustomers(), 1);
  };

  const payWithTip = table => {
    TabCommands.payAndFreeTable(table);
  };

  return (
    <Card.Group itemsPerRow={2}>
      {tables &&
        tables.map(t => (
          <Table
            onSitCustomers={simulateCustomers}
            onPay={payWithTip}
            key={t.id}
            data={t}
          />
        ))}
    </Card.Group>
  );
}
