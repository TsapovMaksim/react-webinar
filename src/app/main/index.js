import React, { useCallback, useEffect } from "react";

import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Pagination from "../../components/pagination";

import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {
  const select = useSelector((state) => ({
    items: state.catalog.items,
    itemsCount: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentTovar: state.currentTovar,
    pagination: state.catalog.pagination,
  }));

  // Загрузка данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(select.pagination.page);
  }, []);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
    selectPage: useCallback((pageNumber) => store.catalog.load(pageNumber), [store]),
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
      <Pagination
        startValue={select.pagination.startValue}
        endValue={select.pagination.endValue}
        currentPage={select.pagination.page}
        onClick={callbacks.selectPage}
      />
    </Layout>
  );
}

export default React.memo(Main);
