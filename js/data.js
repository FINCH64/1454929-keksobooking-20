'use strict';

(function () {
  var PINXSIZE = 66;
  var PINYSIZE = 75;
  window.newData = {
    loadFunction: function (evt) {
      var onError = function (message) {
        throw new Error(message);
      };

      var onSuccess = function (data) {

        var fullData = data.map(function (obj) {
          return obj;
        });

        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var cardElements = [];
        cardElements = data;
        var filteredArray = [];
        for (var i = 0; i < 5; i++) {
          var count = cardElements.length;
          var a = getRandomInt(0, count - 1);
          filteredArray.unshift(data[a]);
          cardElements.splice(a, 1);
        }
        window.data = {
          PINXSIZE: PINXSIZE,
          PINYSIZE: PINYSIZE,
          nLists: filteredArray,
          fullData: fullData,
        };
        window.map.renderArray = window.data.fullData;
        window.map.manageServerData(evt);
      };
      window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);
    },
  };
})();

