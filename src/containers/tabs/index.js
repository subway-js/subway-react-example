import React, { useEffect, useState } from "react";
import { Card, Button, Loader, Icon } from "semantic-ui-react";

import { getRandomInt } from "../../randomUtils";

import MenuForm from "../../components/menuForm";
import { Aggregates } from "../../aggregates";
import { Commands } from "../../aggregates/tab/constants";
import { Subway } from "../../subwayRef";

const TabsContainer = () => {
  const [tables, setTables] = useState(null);

  useEffect(() => {
    const { currentState } = Subway.selectAggregate(
      Aggregates.TAB
    ).observeState({
      next: ({ nextState }) => {
        console.log(nextState);
        setTables(nextState.tables);
      }
    });
    console.log(currentState);
    setTables(currentState.tables);
  }, []);

  const simulateCustomers = tableId => {
    Subway.selectAggregate(Aggregates.TAB).sendCommand(Commands.OPEN_TAB, {
      id: 0,
      table: tableId,
      numberOfPeople: getRandomInt(2, 6),
      waiter: 1
    });
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
            </Card.Content>
          </Card>
        ))}
    </Card.Group>
  );
};

export default TabsContainer;
