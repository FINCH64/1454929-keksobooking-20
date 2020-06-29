'use strict';
(function () {
  var PINXSTART = 790;
  var PINYSTART = 407;
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
    window.main.address.value = PINXSTART + ', ' + PINYSTART;
    if (evt.button === 0 && sum1 === 0) {
      manageStartForm('activate');
      window.pin.createDOMElement();
      sum1++;
    }
    mapOverlay.addEventListener('mousemove', function (adressMousemoveEvt) {
      if (bigPinClicked) {
        if (adressMousemoveEvt.offsetY - window.data.PINYSIZE >= 130) {
          if (adressMousemoveEvt.offsetY <= 630) {
            addressY = adressMousemoveEvt.offsetY + window.data.PINYSIZE;
            bigPin.style.top = adressMousemoveEvt.offsetY - window.data.PINYSIZE + 'px';
          } else {
            addressY = 630;
            bigPin.style.top = (630 - window.data.PINYSIZE) + 'px';
          }
        } else {
          addressY = 130;
          bigPin.style.top = (130 - window.data.PINYSIZE) + 'px';
        }
        if (adressMousemoveEvt.offsetX >= 5) {
          if (adressMousemoveEvt.offsetX <= 1195) {
            addressX = adressMousemoveEvt.offsetX + window.data.PINXSIZE;
            bigPin.style.left = adressMousemoveEvt.offsetX - window.data.PINXSIZE / 2 + 'px';
          } else {
            addressX = 1200;
            bigPin.style.left = (1200 - window.data.PINXSIZE / 2) + 'px';
          }
        } else {
          addressX = 0;
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
  });
  bigPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.main.address.value = PINXSTART + ', ' + PINYSTART;
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
        if (adressMousemoveEvt.key === 'Escape') {
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
          activateTemplate(evt3, 'click');
        });
        pin.addEventListener('keyup', function (evt4) {
          if (evt4.key === 'Enter') {
            activateTemplate(evt4, 'key');
          }
        });
      });
    }
  };
})();
