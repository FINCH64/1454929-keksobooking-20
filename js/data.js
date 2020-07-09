'use strict';

(function () {
  var PINXSIZE = 66;
  var PINYSIZE = 75;
  var onError = function (message) {
    throw new Error(message);
  };

  var onSuccess = function (data) {
    window.data = {
      PINXSIZE: PINXSIZE,
      PINYSIZE: PINYSIZE,
      nLists: data,
    };
    function createTestLists() {
    }
    createTestLists();
  };

  window.load('https://javascript.pages.academy/keksobooking/data', onSuccess, onError);

})();
