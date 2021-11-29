import React, { useCallback, useState } from 'react';
import Controls from './components/controls';
import List from './components/list';
import Layout from './components/layout';
import CartModal from './components/cartModal';

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ store }) {
  console.log('App');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartInfo = store.getCartInfo();

  const callbacks = {
    onOpenModal: useCallback(() => {
      setIsModalOpen(true);
    }, [store]),
    onSelectItem: useCallback(code => store.selectItem(code), [store]),
    onAddToCart: useCallback(code => store.addToCart(code), [store]),
    onCloseModal: useCallback(() => setIsModalOpen(false)),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls onShow={callbacks.onOpenModal} cartInfo={cartInfo} />
      <List
        items={store.getState().items}
        onSelectItem={callbacks.onSelectItem}
        onAddToCart={callbacks.onAddToCart}
      />
      <CartModal
        cartInfo={cartInfo}
        open={isModalOpen}
        onClose={callbacks.onCloseModal}
      />
    </Layout>
  );
}

export default App;
