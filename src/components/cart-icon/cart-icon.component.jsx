import './cart-icon.styles.scss';

import { ReactComponent as ShoppingIcon } from './../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { cartOpenContext } from '../../contexts/cartOpen.context';

const CartIcon = () => {
  const { cartOpen, setCartOpen, cartCount } = useContext(cartOpenContext);

  const toggleCartOpen = () => {
    setCartOpen(!cartOpen);
  };
  return (
    <div className='cart-icon-container'>
      <ShoppingIcon className='shopping-icon' onClick={toggleCartOpen} />

      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
