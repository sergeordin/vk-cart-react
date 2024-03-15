import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { Product } from "../../types/productsTypes";

export const minQuantity = 1;

type CartState = {
  items: ProductInCart[];
};
export type ProductInCart = Omit<Product, "category" | "rating"> & {
  quantity: number;
  total: number;
};

const initialState: CartState = {
  items: [],
};

const incItem = (state: CartState, { payload }: PayloadAction<number>) => {
  const item = state.items.find((item) => item.id === payload);

  if (item) {
    item.quantity++;
  }
};
const decItem = (state: CartState, { payload }: PayloadAction<number>) => {
  const item = state.items.find((item) => item.id === payload);

  if (item) {
    if (item.quantity > minQuantity) {
      item.quantity--;
    }
  }
};

const cartInit = (
  state: CartState,
  { payload }: PayloadAction<ProductInCart[]>
) => {
  state.items = [...payload];
};

const deleteItem = (state: CartState, { payload }: PayloadAction<number>) => {
  state.items = state.items.filter((item) => item.id !== payload);
};

export const { actions: cartActions, reducer: cartReducer } = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: { incItem, decItem, deleteItem, cartInit },
});
