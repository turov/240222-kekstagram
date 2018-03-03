'use strict';

(function () {
  function checkDuplicates(arr) {
    var isWithDuplicates = false;
    var sortedArray = arr.sort();

    sortedArray.forEach(function (value, index) {
      if (sortedArray[index] === sortedArray[index - 1]) {
        isWithDuplicates = true;
      }
    });

    return isWithDuplicates;
  }

  function checkEmptyElements(arr) {
    var isWithEmptyElements = false;

    arr.forEach(function (value) {
      if (value === '') {
        isWithEmptyElements = true;
      }
    });

    return isWithEmptyElements;
  }

  window.validation = {
    validateHashTags: function (element) {
      var MAX_TAGS_COUNT = 5;
      var MAX_HASH_LENGTH = 20;
      var hashTags = element.value.toLowerCase().trim().split(' ');
      var tagsWithoutHash = [];
      var isHash = false;
      var isHashTooLong = false;
      var isTooManyHashTags = hashTags.length > MAX_TAGS_COUNT;
      var isSame = checkDuplicates(hashTags);
      var isValid = true;
      var errorMessage = '';

      if (isTooManyHashTags) {
        isValid = false;
        errorMessage = 'Максимальное количество тэгов должно быть не более ' + MAX_TAGS_COUNT;
      }

      if (isSame) {
        isValid = false;
        errorMessage = 'Тэги не должны повторяться';
      }

      for (var i = 0; i < hashTags.length; i++) {
        isHash = hashTags[i].charAt(0) === '#';
        isHashTooLong = hashTags[i].length > MAX_HASH_LENGTH;
        if (!isHash || isHashTooLong) {
          isValid = false;
          errorMessage = 'Тэг должен начинаться с # и содержать всего одно слово длиной не более 20 символов';
          break;
        }

        tagsWithoutHash[i] = hashTags[i].slice(1);

        if (tagsWithoutHash[i].search(/#/) !== -1) {
          isValid = false;
          errorMessage = 'Тэги должны разделяться пробелом';
        }
      }

      var isEmpty = checkEmptyElements(tagsWithoutHash);

      if (isEmpty) {
        isValid = false;
        errorMessage = 'Тэг не может быть пустым';
      }

      if (!isValid) {
        element.setCustomValidity(errorMessage);
      } else {
        element.setCustomValidity(errorMessage);
      }

      return isValid;
    }
  };
})();
