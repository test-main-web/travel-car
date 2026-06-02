const filterItems = document.querySelectorAll('.cars-filter li');
const carItems = document.querySelectorAll('.car');
const carsContent = document.getElementById('cars-content');

filterItems.forEach((item) => {
  item.onclick = () => {
    filterItems.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');

    const filterText = item.textContent.toLowerCase();

    carItems.forEach((car) => {
      if (
        filterText === 'все марки' ||
        car.querySelector('h4').textContent.toLowerCase().includes(filterText)
      ) {
        car.style.display = 'flex';
      } else {
        car.style.display = 'none';
      }
    });

    carsContent.scrollIntoView({ behavior: 'instant' });
  };
});

document.getElementById('order-action').addEventListener('click', function () {
  const formFields = [
    { id: 'car', label: 'Марка автомобиля' },
    { id: 'name', label: 'Имя' },
    { id: 'phone', label: 'Телефон' },
  ];

  let isValid = true;

  // Проверяем каждое поле
  for (let field of formFields) {
    const inputField = document.getElementById(field.id);

    if (inputField.value.trim() === '') {
      inputField.style.borderColor = 'red'; // Красная рамка, если поле пустое
      isValid = false;
    } else {
      inputField.style.borderColor = ''; // Возвращаем рамку в исходное состояние

      // Дополнительно проверяем поле телефона на минимальную длину
      if (field.id === 'phone') {
        if (inputField.value.length < 10) {
          inputField.style.borderColor = 'red'; // Рамка красного цвета, если длина меньше 10 символов
          isValid = false;
        }
      }
    }
  }

  // Если всё введено верно — выводим сообщение и очищаем форму
  if (isValid) {
    alert('Спасибо за заявку! Мы скоро свяжемся с вами');
    for (let field of formFields) {
      document.getElementById(field.id).value = '';
    }
  }
});

// Функция подстановки названия автомобиля в форму при клике на кнопку "Забронировать" в карточке
document.querySelectorAll('.car .car-action .white-button').forEach((button) => {
    button.addEventListener('click', function () {
        // Находим карточку автомобиля, в которой находится кнопка
        const carCard = this.closest('.car');
        if (!carCard) return;

        // Берём название автомобиля из заголовка h4 внутри карточки
        const carTitleElement = carCard.querySelector('h4');
        if (!carTitleElement) return;

        const carTitle = carTitleElement.textContent.trim();
        if (!carTitle) return;

        // Находим поле ввода автомобиля в форме
        const carInput = document.getElementById('car');
        if (!carInput) return;

        // Подставляем название автомобиля в поле
        carInput.value = carTitle;

        // Убираем красную рамку, если она была установлена при предыдущей валидации
        carInput.style.borderColor = '';

        // Плавная прокрутка к форме бронирования
        const orderSection = document.getElementById('order');
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
