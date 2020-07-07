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

  function manageStartForm(manage) {
    var userForm = document.querySelector('.ad-form');
    var mapFilterElement = document.querySelectorAll('.map__filter');
    var mapFilters = document.querySelector('.map__filters');
    var userAvatar = document.querySelectorAll('#avatar');
    var userFormElements = document.querySelectorAll('.ad-form__element');
    var h2Map = mapOverlay.querySelector('h2');
    var promo = document.querySelector('.promo');
    var main = document.querySelector('main');
    mapOverlay.removeChild(h2Map);
    while (promo.firstChild) {
      promo.removeChild(promo.firstChild);
    }
    main.removeChild(promo);
    function managingForm(arr) {
      if (manage === 'activate') {
        window.main.map.classList.remove('map--faded');
        userForm.classList.remove('ad-form--disabled');
        mapFilters.classList.remove('ad-form--disabled');
        arr.forEach(function (el) {
          el.disabled = false;
        });
      } else {
        mapFilters.classList.add('ad-form--disabled');
        arr.forEach(function (el) {
          el.disabled = true;
        });
      }
    }
    managingForm(mapFilterElement);
    managingForm(userAvatar);
    managingForm(userFormElements);
  }

  bigPin.addEventListener('mousedown', function (evt) {
    var addressY = 0;
    var addressX = 0;
    bigPinClicked = true;
    window.main.address.value = PIN_X_START + ', ' + PIN_Y_START;
    if (evt.button === MOUSE_LEFT_BUTTON && sum1 === 0) {
      manageStartForm('activate');
      window.pin.createDOMElement();
      sum1++;
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
      manageStartForm('activate');
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
      console.log(window.data.nLists.length);
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
    }
  };
})();
