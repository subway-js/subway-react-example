import { getTablesInitialState } from "../../sampleDataUtils";

export const tabInitialState = {
  open: false,
  tables: getTablesInitialState(),
  servedItemsValue: 0
};
