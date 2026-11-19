import React from 'react';
import { formatPrice } from './products.js';

export const heroAlt = 'Графитовая настольная лампа с тонкой световой панелью освещает поверхность стола';

const cardSizes = '(min-width: 1264px) 385px, (min-width: 1200px) calc((100vw - 108px) / 3), (min-width: 1024px) calc((100vw - 96px) / 3), (min-width: 700px) calc((100vw - 80px) / 2), (min-width: 600px) calc((100vw - 48px) / 2), calc(100vw - 32px)';
const catalogSizes = '(min-width: 1264px) 298px, (min-width: 1200px) calc((100vw - 364px) / 3), (min-width: 1024px) calc((100vw - 328px) / 3), (min-width: 700px) calc((100vw - 80px) / 2), (min-width: 600px) calc((100vw - 48px) / 2), calc(100vw - 32px)';
const detailSizes = '(min-width: 1264px) 568px, (min-width: 800px) calc(47.5vw - 32px), (min-width: 700px) calc(100vw - 64px), calc(100vw - 32px)';
const imageRoot = `${import.meta.env.BASE_URL}images/`;

export function HeroImage() {
  const sizes = '(min-width: 1280px) 1200px, (min-width: 700px) calc(100vw - 64px), calc(100vw - 32px)';
  return (
    <picture className="hero-picture">
      <source media="(min-width: 800px)" srcSet={`${imageRoot}hero-800.webp 800w, ${imageRoot}hero-1440.webp 1440w`} sizes={sizes} />
      <img src={`${imageRoot}hero-mobile-480.webp`} srcSet={`${imageRoot}hero-mobile-480.webp 480w, ${imageRoot}hero-mobile-800.webp 800w`}
        sizes={sizes} width="800" height="760" alt={heroAlt} fetchPriority="high" />
    </picture>
  );
}

export function ProductImage({ id, product, detail = false, catalog = false }) {
  const sizes = detail ? detailSizes : catalog ? catalogSizes : cardSizes;
  return (
    <picture className="product-picture">
      <source type="image/webp" srcSet={`${imageRoot}${id}-240.webp 240w, ${imageRoot}${id}-320.webp 320w, ${imageRoot}${id}-412.webp 412w`} sizes={sizes} />
      <img src={`${imageRoot}${id}-412.jpg`} width="412" height="412" alt={`Настольная лампа ${product.name}, цвет корпуса — ${product.color.toLowerCase()}`}
        loading={detail ? 'eager' : 'lazy'} decoding="async" />
    </picture>
  );
}

export function Breadcrumbs({ current, catalog = false }) {
  return (
    <nav className="crumbs" aria-label="Хлебные крошки">
      <ol>
        <li><a href="./index.html">Главная</a></li>
        {catalog && <li><a href="./catalog.html">Каталог</a></li>}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

export function SectionHeader({ title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ProductCard({ id, product, onOrder, catalog }) {
  return (
    <article className="product-card">
      <ProductImage id={id} product={product} catalog={catalog} />
      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h3><a href={`./product.html?id=${id}`}>{product.name}</a></h3>
        <p className="product-specs">{product.temperature} · {product.power} · {product.brightness}</p>
        <div className="product-card-action">
          <strong className="price">{formatPrice(product.price)}</strong>
          <button className="button button-outline" type="button" onClick={() => onOrder(product)}>Заказать<span className="sr-only"> {product.name}</span></button>
        </div>
      </div>
    </article>
  );
}

export function ComparisonTable({ products }) {
  const rows = [
    ['Мощность', 'power'],
    ['Температура света', 'temperature'],
    ['Яркость', 'brightness'],
    ['Цвет корпуса', 'color'],
    ['Гарантия', 'warranty'],
    ['Цена', 'price'],
  ];
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-labelledby="comparison-caption">
      <table className="spec-table compare-table">
        <caption id="comparison-caption" className="sr-only">Сравнение характеристик популярных ламп</caption>
        <thead><tr><th scope="col">Характеристика</th>{products.map((product) => <th key={product.sku} scope="col">{product.name}</th>)}</tr></thead>
        <tbody>{rows.map(([label, key]) => (
          <tr key={key}>
            <th scope="row">{label}</th>
            {products.map((product) => <td key={product.sku}>{key === 'price' ? formatPrice(product[key]) : product[key]}</td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
