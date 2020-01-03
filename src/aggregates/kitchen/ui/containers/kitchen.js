import React, { useEffect, useState } from "react";
import { Card, Label, Icon, List, Button } from "semantic-ui-react";

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
    <Card.Group itemsPerRow={3}>
      {orders &&
        orders.map(({ table, drinks, food }, i) => (
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
                  food.map((d, i) => <List.Item key={i}>{d.label}</List.Item>)}
              </List>
            </Card.Content>
            <Card.Content extra>
              <Button size="mini" fluid basic color="brown" onClick={() => {}}>
                Mark as ready
              </Button>
            </Card.Content>
          </Card>
        ))}
    </Card.Group>
  );
}
