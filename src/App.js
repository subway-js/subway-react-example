import React from "react";
import { Container, Header } from "semantic-ui-react";

import { RestaurantFloor } from "./aggregates/tab";
import { Kitchen } from "./aggregates/kitchen";

function App() {
  return (
    <Container>
      <br />
      <Header color="green" as="h4" dividing>
        Tables
      </Header>
      <RestaurantFloor />

      <Header color="brown" as="h4" dividing>
        Kitchen
      </Header>
      <Kitchen />
    </Container>
  );
}

export default App;
