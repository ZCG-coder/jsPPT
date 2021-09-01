import $ from './module.js';

const p = $('#text');
var data = [];
var slideNo = 0;

function setSlide(d) {
    data = d.split('\n');
}

export default function nextSlide() {
    eval(data[slideNo]);
    if (slideNo < data.length) {
        slideNo++;
    }
}

function add(elem) {
    p.append(elem);
}

$(window).ready(function() {
    fetch('file.jspf')
        .then((response) => response.text())
        .then((d) => {
            setSlide(d);
            nextSlide();
        });
});