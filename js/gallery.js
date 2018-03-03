'use strict';

(function () {
  var galleryPhotosContainer = document.querySelector('.pictures');
  var galleryPhotoPreview = document.querySelector('.gallery-overlay');
  var galleryPhotoPreviewDisplay = galleryPhotoPreview.querySelector('.gallery-overlay-preview');
  var galleryPhotoPreviewClose = galleryPhotoPreview.querySelector('.gallery-overlay-close');
  var filterForm = document.querySelector('.filters');

  galleryPhotosContainer.addEventListener('click', onPhotoClick);
  galleryPhotoPreviewClose.addEventListener('click', onGalleryPreviewCloseClick);
  galleryPhotoPreviewClose.addEventListener('keydown', onGalleryPreviewCloseEnterPress);
  filterForm.addEventListener('change', onFilterChange);

  function onPhotoClick(e) {
    e.preventDefault();
    openGallery();
    window.preview.renderPhoto(getPhotoToRender(e.target.parentElement), galleryPhotoPreviewDisplay);
    if (e.target.classList.contains('container')) {
      closeGallery();
    }
  }

  function onGalleryPreviewCloseClick() {
    closeGallery();
  }

  function onGalleryPreviewCloseEnterPress(e) {
    window.utils.onEnterPress(e, closeGallery);
  }

  function onFilterChange(e) {
    var filter = e.target.value;
    window.sorting.onSortingChange(filter);
  }

  function getPhotoToRender(elem) {
    return {
      url: elem.querySelector('img').getAttribute('src'),
      likes: elem.querySelector('.picture-likes').textContent,
      commentCount: elem.querySelector('.picture-comments').textContent
    };
  }

  function openGallery() {
    galleryPhotoPreview.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryPreviewEscPress);
  }

  function closeGallery() {
    galleryPhotoPreview.classList.add('hidden');
    document.removeEventListener('keydown', onGalleryPreviewEscPress);
  }

  function onGalleryPreviewEscPress(e) {
    window.utils.onEscPress(e, closeGallery);
  }
})();
