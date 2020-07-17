'use strict';
(function () {
  window.card = {
    renderCard: function (cardNum, array) {
      var newFragment = document.createDocumentFragment();

      var artickleCard = document.createElement('article');
      artickleCard.className = 'map__card popup';
      artickleCard.insertAdjacentHTML('beforeend', '<img src=' + array[cardNum].author.avatar + ' class="popup__avatar" width="70" height="70" alt="Аватар пользователя">');
      artickleCard.insertAdjacentHTML('beforeend', '<button type="button" class="popup__close">Закрыть</button>');
      artickleCard.insertAdjacentHTML('beforeend', '<h3 class="popup__title">' + array[cardNum].offer.title + '</h3>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--address">' + array[cardNum].offer.address + '</p>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--price"><span>' + array[cardNum].offer.price + '₽/ночь</span></p>');
      artickleCard.insertAdjacentHTML('beforeend', '<h4 class="popup__type">' + array[cardNum].offer.type + '</h4>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--capacity">' + array[cardNum].offer.rooms + ' комнаты для ' + array[cardNum].offer.guests + ' гостей</p>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--time">Заезд после ' + array[cardNum].offer.checkin + ', выезд до ' + array[cardNum].offer.checkout + '</p>');
      if (array[cardNum].offer.features !== 'There is no features.' && array[cardNum].offer.features !== 'washer') {
        var featurelList = document.createElement('ul');
        featurelList.className = 'popup__features';

        array[cardNum].offer.features.forEach(function (currentList) {
          var createdLi = document.createElement('li');
          createdLi.className = 'popup__feature popup__feature--' + currentList;
          featurelList.appendChild(createdLi);
        });

        artickleCard.appendChild(featurelList);
      }
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__description">' + array[cardNum].offer.description + '</p>');
      if (array[cardNum].offer.photos !== 'There is no photos.') {
        var createdDiv = document.createElement('div');
        createdDiv.className = 'popup__photos';
        for (var a = 0; a < array[cardNum].offer.photos.length; a++) {
          var img = document.createElement('img');
          img.src = array[cardNum].offer.photos[a];
          img.className = 'popup__photo';
          img.width = '45';
          img.height = '40';
          img.alt = 'Фотография жилья.';
          createdDiv.appendChild(img);
        }
        artickleCard.appendChild(createdDiv);
      }
      newFragment.appendChild(artickleCard);
      var mapFilters = document.querySelector('.map__filters-container');
      window.main.map.insertBefore(newFragment, mapFilters);
    },
  };
})();
