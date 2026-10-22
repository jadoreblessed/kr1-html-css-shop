'use strict';

// ==================================
// 1. Данные девяти товаров
// ==================================

const products = {
  base: {
    name: 'Lumen Base',
    category: 'Для чтения',
    sku: 'LM-001',
    price: 1000,
    power: '5 Вт',
    temperature: '3000 К',
    brightness: '1 уровень',
    color: 'Песочный',
    material: 'Металл, ABS-пластик',
    height: '32 см',
    warranty: '6 месяцев',
    delivery: '300 ₽',

    description:
      'Компактная настольная лампа для чтения и вечернего отдыха. ' +
      'Тёплый свет 3000 К создаёт спокойную атмосферу. ' +
      'Устойчивое основание и простое управление делают Base ' +
      'удобным вариантом для небольшого стола или прикроватной тумбы.'
  },

  flex: {
    name: 'Lumen Flex',
    category: 'Для работы и учёбы',
    sku: 'LM-002',
    price: 1500,
    power: '8 Вт',
    temperature: '4000 К',
    brightness: '3 уровня',
    color: 'Шалфейный',
    material: 'Металл, ABS-пластик',
    height: '38 см',
    warranty: '12 месяцев',
    delivery: 'Бесплатно',

    description:
      'Лампа для рабочего стола с нейтральным светом 4000 К. ' +
      'Три уровня яркости позволяют подобрать освещение ' +
      'для конспектов, чтения и работы за компьютером. ' +
      'Наклонный корпус направляет свет на рабочую поверхность.'
  },

  pro: {
    name: 'Lumen Pro',
    category: 'Для любых задач',
    sku: 'LM-003',
    price: 2000,
    power: '12 Вт',
    temperature: '3000–6000 К',
    brightness: '5 уровней',
    color: 'Графитовый',
    material: 'Алюминий, ABS-пластик',
    height: '42 см',
    warranty: '24 месяца',
    delivery: 'Бесплатно',

    description:
      'Универсальная модель с пятью уровнями яркости ' +
      'и настройкой температуры от 3000 до 6000 К. ' +
      'Выбирайте тёплый свет для отдыха или более холодный ' +
      'для дневных задач. Широкая световая панель ' +
      'освещает большую область стола.'
  },

  mini: {
    name: 'Lumen Mini',
    category: 'Для чтения',
    sku: 'LM-004',
    price: 900,
    power: '4 Вт',
    temperature: '2700 К',
    brightness: '1 уровень',
    color: 'Терракотовый',
    material: 'Металл, ABS-пластик',
    height: '25 см',
    warranty: '6 месяцев',
    delivery: '300 ₽',
    art: 'base',

    description:
      'Небольшая лампа для прикроватной тумбы и компактного стола. ' +
      'Тёплый свет 2700 К подходит для вечернего чтения. ' +
      'Устойчивое основание и один режим яркости ' +
      'обеспечивают простое управление.'
  },

  arc: {
    name: 'Lumen Arc',
    category: 'Для любых задач',
    sku: 'LM-005',
    price: 1800,
    power: '9 Вт',
    temperature: '3000–5000 К',
    brightness: '3 уровня',
    color: 'Тёмно-синий',
    material: 'Металл, ABS-пластик',
    height: '40 см',
    warranty: '12 месяцев',
    delivery: 'Бесплатно',
    art: 'flex',

    description:
      'Лампа с наклонной стойкой и регулировкой температуры света. ' +
      'Три уровня яркости помогают подобрать освещение ' +
      'для работы и отдыха. Корпус занимает немного места ' +
      'на рабочем столе.'
  },

  studio: {
    name: 'Lumen Studio',
    category: 'Для работы и учёбы',
    sku: 'LM-006',
    price: 2500,
    power: '14 Вт',
    temperature: '4000 К',
    brightness: '5 уровней',
    color: 'Бордовый',
    material: 'Алюминий, ABS-пластик',
    height: '46 см',
    warranty: '24 месяца',
    delivery: 'Бесплатно',
    art: 'flex',

    description:
      'Модель для просторного рабочего места. ' +
      'Нейтральный свет 4000 К и пять уровней яркости ' +
      'позволяют настроить освещение для документов, ' +
      'рисования и занятий. Тяжёлое основание ' +
      'обеспечивает устойчивость.'
  },

  soft: {
    name: 'Lumen Soft',
    category: 'Для чтения',
    sku: 'LM-007',
    price: 1200,
    power: '6 Вт',
    temperature: '3000 К',
    brightness: '2 уровня',
    color: 'Сиреневый',
    material: 'Металл, ABS-пластик',
    height: '30 см',
    warranty: '12 месяцев',
    delivery: '300 ₽',
    art: 'base',

    description:
      'Лампа с округлым плафоном и тёплым светом. ' +
      'Два режима яркости подходят для чтения ' +
      'и мягкого вечернего освещения. Компактный корпус ' +
      'удобно разместить у кресла или на тумбе.'
  },

  air: {
    name: 'Lumen Air',
    category: 'Для работы и учёбы',
    sku: 'LM-008',
    price: 2200,
    power: '10 Вт',
    temperature: '3500–5500 К',
    brightness: '4 уровня',
    color: 'Серо-зелёный',
    material: 'Алюминий, ABS-пластик',
    height: '41 см',
    warranty: '18 месяцев',
    delivery: 'Бесплатно',
    art: 'pro',

    description:
      'Лампа с тонкой световой панелью для современного ' +
      'рабочего стола. Четыре уровня яркости ' +
      'и настройка температуры помогают подобрать свет ' +
      'для разных задач. Плоское основание оставляет ' +
      'место для канцелярии.'
  },

  max: {
    name: 'Lumen Max',
    category: 'Для любых задач',
    sku: 'LM-009',
    price: 3000,
    power: '18 Вт',
    temperature: '2700–6500 К',
    brightness: '6 уровней',
    color: 'Тёмно-коричневый',
    material: 'Алюминий, ABS-пластик',
    height: '50 см',
    warranty: '24 месяца',
    delivery: 'Бесплатно',
    art: 'pro',

    description:
      'Самая мощная модель коллекции для большого стола. ' +
      'Широкая панель, шесть уровней яркости ' +
      'и диапазон температуры от 2700 до 6500 К ' +
      'позволяют использовать лампу для работы, ' +
      'творчества и вечернего чтения.'
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
};

const getProduct = (id) => {
  return Object.hasOwn(products, id) ? products[id] : null;
};

// ==================================
// 2. Высота шапки
// ==================================

const header = document.querySelector('.site-header');

if (header) {
  const updateHeaderHeight = () => {
    document.documentElement.style.setProperty(
      '--header-height',
      `${header.offsetHeight}px`
    );
  };

  updateHeaderHeight();

  window.addEventListener('resize', updateHeaderHeight);

  if ('ResizeObserver' in window) {
    new ResizeObserver(updateHeaderHeight).observe(header);
  }
}

// ==================================
// 3. Подробная страница товара
// ==================================

const productDetail = document.getElementById('product-detail');

if (productDetail) {
  const productId =
    new URLSearchParams(window.location.search).get('id') ||
    'flex';

  const product = getProduct(productId);

  if (!product) {
    document.getElementById('product-error').hidden = false;
    document.title = 'Товар не найден — LUMEN';
  } else {
    document.title = `${product.name} — LUMEN`;

    document.getElementById('product-breadcrumb').textContent =
      product.name;

    document.getElementById('product-name').textContent =
      product.name;

    document.getElementById('product-category').textContent =
      product.category;

    document.getElementById('product-sku').textContent =
      `Артикул: ${product.sku}`;

    document.getElementById('product-description').textContent =
      product.description;

    document.getElementById('product-price').textContent =
      formatPrice(product.price);

    document.getElementById('product-delivery').textContent =
      `Доставка: ${product.delivery}`;

    document.getElementById('product-warranty').textContent =
      `Гарантия: ${product.warranty}`;

    document.getElementById('product-order').dataset.order =
      productId;

    const art = document.getElementById('product-art');

    // Базовая форма лампы.
    art.classList.add(
      `lamp-art--${product.art || productId}`
    );

    // Индивидуальный цвет новой модели.
    if (product.art) {
      art.classList.add(`lamp-art--${productId}`);
    }

    art.setAttribute(
      'aria-label',
      `Настольная лампа ${product.name}, цвет: ${product.color}`
    );

    const specs = {
      'Мощность': product.power,
      'Температура света': product.temperature,
      'Регулировка яркости': product.brightness,
      'Цвет корпуса': product.color,
      'Материал': product.material,
      'Высота': product.height,
      'Питание': 'От сети, адаптер в комплекте',
      'Источник света': 'Встроенный LED-модуль',
      'Гарантия': product.warranty
    };

    const list = document.getElementById('product-specs');

    Object.entries(specs).forEach(([name, value]) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const definition = document.createElement('dd');

      term.textContent = name;
      definition.textContent = value;

      row.append(term, definition);
      list.append(row);
    });

    productDetail.hidden = false;
  }
}

