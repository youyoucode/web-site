// ******************** Varibales *******************************************
var crelativeX = 0;
var crelativeY = 0;
var heroWidth=66;
var heroHeight=45;
var bulletWidth=28;
var bulletHeight=55;
var enemyWidth=77;
var enemyHeight=40;
var ebulletWidth=24;
var ebulletHeight=36;
var diamondWidth=38;
var diamondHeight=42;
var stoneWidth=65;
var stoneHeight=63;


// ******************** Function **********************************************

function triangle(x1,y1,x2,y2,x3,y3,color){
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineTo(x3,y3);
   ctx.lineTo(x1,y1);
  ctx.fillStyle=color;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
}

function circle(circlex,circley,circleradius,co1) {
    ctx.beginPath();
    ctx.arc(circlex, circley,circleradius,0,7);
    ctx.fillStyle = co1;
    ctx.fill();
    ctx.closePath();
}

function rectangle(x,y,w,l,co) {
    ctx.beginPath();
    ctx.rect(x,y,w,l);
    ctx.fillStyle = co;
    ctx.fill();
    ctx.closePath();
}


function line(x,y,x1,y1, width, colo) {
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x1, y1);
ctx.lineWidth = width;
ctx.strokeStyle = colo;
ctx.stroke();
ctx.closePath();
}

function image(source,x,y,w,h){
  var img=new Image();
  img.src=source;
  ctx.drawImage(img,x,y,w,h);
}

function text(str,x,y,color,size){
      ctx.fillStyle = color;
      ctx.font = size +"px Arial";
      ctx.fillText(str, x, y);  
}

function playMusic(src) {
    var bgm = new Audio(src);
    bgm.loop = true;
    bgm.play();
}

//******监听事件**********//
document.addEventListener("click", function (e) {
     crelativeX = e.clientX - canvas.offsetLeft;
     crelativeY = e.clientY - canvas.offsetTop;

});

function drawXY(x,y,color) {
    ctx.font = "20px Arial";
    ctx.fillStyle = color;
    ctx.fillText("("+x+","+y+")", 25, 350);
}

document.addEventListener('touchstart',touchStartHandler, false);

function print(x) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(x, 250, 35);
}

document.addEventListener("click", function (e) {
     crelativeX = e.clientX - canvas.offsetLeft;
     crelativeY = e.clientY - canvas.offsetTop;

});

document.addEventListener('touchstart',touchStartHandler, false);


function touchStartHandler(e) {
  
    var trelativeX = e.targetTouches[0].pageX;
    if(trelativeX > 0 && trelativeX < canvas.width) {
      heroX = trelativeX - heroWidth/2;}
  
  var trelativeY = e.targetTouches[0].pageY;
   if(trelativeY > 0 && trelativeY <canvas.height ) {
        heroY = trelativeY - heroHeight/2;
 }
}

document.addEventListener('touchmove',touchMoveHandler, false);


function touchMoveHandler(e) {
    e.preventDefault();
    var tmrelativeX = e.targetTouches[0].pageX;
    if(tmrelativeX > 0 && tmrelativeX < canvas.width) {
        heroX = tmrelativeX - heroWidth/2;
    }
   var tmrelativeY = e.targetTouches[0].pageY;
    if(tmrelativeY > 0 && tmrelativeY < canvas.height) {
        heroY = tmrelativeY - heroHeight/2;
    }
    
}

function mouseMoveHandler(e) {
    
}

document.addEventListener("mousemove", mouseMoveHandler, false);


document.addEventListener('keYdown',doKeYDown,false);
function doKeYDown(e){
  var keYID = e.keYCode; 
  if(keYID ===38){    //up
    
  }
}