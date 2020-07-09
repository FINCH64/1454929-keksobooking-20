'use strict';
(function () {
  var submitButton = document.querySelector('.ad-form__submit');
  var BUNGALO = 'bungalo';
  var HOUSE = 'house';
  var PALACE = 'palace';
  var FLAT = 'flat';
  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var bigPin = document.querySelector('.map__pin--main');
  var reset = document.querySelector('.ad-form__reset');
  var currentMinPrice = 5000;
  var address = document.querySelector('#address');

  function errMessageCreator() {
    var errDiv = document.createElement('div');
    errDiv.className = 'error';
    var errP = document.createElement('p');
    errP.className = 'error__message';
    errP.textContent = 'Ошибка загрузки объявления';
    var errButton = document.createElement('button');
    errButton.className = 'error_button';
    errButton.textContent = 'Попробовать снова';
    errDiv.appendChild(errP);
    errDiv.appendChild(errButton);
    window.main.map.appendChild(errDiv);
    document.addEventListener('click', function () {
      window.main.map.removeChild(errDiv);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        window.main.map.removeChild(errDiv);
      }
    });
  }
  function sucessMessageCreator() {
    var sucDiv = document.createElement('div');
    sucDiv.className = 'success';
    var sucP = document.createElement('p');
    sucP.className = 'success__message';
    sucP.innerHTML = 'Ваше объявление<br>успешно размещено!';
    sucDiv.appendChild(sucP);
    window.main.map.appendChild(sucDiv);
    document.addEventListener('click', function () {
      window.main.map.removeChild(sucDiv);
      reset.click();
      window.activate('disable');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        if (!window.main.map.sucDiv) {
          window.main.map.removeChild(sucDiv);
          reset.click();
          window.activate('disable');
        }
      }
    });
  }

  submitButton.addEventListener('click', function (evt) {
    bigPin.style.top = 375 + 'px';
    bigPin.style.left = 570 + 'px';
    var form = document.querySelector('.ad-form');
    console.log(priceValidity);
    if (priceValidity === true && titleValidity === true) {
      window.upload(new FormData(form), function (response) {
        console.log(response);
        sucessMessageCreator();
      }, function () {
        console.log(111111);
        errMessageCreator();
      });
      evt.preventDefault();
    }
  });
  var priceValidity = false;
  priceInput.addEventListener('input', function () {
    var priceValue = priceInput.value;
    if (priceValue < currentMinPrice) {
      priceInput.setCustomValidity('Цена начинается от ' + currentMinPrice + ' ₽/ночь');
      priceValidity = false;
    } else if (priceValue > 1000000) {
      priceInput.setCustomValidity('Цена не может превышать 1 000 000' + ' ₽/ночь');
      priceValidity = false;
    } else {
      priceValidity = true;
      priceInput.setCustomValidity('');
    }
  });

  var title = document.querySelector('#title');
  var titleValidity = false;
  title.addEventListener('change', function () {
    switch (true) {
      case title.value.length < 30:
        titleValidity = false;
        break;
      case title.value.length > 100:
        titleValidity = false;
        break;
      default:
        titleValidity = true;
        break;
    }

  });

  typeInput.addEventListener('change', function () {
    switch (typeInput.value) {
      case BUNGALO:
        priceInput.placeholder = MIN_BUNGALO_PRICE;
        currentMinPrice = MIN_BUNGALO_PRICE;
        break;
      case PALACE:
        priceInput.placeholder = MIN_PALACE_PRICE;
        currentMinPrice = MIN_PALACE_PRICE;
        break;
      case HOUSE:
        priceInput.placeholder = MIN_HOUSE_PRICE;
        currentMinPrice = MIN_HOUSE_PRICE;
        break;
      case FLAT:
        priceInput.placeholder = MIN_FLAT_PRICE;
        currentMinPrice = MIN_FLAT_PRICE;
        break;
    }
  });


  var avatarInput = document.querySelector('#avatar');
  avatarInput.accept = 'img/jpeg, img/svg';

  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });


  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  var currentCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var blockCapacity = currentCapacity.querySelectorAll('option');
  blockCapacity[0].disabled = true;
  blockCapacity[2].disabled = false;
  blockCapacity[1].disabled = true;
  blockCapacity[3].disabled = true;
  currentCapacity.selectedIndex = 2;
  window.main.address.setAttribute('readonly', true);

  roomNumber.addEventListener('change', function () {
    switch (Number(roomNumber.value)) {
      case 1:
        blockCapacity[0].disabled = true;
        blockCapacity[1].disabled = true;
        blockCapacity[2].disabled = false;
        blockCapacity[3].disabled = true;
        break;
      case 2:
        blockCapacity[0].disabled = true;
        blockCapacity[1].disabled = false;
        blockCapacity[2].disabled = false;
        blockCapacity[3].disabled = true;
        currentCapacity.selectedIndex = 1;
        break;
      case 3:
        blockCapacity[0].disabled = false;
        blockCapacity[1].disabled = false;
        blockCapacity[2].disabled = false;
        blockCapacity[3].disabled = true;
        currentCapacity.selectedIndex = 0;
        break;
      case 100:
        blockCapacity[0].disabled = true;
        blockCapacity[1].disabled = true;
        blockCapacity[2].disabled = true;
        blockCapacity[3].disabled = false;
        currentCapacity.selectedIndex = 3;
        break;
    }
  });
  reset.addEventListener('click', function () {
    address.value = window.map.pinXStart + ', ' + window.map.pinYStart;
    bigPin.style.top = 375 + 'px';
    bigPin.style.left = 570 + 'px';
  });
})();
