import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as SwagnLogo } from '../../assets/swaglogo.svg';
import './navigation.styles.scss';
import { userContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from './../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { cartOpenContext } from '../../contexts/cartOpen.context';

const Navigation = () => {
  const { currentUser } = useContext(userContext);
  const { cartOpen } = useContext(cartOpenContext);
  // const signOutHandler = async () => {
  //   await signOutUser();
  //   // setCurrentUser(null);
  // };
  console.log('currentUser', currentUser);
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <SwagnLogo className='logo' />
          {/* <div>Logo</div> */}
        </Link>
        <div id='logo-title'>
          <p>SWAGN</p>
        </div>

        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}

          <CartIcon />

          {/* <Link className='nav-link' to='/signUp'>
            SIGN UP
          </Link> */}
        </div>
        {cartOpen && <CartDropdown />}
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
