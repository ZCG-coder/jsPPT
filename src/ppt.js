import $ from './module.js';

const p = $('#text');
var data;
var slideNo = 0;

function setSlide(d) {
    data = d.split('\n');
}

fetch('file.jspf')
    .then((response) => response.text())
    .then((d) => {
        setSlide(d);
    });

export default function nextSlide() {
    eval(data[slideNo]);
    slideNo++;
}

function prevSlide() {
    slideNo--;
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
