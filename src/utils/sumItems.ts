import { ProductInCart } from "../components/cart/cartSlice";

export const sumItems = (items: ProductInCart[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);
