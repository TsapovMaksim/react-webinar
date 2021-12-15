import React from "react";
import propTypes from "prop-types";
import "./styles.css";

const Pagination = ({ startValue, endValue, onClick, currentPage }) => {
  const onItemClick = (index) => {
    const pageNumber = startValue + index;
    onClick(pageNumber);
  };

  return (
    <div className="Pagination">
      {new Array(endValue - startValue + 1).fill(0).map((_, idx) => (
        <div
          onClick={() => onItemClick(idx)}
          className={`Pagination__item ${
            currentPage === startValue + idx ? "Pagination__item--active" : ""
          }`}
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
  currentPage: propTypes.number.isRequired,
  onClick: propTypes.func,
};

Pagination.defaultProps = {
  onClick: () => {},
  startValue: 1,
  endValue: 2,
  currentPage: 1,
};

export default React.memo(Pagination);
