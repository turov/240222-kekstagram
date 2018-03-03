'use strict';

(function () {
  var photos = [];
  var filter;

  function onSuccess(data) {
    photos = data;
    updatePhotos();
  }

  function updatePhotos() {
    var sortedPhotos;
    switch (filter) {
      case 'recommend':
        sortedPhotos = photos;
        break;
      case 'popular':
        sortedPhotos = photos.slice(0).sort(function (first, second) {
          var likesDifference = second.likes - first.likes;

          if (likesDifference === 0) {
            likesDifference = photos.indexOf(second) - photos.indexOf(first);
          }

          return likesDifference;
        });
        break;
      case 'discussed':
        sortedPhotos = photos.slice(0).sort(function (first, second) {
          var commentsDifference = second.comments.length - first.comments.length;

          if (commentsDifference === 0) {
            commentsDifference = photos.indexOf(second) - photos.indexOf(first);
          }

          return commentsDifference;
        });
        break;
      case 'random':
        sortedPhotos = photos.slice(0).sort(function () {
          return window.utils.getRandomInt(-photos.length, photos.length);
        });
        break;
      default:
        sortedPhotos = photos;
        break;
    }

    window.renderPictures(sortedPhotos);
  }

  window.backend.load(onSuccess, window.utils.showError);

  window.sorting = {
    onSortingChange: function (filterValue) {
      filter = filterValue;
      window.debounce(updatePhotos);
    }
  };
})();
