import React from "react";
import { Container, Tab } from "semantic-ui-react";

import { RestaurantFloor } from "./aggregates/tab";

function App() {
  const panes = [
    {
      menuItem: "Tables",
      render: () => <RestaurantFloor />
    }
  ];

  return (
    <Container>
      <Tab
        menu={{ secondary: true, pointing: true, color: "green" }}
        panes={panes}
      />
      {false && (
        <>
          <br />
          <RestaurantFloor />
        </>
      )}
    </Container>
  );
}

export default App;
