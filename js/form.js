'use strict';

(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFileInput = uploadForm.querySelector('#upload-file');
  var uploadPhotoSettings = uploadForm.querySelector('.upload-overlay');
  var uploadPhotoSettingsClose = uploadPhotoSettings.querySelector('#upload-cancel');
  var uploadedPhoto = uploadForm.querySelector('.effect-image-preview');
  var effectControls = uploadForm.querySelector('.upload-effect-controls');
  var effectRangeSlider = uploadForm.querySelector('.upload-effect-level');
  var effectRangeValue = effectRangeSlider.querySelector('.upload-effect-level-value');
  var effectRangeBar = effectRangeSlider.querySelector('.upload-effect-level-line');
  var effectRangeValueBar = effectRangeSlider.querySelector('.upload-effect-level-val');
  var effectRangeControl = effectRangeSlider.querySelector('.upload-effect-level-pin');
  var resizeControlDec = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var resizeControlInc = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var resizeInput = uploadForm.querySelector('.upload-resize-controls-value');
  var hashInput = uploadForm.querySelector('.upload-form-hashtags');

  resizeInput.value = '100%';

  uploadForm.addEventListener('submit', onUploadFormSubmit);

  uploadFileInput.addEventListener('change', onUploadFileChange);
  uploadPhotoSettingsClose.addEventListener('click', onPhotoSettingsCloseClick);
  uploadPhotoSettingsClose.addEventListener('keydown', onPhotoSettingsCloseEnterPress);

  effectControls.addEventListener('change', onEffectControlsChange);

  effectRangeControl.addEventListener('mousedown', onEffectRangeControlMouseDown);

  resizeControlDec.addEventListener('click', onResizeControlDecClick);
  resizeControlInc.addEventListener('click', onResizeControlIncClick);

  hashInput.addEventListener('input', onHashInputInput);

  function onUploadFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), closePhotoSettings, window.utils.showError);
  }

  function onUploadFileChange() {
    var file = uploadFileInput.files[0];
    hideEffectRangeSlider();
    window.uploadPicture(file, uploadedPhoto, openPhotoSettings);
  }

  function onPhotoSettingsCloseClick() {
    closePhotoSettings();
  }

  function onPhotoSettingsCloseEnterPress(evt) {
    window.utils.onEnterPress(evt, closePhotoSettings);
  }

  function onPhotoSettingsEscPress(evt) {
    if (evt.target.getAttribute('name') !== 'description') {
      window.utils.onEscPress(evt, closePhotoSettings);
    }
  }

  function onEffectControlsChange(evt) {
    var defaultEffectLevel = parseInt(effectRangeValue.value, 10);
    var effect = evt.target.id.replace('upload-', '');

    window.initilizeFilters(effect, defaultEffectLevel, applyFilter);
    showEffectRangeSlider();

    if (effect === 'effect-none') {
      hideEffectRangeSlider();
    }

    effectRangeControl.style.left = defaultEffectLevel + '%';
    effectRangeValueBar.style.width = defaultEffectLevel + '%';
  }

  function onEffectRangeControlMouseDown(evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onEffectRangeControlMouseMove);
    document.addEventListener('mouseup', onEffectRangeControlMouseUp);
  }

  function onEffectRangeControlMouseMove(evt) {
    var rangeValue = window.rangeSlider.getRangeValue(evt, effectRangeBar);
    var effect = effectControls.querySelector('input[name="effect"]:checked').id.replace('upload-', '');
    effectRangeControl.style.left = rangeValue.x + '%';
    effectRangeValueBar.style.width = rangeValue.x + '%';
    window.initilizeFilters(effect, rangeValue.x, applyFilter);
  }

  function onEffectRangeControlMouseUp() {
    document.removeEventListener('mousemove', onEffectRangeControlMouseMove);
    document.removeEventListener('mouseup', onEffectRangeControlMouseUp);
  }

  function onResizeControlDecClick() {
    var currentValue = parseInt(resizeInput.value, 10);
    window.initilizeScale(currentValue, 'dec', applyScale);
  }

  function onResizeControlIncClick() {
    var currentValue = parseInt(resizeInput.value, 10);
    window.initilizeScale(currentValue, 'inc', applyScale);
  }

  function onHashInputInput(evt) {
    window.validation.validateHashTags(evt.target);
  }

  function openPhotoSettings() {
    uploadPhotoSettings.classList.remove('hidden');
    document.addEventListener('keydown', onPhotoSettingsEscPress);
  }

  function closePhotoSettings() {
    clearUploadForm();
    uploadPhotoSettings.classList.add('hidden');
    document.removeEventListener('keydown', onPhotoSettingsEscPress);
  }

  function clearUploadForm() {
    effectControls.querySelector('#upload-effect-none').setAttribute('checked', 'checked');
    uploadForm.querySelector('.upload-form-hashtags').value = '';
    uploadForm.querySelector('textarea').value = '';
  }

  function applyScale(newValue) {
    resizeInput.value = newValue + '%';
    uploadedPhoto.style.transform = 'scale(' + (newValue / 100) + ')';
  }

  function applyFilter(filter, filterStyle, prevFilter) {
    uploadedPhoto.classList.remove(prevFilter);
    uploadedPhoto.classList.add(filter);
    uploadedPhoto.style.filter = filterStyle;
  }

  function showEffectRangeSlider() {
    effectRangeSlider.classList.remove('hidden');
  }

  function hideEffectRangeSlider() {
    effectRangeSlider.classList.add('hidden');
  }
})();
