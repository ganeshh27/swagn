// import SHOP_DATA from './../../shop-data.json';
import { Fragment, useContext } from 'react';
import { categoriesContext } from '../../contexts/categories.context';
// import ProductCard from '../../components/product-card/product-card.component';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(categoriesContext);

  return (
    <div>
      <div>
        {Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPreview;
