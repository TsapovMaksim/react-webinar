import React from 'react';
import propTypes from 'prop-types';
import './styles.css';
import plural from 'plural-ru';

function Controls({ onShow, cartInfo }) {
  console.log('Controls');
  return (
    <div className='Controls'>
      <div className='Controls__descr'>В корзине:</div>
      <div className='Controls__tovars'>
        {cartInfo.itemsCount > 0
          ? `${cartInfo.itemsCount} ${plural(
              cartInfo.itemsCount,
              'товар',
              'товара',
              'товаров'
            )} / ${cartInfo.totalPrice} ₽`
          : 'Пусто'}
      </div>
      <button onClick={onShow}> Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onShow: propTypes.func.isRequired,
  cartInfo: propTypes.object.isRequired,
};

Controls.defaultProps = {
  onShow: () => {},
  cartInfo: { itemsCount: 0, totalPrice: 0, items: [] },
};

export default React.memo(Controls);
