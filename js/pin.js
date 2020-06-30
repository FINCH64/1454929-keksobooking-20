'use strict';
(function () {
  window.pin = {
    createDOMElement: function () {
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < 8; i++) {
        var mapPin = document.createElement('button');
        mapPin.type = 'button';
        mapPin.className = 'map__pin';
        mapPin.id = 'map_pin_n_' + i;
        mapPin.style = 'left: ' + (window.data.nLists[i].location.x) + 'px; top:' + (window.data.nLists[i].location.y) + 'px;';
        mapPin.innerHTML = '<img src = ' + window.data.nLists[i].author.avatar +
    ' width="40" height="40" draggable="false" alt="' + window.data.nLists[i].offer.title + '">';
        fragment.appendChild(mapPin);
      }
      mapPins.appendChild(fragment);
      window.map.activateCards();
    }
  };
})();
