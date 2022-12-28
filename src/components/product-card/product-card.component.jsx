import './product-card.styles.scss';

import { Button } from '../button/button.component';
import { ProductsProvider } from '../../contexts/products.context';

const ProductCard = ({ product }) => {
  console.log('product ', ProductsProvider);
  const { name, price, imageUrl } = product;
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={name} />

      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType='inverted'>Add To Cart</Button>
    </div>
  );
};

export default ProductCard;
