var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
rectangle(0,0,canvas.width,canvas.height,"white");
var score = 0;

function image(source, x, y, w, h, a) {
    var img = new Image();
    img.src = source;
    ctx.globalAlpha = a || 1;
    if (!w || !h) {
        ctx.drawImage(img, x, y);
    }
    else {
        ctx.drawImage(img, x, y, w, h);
    }
    ctx.globalAlpha = 1;
}

function detect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if((x1 + w1 < x2) || (x2 + w2 < x1) || (y1 + h1 < y2) || (y2 + h2 < y1)){
        return false;
    }
    else{
        return true;
    }
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("Score: " + score, 30, 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black"; 
}

function text(t,x,y,s,c,a) {
    ctx.font = s+"px Arial";
    ctx.fillStyle = c;
    ctx.globalAlpha = a || 1;
    ctx.fillText(t, x, y);
    ctx.globalAlpha = 1;
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";    
}

var showCoordinate = true;
function mouseMoveHandler(e) {
    if(e.clientX > 0 && e.clientX < canvas.width){
        heroX = e.clientX - canvas.offsetLeft -25;
    }
    if(e.clientY > 0 && e.clientY < canvas.height){
        heroY = e.clientY - canvas.offsetTop -25;
    }
    if(showCoordinate){
        rectangle(canvas.width-90,canvas.height-30,120,30,"white");
        ctx.font = "20px Arial"
        ctx.fillStyle = "orange";
        ctx.fillText("("+e.clientX+","+e.clientY+")", canvas.width-90, canvas.height-6);
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
    if(e.clientX > 0 && e.clientX < canvas.width){
        heroX = e.clientX - canvas.offsetLeft -25;
    }
    if(e.clientY > 0 && e.clientY < canvas.height){
        heroY = e.clientY - canvas.offsetTop -25;
    }

})

function drawXY(x,y,color) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("("+x+","+y+")", 200, 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black"; 
}

function circle(x, y, r, c, a) {
    ctx.beginPath();
    ctx.globalAlpha = a || 1;
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
};

function rectangle(x, y, w, h, c, a) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = c;
    ctx.globalAlpha = a || 1;
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
};

function line(x, y, w, h, r, c, a) {
    ctx.beginPath();
    ctx.globalAlpha = a || 1;
    ctx.moveTo(x, y);
    ctx.lineTo(w, h);
    ctx.lineWidth = r;
    ctx.strokeStyle = c;
    ctx.stroke();
    ctx.closePath();
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";    
};

function triangle(x1, y1, x2, y2, x3, y3, c, a) {
    ctx.beginPath();
    ctx.globalAlpha = a || 1;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.lineTo(x1,y1);
    ctx.lineWidth = 1;    
    ctx.fillStyle=c;
    ctx.fill();
    ctx.strokeStyle = c
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle="black";
    ctx.strokeStyle="black"
};

function ellipse(x, y, w, h, c, a) {
    ctx.beginPath();
    ctx.globalAlpha = a || 1;
    ctx.ellipse(x,y,w,h,0,0,Math.PI*2);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1;
    ctx.fillStyle="black";
};

function playAudio(url, isLoop) {
    var explode = new Audio(url);
    explode.play();
    explode.loop = isLoop;
};

function clone(Obj) {
    var buf;
    if(Obj instanceof Array) {
        buf = [];
        var i = Obj.length;
        while(i--) {
            buf[i] = clone(Obj[i]);
        }
        return buf;
    }
    else if (Obj instanceof Object) {
        buf = {};
        for(var k in Obj) {
            buf[k] = clone(Obj[k]);
        }
        return buf;
    }
    else {
        return Obj;
    }
}





