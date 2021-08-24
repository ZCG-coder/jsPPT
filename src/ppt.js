import $ from './module.js';

let drawing = false;
let erasing = false;

function nextSlide() {
    console.log('next');
}

function prevSlide() {
    console.log('prev');
}

function toggleDraw() {
    drawing = !drawing;
}

$('#d').bind('click', toggleDraw);

$('#r').bind('click', nextSlide);

$('#l').bind('click', prevSlide);

function draw() {
    var canvas = document.querySelector('#p');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    // Mouse Capturing Work
    canvas.addEventListener(
        'mousemove',
        function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        },
        false
    );

    // Drawing on Paint App
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    canvas.addEventListener(
        'mousedown',
        (_) => {
            if (drawing) {
                canvas.addEventListener('mousemove', onPaint, false);
            } else {
                nextSlide();
            }
        },
        false
    );

    canvas.addEventListener(
        'mouseup',
        (_) => {
            canvas.removeEventListener('mousemove', onPaint, false);
        },
        false
    );

    function onPaint() {
        erasing = $('#eraser').is(":checked");
        if (!erasing) {
            ctx.globalCompositeOperation="source-over";
            ctx.lineWidth = $('#lineWidth').val();
        } else {
            ctx.globalCompositeOperation="destination-out";
            ctx.lineWidth = $('#lineWidth').val() * 10;
        }
        
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
    }
}

draw();

var modal = document.getElementById("settingsModal");
var btn = document.getElementById("settings");
btn.onclick = function() {
  modal.style.display = "block";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
