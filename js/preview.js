'use strict';

(function () {
  window.preview = {
    renderPhoto: function (photo, container) {
      container.querySelector('.gallery-overlay-image').src = photo.url;
      container.querySelector('.likes-count').textContent = photo.likes;
      container.querySelector('.comments-count').textContent = photo.commentCount;
    }
  };
})();
