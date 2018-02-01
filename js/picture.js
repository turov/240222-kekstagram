'use strict';

var gallery = document.querySelector('.gallery-overlay');
gallery.classList.remove('hidden');

/* Случайный порядок в массиве */
var compareRandom = function () {
  return Math.random() - 0.5;
};

/* Нахождение случайного числа в диапозоне от min до max  */
var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var generateData = function () {
  var data = [];
  var pic = generatePhotos(25).sort(compareRandom);
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  for (var i = 0; i <= 24; i++) {
    data[i] = {
      'id': i,
      'url': pic[i],
      'likes': getRandomInteger(15, 200),
      'comment': comments[getRandomInteger(0, comments.length - 1)]
    };
  }

  return data;
};


var generatePhotos = function (numberOfPhotos) {
  var photos = [];
  for (var i = 1; i <= numberOfPhotos; i++) {
    photos[i] = 'photos/' + i + '.jpg';
  }
  return photos;
};

var photoData = generateData();

var createCard = function (info) {
  var template = document.querySelector('#picture-template');
  var card = template.content.querySelector('.picture');
  var element = card.cloneNode(true);
  element.querySelector('img').src = info.url;
  element.querySelector('.picture-likes').textContent = info.likes;
  element.querySelector('.picture-comments').textContent = getRandomInteger(1, 23);
  return element;
};

var fillDocument = function () {
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoData.length; i++) {
    fragment.appendChild(createCard(photoData[i]));
  }
  pictures.appendChild(fragment);
};


fillDocument();


