'use strict';
(function () {
  var KeyboardKey = {
    ESC: 'Escape',
    ENTER: 'Enter',
  };
  var ActionType = {
    CLICK: 'click',
    KEY: 'key',
  };
  var ANY_VALUE_FLAG = 100000;
  var HIGHEST_PRICE = 10000001;
  var LOWEST_PRICE = 0;
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
  var sum = 0;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var userForm = document.querySelector('.ad-form');
  var mapFilterElement = document.querySelectorAll('.map__filter');
  var mapFilters = document.querySelector('.map__filters');
  var userAvatar = document.querySelectorAll('#avatar');
  var userFormElements = document.querySelectorAll('.ad-form__element');
  var textOnMap = mapOverlay.querySelector('h2');
  var promo = document.querySelector('.promo');
  var main = document.querySelector('main');
  var roomsHandler = ANY_VALUE_FLAG;
  var guestsHandler = ANY_VALUE_FLAG;
  var typeHandler = 'any';
  var filterWiFI = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');
  var filterFeaturesArray = [];
  var submitButton = document.querySelector('.ad-form__submit');
  var counter = 0;
  var lowestPriceHolder = LOWEST_PRICE;
  var highestPriceHolder = HIGHEST_PRICE;

  window.activate = function (manage) {
    if (manage === 'activate1') {
      submitButton.disabled = false;
      mapOverlay.removeChild(textOnMap);
      while (promo.firstChild) {
        promo.removeChild(promo.firstChild);
      }
      main.removeChild(promo);
      window.main.address.value = PIN_X_START + ', ' + PIN_Y_START;
      managingForm(mapFilterElement);
      managingForm(userAvatar);
      managingForm(userFormElements);
    } else if (manage === 'disable') {
      for (var i = 0; i < window.map.newArray.length; i++) {
        var numPin = '#map_pin_n_' + i;
        var deletablePin = document.querySelector(numPin);
        deletablePin.remove();
      }
      managingForm(mapFilterElement);
      managingForm(userAvatar);
      managingForm(userFormElements);
    } else if (manage === 'activate') {
      window.main.address.value = PIN_X_START + ', ' + PIN_Y_START;
      submitButton.disabled = false;
      managingForm(mapFilterElement);
      managingForm(userAvatar);
      managingForm(userFormElements);
    }
    function managingForm(array) {
      if (manage === 'activate' || manage === 'activate1') {
        submitButton.disabled = false;
        window.main.map.classList.remove('map--faded');
        userForm.classList.remove('ad-form--disabled');
        mapFilters.classList.remove('ad-form--disabled');
        array.forEach(function (element) {
          element.disabled = false;
        });
        window.map.activated = true;
      } else {
        mapFilters.classList.add('ad-form--disabled');
        userForm.classList.add('ad-form--disabled');
        window.main.map.classList.add('map--faded');
        array.forEach(function (element) {
          element.disabled = true;
        });
        window.map.activated = false;
      }
    }
  };
  var getServerData = function (evt) {
    if (evt.button === MOUSE_LEFT_BUTTON || evt.key === KeyboardKey.ENTER) {
      window.map.bigPinClicked = true;
      if (window.data !== null && window.data !== undefined) {
        window.map.manageServerData(evt);
      } else {
        window.newData.loadFunction(evt);
      }
    }
  };

  bigPin.addEventListener('mousedown', getServerData);


  bigPin.addEventListener('keydown', getServerData);

  function activateTemplate(evt, type, array) {
    var mapPins = document.querySelector('.map__pins');
    var article = window.main.map.querySelector('.map__card');
    if (article !== null && article !== undefined) {
      article.remove();
      mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
    if (type === 'click') {
      for (var a = 0; a < array.length; a++) {
        if (evt.path[0].id === 'map_pin_n_' + a) {
          window.card.renderCard(a, array);
          evt.path[0].className = 'map__pin map__pin--active';
          break;
        }
        if (evt.path[1].id === 'map_pin_n_' + a) {
          window.card.renderCard(a, array);
          evt.path[1].className = 'map__pin map__pin--active';
          break;
        }
      }
    } else {
      for (var b = 0; b < array.length; b++) {
        if (evt.path[0].id === 'map_pin_n_' + b) {
          window.card.renderCard(b, array);
          evt.path[0].className = 'map__pin map__pin--active';
          break;
        }
      }
    }

    var article2 = window.main.map.querySelector('article');
    var activePin = mapPins.querySelector('.map__pin--active');

    if (article2 !== null && activePin !== null) {
      var popupClose = article2.querySelector('.popup__close');

      var cardRemove = function () {
        if (evt.button === MOUSE_LEFT_BUTTON || evt.key === KeyboardKey.ESC) {
          article2.remove();
          activePin.classList.remove('map__pin--active');
        }
      };

      popupClose.addEventListener('click', cardRemove);

      document.addEventListener('keydown', cardRemove);
    }

  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var typeFilterChangedAction = function () {
    switch (housingType.value) {
      case 'house':
        typeHandler = 'house';
        break;
      case 'bungalo':
        typeHandler = 'bungalo';
        break;
      case 'palace':
        typeHandler = 'palace';
        break;
      case 'flat':
        typeHandler = 'flat';
        break;
      case 'any':
        typeHandler = 'any';
        break;
    }
    window.map.filterChange(window.map.renderArray);
  };

  housingType.addEventListener('change', window.debounce(typeFilterChangedAction));

  var priceFilterChangedAction = function () {
    switch (housingPrice.value) {
      case 'low':
        lowestPriceHolder = 0;
        highestPriceHolder = 10001;
        break;
      case 'middle':
        lowestPriceHolder = 9999;
        highestPriceHolder = 50001;
        break;
      case 'high':
        lowestPriceHolder = 49999;
        highestPriceHolder = 1000001;
        break;
      case 'any':
        lowestPriceHolder = LOWEST_PRICE;
        highestPriceHolder = HIGHEST_PRICE;
        break;
    }
    window.map.filterChange(window.map.renderArray);
  };

  housingPrice.addEventListener('change', window.debounce(priceFilterChangedAction));

  var roomsFilterChangedAction = function () {
    switch (housingRooms.value) {
      case '1':
        roomsHandler = 1;
        break;
      case '2':
        roomsHandler = 2;
        break;
      case '3':
        roomsHandler = 3;
        break;
      case 'any':
        roomsHandler = ANY_VALUE_FLAG;
        break;
    }
    window.map.filterChange(window.map.renderArray);
  };

  housingRooms.addEventListener('change', window.debounce(roomsFilterChangedAction));

  var guestsFilterChangedAction = function () {
    switch (housingGuests.value) {
      case '0':
        guestsHandler = 0;
        break;
      case '1':
        guestsHandler = 1;
        break;
      case '2':
        guestsHandler = 2;
        break;
      case 'any':
        guestsHandler = ANY_VALUE_FLAG;
        break;
    }
    window.map.filterChange(window.map.renderArray);
  };

  housingGuests.addEventListener('change', window.debounce(guestsFilterChangedAction));

  var featuresFilterChanged = function (evt) {
    if (evt.target.checked && filterFeaturesArray[0] !== evt.target.value) {
      filterFeaturesArray.unshift(evt.target.value);
    } else {
      filterFeaturesArray.forEach(function (element, index) {
        if (element === evt.target.value) {
          filterFeaturesArray.splice(index, 1);
        }
      });
    }
    window.map.filterFeaturesArray = filterFeaturesArray;

    var filterFeatures = window.map.filterFeaturesArray;
    var maxRating = filterFeatures.length;
    if (filterFeatures.length !== 0) {
      var filteredWithRatingLists = [];
      window.data.fullData.every(function (element) {
        var rating = 0;
        var filteredWithRatingElement = {};
        element.offer.features.every(function (dataFeature) {
          for (var z = 0; z < dataFeature.length; z++) {
            for (var d = 0; d < filterFeatures.length; d++) {
              if (dataFeature === filterFeatures[d]) {
                rating++;
                return true;
              } else if (rating === filterFeatures.length) {
                return false;
              }
            }
          }
          return true;
        });
        if (rating === maxRating && filteredWithRatingLists.length < 5) {
          filteredWithRatingElement.rating = rating;
          filteredWithRatingElement.array = element;
          filteredWithRatingLists.unshift(filteredWithRatingElement);
        }
        return true;
      });
      var filteredWithoutRatingLists = [];
      for (var a = 0; a < filteredWithRatingLists.length; a++) {
        filteredWithoutRatingLists.unshift(filteredWithRatingLists[a].array);
      }
      window.map.renderArray = filteredWithoutRatingLists;
    } else {
      window.map.renderArray = window.data.fullData;
    }
    window.map.filterChange(window.map.renderArray);
  };

  filterWiFI.addEventListener('change', window.debounce(featuresFilterChanged));

  filterDishwasher.addEventListener('change', window.debounce(featuresFilterChanged));

  filterParking.addEventListener('change', window.debounce(featuresFilterChanged));

  filterWasher.addEventListener('change', window.debounce(featuresFilterChanged));

  filterElevator.addEventListener('change', window.debounce(featuresFilterChanged));

  filterConditioner.addEventListener('change', window.debounce(featuresFilterChanged));

  window.map = {
    filterChange: function (filteringArray) {
      switch (counter) {
        case 0:
          var mapPins = document.querySelector('.map__pins');
          var article = window.main.map.querySelector('.map__card');
          if (article !== null && article !== undefined) {
            article.remove();
            mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
          }

          for (var i = 0; i < window.data.newLists.length; i++) {
            var numPin = '#map_pin_n_' + i;
            var deletablePin = document.querySelector(numPin);
            deletablePin.remove();
          }
          break;
        default:
          mapPins = document.querySelector('.map__pins');
          article = window.main.map.querySelector('.map__card');
          if (article !== null && article !== undefined) {
            article.remove();
            mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
          }

          for (i = 0; i < window.map.newArray.length; i++) {
            numPin = '#map_pin_n_' + i;
            deletablePin = document.querySelector(numPin);
            deletablePin.remove();
          }
          break;
      }

      var newArray = filteringArray.filter(function (element) {
        return (typeHandler === 'any' || element.offer.type === typeHandler) &&
               element.offer.price < highestPriceHolder &&
               element.offer.price > lowestPriceHolder &&
              (roomsHandler === ANY_VALUE_FLAG || element.offer.rooms === roomsHandler) &&
              (guestsHandler === ANY_VALUE_FLAG || element.offer.guests === guestsHandler);

      });
      if (newArray.length > 5) {
        var nArray = [];
        nArray = newArray;
        var filteredArray = [];
        for (var z = 0; z < 5; z++) {
          var count = nArray.length;
          var a = getRandomInt(0, count - 1);
          filteredArray.unshift(newArray[a]);
          nArray.splice(a, 1);
        }
        newArray = filteredArray;
      }
      window.map.newArray = newArray;
      window.pin.createDOMElement(newArray);
      counter++;
    },

    activateCards: function (array) {
      var mapPinsActivated = [];
      for (var z = 0; z < array.length; z++) {
        var mapPin2 = document.querySelector('#map_pin_n_' + z);
        mapPinsActivated.push(mapPin2);
      }

      var activatePin = function (evt) {
        if (evt.button === MOUSE_LEFT_BUTTON) {
          activateTemplate(evt, ActionType.CLICK, array);
        } else if (evt.key === KeyboardKey.ENTER) {
          activateTemplate(evt, ActionType.KEY, array);
        }
      };

      mapPinsActivated.forEach(function (pin) {
        pin.addEventListener('click', activatePin);
        pin.addEventListener('keyup', activatePin);
      });
    },

    manageServerData: function (evt) {
      var addressY = 0;
      var addressX = 0;
      window.map.newArray = window.data.newLists;
      window.map.addressX = PIN_X_START;
      window.map.addressY = PIN_Y_START;
      if (window.map.activated === false) {
        if (evt.button === MOUSE_LEFT_BUTTON && sum === 0) {
          window.activate('activate1');
          window.pin.createDOMElement(window.map.newArray);
          sum++;
        } else if (evt.button === MOUSE_LEFT_BUTTON) {
          window.activate('activate');
          window.pin.createDOMElement(window.map.newArray);
        }
      }
      var addressChange = function (adressMousemoveEvt) {
        if (window.map.bigPinClicked === true) {
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
      };

      mapOverlay.addEventListener('mousemove', addressChange);

      var onMouseUpAction = function () {
        window.map.bigPinClicked = false;
      };

      mapOverlay.addEventListener('mouseup', onMouseUpAction);

      bigPin.addEventListener('mouseup', onMouseUpAction);

      document.addEventListener('mouseup', onMouseUpAction);

    },
    activated: false,
    pinXStart: PIN_X_START,
    pinYStart: PIN_Y_START,
    bigPinClicked: false,
  };
})();
