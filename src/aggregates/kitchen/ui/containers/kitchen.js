import React, { useEffect, useState } from "react";
import { Card, Icon, Message, Container } from "semantic-ui-react";

import { Subway } from "../../../../subwayRef";
import { AGGREGATE_NAME as KITCHEN_AGGREGATE_NAME } from "../../";

import {
  addDrinkOrder,
  addFoodOrder,
  prepareDrink,
  prepareFood
} from "../commandCreators";

import { Order } from "../components/order";

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

  const markOrderAsReady = (orderId, tableId, drinks, food) => {
    drinks && prepareDrink(orderId, tableId, drinks);
    food && prepareFood(orderId, tableId, food);
  };
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
            <Order
              key={i}
              orderId={id}
              tableId={table}
              drinks={drinks}
              food={food}
              onOrderReady={markOrderAsReady}
            />
          ))}
        </Card.Group>
      )}
    </>
  );
}
