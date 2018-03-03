'use strict';

(function () {
  var prevEffect;

  window.initilizeFilters = function (effect, level, callback) {
    var effectStyle = 'none';

    switch (effect) {
      case 'effect-none':
        break;
      case 'effect-chrome':
        effectStyle = 'grayscale(' + level / 100 + ')';
        break;
      case 'effect-sepia':
        effectStyle = 'sepia(' + level / 100 + ')';
        break;
      case 'effect-marvin':
        effectStyle = 'invert(' + level + '%)';
        break;
      case 'effect-phobos':
        effectStyle = 'blur(' + level * 3 / 100 + 'px)';
        break;
      case 'effect-heat':
        effectStyle = 'brightness(' + level * 3 / 100 + ')';
        break;
    }

    callback(effect, effectStyle, prevEffect);
    prevEffect = effect;
  };
})();
