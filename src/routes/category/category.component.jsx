import './category.styles.scss';

import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect, Fragment } from 'react';
import { categoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(categoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  // console.log('proudcts ', products, categoriesMap);

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>

      <div className='category-container'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
