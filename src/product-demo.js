import { products } from './products.js';
import { calculateDiscount, describeProduct, formatPrice, getProductStatus } from './product-utils.js';

const exampleProduct = {
  ...products.flex,
  oldPrice: 1800,
  inStock: true,
};

console.log('Практика №15 — Lumen Flex', {
  'Цена': formatPrice(exampleProduct.price),
  'Скидка': `${calculateDiscount(exampleProduct)}%`,
  'Статус': getProductStatus(exampleProduct),
  'Краткое описание': describeProduct(exampleProduct),
});