// ==================================
// 4. Фильтры каталога
// ==================================

const filtersForm = document.getElementById('filters-form');

if (filtersForm) {
  const cards = [
    ...document.querySelectorAll(
      '.catalog-products .product-card'
    )
  ];

  const from = document.getElementById('price-from');
  const to = document.getElementById('price-to');

  const applyFilters = () => {
    const category = new FormData(filtersForm).get('category');

    const minimum =
      from.value === '' ? 0 : from.valueAsNumber;

    const maximum =
      to.value === '' ? Infinity : to.valueAsNumber;

    let count = 0;

    cards.forEach((card) => {
      const price = Number(card.dataset.price);

      const matchesCategory =
        category === 'all' ||
        card.dataset.category === category;

      const matchesPrice =
        price >= minimum &&
        price <= maximum;

      const matches = matchesCategory && matchesPrice;

      card.hidden = !matches;

      if (matches) {
        count++;
      }
    });

    document.getElementById('products-count').textContent =
      `Найдено товаров: ${count}`;

    document.getElementById('products-empty').hidden =
      count > 0;
  };

  // Счётчик определяется по фактическому числу карточек.
  applyFilters();

  filtersForm.addEventListener('submit', (event) => {
    event.preventDefault();

    to.setCustomValidity('');

    if (
      from.value !== '' &&
      to.value !== '' &&
      from.valueAsNumber > to.valueAsNumber
    ) {
      to.setCustomValidity(
        'Цена «До» должна быть не меньше цены «От».'
      );

      to.reportValidity();
      return;
    }

    applyFilters();
  });

  filtersForm.addEventListener('input', () => {
    to.setCustomValidity('');
  });

  filtersForm.addEventListener('reset', () => {
    to.setCustomValidity('');

    // Ждём восстановления исходных значений формы.
    setTimeout(applyFilters, 0);
  });
}

