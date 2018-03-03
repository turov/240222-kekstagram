'use strict';

(function () {
  var galleryPhotosContainer = document.querySelector('.pictures');
  var filterForm = document.querySelector('.filters');

  window.renderPictures = function (photos) {
    var elements = [];

    photos.forEach(function (photo) {
      elements.push(window.picture.getPhotoElement(photo));
    });

    window.utils.renderBlockOfElements(elements, galleryPhotosContainer);
    filterForm.classList.remove('filters-inactive');
  };
})();
