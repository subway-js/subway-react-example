import React, { useEffect, useState } from "react";
import { Card, Button, Loader, Icon, List, Statistic } from "semantic-ui-react";
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
        drinks.forEach(d => {
          setTimeout(() => {
            console.log(d);
            TabAggregate.serveDrinks(tableId, [d]);
          }, getRandomInt(200, 4000));
        });
      }
    });
    aggregate.spy(Events.FOOD_ORDERED, {
      next: ({ tableId, food }) => {
        food.forEach(f => {
          setTimeout(() => {
            console.log(f);
            TabAggregate.serveFood(tableId, [f]);
          }, getRandomInt(2000, 4000));
        });
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

  const payWithTip = table => {
    console.log(
      table.servedItemsValue.toFixed(2),
      (table.servedItemsValue * 1.12).toFixed(2)
    );
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
                  <List>
                    {t.outstandingDrinks && t.outstandingDrinks.length > 0 && (
                      <List.Item>
                        <List.Header>Drinks:</List.Header>
                      </List.Item>
                    )}
                    {t.outstandingDrinks &&
                      t.outstandingDrinks.map((d, i) => (
                        <List.Item
                          key={`${t.id}_${i}_${d.menuNumber}`}
                          icon="loading spinner"
                          content={d.label}
                        />
                      ))}
                    {t.outstandingFood && t.outstandingFood.length > 0 && (
                      <List.Item>
                        <List.Header>Food:</List.Header>
                      </List.Item>
                    )}
                    {t.outstandingFood &&
                      t.outstandingFood.map((f, i) => (
                        <List.Item
                          key={`${t.id}_${i}_${f.menuNumber}`}
                          icon="loading spinner"
                          content={f.label}
                        />
                      ))}
                  </List>
                )}
                {t.status === "readyToPay" /*<MenuForm />*/ && (
                  <div className="ui center aligned">
                    <br />
                    <br />
                    <Statistic color="green" size="tiny">
                      <Statistic.Label>
                        {t.servedItemsValue.toFixed(2)} € + 12% tip
                      </Statistic.Label>
                      <Statistic.Label>=</Statistic.Label>
                      <Statistic.Value>
                        {(t.servedItemsValue * 1.12).toFixed(2)} €
                      </Statistic.Value>
                    </Statistic>
                    <br />
                  </div>
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
                  <Button basic color="green" onClick={() => payWithTip(t)}>
                    Pay & free table
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
