import $ from './module.js';
import nextSlide from './ppt.js';

let drawing = false;
let erasing = false;

function toggleDraw() {
    drawing = !drawing;
    if (drawing) {
        $('#p').css({
            cursor: 'crosshair'
        });
    }
    else {
        $('#p').css({
            cursor: 'default'
        });
    }
}

function updatePen(ctx) {
    erasing = $('#eraser').is(":checked");
    if (!erasing) {
        ctx.globalCompositeOperation="source-over";
        ctx.lineWidth = $('#lineWidth').val();
        ctx.strokeStyle = $('#penColor').val();
    } else {
        ctx.globalCompositeOperation="destination-out";
        ctx.lineWidth = $('#lineWidth').val() * 10;
    }
}

function updatePage(_) {
    erasing = $('#eraser').is(":checked");
    if (!erasing) {
        $(this).trigger("change");
        $('#width').text('Eraser width:');
        $('#color').css({
            display: 'none'
        });
    } else {
        $(this).trigger("change");
        $('#width').text('Pen width:');
        $('#color').css({
            display: 'inline-block'
        });
    }
}

function updateWidth(_) {
    $('#wdis').text($('#lineWidth').val());
}
$('#d').mouseup(toggleDraw);
$('#eraser').mouseup(updatePage);
$('#lineWidth').mousemove(updateWidth);

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
        updatePen(ctx);
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
