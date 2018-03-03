'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var TIME_OUT = 5000;

  window.utils = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    renderBlockOfElements: function (elements, container) {
      var fragment = document.createDocumentFragment();
      container.innerHTML = '';

      for (var i = 0; i < elements.length; i++) {
        fragment.appendChild(elements[i]);
      }

      container.appendChild(fragment);
    },

    onEscPress: function (event, action) {
      if (event.keyCode === ESC_KEY) {
        action();
      }
    },

    onEnterPress: function (event, action) {
      if (event.keyCode === ENTER_KEY) {
        action();
      }
    },

    showError: function (err) {
      var errorElement = document.createElement('div');
      errorElement.classList.add('error');
      errorElement.style = 'z-index: 3; margin: 0 auto; text-align: center; background-color: #ffe753; color: #000; width: 800px; padding: 25px 0; border: 4px solid #000; font-size: 30px; font-weight: bold;';
      errorElement.style.position = 'fixed';
      errorElement.style.top = '40';
      errorElement.style.left = '0';
      errorElement.style.right = '0';
      errorElement.textContent = err;
      document.body.appendChild(errorElement);

      setTimeout(function () {
        document.body.removeChild(errorElement);
      }, TIME_OUT);
    }
  };
})();
