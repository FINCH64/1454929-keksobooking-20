'use strict';

(function () {
  var PINXSIZE = 66;
  var PINYSIZE = 75;
  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (data) {
    function createTestLists() {
      var allLists = [];
      allLists = data;
      console.log(allLists);
      window.data = {
        PINXSIZE: PINXSIZE,
        PINYSIZE: PINYSIZE,
        nLists: allLists,
      };
    }
    createTestLists();
  };

  window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);

})();
