'use strict';

(function () {
  var PINXSIZE = 66;
  var PINYSIZE = 75;
  var PALACE_RU = 'Дворец';
  var FLAT_RU = 'Квартира';
  var HOUSE_RU = 'Дом';
  var BUNGALO_RU = 'Бунгало';
  var FOR_GUESTS = 'Не для гостей.';
  var LISTS_COUNT = 8;
  var types = [PALACE_RU, FLAT_RU, HOUSE_RU, BUNGALO_RU];
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
    for (var i = 0; i < LISTS_COUNT; i++) {
      var locationX = getRandomInt(1 + PINXSIZE, 1199 - PINXSIZE);
      var locationY = getRandomInt(130 + PINYSIZE, 630 - PINYSIZE);
      var rRooms = getRandomInt(0, 4);
      if (rRooms === 0) {
        var roomsGuests = FOR_GUESTS;
      } else {
        if (rRooms === 1) {
          FOR_GUESTS = Math.round(rRooms * 1.5);
          roomsGuests = rRooms + ' комната для ' + FOR_GUESTS + ' гостей';
        } else {
          FOR_GUESTS = Math.round(rRooms * 1.5);
          roomsGuests = rRooms + ' комнаты для ' + FOR_GUESTS + ' гостей';
        }
      }
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
          guests: FOR_GUESTS,
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
    window.data = {
      PINXSIZE: PINXSIZE,
      PINYSIZE: PINYSIZE,
      nLists: allLists,
    };
  }
  createTestLists();
})();
