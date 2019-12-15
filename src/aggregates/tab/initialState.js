import sampleData from "../../sampleData";

export const tabInitialState = {
  open: false,
  tables: sampleData.tables.map(t => ({ ...t, status: "available" })),
  servedItemsValue: 0
};
