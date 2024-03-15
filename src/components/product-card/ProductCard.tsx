import { Icon16Add, Icon16Minus, Icon24DeleteOutline } from "@vkontakte/icons";
import { Separator, Spacing, IconButton, RichCell, Div } from "@vkontakte/vkui";

import { useAppDispatch } from "../../store/store";
import { ProductInCart, cartActions, minQuantity } from "../cart/cartSlice";
import formatCurrency from "../../utils/formatCurrency";

import styles from "./ProductCard.module.css";

export const ProductCard = ({
  id,
  title,
  price,
  description,
  image,
  quantity,
  total,
}: ProductInCart) => {
  const dispatch = useAppDispatch();

  const handleIncItem = () => {
    dispatch(cartActions.incItem(id));
  };
  const handleDecItem = () => {
    dispatch(cartActions.decItem(id));
  };
  const handleDeleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };

  return (
    <>
      <RichCell
        key={id}
        text={formatCurrency(price)}
        caption={description}
        before={
          <img
            width={110}
            height={110}
            src={image}
            className={styles.Preview}
          />
        }
        after={
          <IconButton aria-label="Удалить" onClick={handleDeleteItem}>
            <Icon24DeleteOutline />
          </IconButton>
        }
        actions={
          <div className={styles.Counter}>
            <IconButton
              onClick={handleDecItem}
              aria-label="Удалить"
              disabled={quantity === minQuantity}
            >
              <Icon16Minus />
            </IconButton>
            <Div>{quantity}</Div>
            <IconButton
              onClick={handleIncItem}
              aria-label="Добавить"
              disabled={quantity === total}
            >
              <Icon16Add />
            </IconButton>
          </div>
        }
      >
        {title}
      </RichCell>
      <Spacing size={18}>
        <Separator />
      </Spacing>
    </>
  );
};
