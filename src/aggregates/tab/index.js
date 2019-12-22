import { getAggregateInitialState } from "./data";

export { RestaurantFloor } from "./ui/containers/restaurantFloor";

export const AGGREGATE_NAME = "TabAggregate";
export const initialState = getAggregateInitialState();