// ==================================
// 5. Общая форма заявки
// ==================================

document.body.insertAdjacentHTML(
  'beforeend',
  `
    <dialog
      class="order-dialog"
      id="order-dialog"
      aria-labelledby="order-dialog-title"
      aria-describedby="order-demo-note"
    >
      <h2
        class="order-dialog__title"
        id="order-dialog-title"
      >
        Оформление заявки
      </h2>

      <p
        class="order-dialog__product"
        id="order-product-name"
      ></p>

      <form
        class="order-form"
        id="order-form"
        novalidate
      >
        <input
          id="selected-product"
          name="product"
          type="hidden"
        >

        <div class="order-form__field">
          <label
            class="order-form__label"
            for="order-name"
          >
            Имя *
          </label>

          <input
            class="order-form__input"
            id="order-name"
            name="name"
            type="text"
            minlength="2"
            maxlength="80"
            autocomplete="given-name"
            required
          >
        </div>

        <div class="order-form__field">
          <label
            class="order-form__label"
            for="order-email"
          >
            E-mail *
          </label>

          <input
            class="order-form__input"
            id="order-email"
            name="email"
            type="email"
            autocomplete="email"
            required
          >
        </div>

        <div class="order-form__field">
          <label
            class="order-form__label"
            for="order-phone"
          >
            Телефон *
          </label>

          <input
            class="order-form__input"
            id="order-phone"
            name="phone"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            placeholder="+7 (900) 000-00-00"
            aria-describedby="phone-hint"
            required
          >

          <small
            class="order-form__hint"
            id="phone-hint"
          >
            Введите 11 цифр, начиная с +7 или 8.
            Пробелы, скобки и дефисы допустимы.
          </small>
        </div>

        <div class="order-form__field">
          <label
            class="order-form__label"
            for="order-date"
          >
            Дата связи
          </label>

          <input
            class="order-form__input"
            id="order-date"
            name="date"
            type="date"
          >
        </div>

        <div class="order-form__field">
          <label
            class="order-form__label"
            for="order-topic"
          >
            Тема заявки *
          </label>

          <select
            class="order-form__input"
            id="order-topic"
            name="topic"
            required
          >
            <option value="">Выберите тему</option>
            <option value="product">Заказ товара</option>
            <option value="consultation">Консультация</option>
            <option value="delivery">Доставка</option>
          </select>
        </div>

        <div class="order-form__field">
          <label
            class="order-form__label"
            for="order-comment"
          >
            Комментарий
          </label>

          <textarea
            class="order-form__input"
            id="order-comment"
            name="comment"
            rows="3"
            maxlength="1000"
          ></textarea>
        </div>

        <label class="order-form__agreement">
          <input
            class="order-form__checkbox"
            name="agreement"
            type="checkbox"
            required
          >

          Я согласен на обработку введённых данных
          в рамках учебной демонстрации *
        </label>

        <p
          class="order-form__hint"
          id="order-demo-note"
        >
          Учебная форма. Данные на сервер не отправляются.
          Поля со * обязательны.
        </p>

        <div class="order-form__actions">
          <button
            class="button button--secondary"
            id="close-order-dialog"
            type="button"
          >
            Закрыть
          </button>

          <button
            class="button button--primary"
            type="submit"
          >
            Проверить заявку
          </button>
        </div>
      </form>
    </dialog>

    <p
      class="success-message"
      id="success-message"
      role="status"
      aria-live="polite"
      hidden
    ></p>

    <button
      class="back-to-top"
      id="back-to-top"
      type="button"
      aria-label="Вернуться наверх страницы"
      title="Наверх"
      hidden
    >
      ↑
    </button>
  `
);

