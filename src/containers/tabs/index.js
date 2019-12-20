import React, { useEffect, useState } from "react";
import { Card, Button, Loader, Icon, List } from "semantic-ui-react";
import { getRandomInt } from "../../randomUtils";
import {
  getRandomOrder,
  getRandomNumberOfCustomers
} from "../../sampleDataUtils";

import MenuForm from "../../components/menuForm";
import { Aggregates } from "../../aggregates";
import { Commands, Events } from "../../aggregates/tab/constants";
import { Subway } from "../../subwayRef";

import * as TabAggregate from "../../aggregates/tab/commands";

const TabsContainer = () => {
  const [tables, setTables] = useState(null);

  useEffect(() => {
    const tabAggregate = Subway.selectAggregate(Aggregates.TAB);
    const { currentState } = tabAggregate.observeState({
      next: ({ nextState }) => {
        console.log(nextState);
        setTables(nextState.tables);
        simulateOrders(nextState.tables);
      }
    });
    console.log(currentState);
    setTables(currentState.tables);
    simulateKitchenAndWaiter(tabAggregate);
  }, []);

  const simulateKitchenAndWaiter = aggregate => {
    aggregate.spy(Events.DRINKS_ORDERED, {
      next: ({ tableId, drinks }) => {
        // drinks.forEach(d => {
        setTimeout(() => {
          console.log(drinks);
          TabAggregate.serveDrinks(tableId, drinks);
        }, getRandomInt(1500, 2000));
        // });
      }
    });
    aggregate.spy(Events.FOOD_ORDERED, {
      next: ({ tableId, food }) => {
        // food.forEach(f => {
        setTimeout(() => {
          console.log(food);
          TabAggregate.serveFood(tableId, food);
        }, getRandomInt(1500, 2000));
        // });
      }
    });
  };
  const simulateOrders = tables => {
    tables.forEach(t => {
      if (t.status === "open") {
        setTimeout(() => {
          TabAggregate.placeOrder(t.id, getRandomOrder(t.numberOfPeople));
        }, 1000);
      }
    });
  };
  const simulateCustomers = tableId => {
    TabAggregate.openTab(tableId, getRandomNumberOfCustomers(), 1);
  };

  return (
    <Card.Group itemsPerRow={2}>
      {tables &&
        tables.map(t => (
          <Card key={t.id} color="green">
            <Card.Content>
              <Card.Header>{t.label}</Card.Header>
              <Card.Meta>
                {t.status === "available" ? (
                  "This table is free"
                ) : (
                  <span>
                    {Array(t.numberOfPeople)
                      .fill(1)
                      .map((v, k) => (
                        <Icon key={k} color="green" name="user" />
                      ))}
                  </span>
                )}
              </Card.Meta>

              <Card.Description>
                {t.status === "open" /*<MenuForm />*/ && (
                  <>
                    <br />
                    <br />
                    <Loader active inline="centered" />
                    <br />
                  </>
                )}
                {t.status === "waitingOrder" && (
                  <>
                    <List>
                      <List.Item content="Drinks:" />
                      {t.outstandingDrinks &&
                        t.outstandingDrinks.map((d, i) => (
                          <List.Item
                            key={`${t.id}_${i}_${d.menuNumber}`}
                            icon="loading spinner"
                            content={d.label}
                          />
                        ))}
                      <List.Item content="Food:" />
                      {t.outstandingFood &&
                        t.outstandingFood.map((f, i) => (
                          <List.Item
                            key={`${t.id}_${i}_${f.menuNumber}`}
                            icon="loading spinner"
                            content={f.label}
                          />
                        ))}
                    </List>
                  </>
                )}
                {t.status === "readyToPay" /*<MenuForm />*/ && (
                  <>
                    <br />
                    <br />
                    Bill: {t.servedItemsValue} €
                    <br />
                  </>
                )}
              </Card.Description>
            </Card.Content>

            <Card.Content extra>
              {t.status === "open" && (
                <p>Customers choosing food & drinks...</p>
              )}
              {t.status === "available" && (
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => simulateCustomers(t.id)}
                  >
                    Sit customers
                  </Button>
                </div>
              )}
              {t.status === "waitingOrder" && (
                <p>Staff working on the orders...</p>
              )}
              {t.status === "readyToPay" && (
                <div className="ui two buttons">
                  <Button basic color="green" onClick={() => {}}>
                    Pay with tip
                  </Button>
                </div>
              )}
            </Card.Content>
          </Card>
        ))}
    </Card.Group>
  );
};

export default TabsContainer;
