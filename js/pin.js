'use strict';
(function () {
  window.pin = {
    createDOMElement: function (data) {
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length; i++) {
        var mapPin = document.createElement('button');
        mapPin.type = 'button';
        mapPin.className = 'map__pin';
        mapPin.id = 'map_pin_n_' + i;
        mapPin.style = 'left: ' + (data[i].location.x) + 'px; top:' + (data[i].location.y) + 'px;';
        mapPin.innerHTML = '<img src = ' + data[i].author.avatar +
    ' width="40" height="40" draggable="false" alt="' + data[i].offer.title + '">';
        fragment.appendChild(mapPin);
      }
      mapPins.appendChild(fragment);
      var dataLength = data;
      window.pin.data = dataLength;
      window.map.activateCards(window.pin.data);
    },
  };
})();
