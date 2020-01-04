import React from "react";
import { Card, Button, Icon, Label, List } from "semantic-ui-react";

export function Order({
  orderId,
  tableId,
  drinks = null,
  food = null,
  onOrderReady
}) {
  return (
    <Card key={orderId} raised>
      <Card.Content>
        <Label as="span" tag color="brown">
          <Icon key={orderId} name={drinks ? "glass martini" : "food"} />
          for table {tableId}
        </Label>
        <List bulleted size="mini">
          {drinks &&
            drinks.map((d, i) => <List.Item key={i}>{d.label}</List.Item>)}
          {food && food.map((d, i) => <List.Item key={i}>{d.label}</List.Item>)}
        </List>
      </Card.Content>
      <Card.Content extra>
        <Button
          size="mini"
          fluid
          basic
          color="brown"
          onClick={() => onOrderReady(orderId, tableId, drinks, food)}
        >
          Mark as ready
        </Button>
      </Card.Content>
    </Card>
  );
}
