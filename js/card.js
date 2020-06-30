'use strict';
(function () {
  window.card = {
    renderCard: function (i) {
      var newFragment = document.createDocumentFragment();

      var artickleCard = document.createElement('article');
      artickleCard.className = 'map__card popup';
      artickleCard.insertAdjacentHTML('beforeend', '<img src=' + window.data.nLists[i].author.avatar + ' class="popup__avatar" width="70" height="70" alt="Аватар пользователя">');
      artickleCard.insertAdjacentHTML('beforeend', '<button type="button" class="popup__close">Закрыть</button>');
      artickleCard.insertAdjacentHTML('beforeend', '<h3 class="popup__title">' + window.data.nLists[i].offer.title + '</h3>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--address">' + window.data.nLists[i].offer.address + '</p>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--price"><span>' + window.data.nLists[i].offer.price + '₽/ночь</span></p>');
      artickleCard.insertAdjacentHTML('beforeend', '<h4 class="popup__type">' + window.data.nLists[i].offer.type + '</h4>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--capacity">' + window.data.nLists[i].offer.rooms + ' комнаты для ' + window.data.nLists[i].offer.guests + ' гостей</p>');
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__text popup__text--time">Заезд после ' + window.data.nLists[i].offer.checkin + ', выезд до ' + window.data.nLists[i].offer.checkout + '</p>');
      if (window.data.nLists[i].offer.features !== 'There is no features.') {
        var featurelList = document.createElement('ul');
        featurelList.className = 'popup__features';
        for (var z = 0; z < window.data.nLists[i].offer.features.length; z++) {
          var li = document.createElement('li');
          li.className = 'popup__feature popup__feature--' + window.data.nLists[i].offer.features[z];
          featurelList.appendChild(li);
        }
        artickleCard.appendChild(featurelList);
      }
      artickleCard.insertAdjacentHTML('beforeend', '<p class="popup__description">' + window.data.nLists[i].offer.description + '</p>');
      if (window.data.nLists[i].offer.photos !== 'There is no photos.') {
        var divchik = document.createElement('div');
        divchik.className = 'popup__photos';
        for (var a = 0; a < window.data.nLists[i].offer.photos.length; a++) {
          var img = document.createElement('img');
          img.src = window.data.nLists[i].offer.photos[a];
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
