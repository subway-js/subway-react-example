export const Commands = {
  OPEN_TAB: "OpenTab",
  PLACE_ORDER: "PlaceOrder",
  MARK_DRINK_SERVED: "MarkDrinksServed",
  MARK_FOOD_SERVED: "MarkFoodServed",
  CLOSE_TAB: "CloseTab"
};

export const Events = {
  TAB_OPENED: "TabOpened",
  DRINKS_ORDERED: "DrinksOrdered",
  FOOD_ORDERED: "FoodOrdered",
  DRINK_SERVED: "DrinksServed",
  FOOD_SERVED: "FoodServed",
  TAB_CLOSED: "TabClosed"
};

export const Exceptions = {
  TAB_NOT_OPEN: "Tab is not open",
  DRINKS_NOT_OUTSTANDING: "No outstanding drinks for this tab",
  FOOD_NOT_OUTSTANDING: "No outstanding food for this tab"
};
