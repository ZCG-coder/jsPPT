import $ from './module.js';

let drawing = false;

function nextSlide () {
    console.log('next');
}

function prevSlide () {
    console.log('prev');
}

function draw () {
    drawing = !drawing;
}

$('#d').bind('click', draw)

$('#r').bind('click', nextSlide);

$('#l').bind('click', prevSlide);

(function() {
    var canvas = document.querySelector('#p');
    var ctx = canvas.getContext('2d');
    const sketch_style = getComputedStyle(canvas);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};
    
    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);
    
    
    /* Drawing on Paint App */
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);
    
    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);
    
    var onPaint = function() {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = $('#penColor').val();
        ctx.lineWidth = $('#lineWidth').val();
    };
    
}());
