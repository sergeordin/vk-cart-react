import {
  SplitLayout,
  SplitCol,
  Group,
  FixedLayout,
  Spacing,
  SimpleCell,
  Title,
  Spinner,
  Div,
} from "@vkontakte/vkui";

import { ProductCard } from "../product-card/ProductCard";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { itemsCartSelector } from "./cartSelectors";
import { ProductInCart, cartActions } from "./cartSlice";
import { useEffect, useMemo, useState } from "react";
import { sumItems } from "../../utils/sumItems";
import formatCurrency from "../../utils/formatCurrency";
import { useGetProductsQuery } from "../../api/productsApi";

import styles from "./Cart.module.css";

export function Cart() {
  const [isFirst, setIsFirst] = useState(true);

  const items = useAppSelector(itemsCartSelector);
  const dispatch = useAppDispatch();

  const {
    data: products,
    isError,
    isLoading,
    isSuccess,
  } = useGetProductsQuery();

  // initialize the cart by each item from fetched data for the first time
  // with max available quantity 10 (total)
  useEffect(() => {
    if (isFirst && isSuccess) {
      dispatch(
        cartActions.cartInit(
          products?.map(({ id, title, price, image, description }) => ({
            id,
            title,
            price,
            description,
            image,
            quantity: 1,
            total: 10,
          }))
        )
      );
      setIsFirst(false);
    }
  }, [products, dispatch, isFirst, isSuccess]);

  const cards = useMemo(
    () =>
      items?.map((item: ProductInCart) => (
        <ProductCard key={item.id} {...item} />
      )),
    [items]
  );
  const totalCost = useMemo(() => sumItems(items), [items]);

  if (isError)
    return <Div className={styles.Error}>Что-то пошло не так...</Div>;
  if (isLoading)
    return <Spinner>Загружается, пожалуйста, подождите...</Spinner>;

  return (
    <SplitLayout>
      <SplitCol width="75%" autoSpaced>
        <Group mode="plain" padding="m">
          {cards}
        </Group>
      </SplitCol>
      <SplitCol width="25%" autoSpaced>
        <FixedLayout vertical="top">
          <Spacing />
          <Group>
            <SimpleCell>
              <Title level="1">Итого: {formatCurrency(totalCost)}</Title>
            </SimpleCell>
          </Group>
        </FixedLayout>
      </SplitCol>
    </SplitLayout>
  );
}
