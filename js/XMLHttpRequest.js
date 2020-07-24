'use strict';

(function () {
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    var onLoadAction = function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      xhr.removeEventListener('load', onLoadAction);
    };

    xhr.addEventListener('load', onLoadAction);

    var onErrorAction = function () {
      onError('Произошла ошибка соединения');
      xhr.removeEventListener('error', onErrorAction);
    };

    xhr.addEventListener('error', onErrorAction);

    var onTimeoutAction = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      xhr.removeEventListener('timeout', onTimeoutAction);
    };

    xhr.addEventListener('timeout', onTimeoutAction);

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };

  var URL = 'https://javascript.pages.academy/keksobooking';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var onLoadAction = function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      xhr.removeEventListener('load', onLoadAction);
    };

    xhr.addEventListener('load', onLoadAction);

    var onErrorAction = function () {
      onError('Произошла ошибка соединения');
      xhr.removeEventListener('error', onErrorAction);
    };

    xhr.addEventListener('error', onErrorAction);

    var onTimeoutAction = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      xhr.removeEventListener('timeout', onTimeoutAction);
    };

    xhr.addEventListener('timeout', onTimeoutAction);

    xhr.timeout = 10000;
    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
