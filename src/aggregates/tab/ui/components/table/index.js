import React from "react";
import {
  Card,
  Button,
  Loader,
  Icon,
  Label,
  List,
  Statistic,
  Grid
} from "semantic-ui-react";

import * as TabState from "../../../globals/tabStates";

export function Table({ data, onSitCustomers, onPay }) {
  if (!data) return null;
  return (
    <Card key={data.id} color="green" style={{ minHeight: 250 }}>
      <Card.Content>
        <Label as="span" color="green" ribbon>
          {data.label}
        </Label>
        <Card.Meta>
          {data.status === TabState.AVAILABLE ? (
            "This table is free"
          ) : (
            <span>
              {Array(data.numberOfPeople)
                .fill(1)
                .map((v, k) => (
                  <Icon key={k} color="green" name="user" />
                ))}
            </span>
          )}
        </Card.Meta>

        <Card.Description>
          {data.status === TabState.AVAILABLE && (
            <div className="ui center aligned">
              <br />
              <Statistic color="grey" size="mini">
                <Statistic.Value>
                  <Icon name="food" />
                </Statistic.Value>
              </Statistic>
              <br />
            </div>
          )}
          {data.status === TabState.OPEN && (
            <>
              <br />
              <Loader active inline="centered" />
              <br />
            </>
          )}
          {data.status === TabState.WAITING_ORDER && (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <List size="mini">
                    {data.outstandingDrinks &&
                      data.outstandingDrinks.length > 0 && (
                        <List.Item>
                          <List.Header>Drinks:</List.Header>
                        </List.Item>
                      )}
                    {data.outstandingDrinks &&
                      data.outstandingDrinks.map((d, i) => (
                        <List.Item key={`${data.id}_${i}_${d.menuNumber}`}>
                          <Icon loading name="spinner" /> {d.label}
                        </List.Item>
                      ))}
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <List size="mini">
                    {data.outstandingFood && data.outstandingFood.length > 0 && (
                      <List.Item>
                        <List.Header>Food:</List.Header>
                      </List.Item>
                    )}
                    {data.outstandingFood &&
                      data.outstandingFood.map((f, i) => (
                        <List.Item key={`${data.id}_${i}_${f.menuNumber}`}>
                          <Icon loading name="spinner" /> {f.label}
                        </List.Item>
                      ))}
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
          {data.status === TabState.READY_TO_PAY && (
            <div className="ui center aligned">
              <br />
              <Statistic color="green" size="tiny">
                <Statistic.Label>
                  {data.servedItemsValue.toFixed(2)} € + {data.tipPercentage}%
                  tip
                </Statistic.Label>
                <Statistic.Label>=</Statistic.Label>
                <Statistic.Value>{data.bill.toFixed(2)} €</Statistic.Value>
              </Statistic>
              <br />
            </div>
          )}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        {data.status === TabState.OPEN && (
          <p>Customers choosing food & drinks...</p>
        )}
        {data.status === TabState.AVAILABLE && (
          <div className="ui two buttons">
            <Button basic color="green" onClick={() => onSitCustomers(data)}>
              Sit customers
            </Button>
          </div>
        )}
        {data.status === TabState.WAITING_ORDER && (
          <p>Cooking and delivering orders...</p>
        )}
        {data.status === TabState.READY_TO_PAY && (
          <div className="ui two buttons">
            <Button color="green" onClick={() => onPay(data)}>
              Pay & free table
            </Button>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
