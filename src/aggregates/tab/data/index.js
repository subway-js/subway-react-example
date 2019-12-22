import { tables } from "./data";

export const getAggregateInitialState = () => ({
  tables: tables.map(t => ({ ...t, status: "available" }))
});
