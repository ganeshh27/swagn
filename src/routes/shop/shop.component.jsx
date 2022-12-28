// import SHOP_DATA from './../../shop-data.json';
import { useContext } from 'react';
import { productsContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product-card.component';
import './shop.styles.scss';

const Shop = () => {
  //   console.log('shopdata ', SHOP_DATA);
  const { products } = useContext(productsContext);
  return (
    <div className='products-container'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
