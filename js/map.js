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
  var ANY = 100000;
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
  var bigPinClicked = false;
  var sum1 = 0;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var userForm = document.querySelector('.ad-form');
  var mapFilterElement = document.querySelectorAll('.map__filter');
  var mapFilters = document.querySelector('.map__filters');
  var userAvatar = document.querySelectorAll('#avatar');
  var userFormElements = document.querySelectorAll('.ad-form__element');
  var h2Map = mapOverlay.querySelector('h2');
  var promo = document.querySelector('.promo');
  var main = document.querySelector('main');
  var roomsHandler = ANY;
  var guestsHandler = ANY;
  var typeHandler = 'any';
  var filterWiFI = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');
  var filterFeaturesArray = [];


  window.activate = function (manage) {
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
        window.pin.createDOMElement(window.data.nLists);
        sum1++;
      } else if (evt.button === MOUSE_LEFT_BUTTON) {
        window.activate('activate');
        window.pin.createDOMElement(window.data.nLists);
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
      window.pin.createDOMElement(window.data.nLists);
    }
  });

  function activateTemplate(evt, type, array) {
    var mapPins = document.querySelector('.map__pins');
    var article = window.main.map.querySelector('.map__card');
    if (article !== null && article !== undefined) {
      article.remove();
      mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }

    if (type === 'click') {
      for (var a = 0; a < array.length; a++) {
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
  var counter = 0;
  var lowestPriceHolder = LOWEST_PRICE;
  var highestPriceHolder = HIGHEST_PRICE;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function filterChange(filteringArray) {
    switch (counter) {
      case 0:
        var mapPins = document.querySelector('.map__pins');
        var article = window.main.map.querySelector('.map__card');
        if (article !== null && article !== undefined) {
          article.remove();
          mapPins.querySelector('.map__pin--active').classList.remove('map__pin--active');
        }

        for (var i = 0; i < window.data.nLists.length; i++) {
          var numPin = '#map_pin_n_' + i;
          var del2Pin = document.querySelector(numPin);
          del2Pin.remove();
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
          del2Pin = document.querySelector(numPin);
          del2Pin.remove();
        }
        break;
    }

    var newArray = filteringArray.filter(function (element) {
      return (typeHandler === 'any' || element.offer.type === typeHandler) &&
             element.offer.price < highestPriceHolder &&
             element.offer.price > lowestPriceHolder &&
            (roomsHandler === ANY || element.offer.rooms === roomsHandler) &&
            (guestsHandler === ANY || element.offer.guests === guestsHandler);

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
  }

  housingType.addEventListener('change', window.debounce(function () {
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
    filterChange(window.map.renderArray);
  }));

  housingPrice.addEventListener('change', window.debounce(function () {
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
    filterChange(window.map.renderArray);
  }));

  housingRooms.addEventListener('change', window.debounce(function () {
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
        roomsHandler = ANY;
        break;
    }
    filterChange(window.map.renderArray);
  }));

  housingGuests.addEventListener('change', window.debounce(function () {
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
        guestsHandler = ANY;
        break;
    }
    filterChange(window.map.renderArray);
  }));

  function checkForElement(filterName) {
    if (filterName.checked && filterFeaturesArray[0] !== filterName.value) {
      filterFeaturesArray.unshift(filterName.value);
    } else {
      filterFeaturesArray.forEach(function (el, index) {
        if (el === filterName.value) {
          filterFeaturesArray.splice(index, 1);
        }
      });
    }
    window.map.filterFeaturesArray = filterFeaturesArray;
  }

  function checkFeatures() {
    var filterFeatures = window.map.filterFeaturesArray;
    var firstArray = window.data.fullData.filter(function (el) {
      var a = 0;
      el.offer.features.every(function (dataFeature) {
        if (dataFeature === filterFeatures[0]) {
          a++;
          return false;
        } else {
          return true;
        }
      });
      return a > 0;
    });


    var secondArray = window.data.fullData.filter(function (el) {
      var a = 0;
      el.offer.features.every(function (dataFeature) {
        if (dataFeature === filterFeatures[1]) {
          a++;
          return false;
        } else {
          return true;
        }
      });
      return a > 0;
    });
    var thirdArray = window.data.fullData.filter(function (el) {
      var a = 0;
      el.offer.features.every(function (dataFeature) {
        if (dataFeature === filterFeatures[2]) {
          a++;
          return false;
        } else {
          return true;
        }
      });
      return a > 0;
    });
    var fourthArray = window.data.fullData.filter(function (el) {
      var a = 0;
      el.offer.features.every(function (dataFeature) {
        if (dataFeature === filterFeatures[3]) {
          a++;
          return false;
        } else {
          return true;
        }
      });
      return a > 0;
    });
    var fifthArray = window.data.fullData.filter(function (el) {
      var a = 0;
      el.offer.features.every(function (dataFeature) {
        if (dataFeature === filterFeatures[4]) {
          a++;
          return false;
        } else {
          return true;
        }
      });
      return a > 0;
    });
    var sixsArray = window.data.fullData.filter(function (el) {
      var a = 0;
      el.offer.features.every(function (dataFeature) {
        if (dataFeature === filterFeatures[5]) {
          a++;
          return false;
        } else {
          return true;
        }
      });
      return a > 0;
    });

    var allFilters = [
      firstArray,
      secondArray,
      thirdArray,
      fourthArray,
      fifthArray,
      sixsArray
    ];
    var max = -Infinity;
    var index = -1;
    allFilters.forEach(function (a, i) {
      if (a.length > max) {
        max = a.length;
        index = i;
      }
    });
    var maxLengthArray = allFilters[index].map(function (obj) {
      return obj;
    });
    allFilters[index] = [];
    var rating = 0;
    var filteredWithRating = [];
    var ratingObj = {};
    maxLengthArray.forEach(function (totalEl) {
      allFilters.forEach(function (filterArr) {
        filterArr.every(function (filterEl) {
          if (totalEl === filterEl) {
            rating++;
            return false;
          } else {
            return true;
          }
        });
      });
      ratingObj.rating = rating;
      ratingObj.array = totalEl;
      filteredWithRating.unshift(ratingObj);
      ratingObj = {};
      rating = 0;
    });
    filteredWithRating.sort(function (a, b) {
      if (a.rating < b.rating) {
        return 1;
      }
      if (a.rating > b.rating) {
        return -1;
      }
      return 0;
    });
    if (filterFeaturesArray.length !== 0) {
      var maxRating = filteredWithRating[0].rating;
      var sortedArray = filteredWithRating.filter(function (element) {
        return element.rating === maxRating;
      });
      if (sortedArray.length > 5) {
        var lastArray = sortedArray.splice(0, 5);
      } else {
        lastArray = sortedArray;
      }
      var readyArray = lastArray.map(function (el) {
        return el.array;
      });
    }
    if (filterFeaturesArray.length !== 0) {
      window.map.renderArray = readyArray;
    } else {
      window.map.renderArray = window.data.fullData;
    }
  }

  filterWiFI.addEventListener('change', window.debounce(function () {
    checkForElement(filterWiFI);
    checkFeatures();
    filterChange(window.map.renderArray);
  }));

  filterDishwasher.addEventListener('change', window.debounce(function () {
    checkForElement(filterDishwasher);
    checkFeatures();
    filterChange(window.map.renderArray);
  }));
  filterParking.addEventListener('change', window.debounce(function () {
    checkForElement(filterParking);
    checkFeatures();
    filterChange(window.map.renderArray);
  }));
  filterWasher.addEventListener('change', window.debounce(function () {
    checkForElement(filterWasher);
    checkFeatures();
    filterChange(window.map.renderArray);
  }));
  filterElevator.addEventListener('change', window.debounce(function () {
    checkForElement(filterElevator);
    checkFeatures();
    filterChange(window.map.renderArray);
  }));
  filterConditioner.addEventListener('change', window.debounce(function () {
    checkForElement(filterConditioner);
    checkFeatures();
    filterChange(window.map.renderArray);
  }));

  window.map = {
    activateCards: function (arr) {
      var mapPins2 = [];
      for (var z = 0; z < arr.length; z++) {
        var mapPin2 = document.querySelector('#map_pin_n_' + z);
        mapPins2.push(mapPin2);
      }
      mapPins2.forEach(function (pin) {
        pin.addEventListener('click', function (evt3) {
          activateTemplate(evt3, ACTION_TYPE.click, arr);
        });
        pin.addEventListener('keyup', function (evt4) {
          if (evt4.key === KEYBOARD_KEYS.enter) {
            activateTemplate(evt4, ACTION_TYPE.key, arr);
          }
        });
      });
    },
    activated: false,
    pinXStart: PIN_X_START,
    pinYStart: PIN_Y_START,
  };
})();
