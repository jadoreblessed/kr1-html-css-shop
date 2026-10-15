
// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле выбранного товара.
const selectedProductInput = document.getElementById('selected-product');

// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {

    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Сбрасываем ранее введённые данные.
    orderForm.reset();

    // Убираем ошибки предыдущей проверки.
    orderForm.querySelectorAll('[aria-invalid]').forEach((field) => {
      field.removeAttribute('aria-invalid');
    });

    // Записываем название выбранного товара.
    selectedProductInput.value = productName;

    // Скрываем предыдущее сообщение об успехе.
    successMessage.hidden = true;

    // Открываем модальное окно.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно.
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// Проверяем форму перед отправкой.
orderForm.addEventListener('submit', (event) => {

  // Отменяем стандартную отправку формы.
  event.preventDefault();

  // Получаем поля формы.
  const fields = orderForm.querySelectorAll(
    '.order-form__input, .order-form__checkbox'
  );

  // Проверяем каждое поле.
  fields.forEach((field) => {
    if (!field.checkValidity()) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('aria-invalid');
    }
  });

  // Если форма заполнена неправильно.
  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    return;
  }

  // Закрываем модальное окно.
  orderDialog.close();

  // Показываем сообщение об успешной отправке.
  successMessage.hidden = false;

  // Очищаем форму.
  orderForm.reset();
});

// Убираем ошибку при исправлении поля.
orderForm.addEventListener('input', (event) => {
  const field = event.target;

  if (field.checkValidity()) {
    field.removeAttribute('aria-invalid');
  }
});

// Проверяем изменения select и checkbox.
orderForm.addEventListener('change', (event) => {
  const field = event.target;

  if (field.checkValidity()) {
    field.removeAttribute('aria-invalid');
  }
});
