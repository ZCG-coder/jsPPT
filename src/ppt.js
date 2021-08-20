import $ from './module.js';
const arrow = {left: 37, up: 38, right: 39, down: 40 };

function nextSlide () {
    console.log('next');
}
function prevSlide () {
    console.log('prev');
}

$('#p').bind('click', function () {
    nextSlide();
});

$('#r').bind('click', function () {
    nextSlide();
});

$('#l').bind('click', function () {
    prevSlide();
});
