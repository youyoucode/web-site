!function(e,t){function i(){var t=r.getBoundingClientRect().width;t/d>540&&(t=540*d);var i=t/10;r.style.fontSize=i+"px",s.rem=e.rem=i,e.setTimeout(function(){var t=e.document.createElement("div");t.style.width="10rem",e.document.body.appendChild(t);var a=parseFloat(e.getComputedStyle(t).width);if(a>r.clientWidth){var n=a/r.clientWidth,o=(i/n).toFixed(4);r.style.fontSize=o+"px"}t.remove()},100)}var a,n=e.document,r=n.documentElement,o=n.querySelector('meta[name="viewport"]'),l=n.querySelector('meta[name="flexible"]'),d=0,m=0,s=t.flexible||(t.flexible={});if(o){console.warn("将根据已有的meta标签来设置缩放比例");var p=o.getAttribute("content").match(/initial\-scale=([\d\.]+)/);p&&(m=parseFloat(p[1]),d=parseInt(1/m))}else if(l){var c=l.getAttribute("content");if(c){var u=c.match(/initial\-dpr=([\d\.]+)/),f=c.match(/maximum\-dpr=([\d\.]+)/);u&&(d=parseFloat(u[1]),m=parseFloat((1/d).toFixed(2))),f&&(d=parseFloat(f[1]),m=parseFloat((1/d).toFixed(2)))}}if(!d&&!m){var v=(e.navigator.appVersion.match(/android/gi),e.navigator.appVersion.match(/iphone/gi)),h=e.devicePixelRatio;d=v?h>=3&&(!d||d>=3)?3:h>=2&&(!d||d>=2)?2:1:1,m=1/d}if(r.setAttribute("data-dpr",d),!o)if(o=n.createElement("meta"),o.setAttribute("name","viewport"),o.setAttribute("content","initial-scale="+m+", maximum-scale="+m+", minimum-scale="+m+", user-scalable=no"),r.firstElementChild)r.firstElementChild.appendChild(o);else{var x=n.createElement("div");x.appendChild(o),n.write(x.innerHTML)}e.addEventListener("resize",function(){clearTimeout(a),a=setTimeout(i,300)},!1),e.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(a),a=setTimeout(i,300))},!1),"complete"===n.readyState?n.body.style.fontSize=12*d+"px":n.addEventListener("DOMContentLoaded",function(){n.body.style.fontSize=12*d+"px"},!1),i(),s.dpr=e.dpr=d,s.refreshRem=i,s.rem2px=function(e){var t=parseFloat(e)*this.rem;return"string"==typeof e&&e.match(/rem$/)&&(t+="px"),t},s.px2rem=function(e){var t=parseFloat(e)/this.rem;return"string"==typeof e&&e.match(/px$/)&&(t+="rem"),t}}(window,window.lib||(window.lib={}));