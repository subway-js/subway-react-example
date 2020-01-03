import React from "react";
import { Container, Tab } from "semantic-ui-react";

import { RestaurantFloor } from "./aggregates/tab";
import { Kitchen } from "./aggregates/kitchen";

function App() {
  const upperPanes = [
    {
      menuItem: "Tables",
      render: () => <RestaurantFloor />
    }
  ];

  const lowerPanes = [
    {
      menuItem: "Kitchen",
      render: () => <Kitchen />
    }
  ];

  return (
    <Container>
      <Tab
        menu={{ secondary: true, pointing: true, color: "green" }}
        panes={upperPanes}
      />
      <br />
      <Tab
        menu={{
          secondary: true,
          pointing: true,
          color: "brown"
        }}
        panes={lowerPanes}
      />
    </Container>
  );
}

export default App;
