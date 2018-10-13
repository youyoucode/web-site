var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 800;

var score = 0;
function image(source, x, y, w, h) {
    var img = new Image();
    img.src = source;
    if (!w || !h) {
        ctx.drawImage(img, x, y);
    }else{
        ctx.drawImage(img, x, y, w, h);
    }
}

function detect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if((x1 + w1 < x2) || (x2 + w2 < x1) || (y1 + h1 < y2) || (y2 + h2 < y1)){
        return false;
    }else{
        return true;
    }
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("Score: " + score, 30, 50);
}

function mouseMoveHandler(e) {
    if(e.clientX > 0 && e.clientX < canvas.width){
        heroX = e.clientX - canvas.offsetLeft -25;
    }
    if(e.clientY > 0 && e.clientY < canvas.height){
        heroY = e.clientY - canvas.offsetTop -25;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener('touchmove', touchMoveHandler, false);

function touchMoveHandler(e) {
    heroX = e.targetTouches[0].pageX - 25;
    heroY = e.targetTouches[0].pageY - 25;
}

clickX = 0;
clickY = 0;
document.addEventListener("click", function (e) {
     clickX = e.clientX - canvas.offsetLeft;
     clickY = e.clientY - canvas.offsetTop;
})

function drawXY(x,y,color){
    ctx.font = "20px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("("+x+","+y+")", 200, 50);
}

function circle(x, y, r, c) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.closePath();
};

function rectangle(x, y, w, h, c) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.closePath();
};

function line(x, y, w, h, r, c) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(w, h);
    ctx.lineWidth = r;
    ctx.strokeStyle = c;
    ctx.stroke();
    ctx.closePath();
};

function triangle(x1, y1, x2, y2, x3, y3, c) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.lineTo(x1,y1);
    ctx.fillStyle=c;
    ctx.fill();
    ctx.strokeStyle = c;
    ctx.stroke();
};

function ellipse(x, y, w, h, c) {
    ctx.beginPath();
    ctx.ellipse(x,y,w,h,0,0,Math.PI*2);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.closePath();
};

function playAudio(url, isLoop) {
    var explode = new Audio(url);
    explode.play();
    explode.loop = isLoop;
};