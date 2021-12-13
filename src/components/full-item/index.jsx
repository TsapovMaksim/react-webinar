import React from "react";
import propTypes from "prop-types";

import numberFormat from "../../utils/number-format";
import useStore from "../../utils/use-store";

import "./styles.css";

const FullItem = ({ tovarInfo }) => {
  const store = useStore();

  const addToBasket = (id) => {
    store.basket.add(id);
  };

  return (
    <div className="Full-item">
      <div className="Full-item__descr">
        <p className="Full-item__text">{tovarInfo.description}</p>
        <p className="Full-item__country">
          Страна производитель:{" "}
          <b>
            {tovarInfo.maidIn.title} ({tovarInfo.maidIn.code})
          </b>
        </p>
        <p className="Full-item__category">
          Категория: <b>{tovarInfo.category.title}</b>
        </p>
        <p className="Full-item__year">
          Год выпуска: <b>{tovarInfo.edition}</b>
        </p>
        <p className="Full-item__price">Цена: {numberFormat(tovarInfo.price)} ₽</p>
      </div>
      <button onClick={() => addToBasket(tovarInfo._id)}>Добавить</button>
    </div>
  );
};

FullItem.propTypes = {
  tovarInfo: propTypes.object.isRequired,
};

FullItem.defaultProps = {};

export default React.memo(FullItem);
