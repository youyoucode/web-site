canvas.width = 500;
canvas.height  = 500;
showCoordinate = false;
var points = 0;
food={
    img:"http://ou5n3ml3s.bkt.clouddn.com/mario_mushroom.png",
    x:10,
    y:20,
    w:60,
    h:60
}
background={
    img:"http://ou5n3ml3s.bkt.clouddn.com/mario_background_1.png",
    x:0,
    y:0,
    w:500,
    h:500
}
player={
    img:"http://ou5n3ml3s.bkt.clouddn.com/mario_mario.png",
    x:30,
    y:290,
    w:120,
    h:120
}
var df = 0;
var db = 0;
var dp = 0;
var ds = 0;
var name = null;
function mode(){
    this.drawfood = function(){
        df=1;
    }
    this.drawbackground = function(){
        db=1;
    }
    this.drawplayer = function(){
        dp=1;
    }
    this.drawscore = function(){
        ds=1;
    }
    this.drawname = function(arr_1){
        dn=1;
        name = arr_1;
    }
}
var hero = new mode();
function loop(){
  //把图片放进屏幕
    if(db==1){
        image(background.img,background.x, background.y,background.w,background.h);
    }
    if(df==1){
        image(food.img,food.x,food.y,food.w,food.h);
    }
    if(dp==1){
        image(player.img,player.x,player.y,player.w,player.h);
    }
    //让蘑菇不停地动起来
    food.y += 5;
    if(food.y>500){
        food.y=0;
        food.x=Math.random() * 400;
    }
    //如果蘑菇碰到了马里奥
    if (detect(food.x,food.y,60,60,player.x,player.y,player.w,player.h)){
        food.y = 510;
        score += 1;
    }
    //写分数函数
    if(ds==1){
        drawScore();
    }
    if(dn==1){
        text(name,120,50,20,"orange");
    }
}
window.addEventListener("keydown", keypress_handler, false);
var moveInterval = setInterval(function(){loop();},30);
function keypress_handler(event) {
    if (event.keyCode == 39) {
        player.x+=10;
    }
    if (event.keyCode == 37) {
        player.x-=10;
    }
}
/*
document.addEventListener('touchstart', touchHandler, false);

function touchstartHandler(e) {
    touchstartX = e.targetTouches[0].pageX;
    touchstartY = e.targetTouches[0].pageY;
    e.preventDefault();
    if(touchX<canvas.width/2){
        player.x-=10;        
    }
    if(touchX>=canvas.width/2){
        player.x+=10;        
    }
}
*/
document.addEventListener('touchmove', touchHandler, false);
function touchHandler(e) {
    touchX = e.targetTouches[0].pageX;
    touchY = e.targetTouches[0].pageY;
    e.preventDefault();
    player.x = touchX-60;
}
document.addEventListener('mousemove', mouseHandler, false);
function mouseHandler(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    e.preventDefault();
    player.x = mouseX-60;
}

