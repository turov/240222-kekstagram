'use strict';

(function () {
  var MIN_VALUE = 0;
  var MAX_VALUE = 100;

  window.rangeSlider = {
    getRangeValue: function (e, rangeBar) {
      e.preventDefault();
      var coordinates = rangeBar.getBoundingClientRect();
      var shiftPercentage = {
        x: Math.floor((e.clientX - coordinates.left) * 100 / coordinates.width),
        y: Math.floor((e.clientY - coordinates.top) * 100 / coordinates.width)
      };
      var rangeValue = {
        x: shiftPercentage.x,
        y: shiftPercentage.y
      };

      if (shiftPercentage.x < MIN_VALUE) {
        rangeValue.x = MIN_VALUE;
      } else if (shiftPercentage.x > MAX_VALUE) {
        rangeValue.x = MAX_VALUE;
      }

      if (shiftPercentage.y < MIN_VALUE) {
        rangeValue.y = MIN_VALUE;
      } else if (shiftPercentage.y > MAX_VALUE) {
        rangeValue.y = MAX_VALUE;
      }

      return rangeValue;
    }
  };
})();
