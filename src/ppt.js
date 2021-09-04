import $ from './module.js';

const p = $('#text');
var data = [];
var slideNo = 0;

function setSlideFromFile(file) {
    fetch(file)
        .then((response) => response.text())
        .then((d) => {
            data = d.split('\n');
            nextSlide();
        });
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

$(window).ready(
    function() {
        $('#useClip').mousedown(function(){
            const text = await navigator.clipboard.readText();
            console.log(text);
        });

        $('#useDef').mousedown(function(){
            setSlideFromFile('file.jspf');
            $('#selectFile').css({display: 'none'});
        });

        $('#selectFile').css({display: 'block'});
});