import React, { useEffect, useState } from "react";
import { Table, Container, Message, Icon } from "semantic-ui-react";

import { Subway } from "../../../../subwayRef";

export function BillingTable() {
  const [bills, setBills] = useState([]);
  const [tipsTotal, setTipsTotal] = useState(0);
  const [tabsTotal, setTabsTotal] = useState(0);

  const format = amountNumber => amountNumber.toFixed(2) + "€";

  useEffect(() => {
    const unSpy = Subway.selectAggregate("TabAggregate").spy("TabClosed", {
      next: ({ id, tableId, orderValue, amountPaid, tip }) => {
        setBills(prevBills => {
          return [...prevBills, { id, tableId, orderValue, amountPaid, tip }];
        });
        setTipsTotal(prev => prev + tip);
        setTabsTotal(prev => prev + orderValue);
      }
    });
    return () => {
      unSpy();
    };
  }, []);

  return (
    <>
      {!bills ||
        (bills.length === 0 && (
          <Container>
            <Message color="blue" size="mini" icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Waiting</Message.Header>
                No bills processed yet...
              </Message.Content>
            </Message>
          </Container>
        ))}
      {bills && bills.length > 0 && (
        <Table color="blue" fixed singleLine inverted size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Table ID</Table.HeaderCell>
              <Table.HeaderCell>Amount Paid</Table.HeaderCell>
              <Table.HeaderCell>Order Value</Table.HeaderCell>
              <Table.HeaderCell>Tip</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {bills &&
              bills.map(({ id, tableId, orderValue, amountPaid, tip }, i) => (
                <Table.Row key={id}>
                  <Table.Cell>{tableId}</Table.Cell>
                  <Table.Cell>{format(amountPaid)}</Table.Cell>
                  <Table.Cell>{format(orderValue)}</Table.Cell>
                  <Table.Cell>{format(tip)}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell>
                Total paid: <b>{format(tabsTotal)}</b>
              </Table.HeaderCell>
              <Table.HeaderCell>
                Total tips: <b>{format(tipsTotal)}</b>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      )}
      <br />
    </>
  );
}
