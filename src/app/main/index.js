import React, { useCallback, useEffect, useState } from "react";

import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Pagination from "../../components/pagination";

import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {
  const [skip, setSkip] = useState(0);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    itemsCount: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentTovar: state.currentTovar,
  }));

  const itemsPerPage = 10;
  const endPaginationValue = Math.ceil(select.itemsCount / itemsPerPage);

  // Загрузка данных при первом рендере и при смене страницы каталога
  useEffect(async () => {
    await store.catalog.load(skip);
  }, [skip]);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
    selectPage: useCallback((skip) => setSkip(skip), [store]),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />
      <List items={select.items} renderItem={renders.item} />
      <Pagination startValue={1} endValue={endPaginationValue} onClick={callbacks.selectPage} />
    </Layout>
  );
}

export default React.memo(Main);
