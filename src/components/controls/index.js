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
        {cartInfo.totalCount > 0
          ? `${cartInfo.totalCount} ${plural(
              cartInfo.totalCount,
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
  cartInfo: { totalCount: 0, totalPrice: 0, items: [] },
};

export default React.memo(Controls);
