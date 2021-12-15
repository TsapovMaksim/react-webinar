import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasketSimple from "../../components/basket-simple";
import FullItem from "../../components/full-item";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";

const TovarPage = () => {
  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    tovarInfo: state.currentTovar.item,
    loadingState: state.currentTovar.loadingState,
    basket: state.basket,
  }));

  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.currentTovar.load(params.id);
  }, [params.id]);

  const callbacks = {
    openModal: useCallback(() => store.modals.open("basket"), [store]),
  };

  if (!select.loadingState) {
    return (
      <Layout>
        <div>Loading ...</div>
      </Layout>
    );
  }

  return (
    <Layout head={<h1>{select.tovarInfo.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModal}
        amount={select.amount}
        sum={select.sum}
        backLink="Главная"
      />
      <FullItem tovarInfo={select.tovarInfo} />
    </Layout>
  );
};

export default TovarPage;
