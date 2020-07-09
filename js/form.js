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
  submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    bigPin.style.top = 375 + 'px';
    bigPin.style.left = 570 + 'px';
    var form = document.querySelector('.ad-form');
    window.upload(new FormData(form), function (response) {
      console.log(response);
      reset.click();
      window.activate('disable');
    }, function (message) {
      throw new Error(message);
    });
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
    window.main.address.value = window.map.pinXStart + ', ' + window.map.pinYStart;
    bigPin.style.top = 375 + 'px';
    bigPin.style.left = 570 + 'px';
  });
})();
