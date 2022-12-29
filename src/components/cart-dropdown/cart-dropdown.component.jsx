import './cart-dropdown.styles.scss';
import { Button } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { cartOpenContext } from '../../contexts/cartOpen.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  //   const { cartOpen } = useContext(cartOpenContext);
  const { cartItems } = useContext(cartOpenContext);
  console.log('cartOpencontext ', cartItems);

  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/checkout');
  };
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <h3> your Cart is Empty</h3>
        )}
      </div>
      <Button onClick={checkoutHandler}>Go to Checkout</Button>
    </div>
  );
};
export default CartDropdown;
