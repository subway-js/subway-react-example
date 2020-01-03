import React, { useEffect, useState } from "react";
import {
  Card,
  Label,
  Icon,
  List,
  Button,
  Message,
  Container
} from "semantic-ui-react";

import { Subway } from "../../../../subwayRef";
import { AGGREGATE_NAME as KITCHEN_AGGREGATE_NAME } from "../../";

import {
  addDrinkOrder,
  addFoodOrder,
  prepareDrink,
  prepareFood
} from "../commandCreators";

export function Kitchen() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    Subway.selectAggregate("TabAggregate").spy("DrinksOrdered", {
      next: ({ tableId, drinks }) => {
        addDrinkOrder(tableId, drinks);
      }
    });

    Subway.selectAggregate("TabAggregate").spy("FoodOrdered", {
      next: ({ tableId, food }) => {
        addFoodOrder(tableId, food);
      }
    });

    const kitchenAggregate = Subway.selectAggregate(KITCHEN_AGGREGATE_NAME);
    const { currentState } = kitchenAggregate.observeState({
      next: ({ nextState }) => {
        const { orders } = nextState;
        console.log("------------------", orders);
        setOrders(orders);
      }
    });
    setOrders(currentState.orders);
  }, []);

  return (
    <>
      {!orders ||
        (orders.length === 0 && (
          <Container>
            <Message color="brown" size="mini" icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Waiting</Message.Header>
                There are no pending orders to fulfill...
              </Message.Content>
            </Message>
          </Container>
        ))}
      {orders && (
        <Card.Group itemsPerRow={3}>
          {orders.map(({ id, table, drinks, food }, i) => (
            <Card key={i} raised>
              <Card.Content>
                <Label as="span" tag color="brown">
                  <Icon key={i} name={drinks ? "glass martini" : "food"} />
                  for table {table}
                </Label>
                <List bulleted size="mini">
                  {drinks &&
                    drinks.map((d, i) => (
                      <List.Item key={i}>{d.label}</List.Item>
                    ))}
                  {food &&
                    food.map((d, i) => (
                      <List.Item key={i}>{d.label}</List.Item>
                    ))}
                </List>
              </Card.Content>
              <Card.Content extra>
                <Button
                  size="mini"
                  fluid
                  basic
                  color="brown"
                  onClick={() =>
                    drinks
                      ? prepareDrink(id, table, drinks)
                      : prepareFood(id, table, food)
                  }
                >
                  Mark as ready
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </>
  );
}
