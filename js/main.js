
// ==================================
// 1. Получение элементов
// ==================================

const orderDialog = document.getElementById('order-dialog');

const orderButtons = document.querySelectorAll(
  '.product-card__button'
);

const closeDialogButton = document.getElementById(
  'close-order-dialog'
);

const selectedProductInput = document.getElementById(
  'selected-product'
);

const orderForm = document.getElementById('order-form');

const successMessage = document.getElementById(
  'success-message'
);

const backToTopButton = document.getElementById(
  'back-to-top'
);

// ==================================
// 2. Улучшенное модальное окно
// ==================================

if (
  orderDialog &&
  orderForm &&
  closeDialogButton &&
  selectedProductInput
) {

  // Открытие окна по кнопке Заказать
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {

      const productName = button.dataset.product || '';

      // Очистка предыдущих значений
      orderForm.reset();

      // Убираем ошибки
      orderForm.querySelectorAll('[aria-invalid]').forEach((field) => {
        field.removeAttribute('aria-invalid');
      });

      // Сохраняем выбранный товар
      selectedProductInput.value = productName;

      // Скрываем предыдущее сообщение
      if (successMessage) {
        successMessage.hidden = true;
      }

      // Открываем окно
      orderDialog.showModal();

      // Фокусируемся на поле имени
      document.getElementById('order-name')?.focus();
    });
  });

  // Закрытие по кнопке
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });

  // Закрытие при клике вне окна
  orderDialog.addEventListener('click', (event) => {

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

  // Escape поддерживается элементом dialog автоматически

  // ==================================
  // 3. Проверка формы
  // ==================================

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = orderForm.querySelectorAll(
      '.order-form__input, .order-form__checkbox'
    );

    fields.forEach((field) => {
      if (!field.checkValidity()) {
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    });

    // Если есть ошибки
    if (!orderForm.checkValidity()) {
      orderForm.reportValidity();

      const firstInvalidField = orderForm.querySelector(
        '[aria-invalid="true"]'
      );

      firstInvalidField?.focus();
      return;
    }

    // Имитация успешной отправки
    orderDialog.close();

    if (successMessage) {
      successMessage.hidden = false;

      successMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }

    orderForm.reset();
  });

  // Убираем ошибку после исправления поля
  const clearFieldError = (event) => {
    const field = event.target;

    if (field.checkValidity()) {
      field.removeAttribute('aria-invalid');
    }
  };

  orderForm.addEventListener('input', clearFieldError);
  orderForm.addEventListener('change', clearFieldError);
}

// ==================================
// 4. Фиксированная кнопка Наверх
// ==================================

if (backToTopButton) {

  // Показываем кнопку после прокрутки
  const updateBackToTop = () => {
    backToTopButton.hidden = window.scrollY <= 300;
  };

  window.addEventListener('scroll', updateBackToTop, {
    passive: true
  });

  // Проверяем состояние при загрузке
  updateBackToTop();

  // Плавно прокручиваем страницу наверх
  backToTopButton.addEventListener('click', () => {

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'instant' : 'smooth'
    });
  });
}
