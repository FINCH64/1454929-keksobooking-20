'use strict';
(function () {
  window.card = {
    renderCard: function (cardNum) {
      var newFragment = document.createDocumentFragment();

      var artickleCard = document.createElement('article');
      artickleCard.className = 'map__card popup';
      artickleCard.insertAdjacentHTML('beforeend', '<img src=' + window.data.nLists[cardNum].author.avatar + ' class="popup__avatar" width="70" height="70" alt="Аватар пользователя">');
      artickleCard.insertAdjacentHTML('beforeend', '<button type="button" class="popup__close">Закрыть</button>');
      artickleCard.insertAdjacentHTML('beforeend', '<h3 class="popup__title">' + window.data.nLists[cardNum].offer.title + '</h3>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--address">' + window.data.nLists[cardNum].offer.address + '</p>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--price"><span>' + window.data.nLists[cardNum].offer.price + '₽/ночь</span></p>');
      artickleCard.insertAdjacentHTML('beforeend', '<h4 class="popup__type">' + window.data.nLists[cardNum].offer.type + '</h4>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--capacity">' + window.data.nLists[cardNum].offer.rooms + ' комнаты для ' + window.data.nLists[cardNum].offer.guests + ' гостей</p>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--time">Заезд после ' + window.data.nLists[cardNum].offer.checkin + ', выезд до ' + window.data.nLists[cardNum].offer.checkout + '</p>');
      if (window.data.nLists[cardNum].offer.features !== 'There is no features.') {
        var featurelList = document.createElement('ul');
        featurelList.className = 'popup__features';

        window.data.nLists[cardNum].offer.features.forEach(function (currentList) {
          var li = document.createElement('li');
          li.className = 'popup__feature popup__feature--' + currentList;
          featurelList.appendChild(li);
        });

        artickleCard.appendChild(featurelList);
      }
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__description">' + window.data.nLists[cardNum].offer.description + '</p>');
      if (window.data.nLists[cardNum].offer.photos !== 'There is no photos.') {
        var divchik = document.createElement('div');
        divchik.className = 'popup__photos';
        for (var a = 0; a < window.data.nLists[cardNum].offer.photos.length; a++) {
          var img = document.createElement('img');
          img.src = window.data.nLists[cardNum].offer.photos[a];
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
      window.main.map.insertBefore(newFragment, mapFilters);
    },
  };
})();
