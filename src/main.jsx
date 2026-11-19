import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CatalogPage, ContactsPage, HomePage, ProductPage } from './pages.jsx';
import { OrderDialog, OrderPage } from './order.jsx';
import '../css/style.css';
import '../css/responsive.css';
import './product-demo.js';

const pages = { home: HomePage, catalog: CatalogPage, product: ProductPage, order: OrderPage, contacts: ContactsPage };
const pageName = window.location.pathname.split('/').pop().replace(/\.html$/, '');
const currentPage = Object.hasOwn(pages, pageName) ? pageName : 'home';
const Page = pages[currentPage];

const navigation = [
  ['home', './index.html', 'Главная'],
  ['catalog', './catalog.html', 'Каталог'],
  ['reviews', './index.html#reviews', 'Отзывы'],
  ['faq', './index.html#faq', 'Вопросы'],
  ['contacts', './contacts.html', 'Контакты'],
];

function Brand() {
  return <a className="brand" href="./index.html"><span className="brand-mark" aria-hidden="true">✦</span> LUMEN</a>;
}

function Header() {
  return (
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <Brand />
        <nav className="site-nav" aria-label="Основное меню">
          {navigation.map(([key, url, label]) => (
            <a key={key} href={url} aria-current={key === currentPage ? 'page' : undefined}>{label}</a>
          ))}
        </nav>
        <a className="header-order" href="./order.html" aria-current={currentPage === 'order' ? 'page' : undefined}>Заявка <span aria-hidden="true">→</span></a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Brand />
        <p>© 2026 LUMEN · Настольные лампы</p>
        <a href="./contacts.html">Контакты</a>
        <a href="#top">Наверх <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}

function App() {
  const [request, setRequest] = useState(null);
  const [message, setMessage] = useState('');

  useLayoutEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (anchor) document.getElementById(anchor)?.scrollIntoView();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(''), 8000);
    return () => window.clearTimeout(timer);
  }, [message]);

  function openOrder(product) {
    setMessage('');
    setRequest({ product });
  }

  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержимому</a>
      <Header />
      <main className="shell" id="main" tabIndex={-1}>
        <Page onOrder={openOrder} />
      </main>
      <Footer />
      <p className={message ? 'form-notice form-notice--toast' : 'sr-only'} role="status">{message}</p>
      {request && (
        <OrderDialog
          product={request.product}
          onClose={() => setRequest(null)}
          onSuccess={() => setMessage('Заявка проверена. Данные не отправлялись.')}
        />
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
