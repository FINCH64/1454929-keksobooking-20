'use strict';
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12.00', '13.00', '14.00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var save = 0;

function getRandomThing(arr) {
  var rType = arr[Math.floor(Math.random() * arr.length)];
  return rType;
}

function getRandomInt(min, max) {
  var rInt = Math.floor(Math.random() * (max - min)) + min;
  save = rInt;
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
    var List = {
      author: {
        avatar: 'img/avatars/user0' + sum + '.png',
      },

      location: {
        x: getRandomInt(1, 1175),
        y: getRandomInt(130, 530),
      },

      offer: {
        title: 'Предложение пользователя',
        address: 'location.y,location.x',
        price: 3000,
        type: getRandomThing(types),
        rooms: getRandomInt(1, 4),
        guests: save,
        checkin: getRandomThing(times),
        checkout: getRandomThing(times),
        features: getSomeElements(features, 'features'),
        description: 'Описание',
        photos: getSomeElements(photos, 'photos'),
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

  var allLists = [createTestLists()];
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    var mapPin = document.createElement('button');
    mapPin.type = 'button';
    mapPin.className = 'map__pin';
    mapPin.style = 'left: ' + (allLists[0][i].location.x + 25) + 'px; top:' + (allLists[0][i].location.y + 70) + 'px;';
    mapPin.innerHTML = '<img src = ' + allLists[0][i].author.avatar +
    ' width="40" height="40" draggable="false" alt="' + allLists[0][i].offer.title + '">';
    fragment.appendChild(mapPin);
  }
  mapPins.appendChild(fragment);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');
createDOMElement();
