import React from 'react';
import propTypes from 'prop-types';

import Modal from '../modal';

import './styles.css';

const CartModal = ({ cartInfo, open, onClose }) => {
  return (
    <Modal title='Корзина' open={open} onClose={onClose}>
      <div className='cart-modal'>
        <ul className='cart-modal__items'>
          {cartInfo.items.map((el, idx) => (
            <li className='cart-modal__item' key={idx}>
              <span className='cart-modal__item-number'>{idx + 1}</span>
              <span className='cart-modal__item-title'>{el.title}</span>
              <span className='cart-modal__item-price'>{el.price} ₽</span>
              <span className='cart-modal__item-count'>{el.count} шт</span>
            </li>
          ))}
        </ul>
        <div className='cart-modal__result'>
          <span className='cart-modal__result-descr'>Итого</span>
          <span className='cart-modal__result-price'>
            {cartInfo.totalPrice} ₽
          </span>
          <span className='cart-modal__result-count'>
            {cartInfo.totalCount} шт
          </span>
        </div>
      </div>
    </Modal>
  );
};

CartModal.propTypes = {
  cartInfo: propTypes.object.isRequired,
  open: propTypes.bool,
  onClose: propTypes.func.isRequired,
};

CartModal.defaultProps = {
  cartInfo: { totalCount: 0, totalPrice: 0, items: [] },
  onDeleted: () => {},
  open: false,
};

export default React.memo(CartModal);
