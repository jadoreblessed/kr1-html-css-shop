const rubles = new Intl.NumberFormat('ru-RU');

export function formatPrice(price) {
  return `${rubles.format(price)} ₽`;
}

export function calculateDiscount({ oldPrice, price }) {
  if (price >= 0 && oldPrice > price) {
    return Math.round((oldPrice - price) / oldPrice * 100);
  }

  return 0;
}

export function getProductStatus({ inStock }) {
  return inStock ? 'В наличии' : 'Нет в наличии';
}

export function describeProduct(product) {
  return `${product.name} · ${product.category} · ${formatPrice(product.price)} · ${getProductStatus(product)}`;
}
