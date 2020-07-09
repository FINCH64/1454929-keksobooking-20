'use strict';
(function () {
  var KEYBOARD_KEYS = {
    esc: 'Escape',
    enter: 'Enter',
  };
  var ACTION_TYPE = {
    click: 'click',
    key: 'key',
  };
  var MOUSE_LEFT_BUTTON = 0;
  var X_GAP = 5;
  var LEFT_X_BODER = 0;
  var RIGHT_X_BORDER = 1200;
  var UP_Y_BORDER = 130;
  var BOTTOM_Y_BORDER = 630;
  var PIN_X_START = 604;
  var PIN_Y_START = 413;
  var mapOverlay = document.querySelector('.map__overlay');
  var bigPin = document.querySelector('.map__pin--main');
  var bigPinClicked = false;
  var sum1 = 0;
  window.activate = function (manage) {
    var userForm = document.querySelector('.ad-form');
    var mapFilterElement = document.querySelectorAll('.map__filter');
    var mapFilters = document.querySelector('.map__filters');
    var userAvatar = document.querySelectorAll('#avatar');
    var userFormElements = document.querySelectorAll('.ad-form__element');
    var h2Map = mapOverlay.querySelector('h2');
    var promo = document.querySelector('.promo');
    var main = document.querySelector('main');
    if (manage === 'activate1') {
      mapOverlay.removeChild(h2Map);
      while (promo.firstChild) {
        promo.removeChild(promo.firstChild);
      }
      main.removeChild(promo);
      managingForm(mapFilterElement);
      managingForm(userAvatar);
      managingForm(userFormElements);
    } else if (manage === 'disable') {
      for (var i = 0; i < window.data.nLists.length; i++) {
        var numPin = '#map_pin_n_' + i;
        var del2Pin = document.querySelector(numPin);
        del2Pin.remove();
      }
      managingForm(mapFilterElement);
      managingForm(userAvatar);
      managingForm(userFormElements);
    } else if (manage === 'activate') {
      managingForm(mapFilterElement);
      managingForm(userAvatar);
      managingForm(userFormElements);
    }
    function managingForm(arr) {
      if (manage === 'activate' || manage === 'activate1') {
        window.main.map.classList.remove('map--faded');
        userForm.classList.remove('ad-form--disabled');
        mapFilters.classList.remove('ad-form--disabled');
        arr.forEach(function (el) {
          el.disabled = false;
        });
        window.map.activated = true;
      } else {
        mapFilters.classList.add('ad-form--disabled');
        userForm.classList.add('ad-form--disabled');
        window.main.map.classList.add('map--faded');
        arr.forEach(function (el) {
          el.disabled = true;
        });
        window.map.activated = false;
      }
    }
  };
  bigPin.addEventListener('mousedown', function (evt) {
    var addressY = 0;
    var addressX = 0;
    bigPinClicked = true;
    window.main.address.value = PIN_X_START + ', ' + PIN_Y_START;
    window.map.addressX = PIN_X_START;
    window.map.addressY = PIN_Y_START;
    if (window.map.activated === false) {
      if (evt.button === MOUSE_LEFT_BUTTON && sum1 === 0) {
        window.activate('activate1');
        window.pin.createDOMElement();
        sum1++;
      } else if (evt.button === MOUSE_LEFT_BUTTON) {
        window.activate('activate');
        window.pin.createDOMElement();
      }
    }
    mapOverlay.addEventListener('mousemove', function (adressMousemoveEvt) {
      if (bigPinClicked) {
        if (adressMousemoveEvt.offsetY - window.data.PINYSIZE >= UP_Y_BORDER) {
          if (adressMousemoveEvt.offsetY <= BOTTOM_Y_BORDER) {
            addressY = adressMousemoveEvt.offsetY + window.data.PINYSIZE;
            bigPin.style.top = adressMousemoveEvt.offsetY - window.data.PINYSIZE + 'px';
          } else {
            addressY = BOTTOM_Y_BORDER;
            bigPin.style.top = (BOTTOM_Y_BORDER - window.data.PINYSIZE) + 'px';
          }
        } else {
          addressY = UP_Y_BORDER;
          bigPin.style.top = (UP_Y_BORDER - window.data.PINYSIZE) + 'px';
        }
        if (adressMousemoveEvt.offsetX >= LEFT_X_BODER + X_GAP) {
          if (adressMousemoveEvt.offsetX <= RIGHT_X_BORDER - X_GAP) {
            addressX = adressMousemoveEvt.offsetX + window.data.PINXSIZE;
            bigPin.style.left = adressMousemoveEvt.offsetX - window.data.PINXSIZE / 2 + 'px';
          } else {
            addressX = RIGHT_X_BORDER;
            bigPin.style.left = (RIGHT_X_BORDER - window.data.PINXSIZE / 2) + 'px';
          }
        } else {
          addressX = LEFT_X_BODER;
          bigPin.style.left = -window.data.PINXSIZE / 2 + 'px';
        }
        window.map.addressX = addressX;
        window.map.addressY = addressY;
        window.main.address.value = addressX + ', ' + addressY;
      }
    });
    mapOverlay.addEventListener('mouseup', function () {
      bigPinClicked = false;
    });

    bigPin.addEventListener('mouseup', function () {
      bigPinClicked = false;
    });

    document.addEventListener('mouseup', function () {
      bigPinClicked = false;
    });

  });
  bigPin.addEventListener('keydown', function (evt) {
    if (evt.key === KEYBOARD_KEYS.enter) {
      window.main.address.value = PIN_X_START + ', ' + PIN_Y_START;
      window.activate('activate');
      window.pin.createDOMElement();
    }
  });
  function activateTemplate(evt, type) {
    var mapPins = document.querySelector('.map__pins');
    var article = window.main.map.querySelector('article');
    if (article !== null && article !== undefined) {
      article.remove();
      mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }

    if (type === 'click') {
      for (var a = 0; a < window.data.nLists.length; a++) {
        if (evt.path[1].id === 'map_pin_n_' + a) {
          window.card.renderCard(a);
          evt.path[1].className = 'map__pin map__pin--active';
          break;
        }
      }
    } else {
      for (var b = 0; b < window.data.nLists.length; b++) {
        if (evt.path[0].id === 'map_pin_n_' + b) {
          window.card.renderCard(b);
          evt.path[0].className = 'map__pin map__pin--active';
          break;
        }
      }
    }

    var article2 = window.main.map.querySelector('article');
    var activePin = mapPins.querySelector('.map__pin--active');

    if (article2 !== null && activePin !== null) {
      var popupClose = article2.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        article2.remove();
        activePin.classList.remove('map__pin--active');
      });

      document.addEventListener('keydown', function (adressMousemoveEvt) {
        if (adressMousemoveEvt.key === KEYBOARD_KEYS.esc) {
          article2.remove();
          activePin.classList.remove('map__pin--active');
        }
      });
    }

  }


  window.map = {
    activateCards: function () {
      var mapPins2 = [];
      for (var z = 0; z < window.data.nLists.length; z++) {
        var mapPin2 = document.querySelector('#map_pin_n_' + z);
        mapPins2.push(mapPin2);
      }
      mapPins2.forEach(function (pin) {
        pin.addEventListener('click', function (evt3) {
          activateTemplate(evt3, ACTION_TYPE.click);
        });
        pin.addEventListener('keyup', function (evt4) {
          if (evt4.key === KEYBOARD_KEYS.enter) {
            activateTemplate(evt4, ACTION_TYPE.key);
          }
        });
      });
    },
    activated: false,
    pinXStart: PIN_X_START,
    pinYStart: PIN_Y_START,
  };
})();
