var isWebWorker = function(){
    try {
        return (window) ? false : true;
    } catch (x) {
        return true;
    }
}();

if( isWebWorker )   {
    importScripts("../lib/aether-plugin/lodash/lodash.min.js");
    importScripts("../lib/aether-lib/commonjs-mode/aether.js");
}

var aetherOptions = {
    executionLimit: 90000000,
    problems:
    {
        jshint_W040:
        {
            level: "ignore"
        }
    },
    language:'javascript',
    includeFlow: true,
    includeMetrics: true,
    protectBuiltins: true,
    protectAPI:false,
    languageVersion:'es6'
};
var aether = new Aether(aetherOptions);

onmessage = function(e) {
    var data = e.data;
    var type = data['type'];
    if(data['language']) aether.setLanguage(data['language']);
    if('transpile' == type) { //编译
        var rawCode= data['rawCode'];
        aether.transpile( rawCode );
        
        postMessage({
            'type': 'compile_info',
            'problems': aether.problems,
            'flow': aether.flow,
            'metrics': aether.metrics
        });
    }
}
