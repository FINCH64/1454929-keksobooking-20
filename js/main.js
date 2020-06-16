'use strict';
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

    var locationX = getRandomInt(1, 1175);
    var locationY = getRandomInt(130, 530);
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

function createDOMElement() {

  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    var mapPin = document.createElement('button');
    mapPin.type = 'button';
    mapPin.className = 'map__pin';
    mapPin.style = 'left: ' + (nLists[i].location.x + 25) + 'px; top:' + (nLists[i].location.y + 70) + 'px;';
    mapPin.innerHTML = '<img src = ' + nLists[i].author.avatar +
    ' width="40" height="40" draggable="false" alt="' + nLists[i].offer.title + '">';
    fragment.appendChild(mapPin);
  }
  mapPins.appendChild(fragment);
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

var allLists = [createTestLists()];
var nLists = allLists[0];
var map = document.querySelector('.map');
map.classList.remove('map--faded');
createDOMElement();
renderCard();
