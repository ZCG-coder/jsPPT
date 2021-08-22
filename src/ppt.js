import $ from './module.js';

let drawing = false;

function nextSlide () {
    console.log('next');
}
function prevSlide () {
    console.log('prev');
}

$('#p').bind('click', nextSlide);

$('#r').bind('click', nextSlide);

$('#l').bind('click', prevSlide);

class Canvas {
    constructor(canvas_id, draw, coord) {          
        this.canvas_id = canvas_id; 
        this.draw = draw;
        this.coord = coord
    }
    startDrawing(event) {
        this.draw = true;
        let canvas = document.getElementById(this.canvas_id); 
        this.coord.x = (event.clientX - canvas.getBoundingClientRect().left);
        this.coord.y = (event.clientY - canvas.getBoundingClientRect().top);
    }
    
    drawSketch(event) {
        if (!this.draw) {
            return 0;
        }
        let canvas = document.getElementById(this.canvas_id);
        let ctx = canvas.getContext('2d');
        // Start the line
        ctx.beginPath();
        
        // Pull from the color and width from the associated 
        // controls. The line cap is hardcoded to be rounded,
        // because it looks more natural for a drawing application
        ctx.strokeStyle = document.getElementById("penColor").value;
        ctx.lineWidth = document.getElementById("lineWidth").value;
        ctx.lineCap = "rounded";
        // Start moving to the coordinates determined by mouse 
        // movement. The position is updated as the cursor moves
        ctx.moveTo(this.coord.x, this.coord.y);
        this.coord.x = (event.clientX - canvas.getBoundingClientRect().left);
        this.coord.y = (event.clientY - canvas.getBoundingClientRect().top);
        
        // Specify where the line ends
        ctx.lineTo(this.coord.x , this.coord.y);
        
        // Draw the line
        ctx.stroke();
    }
    stopDrawing(event) {
        this.draw = false;
    }
}


function main() {
    let canvas = new Canvas("p", false, {x:0 , y:0}); 
    document.addEventListener('mousedown', function(e){
        canvas.startDrawing(e);
        });
    document.addEventListener('mouseup', function(e){
        canvas.stopDrawing(e);
        });
    document.addEventListener('mousemove', function(e){
        canvas.drawSketch(e);
        });
}
window.addEventListener("DOMContentLoaded", ()=>{        
    main();
});
