import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import { Breadcrumbs } from './components.jsx';
import { getProduct } from './products.js';
import { formatPrice } from './product-utils.js';

function localDate() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function validateInput(event) {
  const field = event.target;
  if (field.name === 'name') {
    field.setCustomValidity(field.value.trim().length >= 2 ? '' : 'Введите минимум два символа без учёта пробелов.');
  }
  if (field.name === 'phone') {
    const digits = field.value.replace(/\D/g, '');
    const valid = /^[+\d\s()-]+$/.test(field.value) && /^[78]\d{10}$/.test(digits);
    field.setCustomValidity(valid ? '' : 'Введите номер из 11 цифр, начиная с +7 или 8.');
  }
}

function OrderForm({ product, onSuccess, onCancel }) {
  const phoneId = useId();
  const phoneHintId = useId();

  function submit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    onSuccess();
  }

  return (
    <form className="order-form" onSubmit={submit} onInput={validateInput}>
      {product && <p className="form-wide selected-product">{product.name} · {formatPrice(product.price)}</p>}
      <label>Имя *<input name="name" autoComplete="name" required minLength={2} /></label>
      <label>Email *<input type="email" name="email" autoComplete="email" required /></label>
      <div className="form-field">
        <label htmlFor={phoneId}>Телефон *</label>
        <input id={phoneId} type="tel" name="phone" autoComplete="tel" placeholder="+7 (900) 000-00-00" aria-describedby={phoneHintId} required />
        <small id={phoneHintId}>11 цифр, начиная с +7 или 8.</small>
      </div>
      <label>Дата связи<input type="date" name="date" min={localDate()} /></label>
      <label>
        Тема заявки *
        <select name="topic" defaultValue={product ? 'product' : 'consultation'} required>
          <option value="">Выберите тему</option>
          <option value="product">Заказ товара</option>
          <option value="consultation">Консультация</option>
          <option value="delivery">Доставка</option>
        </select>
      </label>
      <label className="form-wide">Комментарий<textarea name="comment" rows="4" maxLength={1000} /></label>
      <label className="check-label form-wide">
        <input type="checkbox" name="agreement" required />
        Согласен на обработку данных для демонстрации *
      </label>
      <p className="form-wide form-note">Поля со * обязательны. Форма проверяет данные в браузере.</p>
      <div className="form-wide form-actions">
        <button className="button" type="submit">Проверить заявку</button>
        {onCancel && <button className="button button-outline" type="button" onClick={onCancel}>Закрыть</button>}
      </div>
    </form>
  );
}

export function OrderDialog({ product, onClose, onSuccess }) {
  const dialog = useRef(null);
  const titleId = useId();

  useLayoutEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    element.showModal();
    return () => {
      if (element.open) element.close();
      previousFocus?.focus();
    };
  }, []);

  function close() {
    dialog.current.close();
  }

  function dismissBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const { top, right, bottom, left } = event.currentTarget.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) close();
  }

  return (
    <dialog className="order-dialog" ref={dialog} aria-labelledby={titleId} onClose={onClose} onClick={dismissBackdrop}>
      <h2 id={titleId}>Оформление заявки</h2>
      <OrderForm product={product} onCancel={close} onSuccess={() => {
        close();
        onSuccess();
      }} />
    </dialog>
  );
}

export function OrderPage() {
  const id = new URLSearchParams(window.location.search).get('id');
  const product = getProduct(id);
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <Breadcrumbs current="Заявка" />
      <div className="page-heading">
        <h1>Оставить заявку</h1>
        <p>Заполните форму для выбора лампы или консультации.</p>
      </div>
      <div className="order-panel" onInput={() => setSubmitted(false)}>
        <OrderForm product={product} onSuccess={() => setSubmitted(true)} />
        <p className={submitted ? 'form-notice' : 'sr-only'} role="status">
          {submitted ? 'Заявка проверена. Данные не отправлялись.' : ''}
        </p>
      </div>
    </>
  );
}
