import $ from './module.js';

const p = $('#text');

function setSlide(data) {
    var data = data;
}

fetch('file.jspf')
    .then(response => response.text())
    .then((d) => {
        setSlide(JSON.parse(d));
});

export default function nextSlide() {
    eval(data[0][0]);
}

function prevSlide() {
    console.log('prev');
}

function add(text, type) {
    if (type === 'par') {
        p.append(`<p>${text}</p>`);
    } else if (type === 'h') {
        p.append(`<h1>${text}</h1>`);
    }
}


$('#r').mouseup(nextSlide);
$('#l').mouseup(prevSlide);
