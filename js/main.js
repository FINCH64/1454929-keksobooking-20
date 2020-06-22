'use strict';
var PIN_START_POS_X = 570;
var PIN_START_POS_Y = 375;
var MIN_BUNGALO_PRICE = 0;
var MIN_FLAT_PRICE = 1000;
var MIN_HOUSE_PRICE = 5000;
var MIN_PALACE_PRICE = 10000;
var palace = 'Дворец';
var flat = 'Квартира';
var house = 'Дом';
var bungalo = 'Бунгало';
var types = [palace, flat, house, bungalo];
var times = ['12.00', '13.00', '14.00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

function getRandomThing(arr) {
  var rType = arr[Math.floor(Math.random() * arr.length)];
  return rType;
}

function getRandomInt(min, max) {
  var rInt = Math.floor(Math.random() * (max - min)) + min;
  return rInt;
}

function getSomeElements(arr, parName) {
  var rInteger = getRandomInt(0, arr.length + 1);
  var ourArr = [];
  if (rInteger > 0) {
    for (var i = 0; i < rInteger; i++) {
      var used = arr[Math.floor(Math.random() * arr.length)];
      ourArr[i] = used;
      for (var z = 0; z <= arr.length; z++) {
        if (arr[z] === used) {
          arr.splice(z, 1);
        }
      }
    }
    if (parName === 'features') {
      features = arr.concat(ourArr);
    } else {
      photos = arr.concat(ourArr);
    }
    return ourArr;
  } else {
    return 'There is no ' + parName + '.';
  }
}

function createTestLists() {
  var allLists = [];
  var sum = 1;
  for (var i = 0; i < 8; i++) {
    var rRooms = getRandomInt(0, 4);
    if (rRooms === 0) {
      var forGuests = 'Не для гостей.';
      var roomsGuests = forGuests;
    } else {
      if (rRooms === 1) {
        forGuests = Math.round(rRooms * 1.5);
        roomsGuests = rRooms + ' комната для ' + forGuests + ' гостей';
      } else {
        forGuests = Math.round(rRooms * 1.5);
        roomsGuests = rRooms + ' комнаты для ' + forGuests + ' гостей';
      }
    }

    var locationX = PIN_START_POS_X;
    var locationY = PIN_START_POS_Y;
    var List = {
      author: {
        avatar: 'img/avatars/user0' + sum + '.png',
      },

      location: {
        x: locationX,
        y: locationY,
      },

      offer: {
        title: 'Предложение пользователя',
        address: locationX + ',' + locationY,
        price: getRandomInt(1000, 10000),
        type: getRandomThing(types),
        rooms: rRooms,
        guests: forGuests,
        checkin: getRandomThing(times),
        checkout: getRandomThing(times),
        features: getSomeElements(features, 'features'),
        description: 'Описание',
        photos: getSomeElements(photos, 'photos'),
        isForGuests: roomsGuests,
      },
    };
    allLists.push(List);

    if (sum < 8) {
      sum++;
    }
  }
  return allLists;
}

var mapPin = document.createElement('button');

function createDOMElement() {

  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    mapPin.type = 'button';
    mapPin.className = 'map__pin';
    mapPin.style = 'left: ' + (nLists[i].location.x + 25) + 'px; top:' + (nLists[i].location.y + 70) + 'px;';
    mapPin.innerHTML = '<img src = ' + nLists[i].author.avatar +
    ' width="40" height="40" draggable="false" alt="' + nLists[i].offer.title + '">';
    fragment.appendChild(mapPin);
  }
  mapPins.appendChild(fragment);
}

