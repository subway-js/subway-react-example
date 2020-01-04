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
        // TODO normalize aggregate state
        setTables(tables);
      }
    });
    console.log(" > TAB initial state:", currentState);
    setTables(currentState.tables);

    // simulate kitchen working on orders
    simulateKitchenAndWaiter(tabAggregate);
  }, []);

  const simulateOrders = tables => {
    tables &&
      tables.forEach(t => {
        // table "open": customer are sitting, waiting to order
        if (t.status === "open") {
          TabCommands.placeOrder(t.id, getRandomOrder(t.numberOfPeople));
        }
      });
  };
  const simulateKitchenAndWaiter = aggregate => {
    const kitchenAggregate = Subway.selectAggregate("KitchenAggregate");
    kitchenAggregate.spy("DrinksPrepared", {
      next: ({ table, drinks }) => {
        drinks.forEach(d => {
          setTimeout(() => {
            TabCommands.serveDrinks(table, [d]);
          }, getRandomInt(1000, 2000));
        });
      }
    });
    kitchenAggregate.spy("FoodPrepared", {
      next: ({ table, food }) => {
        food.forEach(f => {
          setTimeout(() => {
            TabCommands.serveFood(table, [f]);
          }, getRandomInt(1000, 2000));
        });
      }
    });
  };

  const simulateCustomers = ({ id }) => {
    TabCommands.openTab(id, getRandomNumberOfCustomers(), 1);
    setTimeout(() => simulateOrders(tables), 1000);
  };

  const payWithTip = table => {
    TabCommands.payAndFreeTable(table);
  };

  return (
    <Card.Group itemsPerRow={3}>
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
