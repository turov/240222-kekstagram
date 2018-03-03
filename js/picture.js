'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  window.picture = {
    getPhotoElement: function (photo) {
      var photoElement = photoTemplate.cloneNode(true);

      photoElement.querySelector('.picture img').src = photo.url;
      photoElement.querySelector('.picture-likes').textContent = photo.likes;
      photoElement.querySelector('.picture-comments').textContent = photo.comments.length;

      return photoElement;
    }
  };
})();
