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
  var currentMinimalPrice = 5000;
  var address = document.querySelector('#address');
  var priceValidity = false;
  var title = document.querySelector('#title');
  var titleValidity = false;
  var avatarInput = document.querySelector('#avatar');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var currentCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var blockCapacity = currentCapacity.querySelectorAll('option');
  var description = document.querySelector('#description');
  var filterWiFI = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');
  var userFeatureWifi = document.querySelector('#feature-wifi');
  var userFeatureDishwasher = document.querySelector('#feature-dishwasher');
  var userFeatureParking = document.querySelector('#feature-parking');
  var userFeatureWasher = document.querySelector('#feature-washer');
  var userFeatureElevator = document.querySelector('#feature-elevator');
  var userFeatureConditioner = document.querySelector('#feature-conditioner');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  function errorMessageCreator() {
    var errorMessage = document.createElement('div');
    var errorMessageButton = document.createElement('button');
    var errorMessageText = document.createElement('p');
    errorMessage.className = 'error';
    errorMessageText.className = 'error__message';
    errorMessageText.textContent = 'Ошибка загрузки объявления';
    errorMessageButton.className = 'error_button';
    errorMessageButton.textContent = 'Попробовать снова';
    errorMessage.appendChild(errorMessageText);
    errorMessage.appendChild(errorMessageButton);
    window.main.map.appendChild(errorMessage);

    var deleteEroorMessage = function (evt) {
      if (evt.button === 0 || evt.key === 'Escape') {
        if (!window.main.map.errorMessage) {
          window.main.map.removeChild(errorMessage);
        }
      }
    };

    document.addEventListener('click', deleteEroorMessage);

    document.addEventListener('keydown', deleteEroorMessage);
  }
  function sucessMessageCreator() {
    var sucessMessage = document.createElement('div');
    var sucessMessageText = document.createElement('p');
    sucessMessage.className = 'success';
    sucessMessageText.className = 'success__message';
    sucessMessageText.innerHTML = 'Ваше объявление<br>успешно размещено!';
    sucessMessage.appendChild(sucessMessageText);
    window.main.map.appendChild(sucessMessage);
    submitButton.disabled = true;

    var sucessMessageDeleter = function (evt) {
      if (evt.button === 0 || evt.key === 'Escape') {
        if (window.main.map.sucessMessage !== null) {
          var removingMessage = document.querySelector('.success');
          window.main.map.removeChild(removingMessage);
          reset.click();
        }
      }
    };

    document.addEventListener('mousedown', sucessMessageDeleter);

    document.addEventListener('keydown', sucessMessageDeleter);
  }

  var submitButtonAction = function (evt) {
    var form = document.querySelector('.ad-form');
    bigPin.style.top = 375 + 'px';
    bigPin.style.left = 570 + 'px';
    if (priceValidity === true && titleValidity === true) {
      window.upload(new FormData(form), function () {
        sucessMessageCreator();
      }, function () {
        errorMessageCreator();
      });
      evt.preventDefault();
    }
  };
  submitButton.addEventListener('click', submitButtonAction);

  var checkPriceValidity = function () {
    var priceValue = priceInput.value;
    if (priceValue < currentMinimalPrice) {
      priceInput.setCustomValidity('Цена начинается от ' + currentMinimalPrice + ' ₽/ночь');
      priceValidity = false;
    } else if (priceValue > 1000000) {
      priceInput.setCustomValidity('Цена не может превышать 1 000 000' + ' ₽/ночь');
      priceValidity = false;
    } else {
      priceValidity = true;
      priceInput.setCustomValidity('');
    }
  };

  priceInput.addEventListener('input', checkPriceValidity);

  var checkTitleValidity = function () {
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
  };

  title.addEventListener('change', checkTitleValidity);

  var changePricePlaceholder = function () {
    switch (typeInput.value) {
      case BUNGALO:
        priceInput.placeholder = MIN_BUNGALO_PRICE;
        currentMinimalPrice = MIN_BUNGALO_PRICE;
        break;
      case PALACE:
        priceInput.placeholder = MIN_PALACE_PRICE;
        currentMinimalPrice = MIN_PALACE_PRICE;
        break;
      case HOUSE:
        priceInput.placeholder = MIN_HOUSE_PRICE;
        currentMinimalPrice = MIN_HOUSE_PRICE;
        break;
      case FLAT:
        priceInput.placeholder = MIN_FLAT_PRICE;
        currentMinimalPrice = MIN_FLAT_PRICE;
        break;
    }
  };

  typeInput.addEventListener('change', changePricePlaceholder);

  avatarInput.accept = 'img/jpeg, img/svg';

  var checkTimes = function (evt) {
    if (evt.target === timein) {
      timeout.value = timein.value;
    } else if (evt.target === timeout) {
      timein.value = timeout.value;
    }
  };
  timein.addEventListener('change', checkTimes);


  timeout.addEventListener('change', checkTimes);

  blockCapacity[0].disabled = true;
  blockCapacity[2].disabled = false;
  blockCapacity[1].disabled = true;
  blockCapacity[3].disabled = true;
  currentCapacity.selectedIndex = 2;
  window.main.address.setAttribute('readonly', true);

  var checkCapacityValidity = function () {
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
  };
  roomNumber.addEventListener('change', checkCapacityValidity);

  var resetForm = function (evt) {
    evt.preventDefault();
    title.value = '';
    priceInput.value = '';
    currentCapacity.value = '1';
    roomNumber.value = '1';
    timein.value = '12:00';
    timeout.value = '12:00';
    description.value = '';
    address.value = window.map.pinXStart + ', ' + window.map.pinYStart;
    bigPin.style.top = 375 + 'px';
    bigPin.style.left = 570 + 'px';
    filterConditioner.checked = false;
    filterDishwasher.checked = false;
    filterElevator.checked = false;
    filterParking.checked = false;
    filterWasher.checked = false;
    filterWiFI.checked = false;
    userFeatureConditioner.checked = false;
    userFeatureDishwasher.checked = false;
    userFeatureElevator.checked = false;
    userFeatureParking.checked = false;
    userFeatureWasher.checked = false;
    userFeatureWifi.checked = false;
    housingGuests.value = 'any';
    housingPrice.value = 'any';
    housingRooms.value = 'any';
    housingType.value = 'any';
    window.map.filterChange(window.data.fullData);
    window.data = null;
    window.activate('disable');
  };

  reset.addEventListener('click', resetForm);
})();
