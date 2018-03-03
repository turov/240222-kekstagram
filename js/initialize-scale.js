'use strict';

(function () {
  var STEP = 25;
  var MIN = 25;
  var MAX = 100;

  window.initilizeScale = function (currentValue, option, callback) {
    var isMaxLimit = option === 'inc' && currentValue >= MAX;
    var isMinLimit = option === 'dec' && currentValue <= MIN;
    var newValue = 0;

    if (isMaxLimit || isMinLimit) {
      return;
    }

    if (option === 'inc') {
      newValue = currentValue + STEP;
    } else if (option === 'dec') {
      newValue = currentValue - STEP;
    }

    callback(newValue);
  };
})();
