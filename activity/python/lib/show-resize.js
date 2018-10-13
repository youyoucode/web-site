/**
 * Created by sam on 2017/5/22.
 */
function resize(){
    document.getElementById('content').style.height = (window.innerHeight-window.innerWidth*192/720) + 'px';
    document.getElementById('content').style.width = window.innerWidth + 'px';
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.style.top = "0px";
}
resize();

window.addEventListener("resize", function (event) {
    resize();
});