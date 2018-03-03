'use strict';

(function () {
  var SERVER_URL = ' https://js.dump.academy/kekstagram';

  function setupXhr(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не выполнился за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000;
    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setupXhr(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = setupXhr(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
