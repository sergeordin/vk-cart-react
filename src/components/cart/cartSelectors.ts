import { RootState } from "../../store/store";

export const cartSelector = (state: RootState) => state.cart;

export const itemsCartSelector = (state: RootState) =>
  cartSelector(state).items;