function manageStartForm(manage) {
  var userForm = document.querySelector('.ad-form');
  var mapFilterElement = document.querySelectorAll('.map__filter');
  var mapFilters = document.querySelector('.map__filters');
  var userAvatar = document.querySelectorAll('#avatar');
  var userFormElements = document.querySelectorAll('.ad-form__element');
  function managingForm(arr) {
    if (manage === 'activate') {
      map.classList.remove('map--faded');
      userForm.classList.remove('ad-form--disabled');
      mapFilters.classList.remove('ad-form--disabled');
      for (var i = 0; i < arr.length; i++) {
        arr[i].disabled = false;
      }
    } else {
      mapFilters.classList.add('ad-form--disabled');
      for (var z = 0; z < arr.length; z++) {
        arr[z].disabled = true;
      }
    }
  }
  managingForm(mapFilterElement);
  managingForm(userAvatar);
  managingForm(userFormElements);
}
function renderCard() {
  var i = 0;
  var newFragment = document.createDocumentFragment();

  var artickleCard = document.createElement('article');
  artickleCard.className = 'map__card popup';
  artickleCard.insertAdjacentHTML('beforeend', '<img src=' + nLists[i].author.avatar + ' class="popup__avatar" width="70" height="70" alt="Аватар пользователя">');
  artickleCard.insertAdjacentHTML('beforeend', '<button type="button" class="popup__close">Закрыть</button>');
  artickleCard.insertAdjacentHTML('beforeend', '<h3 class="popup__title">' + nLists[i].offer.title + '</h3>');
  artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--address">' + nLists[i].offer.address + '</p>');
  artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--price"><span>' + nLists[i].offer.price + '₽/ночь</span></p>');
  artickleCard.insertAdjacentHTML('beforeend', '<h4 class="popup__type">' + nLists[i].offer.type + '</h4>');
  artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--capacity">' + nLists[i].offer.rooms + ' комнаты для ' + nLists[i].offer.guests + ' гостей</p>');
  artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--time">Заезд после ' + nLists[i].offer.checkin + ', выезд до ' + nLists[i].offer.checkout + '</p>');
  if (nLists[i].offer.features !== 'There is no features.') {
    var featurelList = document.createElement('ul');
    featurelList.className = 'popup__features';
    for (var z = 0; z < nLists[i].offer.features.length; z++) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + nLists[i].offer.features[z];
      featurelList.appendChild(li);
    }
    artickleCard.appendChild(featurelList);
  }
  artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__description">' + nLists[i].offer.description + '</p>');
  if (nLists[i].offer.photos !== 'There is no photos.') {
    var divchik = document.createElement('div');
    divchik.className = 'popup__photos';
    for (var a = 0; a < nLists[i].offer.photos.length; a++) {
      var img = document.createElement('img');
      img.src = nLists[i].offer.photos[a];
      img.className = 'popup__photo';
      img.width = '45';
      img.height = '40';
      img.alt = 'Фотография жилья.';
      divchik.appendChild(img);
    }
    artickleCard.appendChild(divchik);
  }
  newFragment.appendChild(artickleCard);
  var mapFilters = document.querySelector('.map__filters-container');
  map.insertBefore(newFragment, mapFilters);
}
var mapOverlay = document.querySelector('.map__overlay');
var bigPin = document.querySelector('.map__pin--main');
var bigPinClicked = false;

bigPin.addEventListener('mousedown', function (evt) {
  bigPinClicked = true;
  address.value = '250, 600';
  if (evt.button === 0) {
    manageStartForm('activate');
  }
  var addressY = 0;
  var pinYSize = 54.5;
  mapOverlay.addEventListener('mousemove', function (evt2) {
    if (bigPinClicked) {
      if (evt2.offsetY >= 130 - pinYSize) {
        if (evt2.offsetY <= 630 - pinYSize) {
          addressY = evt2.offsetY + pinYSize;
        } else {
          addressY = 630;
        }
      } else {
        addressY = 130;
      }
      address.value = evt2.offsetX + ', ' + addressY;
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
    manageStartForm('activate');
  }
});

manageStartForm();
var allLists = [createTestLists()];
var nLists = allLists[0];
var map = document.querySelector('.map');
createDOMElement();
renderCard();
var priceInput = document.querySelector('#price');
var typeInput = document.querySelector('#type');
var currentMinPrice = 5000;

typeInput.addEventListener('change', function () {
  if (typeInput.value === 'bungalo') {
    priceInput.placeholder = MIN_BUNGALO_PRICE;
    currentMinPrice = MIN_BUNGALO_PRICE;
  } else if (typeInput.value === 'palace') {
    priceInput.placeholder = MIN_PALACE_PRICE;
    currentMinPrice = MIN_PALACE_PRICE;
  } else if (typeInput.value === 'house') {
    priceInput.placeholder = MIN_HOUSE_PRICE;
    currentMinPrice = MIN_HOUSE_PRICE;
  } else if (typeInput.value === 'flat') {
    priceInput.placeholder = MIN_FLAT_PRICE;
    currentMinPrice = MIN_FLAT_PRICE;
  } else {
    priceInput.setCustomValidity('');
  }
});

priceInput.addEventListener('input', function () {
  var priceValue = priceInput.value;
  if (priceValue < currentMinPrice) {
    priceInput.setCustomValidity('Цена начинается от ' + currentMinPrice + ' ₽/ночь');
  } else if (priceValue > 1000000) {
    priceInput.setCustomValidity('Цена не может превышать 1 000 000' + ' ₽/ночь');
  } else {
    priceInput.setCustomValidity('');
  }
});

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
var address = document.querySelector('#address');
address.setAttribute('readonly', true);
console.log(address);

roomNumber.addEventListener('change', function () {
  if (Number(roomNumber.value) === 1) {
    blockCapacity[0].disabled = true;
    blockCapacity[1].disabled = true;
    blockCapacity[2].disabled = false;
    blockCapacity[3].disabled = true;
    currentCapacity.selectedIndex = 2;
  } else if (Number(roomNumber.value) === 2) {
    blockCapacity[0].disabled = true;
    blockCapacity[1].disabled = false;
    blockCapacity[2].disabled = false;
    blockCapacity[3].disabled = true;
    currentCapacity.selectedIndex = 1;
  } else if (Number(roomNumber.value) === 3) {
    blockCapacity[0].disabled = false;
    blockCapacity[1].disabled = false;
    blockCapacity[2].disabled = false;
    blockCapacity[3].disabled = true;
    currentCapacity.selectedIndex = 0;
  } else if (Number(roomNumber.value) === 100) {
    blockCapacity[0].disabled = true;
    blockCapacity[1].disabled = true;
    blockCapacity[2].disabled = true;
    blockCapacity[3].disabled = false;
    currentCapacity.selectedIndex = 3;
  }
});
console.log(bigPin);


