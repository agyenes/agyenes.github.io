'use strict';

var images = [
    "Images/img1.jpg",
    "Images/img2.jpg",
    "Images/img3.jpg",
    "Images/img4.jpg",
    "Images/img5.jpg",
    "Images/img6.jpg",
    "Images/img7.jpg",
    "Images/img8.jpg",
    "Images/img9.jpg",
    "Images/img10.jpg",
]

var picture_titles = [
    "1. The staircase",
    "2. Broken glass",
    "3. Stella playing pinball",
    "4. Trelkovsky at the Seine",
    "5. Monsieur Zy",
    "6. Trelkovsky in the pub",
    "7. A mysterious character in the story",
    "8. Trelkovsky at the park",
    "9. Madame Dioz & Monsieur Zy",
    "10. Back to the staircase"
]

var imagecount = 1
var thumbnail_count = 0
var total = images.length
var arrowleft = document.querySelector('.selected .left_holder img');
var arrowright = document.querySelector('.selected .right_holder img');
var littlearrowleft = document.querySelector('.thumbnails .left_holder img');
var littlearrowright = document.querySelector('.thumbnails .right_holder img');
var visible_thumbnails = document.querySelectorAll('.little_pictures img');

arrowleft.addEventListener('click', function() {slide(-1)});
arrowright.addEventListener('click', function() {slide(1)});
littlearrowleft.addEventListener('click', function() {step(-1)});
littlearrowright.addEventListener('click', function() {step(1)});


function slide (x) {
  var Image = document.querySelector('.selected_image');
  var imgTitle = document.querySelector('h3');
  imagecount = imagecount + x;
  if (imagecount > total) { imagecount = 1;}
  if (imagecount < 1) { imagecount = total;}
  Image.src = images[imagecount - 1];
  imgTitle.textContent = picture_titles[imagecount-1]
}

function step (y) {
  if (thumbnail_count + y <= 4 && thumbnail_count + y >= 0) {
      thumbnail_count = thumbnail_count + y;
      for (var i = 0; i < 6; i++) {
        visible_thumbnails[i].setAttribute('src', images[thumbnail_count + i]);
    }
  }
}

for (var i = 0; i < visible_thumbnails.length;i++) {
  visible_thumbnails[i].addEventListener('click', changeImg);
}

function changeImg (event) {
  var Image = document.querySelector('.selected_image');
  Image.setAttribute('src', event.target.getAttribute('src'));
  var imgTitle = document.querySelector('h3');
  imgTitle.textContent = picture_titles[images.indexOf(Image.getAttribute('src'))]
}
