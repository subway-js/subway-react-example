import React, { useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";

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
    console.log("YAYY " + tableId);
    Subway.selectAggregate(Aggregates.TAB).sendCommand(Commands.OPEN_TAB, {
      id: 0,
      table: 1,
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
              <Card.Meta>AVAILABLE</Card.Meta>
              {/*<Card.Description>
                Steve wants to add you to the group{" "}
                <strong>best friends</strong>
              </Card.Description>*/}
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  onClick={() => simulateCustomers(t.id)}
                >
                  Simulate customers
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
    </Card.Group>
  );
};

export default TabsContainer;
