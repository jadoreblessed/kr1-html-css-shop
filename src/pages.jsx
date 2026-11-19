import React, { useLayoutEffect, useState } from 'react';
import { Breadcrumbs, ComparisonTable, HeroImage, ProductCard, ProductImage, SectionHeader } from './components.jsx';
import { categories, featuredProducts, getProduct, products } from './products.js';
import { formatPrice } from './product-utils.js';
import { questions, reviews } from './home-content.js';

const benefits = [
  ['☼', 'Свет под вашу задачу', 'Тёплый для чтения, нейтральный для работы, регулируемый для обоих сценариев.'],
  ['◇', 'Компактный дизайн', 'Устойчивые основания и аккуратные формы для рабочих столов и тумб.'],
  ['↔', 'Понятный выбор', 'Сравните мощность, цветовую температуру и настройки яркости.'],
];

export function HomePage({ onOrder }) {
  return (
    <>
      <section className="hero">
        <HeroImage />
        <div className="hero-copy">
          <h1>Свет для<br />ваших идей.</h1>
          <p>Настольные лампы для работы, учёбы и чтения. Выберите свет, с которым вам удобно.</p>
          <div className="hero-actions">
            <a className="button button-light" href="./catalog.html">Смотреть каталог <span aria-hidden="true">→</span></a>
            <a className="hero-link" href="#comparison">Сравнить модели <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="section" id="popular">
        <SectionHeader title="Популярные модели" action={<a className="text-link" href="./catalog.html">Весь каталог <span aria-hidden="true">→</span></a>} />
        <div className="product-grid">
          {featuredProducts.map((id) => <ProductCard key={id} id={id} product={products[id]} onOrder={onOrder} />)}
        </div>
      </section>

      <section className="section benefits-section">
        <SectionHeader title="Почему LUMEN" />
        <ul className="benefits">
          {benefits.map(([symbol, title, description]) => (
            <li key={title}>
              <span aria-hidden="true" className="benefit-mark">{symbol}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" id="comparison">
        <SectionHeader title="Сравните модели" description="Мощность, температура света, яркость и другие параметры в одной таблице." />
        <p className="table-hint">Прокрутите таблицу вбок, чтобы увидеть все модели.</p>
        <ComparisonTable products={featuredProducts.map((id) => products[id])} />
      </section>

      <section className="section" id="reviews">
        <SectionHeader title="Отзывы о моделях" description="Демонстрационные отзывы." />
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review" key={review.name}>
              <p className="review-rating">
                <span aria-hidden="true">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                <span className="sr-only">Оценка {review.rating} из 5</span>
              </p>
              <h3>{review.title}</h3>
              <blockquote>{review.quote}</blockquote>
              <p className="review-byline">{review.name} · {review.model} · <time dateTime={review.date}>{review.displayDate}</time></p>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq" id="faq">
        <div>
          <h2>Вопросы о лампах</h2>
          <a className="text-link" href="./contacts.html">Связаться с нами <span aria-hidden="true">→</span></a>
        </div>
        <div>
          {questions.map(({ question, answer }, index) => (
            <details key={question} open={index === 0}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

const defaultFilters = { category: '', minimum: 0, maximum: Infinity };

export function CatalogPage({ onOrder }) {
  const [filters, setFilters] = useState(defaultFilters);
  const results = Object.entries(products).filter(([, product]) => (
    (!filters.category || product.category === filters.category) &&
    product.price >= filters.minimum && product.price <= filters.maximum
  ));

  function applyFilters(event) {
    event.preventDefault();
    const fields = event.currentTarget.elements;
    const minimum = fields.minimum.value === '' ? 0 : fields.minimum.valueAsNumber;
    const maximum = fields.maximum.value === '' ? Infinity : fields.maximum.valueAsNumber;
    if (minimum > maximum) {
      fields.maximum.setCustomValidity('Цена «До» должна быть не меньше цены «От».');
      fields.maximum.reportValidity();
      return;
    }
    setFilters({ category: fields.category.value, minimum, maximum });
  }

  return (
    <>
      <Breadcrumbs current="Каталог" />
      <div className="page-heading">
        <h1>Каталог ламп</h1>
        <p>Подберите модель по назначению и цене.</p>
      </div>
      <div className="catalog-layout">
        <aside className="filter-panel">
          <h2>Фильтры</h2>
          <form className="filters" onSubmit={applyFilters} onInput={(event) => event.currentTarget.elements.maximum.setCustomValidity('')}
            onReset={(event) => {
              event.currentTarget.elements.maximum.setCustomValidity('');
              setFilters(defaultFilters);
            }}>
            <fieldset>
              <legend>Назначение</legend>
              <label className="check-label"><input type="radio" name="category" value="" defaultChecked />Все модели</label>
              {categories.map((category) => (
                <label key={category} className="check-label"><input type="radio" name="category" value={category} />{category}</label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Цена, ₽</legend>
              <div className="filter-prices">
                <label>От<input type="number" name="minimum" min="0" step="1" placeholder="0" /></label>
                <label>До<input type="number" name="maximum" min="0" step="1" placeholder="3000" /></label>
              </div>
            </fieldset>
            <div className="filter-actions">
              <button className="button" type="submit">Применить</button>
              <button className="button button-outline" type="reset">Сбросить</button>
            </div>
          </form>
        </aside>
        <section className="catalog-results">
          <h2>Все модели</h2>
          <p className="count" role="status">Найдено товаров: {results.length}</p>
          {results.length > 0 ? (
            <div className="product-grid">
              {results.map(([id, product]) => <ProductCard key={id} id={id} product={product} onOrder={onOrder} catalog />)}
            </div>
          ) : <p className="empty">Попробуйте изменить диапазон цен или сбросить фильтры.</p>}
        </section>
      </div>
    </>
  );
}

export function ProductPage({ onOrder }) {
  const id = new URLSearchParams(window.location.search).get('id') || 'flex';
  const product = getProduct(id);
  useLayoutEffect(() => {
    document.title = `${product?.name ?? 'Товар не найден'} — LUMEN`;
  }, [product]);

  if (!product) {
    return (
      <>
        <Breadcrumbs current="Товар не найден" catalog />
        <section className="page-heading">
          <h1>Товар не найден</h1>
          <p>Проверьте адрес или выберите модель в каталоге.</p>
          <a className="button" href="./catalog.html">В каталог</a>
        </section>
      </>
    );
  }

  const specs = [
    ['Мощность', product.power],
    ['Температура света', product.temperature],
    ['Регулировка яркости', product.brightness],
    ['Цвет корпуса', product.color],
    ['Материал', product.material],
    ['Высота', product.height],
    ['Питание', 'От сети, адаптер в комплекте'],
    ['Источник света', 'Встроенный LED-модуль'],
    ['Гарантия', product.warranty],
  ];
  return (
    <>
      <Breadcrumbs current={product.name} catalog />
      <section className="product-detail">
        <ProductImage id={id} detail />
        <div className="product-detail-copy">
          <p className="product-category">{product.category} · {product.sku}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong className="price price-large">{formatPrice(product.price)}</strong>
          <ul className="delivery-list">
            <li>Доставка: {product.delivery}</li>
            <li>Гарантия: {product.warranty}</li>
          </ul>
          <div className="detail-actions">
            <button className="button" type="button" onClick={() => onOrder(product)}>Оставить заявку</button>
            <a className="text-link" href="./index.html#comparison">Сравнить модели <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>
      <section className="section">
        <SectionHeader title="Характеристики" />
        <table className="spec-table detail-table">
          <caption className="sr-only">Характеристики {product.name}</caption>
          <thead><tr><th scope="col">Параметр</th><th scope="col">Значение</th></tr></thead>
          <tbody>{specs.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody>
        </table>
      </section>
      <section className="section supplementary">
        <div><h2>Комплектация</h2><p>Настольная лампа, сетевой адаптер, инструкция и гарантийный талон.</p></div>
        <div><h2>Уход</h2><p>Ставьте лампу на ровную поверхность. Перед очисткой отключите питание и протрите корпус мягкой сухой тканью.</p></div>
      </section>
    </>
  );
}

export function ContactsPage({ onOrder }) {
  return (
    <>
      <Breadcrumbs current="Контакты" />
      <div className="page-heading">
        <h1>Контакты LUMEN</h1>
        <p>Контактные данные приведены для демонстрации.</p>
      </div>
      <address className="contact-grid">
        <div><h2>Телефон</h2><a href="tel:+79000000000">+7 (900) 000-00-00</a></div>
        <div><h2>Почта</h2><a href="mailto:info@example.com">info@example.com</a></div>
        <div><h2>Город</h2><p>Москва · онлайн-каталог</p></div>
      </address>
      <section className="section contact-panel" id="feedback">
        <div><h2>Нужна консультация?</h2><p>Укажите, какая модель вас интересует.</p></div>
        <button className="button button-light" type="button" onClick={() => onOrder(null)}>Открыть форму <span aria-hidden="true">→</span></button>
      </section>
    </>
  );
}
