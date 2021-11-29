import React from "react";
import propTypes from 'prop-types';
import Item from "../item";
import './styles.css';

function List({items, onSelectItem, onAddToCart}){
  console.log('List');
  return (
    <div className='List'>{items.map(item =>
      <div className='List__item' key={item.code}>
        <Item item={item} onSelect={onSelectItem} onAdd={onAddToCart}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onSelectItem: propTypes.func,
  onAddToCart: propTypes.func
}

List.defaultProps = {
  items: [],
  onAddToCart: () => {},
  onSelectItem: () => {}
}

export default React.memo(List);