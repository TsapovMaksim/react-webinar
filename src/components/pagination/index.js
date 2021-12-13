import React, { useState } from "react";
import propTypes from "prop-types";
import "./styles.css";

const Pagination = ({ startValue, endValue, onClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onItemClick = (index) => {
    const newSkip = (startValue + index - 1) * 10;
    setActiveIndex(index);
    onClick(newSkip);
  };

  return (
    <div className="Pagination">
      {new Array(endValue - startValue + 1).fill(0).map((_, idx) => (
        <div
          onClick={() => onItemClick(idx)}
          className={`Pagination__item ${activeIndex === idx ? "Pagination__item--active" : ""}`}
          key={idx}
        >
          {startValue + idx}
        </div>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  startValue: propTypes.number.isRequired,
  endValue: propTypes.number.isRequired,
  onClick: propTypes.func,
};

Pagination.defaultProps = {
  onClick: () => {},
  startValue: 1,
  endValue: 2,
};

export default React.memo(Pagination);
