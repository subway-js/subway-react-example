import React from "react";
const Subway = window.Subway;
// NOTE check
const SubwayContext = React.createContext({
  createAggregate: Subway.createAggregate,
  selectAggregate: Subway.selectAggregate
});
export default SubwayContext;
