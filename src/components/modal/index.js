import React from 'react';
import './styles.css';
import propTypes from 'prop-types';

const Modal = ({ children, title, open, onClose }) => {
  return (
    open && (
      <div className='modal'>
        <div className='modal__wrapper'>
          <div className='modal__controls'>
            <div className='modal__title'>{title}</div>
            <div className='modal__actions'>
              <button onClick={onClose}>Закрыть</button>
            </div>
          </div>
          <div className='modal__content'>{children}</div>
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  title: propTypes.string.isRequired,
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
};

Modal.defaultProps = {
  title: '',
  open: false,
  onClose: () => {},
};

export default React.memo(Modal);
