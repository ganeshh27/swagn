import './cart-dropdown.styles.scss';
import { Button } from '../button/button.component';

const CartDropdown = () => {
  //   const { cartOpen } = useContext(cartOpenContext);
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'></div>
      <Button>Go to Checkout</Button>
    </div>
  );
};
export default CartDropdown;