const orderDialog = document.getElementById('order-dialog');
const orderForm = document.getElementById('order-form');

const successMessage = document.getElementById(
  'success-message'
);

const phone = document.getElementById('order-phone');
const nameField = document.getElementById('order-name');

let returnFocus = null;
let messageTimer;

// ==================================
// 6. Открытие формы
// ==================================

document.addEventListener('click', (event) => {
  const trigger = event.target.closest(
    '[data-order], [data-contact]'
  );

  if (!trigger) {
    return;
  }

  const product = getProduct(trigger.dataset.order);

  if (
    trigger.hasAttribute('data-order') &&
    !product
  ) {
    return;
  }

  returnFocus = trigger;

  orderForm.reset();

  orderForm
    .querySelectorAll('[aria-invalid]')
    .forEach((field) => {
      field.removeAttribute('aria-invalid');
    });

  phone.setCustomValidity('');
  nameField.setCustomValidity('');

  successMessage.hidden = true;
  clearTimeout(messageTimer);

  document.getElementById('selected-product').value =
    product ? product.name : 'Консультация';

  document.getElementById('order-product-name').textContent =
    product
      ? `${product.name} · ${formatPrice(product.price)}`
      : 'Поможем разобраться с выбором модели';

  document.getElementById('order-topic').value =
    product ? 'product' : 'consultation';

  const today = new Date();

  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  document.getElementById('order-date').min = localDate;

  orderDialog.showModal();
  nameField.focus();
});

// ==================================
// 7. Закрытие формы
// ==================================

document
  .getElementById('close-order-dialog')
  .addEventListener('click', () => {
    orderDialog.close();
  });

orderDialog.addEventListener('click', (event) => {
  if (event.target !== orderDialog) {
    return;
  }

  const rect = orderDialog.getBoundingClientRect();

  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) {
    orderDialog.close();
  }
});

// Escape поддерживается элементом dialog автоматически.
orderDialog.addEventListener('close', () => {
  returnFocus?.focus();
});

// ==================================
// 8. Проверка формы
// ==================================

const validateOrderFields = () => {
  const validName =
    nameField.value.trim().length >= 2;

  nameField.setCustomValidity(
    validName
      ? ''
      : 'Введите имя: минимум два символа без учёта пробелов.'
  );

  const digits = phone.value.replace(/\D/g, '');

  const validCharacters =
    /^[+\d\s()-]+$/.test(phone.value);

  const validDigits =
    /^[78]\d{10}$/.test(digits);

  phone.setCustomValidity(
    validCharacters && validDigits
      ? ''
      : 'Введите номер из 11 цифр, начиная с +7 или 8.'
  );
};

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  validateOrderFields();

  const fields = orderForm.querySelectorAll(
    'input:not([type="hidden"]), select, textarea'
  );

  fields.forEach((field) => {
    if (field.checkValidity()) {
      field.removeAttribute('aria-invalid');
    } else {
      field.setAttribute('aria-invalid', 'true');
    }
  });

  if (!orderForm.reportValidity()) {
    return;
  }

  orderDialog.close();
  orderForm.reset();

  successMessage.textContent =
    'Проверка пройдена. Это учебная демонстрация: ' +
    'заявка на сервер не отправлялась.';

  successMessage.hidden = false;

  messageTimer = setTimeout(() => {
    successMessage.hidden = true;
  }, 8000);
});

const clearOrderError = (event) => {
  const field = event.target;

  if (!field.matches('input, select, textarea')) {
    return;
  }

  if (field === phone || field === nameField) {
    validateOrderFields();
  }

  if (field.checkValidity()) {
    field.removeAttribute('aria-invalid');
  }
};

orderForm.addEventListener('input', clearOrderError);
orderForm.addEventListener('change', clearOrderError);

// ==================================
// 9. Кнопка «Наверх»
// ==================================

const backToTopButton = document.getElementById(
  'back-to-top'
);

const updateBackToTop = () => {
  backToTopButton.hidden = window.scrollY <= 300;
};

window.addEventListener('scroll', updateBackToTop, {
  passive: true
});

updateBackToTop();

backToTopButton.addEventListener('click', () => {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  window.scrollTo({
    top: 0,
    behavior: reducedMotion ? 'instant' : 'smooth'
  });
});