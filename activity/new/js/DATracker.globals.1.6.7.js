(function() {
    var Config = { DEBUG: false, LIB_VERSION: "1.6.7" };
    var _$1 = { contains: function(array, item) { var k = -1; if (Object.prototype.toString.apply(array) !== "[object Array]") { return k } if (!array && !item) { return k } for (var i = 0; i < array.length; i++) { if (typeof array[i].indexOf === "function") { if (array[i].indexOf(item) > 0) { return i } } } return k } };
    var win$1;
    if (typeof window === "undefined") { win$1 = { navigator: { userAgent: "" }, document: {} } } else { win$1 = window }
    var device;
    var previousDevice;
    var find;
    var orientationEvent;
    var document$2 = win$1.document;
    var navigator$2 = win$1.navigator;
    var userAgent$1 = navigator$2.userAgent;
    previousDevice = win$1.device;
    device = {};
    win$1.device = device;
    userAgent$1 = userAgent$1.toLowerCase();
    device.ios = function() { return device.iphone() || device.ipod() || device.ipad() };
    device.iphone = function() { return !device.windows() && find("iphone") };
    device.ipod = function() { return find("ipod") };
    device.ipad = function() { return find("ipad") };
    device.android = function() { return !device.windows() && find("android") };
    device.androidPhone = function() { return device.android() && find("mobile") };
    device.androidTablet = function() { return device.android() && !find("mobile") };
    device.blackberry = function() { return find("blackberry") || find("bb10") || find("rim") };
    device.blackberryPhone = function() { return device.blackberry() && !find("tablet") };
    device.blackberryTablet = function() { return device.blackberry() && find("tablet") };
    device.windows = function() { return find("windows") };
    device.windowsPhone = function() { return device.windows() && find("phone") };
    device.windowsTablet = function() { return device.windows() && find("touch") && !device.windowsPhone() };
    device.fxos = function() { return (find("(mobile;") || find("(tablet;")) && find("; rv:") };
    device.fxosPhone = function() { return device.fxos() && find("mobile") };
    device.fxosTablet = function() { return device.fxos() && find("tablet") };
    device.meego = function() { return find("meego") };
    device.cordova = function() { return win$1.cordova && location.protocol === "file:" };
    device.nodeWebkit = function() { return typeof win$1.process === "object" };
    device.mobile = function() { return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego() };
    device.tablet = function() { return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet() };
    device.desktop = function() { return !device.tablet() && !device.mobile() };
    device.television = function() { var i, television = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"];
        i = 0; while (i < television.length) { if (find(television[i])) { return true }
            i++ } return false };
    device.portrait = function() { return win$1.innerHeight / win$1.innerWidth > 1 };
    device.landscape = function() { return win$1.innerHeight / win$1.innerWidth < 1 };
    device.noConflict = function() { win$1.device = previousDevice; return this };
    find = function(needle) { return userAgent$1.indexOf(needle) !== -1 };
    device.devicePlatform = function() { var platForm = "web"; if (device.ios()) { if (device.ipad()) { platForm = "iPad" } else { if (device.iphone()) { platForm = "iPhone" } else { if (device.ipod()) { platForm = "iPod touch" } } } } else { if (device.android()) { if (device.androidTablet()) { platForm = "Tablet" } else { platForm = "Phone" } } else { if (device.blackberry()) { if (device.blackberryTablet()) { platForm = "Tablet" } else { platForm = "Phone" } } else { if (device.windows()) { if (device.windowsTablet()) { platForm = "Tablet" } else { if (device.windowsPhone()) { platForm = "Phone" } else { platForm = "web" } } } else { if (device.fxos()) { if (device.fxosTablet()) { platForm = "Tablet" } else { platForm = "Phone" } } else { if (device.meego()) { platForm = "Phone" } else { platForm = "web" } } } } } } return platForm };
    device.deviceModel = function() { var deviceModel = ""; if (device.android()) { var sss = win$1.navigator.userAgent.split(";"); var i = _$1.contains(sss, "Build/"); if (i > -1) { deviceModel = sss[i].substring(0, sss[i].indexOf("Build/")) } } else { if (device.ios()) { if (device.iphone()) { deviceModel = "iPhone" } } } return deviceModel };
    if (Object.prototype.hasOwnProperty.call(win$1, "onorientationchange")) { orientationEvent = "orientationchange" } else { orientationEvent = "resize" }
    var Device = device;
    var win;
    if (typeof window === "undefined") { win = { navigator: {} } } else { win = window }
    var ArrayProto = Array.prototype;
    var FuncProto = Function.prototype;
    var ObjProto = Object.prototype;
    var slice = ArrayProto.slice;
    var hasOwnProperty = ObjProto.hasOwnProperty;
    var windowConsole = win.console;
    var navigator$1 = win.navigator;
    var document$1 = win.document;
    var nativeBind = FuncProto.bind;
    var nativeForEach = ArrayProto.forEach;
    var nativeIndexOf = ArrayProto.indexOf;
    var nativeIsArray = Array.isArray;
    var breaker = {};
    var _ = { trim: function(str) { return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") } };
    var console = {
        log: function() { if (Config.DEBUG && !_.isUndefined(windowConsole) && windowConsole) { try { windowConsole.log.apply(windowConsole, arguments) } catch (err) { _.each(arguments, function(arg) { windowConsole.log(arg) }) } } },
        error: function() {
            if (Config.DEBUG && !_.isUndefined(windowConsole) && windowConsole) {
                var args = ["DATracker error:"].concat(_.toArray(arguments));
                try { windowConsole.error.apply(windowConsole, args) } catch (err) { _.each(args, function(arg) { windowConsole.error(arg) }) }
            }
        },
        critical: function() { if (!_.isUndefined(windowConsole) && windowConsole) { var args = ["DATracker error:"].concat(_.toArray(arguments)); try { windowConsole.error.apply(windowConsole, args) } catch (err) { _.each(args, function(arg) { windowConsole.error(arg) }) } } }
    };
    var NA_VERSION = "-1";
    var external = win.external;
    var userAgent = win.navigator.userAgent || "";
    var appVersion = win.navigator.appVersion || "";
    var vendor = win.navigator.vendor || "";
    var detector = {};
    var re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;
    var re_blackberry_10 = /\bbb10\b.+?\bversion\/([\d.]+)/;
    var re_blackberry_6_7 = /\bblackberry\b.+\bversion\/([\d.]+)/;
    var re_blackberry_4_5 = /\bblackberry\d+\/([\d.]+)/;

    function toString(object) { return Object.prototype.toString.call(object) }

    function isObject(object) { return toString(object) === "[object Object]" }

    function isFunction(object) { return toString(object) === "[object Function]" }

    function each(object, factory) { for (var i = 0, l = object.length; i < l; i++) { if (factory.call(object, object[i], i) === false) { break } } }
    var DEVICES = [
        ["nokia", function(ua) { if (ua.indexOf("nokia ") !== -1) { return (/\bnokia ([0-9]+)?/) } else { return (/\bnokia([a-z0-9]+)?/) } }],
        ["samsung", function(ua) { if (ua.indexOf("samsung") !== -1) { return (/\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/) } else { return (/\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/) } }],
        ["wp", function(ua) { return ua.indexOf("windows phone ") !== -1 || ua.indexOf("xblwp") !== -1 || ua.indexOf("zunewp") !== -1 || ua.indexOf("windows ce") !== -1 }],
        ["pc", "windows"],
        ["ipad", "ipad"],
        ["ipod", "ipod"],
        ["iphone", /\biphone\b|\biph(\d)/],
        ["mac", "macintosh"],
        ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/],
        ["hongmi", /\bhm\b|redmi[ \-]?([a-z0-9]+)/],
        ["aliyun", /\baliyunos\b(?:[\-](\d+))?/],
        ["meizu", function(ua) { return ua.indexOf("meizu") >= 0 ? /\bmeizu[\/ ]([a-z0-9]+)\b/ : /\bm([0-9cx]{1,4})\b/ }],
        ["nexus", /\bnexus ([0-9s.]+)/],
        ["huawei", function(ua) { var re_mediapad = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/; if (ua.indexOf("huawei-huawei") !== -1) { return (/\bhuawei\-huawei\-([a-z0-9\-]+)/) } else { if (re_mediapad.test(ua)) { return re_mediapad } else { return (/\bhuawei[ _\-]?([a-z0-9]+)/) } } }],
        ["lenovo", function(ua) { if (ua.indexOf("lenovo-lenovo") !== -1) { return (/\blenovo\-lenovo[ \-]([a-z0-9]+)/) } else { return (/\blenovo[ \-]?([a-z0-9]+)/) } }],
        ["zte", function(ua) { if (/\bzte\-[tu]/.test(ua)) { return (/\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/) } else { return (/\bzte[ _\-]?([a-su-z0-9\+]+)/) } }],
        ["vivo", /\bvivo(?: ([a-z0-9]+))?/],
        ["htc", function(ua) { if (/\bhtc[a-z0-9 _\-]+(?= build\b)/.test(ua)) { return (/\bhtc[ _\-]?([a-z0-9 ]+(?= build))/) } else { return (/\bhtc[ _\-]?([a-z0-9 ]+)/) } }],
        ["oppo", /\boppo[_]([a-z0-9]+)/],
        ["konka", /\bkonka[_\-]([a-z0-9]+)/],
        ["sonyericsson", /\bmt([a-z0-9]+)/],
        ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/],
        ["lg", /\blg[\-]([a-z0-9]+)/],
        ["android", /\bandroid\b|\badr\b/],
        ["blackberry", function(ua) { if (ua.indexOf("blackberry") >= 0) { return (/\bblackberry\s?(\d+)/) } return "bb10" }]
    ];
    var OS = [
        ["wp", function(ua) { if (ua.indexOf("windows phone ") !== -1) { return (/\bwindows phone (?:os )?([0-9.]+)/) } else { if (ua.indexOf("xblwp") !== -1) { return (/\bxblwp([0-9.]+)/) } else { if (ua.indexOf("zunewp") !== -1) { return (/\bzunewp([0-9.]+)/) } } } return "windows phone" }],
        ["windows", /\bwindows nt ([0-9.]+)/],
        ["macosx", /\bmac os x ([0-9._]+)/],
        ["iOS", function(ua) { if (/\bcpu(?: iphone)? os /.test(ua)) { return (/\bcpu(?: iphone)? os ([0-9._]+)/) } else { if (ua.indexOf("iph os ") !== -1) { return (/\biph os ([0-9_]+)/) } else { return (/\bios\b/) } } }],
        ["yunos", /\baliyunos ([0-9.]+)/],
        ["Android", function(ua) { if (ua.indexOf("android") >= 0) { return (/\bandroid[ \/-]?([0-9.x]+)?/) } else { if (ua.indexOf("adr") >= 0) { if (ua.indexOf("mqqbrowser") >= 0) { return (/\badr[ ]\(linux; u; ([0-9.]+)?/) } else { return (/\badr(?:[ ]([0-9.]+))?/) } } } return "android" }],
        ["chromeos", /\bcros i686 ([0-9.]+)/],
        ["linux", "linux"],
        ["windowsce", /\bwindows ce(?: ([0-9.]+))?/],
        ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/],
        ["blackberry", function(ua) { var m = ua.match(re_blackberry_10) || ua.match(re_blackberry_6_7) || ua.match(re_blackberry_4_5); return m ? { version: m[1] } : "blackberry" }]
    ];
    var ENGINE = [
        ["edgehtml", /edge\/([0-9.]+)/],
        ["trident", re_msie],
        ["blink", function() { return "chrome" in win && "CSS" in win && /\bapplewebkit[\/]?([0-9.+]+)/ }],
        ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
        ["gecko", function(ua) { var match; if (match = ua.match(/\brv:([\d\w.]+).*\bgecko\/(\d+)/)) { return { version: match[1] + "." + match[2] } } }],
        ["presto", /\bpresto\/([0-9.]+)/],
        ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/],
        ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/],
        ["u2", /\bu2\/([0-9.]+)/],
        ["u3", /\bu3\/([0-9.]+)/]
    ];
    var BROWSER = [
        ["edge", /edge\/([0-9.]+)/],
        ["sogou", function(ua) { if (ua.indexOf("sogoumobilebrowser") >= 0) { return (/sogoumobilebrowser\/([0-9.]+)/) } else { if (ua.indexOf("sogoumse") >= 0) { return true } } return (/ se ([0-9.x]+)/) }],
        ["theworld", function() { var x = checkTW360External("theworld"); if (typeof x !== "undefined") { return x } return "theworld" }],
        ["360", function(ua) {
            var x = checkTW360External("360se");
            if (typeof x !== "undefined") { return x }
            if (ua.indexOf("360 aphone browser") !== -1) {
                return (/\b360 aphone browser \(([^\)]+)\)/)
            }
            return (/\b360(?:se|ee|chrome|browser)\b/)
        }],
        ["maxthon", function() { try { if (external && (external.mxVersion || external.max_version)) { return { version: external.mxVersion || external.max_version } } } catch (ex) {} return (/\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/) }],
        ["micromessenger", /\bmicromessenger\/([\d.]+)/],
        ["qq", /\bm?qqbrowser\/([0-9.]+)/],
        ["green", "greenbrowser"],
        ["tt", /\btencenttraveler ([0-9.]+)/],
        ["liebao", function(ua) { if (ua.indexOf("liebaofast") >= 0) { return (/\bliebaofast\/([0-9.]+)/) } if (ua.indexOf("lbbrowser") === -1) { return false } var version; try { if (external && external.LiebaoGetVersion) { version = external.LiebaoGetVersion() } } catch (ex) {} return { version: version || NA_VERSION } }],
        ["tao", /\btaobrowser\/([0-9.]+)/],
        ["coolnovo", /\bcoolnovo\/([0-9.]+)/],
        ["saayaa", "saayaa"],
        ["baidu", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],
        ["ie", re_msie],
        ["mi", /\bmiuibrowser\/([0-9.]+)/],
        ["opera", function(ua) { var re_opera_old = /\bopera.+version\/([0-9.ab]+)/; var re_opera_new = /\bopr\/([0-9.]+)/; return re_opera_old.test(ua) ? re_opera_old : re_opera_new }],
        ["oupeng", /\boupeng\/([0-9.]+)/],
        ["yandex", /yabrowser\/([0-9.]+)/],
        ["ali-ap", function(ua) { if (ua.indexOf("aliapp") > 0) { return (/\baliapp\(ap\/([0-9.]+)\)/) } else { return (/\balipayclient\/([0-9.]+)\b/) } }],
        ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/],
        ["ali-am", /\baliapp\(am\/([0-9.]+)\)/],
        ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
        ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/],
        ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
        ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/],
        ["uc", function(ua) { if (ua.indexOf("ucbrowser/") >= 0) { return (/\bucbrowser\/([0-9.]+)/) } else { if (ua.indexOf("ubrowser/") >= 0) { return (/\bubrowser\/([0-9.]+)/) } else { if (/\buc\/[0-9]/.test(ua)) { return (/\buc\/([0-9.]+)/) } else { if (ua.indexOf("ucweb") >= 0) { return (/\bucweb([0-9.]+)?/) } else { return (/\b(?:ucbrowser|uc)\b/) } } } } }],
        ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
        ["android", function(ua) { if (ua.indexOf("android") === -1) { return } return (/\bversion\/([0-9.]+(?: beta)?)/) }],
        ["blackberry", function(ua) { var m = ua.match(re_blackberry_10) || ua.match(re_blackberry_6_7) || ua.match(re_blackberry_4_5); return m ? { version: m[1] } : "blackberry" }],
        ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
        ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/],
        ["firefox", /\bfirefox\/([0-9.ab]+)/],
        ["nokia", /\bnokiabrowser\/([0-9.]+)/]
    ];

    function checkTW360External(key) { if (!external) { return } try { var runpath = external.twGetRunPath.toLowerCase(); var security = external.twGetSecurityID(win); var version = external.twGetVersion(security); if (runpath && runpath.indexOf(key) === -1) { return false } if (version) { return { version: version } } } catch (ex) {} }

    function IEMode(ua) { if (!re_msie.test(ua)) { return null } var m, engineMode, engineVersion, browserMode, browserVersion; if (ua.indexOf("trident/") !== -1) { m = /\btrident\/([0-9.]+)/.exec(ua); if (m && m.length >= 2) { engineVersion = m[1]; var v_version = m[1].split(".");
                v_version[0] = parseInt(v_version[0], 10) + 4;
                browserVersion = v_version.join(".") } }
        m = re_msie.exec(ua);
        browserMode = m[1]; var v_mode = m[1].split("."); if (typeof browserVersion === "undefined") { browserVersion = browserMode }
        v_mode[0] = parseInt(v_mode[0], 10) - 4;
        engineMode = v_mode.join("."); if (typeof engineVersion === "undefined") { engineVersion = engineMode } return { browserVersion: browserVersion, browserMode: browserMode, engineVersion: engineVersion, engineMode: engineMode, compatible: engineVersion !== engineMode } }

    function detect(name, expression, ua) { var expr = isFunction(expression) ? expression.call(null, ua) : expression; if (!expr) { return null } var info = { name: name, version: NA_VERSION, codename: "" }; var t = toString(expr); if (expr === true) { return info } else { if (t === "[object String]") { if (ua.indexOf(expr) !== -1) { return info } } else { if (isObject(expr)) { if (expr.hasOwnProperty("version")) { info.version = expr.version } return info } else { if (expr.exec) { var m = expr.exec(ua); if (m) { if (m.length >= 2 && m[1]) { info.version = m[1].replace(/_/g, ".") } else { info.version = NA_VERSION } return info } } } } } }
    var na = { name: "", version: "" };

    function init(ua, patterns, factory, detector) { var detected = na;
        each(patterns, function(pattern) { var d = detect(pattern[0], pattern[1], ua); if (d) { detected = d; return false } });
        factory.call(detector, detected.name, detected.version) }
    var parse = function(ua) {
        ua = (ua || "").toLowerCase();
        var d = {};
        init(ua, DEVICES, function(name, version) { var v = parseFloat(version);
            d.device = { name: name, version: v, fullVersion: version };
            d.device[name] = v }, d);
        init(ua, OS, function(name, version) { var v = parseFloat(version);
            d.os = { name: name, version: v, fullVersion: version };
            d.os[name] = v }, d);
        var ieCore = IEMode(ua);
        init(ua, ENGINE, function(name, version) { var mode = version; if (ieCore) { version = ieCore.engineVersion || ieCore.engineMode;
                mode = ieCore.engineMode } var v = parseFloat(version);
            d.engine = { name: name, version: v, fullVersion: version, mode: parseFloat(mode), fullMode: mode, compatible: ieCore ? ieCore.compatible : false };
            d.engine[name] = v }, d);
        init(ua, BROWSER, function(name, version) {
            var mode = version;
            if (ieCore) { if (name === "ie") { version = ieCore.browserVersion }
                mode = ieCore.browserMode }
            var v = parseFloat(version);
            d.browser = { name: name, version: v, fullVersion: version, mode: parseFloat(mode), fullMode: mode, compatible: ieCore ? ieCore.compatible : false };
            d.browser[name] = v
        }, d);
        return d
    };
    detector = parse(userAgent + " " + appVersion + " " + vendor);
    _.trim = function(str) { if (!str) { return } return str.replace(/(^\s*)|(\s*$)/g, "") };
    _.checkTime = function(timeString) { var date = timeString + ""; var reg = /^(\d{4})-(\d{2})-(\d{2})$/; if (timeString) { if (!reg.test(timeString)) { return false } else { return true } } else { return false } };
    _.bind = function(func, context) { var args, bound; if (nativeBind && func.bind === nativeBind) { return nativeBind.apply(func, slice.call(arguments, 1)) } if (!_.isFunction(func)) { throw new TypeError() }
        args = slice.call(arguments, 2);
        bound = function() { if (!(this instanceof bound)) { return func.apply(context, args.concat(slice.call(arguments))) } var ctor = {};
            ctor.prototype = func.prototype; var self = new ctor();
            ctor.prototype = null; var result = func.apply(self, args.concat(slice.call(arguments))); if (Object(result) === result) { return result } return self }; return bound };
    _.bind_instance_methods = function(obj) { for (var func in obj) { if (typeof obj[func] === "function") { obj[func] = _.bind(obj[func], obj) } } };
    _.each = function(obj, iterator, context) { if (obj === null || obj === undefined) { return } if (nativeForEach && obj.forEach === nativeForEach) { obj.forEach(iterator, context) } else { if (obj.length === +obj.length) { for (var i = 0, l = obj.length; i < l; i++) { if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) { return } } } else { for (var key in obj) { if (hasOwnProperty.call(obj, key)) { if (iterator.call(context, obj[key], key, obj) === breaker) { return } } } } } };
    _.escapeHTML = function(s) { var escaped = s; if (escaped && _.isString(escaped)) { escaped = escaped.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") } return escaped };
    _.extend = function(obj) { _.each(slice.call(arguments, 1), function(source) { for (var prop in source) { if (source[prop] !== void 0) { obj[prop] = source[prop] } } }); return obj };
    _.deepMerge = function(obj1, obj2) { var key; for (key in obj2) { obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ? _.deepMerge(obj1[key], obj2[key]) : obj1[key] = obj2[key] } return obj1 };
    _.isArray = nativeIsArray || function(obj) { return Object.prototype.toString.apply(obj) === "[object Array]" };
    _.isFunction = function(f) { try { return (/^\s*\bfunction\b/.test(f)) } catch (x) { return false } };
    _.isArguments = function(obj) { return !!(obj && hasOwnProperty.call(obj, "callee")) };
    _.toArray = function(iterable) { if (!iterable) { return [] } if (iterable.toArray) { return iterable.toArray() } if (_.isArray(iterable)) { return slice.call(iterable) } if (_.isArguments(iterable)) { return slice.call(iterable) } return _.values(iterable) };
    _.values = function(obj) { var results = []; if (obj === null) { return results }
        _.each(obj, function(value) { results[results.length] = value }); return results };
    _.identity = function(value) { return value };
    _.include = function(obj, target) { var found = false; if (obj === null) { return found } if (nativeIndexOf && obj.indexOf === nativeIndexOf) { return obj.indexOf(target) != -1 }
        _.each(obj, function(value) { if (found || (found = value === target)) { return breaker } }); return found };
    _.includes = function(str, needle) { return str.indexOf(needle) !== -1 };
    _.inherit = function(subclass, superclass) { subclass.prototype = new superclass();
        subclass.prototype.constructor = subclass;
        subclass.superclass = superclass.prototype; return subclass };
    _.isObject = function(obj) { return obj === Object(obj) && !_.isArray(obj) };
    _.isEmptyObject = function(obj) { if (_.isObject(obj)) { for (var key in obj) { if (hasOwnProperty.call(obj, key)) { return false } } return true } return false };
    _.isUndefined = function(obj) { return obj === void 0 };
    _.isString = function(obj) { return Object.prototype.toString.call(obj) == "[object String]" };
    _.isDate = function(obj) { return toString.call(obj) == "[object Date]" };
    _.isNumber = function(obj) { return toString.call(obj) == "[object Number]" };
    _.isElement = function(obj) { return !!(obj && obj.nodeType === 1) };
    _.encodeDates = function(obj) { _.each(obj, function(v, k) { if (_.isDate(v)) { obj[k] = _.formatDate(v) } else { if (_.isObject(v)) { obj[k] = _.encodeDates(v) } } }); return obj };
    _.timestamp = function() { Date.now = Date.now || function() { return +new Date() }; return Date.now() };
    _.formatDate = function(d) {
        function pad(n) { return n < 10 ? "0" + n : n } return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) };
    _.safewrap = function(f) { return function() { try { return f.apply(this, arguments) } catch (e) { console.critical("Implementation error. Please contact support@DATracker.com.") } } };
    _.safewrap_class = function(klass, functions) { for (var i = 0; i < functions.length; i++) { klass.prototype[functions[i]] = _.safewrap(klass.prototype[functions[i]]) } };
    _.safewrap_instance_methods = function(obj) { for (var func in obj) { if (typeof obj[func] === "function") { obj[func] = _.safewrap(obj[func]) } } };
    _.strip_empty_properties = function(p) { var ret = {};
        _.each(p, function(v, k) { if (_.isString(v) && v.length > 0) { ret[k] = v } }); return ret };
    _.truncate = function(obj, length) {
        var ret;
        if (typeof obj === "string") { ret = obj.slice(0, length) } else {
            if (_.isArray(obj)) { ret = [];
                _.each(obj, function(val) { ret.push(_.truncate(val, length)) }) } else {
                if (_.isObject(obj)) {
                    ret = {};
                    _.each(obj, function(val, key) {
                        ret[key] = _.truncate(val, length)
                    })
                } else { ret = obj }
            }
        }
        return ret
    };
    _.JSONEncode = function() { return function(mixed_val) { var value = mixed_val; var quote = function(string) { var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; var meta = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" };
                escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function(a) { var c = meta[a]; return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + string + '"' }; var str = function(key, holder) { var gap = ""; var indent = "    "; var i = 0; var k = ""; var v = ""; var length = 0; var mind = gap; var partial = []; var value = holder[key]; if (value && typeof value === "object" && typeof value.toJSON === "function") { value = value.toJSON(key) } switch (typeof value) {
                    case "string":
                        return quote(value);
                    case "number":
                        return isFinite(value) ? String(value) : "null";
                    case "boolean":
                    case "null":
                        return String(value);
                    case "object":
                        if (!value) { return "null" }
                        gap += indent;
                        partial = []; if (toString.apply(value) === "[object Array]") { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || "null" }
                            v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                            gap = mind; return v } for (k in value) { if (hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ": " : ":") + v) } } }
                        v = partial.length === 0 ? "{}" : gap ? "{" + partial.join(",") + "" + mind + "}" : "{" + partial.join(",") + "}";
                        gap = mind; return v } }; return str("", { "": value }) } }();
    _.JSONDecode = function() { var at, ch, escapee = { '"': '"', "\\": "\\", "/": "/", "b": "\b", "f": "\f", "n": "\n", "r": "\r", "t": "\t" },
            text, error = function(m) { throw { name: "SyntaxError", message: m, at: at, text: text } },
            next = function(c) { if (c && c !== ch) { error("Expected '" + c + "' instead of '" + ch + "'") }
                ch = text.charAt(at);
                at += 1; return ch },
            number = function() { var number, string = ""; if (ch === "-") { string = "-";
                    next("-") } while (ch >= "0" && ch <= "9") { string += ch;
                    next() } if (ch === ".") { string += "."; while (next() && ch >= "0" && ch <= "9") { string += ch } } if (ch === "e" || ch === "E") { string += ch;
                    next(); if (ch === "-" || ch === "+") { string += ch;
                        next() } while (ch >= "0" && ch <= "9") { string += ch;
                        next() } }
                number = +string; if (!isFinite(number)) { error("Bad number") } else { return number } },
            string = function() { var hex, i, string = "",
                    uffff; if (ch === '"') { while (next()) { if (ch === '"') { next(); return string } if (ch === "\\") { next(); if (ch === "u") { uffff = 0; for (i = 0; i < 4; i += 1) { hex = parseInt(next(), 16); if (!isFinite(hex)) { break }
                                    uffff = uffff * 16 + hex }
                                string += String.fromCharCode(uffff) } else { if (typeof escapee[ch] === "string") { string += escapee[ch] } else { break } } } else { string += ch } } }
                error("Bad string") },
            white = function() { while (ch && ch <= " ") { next() } },
            word = function() { switch (ch) {
                    case "t":
                        next("t");
                        next("r");
                        next("u");
                        next("e"); return true;
                    case "f":
                        next("f");
                        next("a");
                        next("l");
                        next("s");
                        next("e"); return false;
                    case "n":
                        next("n");
                        next("u");
                        next("l");
                        next("l"); return null }
                error('Unexpected "' + ch + '"') },
            value, array = function() { var array = []; if (ch === "[") { next("[");
                    white(); if (ch === "]") { next("]"); return array } while (ch) { array.push(value());
                        white(); if (ch === "]") { next("]"); return array }
                        next(",");
                        white() } }
                error("Bad array") },
            object = function() { var key, object = {}; if (ch === "{") { next("{");
                    white(); if (ch === "}") { next("}"); return object } while (ch) { key = string();
                        white();
                        next(":"); if (Object.hasOwnProperty.call(object, key)) { error('Duplicate key "' + key + '"') }
                        object[key] = value();
                        white(); if (ch === "}") { next("}"); return object }
                        next(",");
                        white() } }
                error("Bad object") };
        value = function() { white(); switch (ch) {
                case "{":
                    return object();
                case "[":
                    return array();
                case '"':
                    return string();
                case "-":
                    return number();
                default:
                    return ch >= "0" && ch <= "9" ? number() : word() } }; return function(source) { var result;
            text = source;
            at = 0;
            ch = " ";
            result = value();
            white(); if (ch) { error("Syntax error") } return result } }();
    _.base64Encode = function(data) { var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = "",
            tmp_arr = []; if (!data) { return data }
        data = _.utf8Encode(data);
        do { o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 63;
            h2 = bits >> 12 & 63;
            h3 = bits >> 6 & 63;
            h4 = bits & 63;
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4) } while (i < data.length);
        enc = tmp_arr.join(""); switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + "=="; break;
            case 2:
                enc = enc.slice(0, -1) + "="; break } return enc };
    _.utf8Encode = function(string) { string = (string + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n"); var utftext = "",
            start, end; var stringl = 0,
            n;
        start = end = 0;
        stringl = string.length; for (n = 0; n < stringl; n++) { var c1 = string.charCodeAt(n); var enc = null; if (c1 < 128) { end++ } else { if (c1 > 127 && c1 < 2048) { enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128) } else { enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128) } } if (enc !== null) { if (end > start) { utftext += string.substring(start, end) }
                utftext += enc;
                start = end = n + 1 } } if (end > start) { utftext += string.substring(start, string.length) } return utftext };
    _.sha1 = function(str) {
        var hexcase = 0;
        var b64pad = "";
        var chrsz = 8;

        function hex_sha1(s) {
            return binb2hex(core_sha1(str2binb(s), s.length * chrsz))
        }

        function b64_sha1(s) { return binb2b64(core_sha1(str2binb(s), s.length * chrsz)) }

        function str_sha1(s) { return binb2str(core_sha1(str2binb(s), s.length * chrsz)) }

        function hex_hmac_sha1(key, data) { return binb2hex(core_hmac_sha1(key, data)) }

        function b64_hmac_sha1(key, data) { return binb2b64(core_hmac_sha1(key, data)) }

        function str_hmac_sha1(key, data) { return binb2str(core_hmac_sha1(key, data)) }

        function sha1_vm_test() { return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d" }

        function core_sha1(x, len) { x[len >> 5] |= 128 << 24 - len % 32;
            x[(len + 64 >> 9 << 4) + 15] = len; var w = Array(80); var a = 1732584193; var b = -271733879; var c = -1732584194; var d = 271733878; var e = -1009589776; for (var i = 0; i < x.length; i += 16) { var olda = a; var oldb = b; var oldc = c; var oldd = d; var olde = e; for (var j = 0; j < 80; j++) { if (j < 16) { w[j] = x[i + j] } else { w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1) } var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
                    e = d;
                    d = c;
                    c = rol(b, 30);
                    b = a;
                    a = t }
                a = safe_add(a, olda);
                b = safe_add(b, oldb);
                c = safe_add(c, oldc);
                d = safe_add(d, oldd);
                e = safe_add(e, olde) } return Array(a, b, c, d, e) }

        function sha1_ft(t, b, c, d) { if (t < 20) { return b & c | ~b & d } if (t < 40) { return b ^ c ^ d } if (t < 60) { return b & c | b & d | c & d } return b ^ c ^ d }

        function sha1_kt(t) { return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514 }

        function core_hmac_sha1(key, data) { var bkey = str2binb(key); if (bkey.length > 16) { bkey = core_sha1(bkey, key.length * chrsz) } var ipad = Array(16),
                opad = Array(16); for (var i = 0; i < 16; i++) { ipad[i] = bkey[i] ^ 909522486;
                opad[i] = bkey[i] ^ 1549556828 } var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz); return core_sha1(opad.concat(hash), 512 + 160) }

        function safe_add(x, y) { var lsw = (x & 65535) + (y & 65535); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return msw << 16 | lsw & 65535 }

        function rol(num, cnt) { return num << cnt | num >>> 32 - cnt }

        function str2binb(str) { var bin = Array(); var mask = (1 << chrsz) - 1; for (var i = 0; i < str.length * chrsz; i += chrsz) { bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << 24 - i % 32 } return bin }

        function binb2str(bin) { var str = ""; var mask = (1 << chrsz) - 1; for (var i = 0; i < bin.length * 32; i += chrsz) { str += String.fromCharCode(bin[i >> 5] >>> 24 - i % 32 & mask) } return str }

        function binb2hex(binarray) { var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var str = ""; for (var i = 0; i < binarray.length * 4; i++) { str += hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 + 4 & 15) + hex_tab.charAt(binarray[i >> 2] >> (3 - i % 4) * 8 & 15) } return str }

        function binb2b64(binarray) { var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var str = ""; for (var i = 0; i < binarray.length * 4; i += 3) { var triplet = (binarray[i >> 2] >> 8 * (3 - i % 4) & 255) << 16 | (binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4) & 255) << 8 | binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4) & 255; for (var j = 0; j < 4; j++) { if (i * 8 + j * 6 > binarray.length * 32) { str += b64pad } else { str += tab.charAt(triplet >> 6 * (3 - j) & 63) } } } return str }
        return hex_sha1(str)
    };
    _.UUID = function() { var callback = function() { return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) { var r = Math.random() * 16 | 0,
                    v = c == "x" ? r : r & 3 | 8; return v.toString(16) }) }; return callback }();
    _.isBlockedUA = function(ua) { if (/(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(ua)) { return true } return false };
    _.HTTPBuildQuery = function(formdata, arg_separator) { var use_val, use_key, tmp_arr = []; if (_.isUndefined(arg_separator)) { arg_separator = "&" }
        _.each(formdata, function(val, key) { use_val = encodeURIComponent(val.toString());
            use_key = encodeURIComponent(key);
            tmp_arr[tmp_arr.length] = use_key + "=" + use_val }); return tmp_arr.join(arg_separator) };
    _.getQueryParam = function(url, param) { param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var regexS = "[\\?&]" + param + "=([^&#]*)",
            regex = new RegExp(regexS),
            results = regex.exec(url); if (results === null || results && typeof results[1] !== "string" && results[1].length) { return "" } else { return decodeURIComponent(results[1]).replace(/\+/g, " ") } };
    _.getHashParam = function(hash, param) { var matches = hash.match(new RegExp(param + "=([^&]*)")); return matches ? matches[1] : null };
    _.cookie = {
        get: function(name) { var nameEQ = name + "="; var ca = document$1.cookie.split(";"); for (var i = 0; i < ca.length; i++) { var c = ca[i]; while (c.charAt(0) == " ") { c = c.substring(1, c.length) } if (c.indexOf(nameEQ) === 0) { return decodeURIComponent(c.substring(nameEQ.length, c.length)) } } return null },
        parse: function(name) { var cookie; try { cookie = _.JSONDecode(_.cookie.get(name)) || {} } catch (err) {} return cookie },
        set_seconds: function(name, value, seconds, cross_subdomain, is_secure) { var cdomain = "",
                expires = "",
                secure = ""; if (cross_subdomain) { var matches = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                    domain = matches ? matches[0] : "";
                cdomain = domain ? "; domain=." + domain : "" } if (seconds) { var date = new Date();
                date.setTime(date.getTime() + seconds * 1000);
                expires = "; expires=" + date.toGMTString() } if (is_secure) { secure = "; secure" }
            document$1.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/" + cdomain + secure },
        set: function(name, value, days, cross_subdomain, is_secure) {
            var cdomain = "",
                expires = "",
                secure = "";
            if (cross_subdomain) {
                var matches = document$1.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i),
                    domain = matches ? matches[0] : "";
                cdomain = domain ? "; domain=." + domain : ""
            }
            if (days) { var date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = "; expires=" + date.toGMTString() }
            if (is_secure) { secure = "; secure" }
            var new_cookie_val = name + "=" + encodeURIComponent(value) + expires + "; path=/" + cdomain + secure;
            document$1.cookie = new_cookie_val;
            return new_cookie_val
        },
        remove: function(name, cross_subdomain) { _.cookie.set(name, "", -1, cross_subdomain) }
    };
    _.localStorage = { error: function(msg) { console.error("localStorage error: " + msg) }, get: function(name) { try { return window.localStorage.getItem(name) } catch (err) { _.localStorage.error(err) } return null }, parse: function(name) { try { return _.JSONDecode(_.localStorage.get(name)) || {} } catch (err) {} return null }, set: function(name, value) { try { window.localStorage.setItem(name, value) } catch (err) { _.localStorage.error(err) } }, remove: function(name) { try { window.localStorage.removeItem(name) } catch (err) { _.localStorage.error(err) } } };
    _.register_event = function() { var register_event = function(element, type, handler, oldSchool, useCapture) { if (!element) { console.error("No valid element provided to register_event"); return } if (element.addEventListener && !oldSchool) { element.addEventListener(type, handler, !!useCapture) } else { var ontype = "on" + type; var old_handler = element[ontype];
                element[ontype] = makeHandler(element, handler, old_handler) } };

        function makeHandler(element, new_handler, old_handlers) { var handler = function(event) { event = event || fixEvent(window.event); if (!event) { return undefined } var ret = true; var old_result, new_result; if (_.isFunction(old_handlers)) { old_result = old_handlers(event) }
                new_result = new_handler.call(element, event); if (false === old_result || false === new_result) { ret = false } return ret }; return handler }

        function fixEvent(event) { if (event) { event.preventDefault = fixEvent.preventDefault;
                event.stopPropagation = fixEvent.stopPropagation } return event }
        fixEvent.preventDefault = function() { this.returnValue = false };
        fixEvent.stopPropagation = function() { this.cancelBubble = true }; return register_event }();
    _.register_hash_event = function(callback) { _.register_event(window, "hashchange", callback) };
    _.dom_query = function() {
        function getAllChildren(e) { return e.all ? e.all : e.getElementsByTagName("*") }
        var bad_whitespace = /[\t\r\n]/g;

        function hasClass(elem, selector) { var className = " " + selector + " "; return (" " + elem.className + " ").replace(bad_whitespace, " ").indexOf(className) >= 0 }

        function getElementsBySelector(selector) {
            if (!document$1.getElementsByTagName) { return [] }
            var tokens = selector.split(" ");
            var token, bits, tagName, found, foundCount, i, j, k, elements, currentContextIndex;
            var currentContext = [document$1];
            for (i = 0; i < tokens.length; i++) {
                token = tokens[i].replace(/^\s+/, "").replace(/\s+$/, "");
                if (token.indexOf("#") > -1) { bits = token.split("#");
                    tagName = bits[0]; var id = bits[1]; var element = document$1.getElementById(id); if (!element || tagName && element.nodeName.toLowerCase() != tagName) { return [] }
                    currentContext = [element]; continue }
                if (token.indexOf(".") > -1) { bits = token.split(".");
                    tagName = bits[0]; var className = bits[1]; if (!tagName) { tagName = "*" }
                    found = [];
                    foundCount = 0; for (j = 0; j < currentContext.length; j++) { if (tagName == "*") { elements = getAllChildren(currentContext[j]) } else { elements = currentContext[j].getElementsByTagName(tagName) } for (k = 0; k < elements.length; k++) { found[foundCount++] = elements[k] } }
                    currentContext = [];
                    currentContextIndex = 0; for (j = 0; j < found.length; j++) { if (found[j].className && _.isString(found[j].className) && hasClass(found[j], className)) { currentContext[currentContextIndex++] = found[j] } } continue }
                var token_match = token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/);
                if (token_match) { tagName = token_match[1]; var attrName = token_match[2]; var attrOperator = token_match[3]; var attrValue = token_match[4]; if (!tagName) { tagName = "*" }
                    found = [];
                    foundCount = 0; for (j = 0; j < currentContext.length; j++) { if (tagName == "*") { elements = getAllChildren(currentContext[j]) } else { elements = currentContext[j].getElementsByTagName(tagName) } for (k = 0; k < elements.length; k++) { found[foundCount++] = elements[k] } }
                    currentContext = [];
                    currentContextIndex = 0; var checkFunction; switch (attrOperator) {
                        case "=":
                            checkFunction = function(e) { return e.getAttribute(attrName) == attrValue }; break;
                        case "~":
                            checkFunction = function(e) { return e.getAttribute(attrName).match(new RegExp("\\b" + attrValue + "\\b")) }; break;
                        case "|":
                            checkFunction = function(e) { return e.getAttribute(attrName).match(new RegExp("^" + attrValue + "-?")) }; break;
                        case "^":
                            checkFunction = function(e) { return e.getAttribute(attrName).indexOf(attrValue) === 0 }; break;
                        case "$":
                            checkFunction = function(e) { return e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length }; break;
                        case "*":
                            checkFunction = function(e) { return e.getAttribute(attrName).indexOf(attrValue) > -1 }; break;
                        default:
                            checkFunction = function(e) { return e.getAttribute(attrName) } }
                    currentContext = [];
                    currentContextIndex = 0; for (j = 0; j < found.length; j++) { if (checkFunction(found[j])) { currentContext[currentContextIndex++] = found[j] } } continue }
                tagName = token;
                found = [];
                foundCount = 0;
                for (j = 0; j < currentContext.length; j++) { elements = currentContext[j].getElementsByTagName(tagName); for (k = 0; k < elements.length; k++) { found[foundCount++] = elements[k] } }
                currentContext = found
            }
            return currentContext
        }
        return function(query) { if (_.isElement(query)) { return [query] } else { if (_.isObject(query) && !_.isUndefined(query.length)) { return query } else { return getElementsBySelector.call(this, query) } } }
    }();
    _.info = { referringDomain: function(referrer) { var split = referrer.split("/"); if (split.length >= 3) { return split[2] } return "" }, properties: function() { var windowsOs = { "5.0": "Win2000", "5.1": "WinXP", "5.2": "Win2003", "6.0": "WindowsVista", "6.1": "Win7", "6.2": "Win8", "6.3": "Win8.1", "10.0": "Win10" }; var devicePlatform = Device.devicePlatform() || "web"; var deviceModel = Device.deviceModel(); var isWindows = Device.windows(); var deviceOsVersion = detector.os.name + " " + detector.os.fullVersion; if (isWindows) { if (windowsOs[detector.os.fullVersion]) { deviceOsVersion = windowsOs[detector.os.fullVersion] } } return _.extend(_.strip_empty_properties({ "deviceModel": deviceModel, "deviceOs": detector.os.name, "deviceOsVersion": deviceOsVersion, "browser": detector.browser.name, "referrer": document$1.referrer, "referring_domain": _.info.referringDomain(document$1.referrer), "devicePlatform": devicePlatform, "currentDomain": _.info.referringDomain(window.location.href) }), { "current_url": window.location.href, "title": document$1.title || "", "url_path": window.location.pathname || "", "browser_version": detector.browser.fullVersion, "screen_height": screen.height, "screen_width": screen.width, "hb_lib": devicePlatform, "lib_version": Config.LIB_VERSION }) } };
    _.size = function(obj) { var size = 0,
            key; for (key in obj) { if (obj.hasOwnProperty(key)) { size++ } } return size };
    _.isJSONString = function(str) { try { JSON.parse(str) } catch (e) { return false } return true };
    _.get_host = function(url) { var host = ""; if (typeof url === "undefined" || url === null) { url = window.location.href } var regex = /.*\:\/\/([^\/]*).*/; var match = url.match(regex); if (typeof match !== "undefined" && match !== null) { host = match[1] } return host };
    _.sessionStorage = { isSupport: function() { var supported = true; var key = "__hubbledatasupport__"; var val = "testIsSupportStorage"; try { if (sessionStorage && sessionStorage.setItem) { sessionStorage.setItem(key, val);
                    sessionStorage.removeItem(key, val);
                    supported = true } else { supported = false } } catch (e) { supported = false } return supported } };
    _.loadScript = function(para) { para = _.extend({ success: function() {}, error: function() {}, appendCall: function(g) { document$1.getElementsByTagName("head")[0].appendChild(g) } }, para); var g = null; if (para.type === "css") { g = document$1.createElement("link");
            g.rel = "stylesheet";
            g.href = para.url } if (para.type === "js") { g = document$1.createElement("script");
            g.async = "async";
            g.setAttribute("charset", "UTF-8");
            g.src = para.url;
            g.type = "text/javascript" }
        g.onload = g.onreadystatechange = function() { if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") { para.success();
                g.onload = g.onreadystatechange = null } };
        g.onerror = function() { para.error();
            g.onerror = null };
        para.appendCall(g) };
    _.ry = function(dom) { return new _.ry.init(dom) };
    _.ry.init = function(dom) { this.ele = dom };
    _.ry.init.prototype = {
        addClass: function(para) { var classes = " " + this.ele.className + " "; if (classes.indexOf(" " + para + " ") === -1) { this.ele.className = this.ele.className + (this.ele.className === "" ? "" : " ") + para } return this },
        removeClass: function(para) { var classes = " " + this.ele.className + " "; if (classes.indexOf(" " + para + " ") !== -1) { this.ele.className = classes.replace(" " + para + " ", " ").slice(1, -1) } return this },
        hasClass: function(para) { var classes = " " + this.ele.className + " "; if (classes.indexOf(" " + para + " ") !== -1) { return true } else { return false } },
        attr: function(key, value) { if (typeof key === "string" && _.isUndefined(value)) { return this.ele.getAttribute(key) } if (typeof key === "string") { value = String(value);
                this.ele.setAttribute(key, value) } return this },
        offset: function() { var rect = this.ele.getBoundingClientRect(); if (rect.width || rect.height) { var doc = this.ele.ownerDocument; var docElem = doc.documentElement; return { top: rect.top + window.pageYOffset - docElem.clientTop, left: rect.left + window.pageXOffset - docElem.clientLeft } } else { return { top: 0, left: 0 } } },
        getSize: function() { if (!window.getComputedStyle) { return { width: this.ele.offsetWidth, height: this.ele.offsetHeight } } try { var bounds = this.ele.getBoundingClientRect(); return { width: bounds.width, height: bounds.height } } catch (e) { return { width: 0, height: 0 } } },
        getStyle: function(value) { if (this.ele.currentStyle) { return this.ele.currentStyle[value] } else { return this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(value) } },
        wrap: function(elementTagName) { var ele = document$1.createElement(elementTagName);
            this.ele.parentNode.insertBefore(ele, this.ele);
            ele.appendChild(this.ele); return _.ry(ele) },
        getCssStyle: function(prop) { var result = this.ele.style.getPropertyValue(prop); if (result) { return result } var rules = null; if (typeof window.getMatchedCSSRules === "function") { rules = getMatchedCSSRules(this.ele) } if (!rules || !_.isArray(rules)) { return null } for (var i = rules.length - 1; i >= 0; i--) { var r = rules[i];
                result = r.style.getPropertyValue(prop); if (result) { return result } } },
        sibling: function(cur, dir) { while ((cur = cur[dir]) && cur.nodeType !== 1) {} return cur },
        next: function() {
            return this.sibling(this.ele, "nextSibling")
        },
        prev: function(elem) { return this.sibling(this.ele, "previousSibling") },
        siblings: function(elem) { return this.siblings((this.ele.parentNode || {}).firstChild, this.ele) },
        children: function(elem) { return this.siblings(this.ele.firstChild) },
        parent: function() { var parent = this.ele.parentNode;
            parent = parent && parent.nodeType !== 11 ? parent : null; return _.ry(parent) }
    };
    _.addEvent = function() {
        function fixEvent(event) { if (event) { event.preventDefault = fixEvent.preventDefault;
                event.stopPropagation = fixEvent.stopPropagation;
                event._getPath = fixEvent._getPath } return event }
        fixEvent._getPath = function() { var ev = this; var polyfill = function() { try { var element = ev.target; var pathArr = [element]; if (element === null || element.parentElement === null) { return [] } while (element.parentElement !== null) { element = element.parentElement;
                        pathArr.unshift(element) } return pathArr } catch (err) { return [] } }; return this.path || this.composedPath && this.composedPath() || polyfill() };
        fixEvent.preventDefault = function() { this.returnValue = false };
        fixEvent.stopPropagation = function() { this.cancelBubble = true }; var register_event = function(element, type, handler) { if (element && element.addEventListener) { element.addEventListener(type, function(e) { e._getPath = fixEvent._getPath;
                    handler.call(this, e) }, false) } else { var ontype = "on" + type; var old_handler = element[ontype];
                element[ontype] = makeHandler(element, handler, old_handler) } };

        function makeHandler(element, new_handler, old_handlers) { var handler = function(event) { event = event || fixEvent(window.event); if (!event) { return undefined }
                event.target = event.srcElement; var ret = true; var old_result, new_result; if (typeof old_handlers === "function") { old_result = old_handlers(event) }
                new_result = new_handler.call(element, event); if (false === old_result || false === new_result) { ret = false } return ret }; return handler }
        register_event.apply(null, arguments) };
    _.getEleInfo = function(obj, heatmapConfig, context) { if (!obj.target || !heatmapConfig) { return false } var target = obj.target; var tagName = target.tagName.toLowerCase(); var props = {};
        props.type = tagName; var textContent = ""; if (target.textContent) { textContent = _.trim(target.textContent) } else { if (target.innerText) { textContent = _.trim(target.innerText) } } if (textContent) { textContent = textContent.replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255) }
        props.text = textContent || ""; if (tagName === "input") { if (target.type === "button" || target.type === "submit") { props.text = target.value || "" } else { if (heatmapConfig && typeof heatmapConfig.collect_input === "function" && heatmapConfig.collect_input(target, context)) { props.text = target.value || "" } } }
        props = _.strip_empty_properties(props); return props };
    _.ajax = { post: function(url, options, callback, timeout) { var that = this;
            that.callback = callback || function(params) {}; try { var req = new XMLHttpRequest();
                req.open("POST", url, true);
                req.setRequestHeader("Content-type", "application/json");
                req.withCredentials = true;
                req.ontimeout = function() { that.callback({ status: 0, error: true, message: "request " + url + " time out" }) };
                req.onreadystatechange = function() { if (req.readyState === 4) { if (req.status === 200) { that.callback(_.JSONDecode(req.responseText)) } else { var message = "Bad HTTP status: " + req.status + " " + req.statusText;
                            that.callback({ status: 0, error: true, message: message }) } } };
                req.timeout = timeout || 5000;
                req.send(_.JSONEncode(options)) } catch (e) {} }, get: function(url, callback) { try { var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.withCredentials = true;
                req.onreadystatechange = function() { if (req.readyState === 4) { if (req.status === 200) { if (callback) { callback(_.JSONDecode(req.responseText)) } } else { if (callback) { var message = "Bad HTTP status: " + req.status + " " + req.statusText;
                                callback({ status: 0, error: true, message: message }) } } } };
                req.send(null) } catch (e) {} } };
    _.innerEvent = { on: function(key, fn) { if (!this._list) { this._list = {} } if (!this._list[key]) { this._list[key] = [] }
            this._list[key].push(fn) }, off: function(key) { if (!this._list) { this._list = {} } if (!this._list[key]) { return } else { delete this._list[key] } }, trigger: function() { var args = Array.prototype.slice.call(arguments); var key = args[0]; var arrFn = this._list && this._list[key]; if (!arrFn || arrFn.length === 0) { return } for (var i = 0; i < arrFn.length; i++) { if (typeof arrFn[i] == "function") { arrFn[i].apply(this, args) } } } };
    _["toArray"] = _.toArray;
    _["isObject"] = _.isObject;
    _["JSONEncode"] = _.JSONEncode;
    _["JSONDecode"] = _.JSONDecode;
    _["isBlockedUA"] = _.isBlockedUA;
    _["isEmptyObject"] = _.isEmptyObject;
    _["info"] = _.info;
    _["info"]["properties"] = _.info.properties;
    _["sessionStorage"] = _.sessionStorage;
    _["sessionStorage"]["isSupport"] = _.sessionStorage.isSupport;
    _["loadScript"] = _.loadScript;
    _["ry"] = _.ry;
    _["addEvent"] = _.addEvent;
    _["getEleInfo"] = _.getEleInfo;
    _["ajax"] = _.ajax;

    function app_js_bridge(instance) {
        var app_info = null;
        var todo = null;
        var DATracker = instance || {};

        function setAppInfo(data) { app_info = data; if (_.isJSONString(app_info)) { app_info = JSON.parse(app_info) } if (todo) { todo(app_info) } }

        function getAndroidData() {
            if (typeof window.HubbleData_APP_JS_Bridge === "object") {
                if (window.HubbleData_APP_JS_Bridge.hubbledata_call_app) {
                    DATracker["pageOpenScene"] = "App";
                    app_info = HubbleData_APP_JS_Bridge.hubbledata_call_app();
                    if (_.isJSONString(app_info)) {
                        app_info = JSON.parse(app_info)
                    }
                }
            }
        }
        window.hubbledata_app_js_bridge_call_js = function(data) { setAppInfo(data) };

        function calliOSData() { if (/hubbledata-sdk-ios/.test(navigator.userAgent)) { DATracker["pageOpenScene"] = "App"; var iframe = document.createElement("iframe");
                iframe.setAttribute("src", "hubbledata://getAppInfo");
                document.documentElement.appendChild(iframe);
                iframe.parentNode.removeChild(iframe);
                iframe = null } }

        function iOS_hubbledata_track(data) { var iframe = document.createElement("iframe");
            iframe.setAttribute("src", "hubbledata://trackEvent?event=" + encodeURIComponent(data));
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null }
        var getAppStatus = function(func) { calliOSData();
            getAndroidData(); if (!func) { return app_info } else { if (app_info === null) { todo = func } else { func(app_info) } } };
        var getSendCall = function(data, event_name, callback, jsTrack) { data = _.JSONDecode(data); if (!_.include(["da_session_close", "da_session_start", "da_activate", "da_u_login", "da_u_logout", "da_u_signup"], event_name)) { if (typeof window.HubbleData_APP_JS_Bridge === "object" && window.HubbleData_APP_JS_Bridge.hubbledata_track) { DATracker["pageOpenScene"] = "App";
                    data["pageOpenScene"] = "App";
                    data = _.JSONEncode(data);
                    window.HubbleData_APP_JS_Bridge.hubbledata_track(data);
                    typeof callback === "function" && callback() } else { if (/hubbledata-sdk-ios/.test(navigator.userAgent)) { DATracker["pageOpenScene"] = "App";
                        data["pageOpenScene"] = "App";
                        data = _.JSONEncode(data);
                        iOS_hubbledata_track(data);
                        typeof callback === "function" && callback() } else { typeof jsTrack === "function" && jsTrack();
                        typeof callback === "function" && callback() } } } else { typeof jsTrack === "function" && jsTrack();
                typeof callback === "function" && callback() } };
        return { getAppStatus: getAppStatus, getSendCall: getSendCall }
    }
    var campaign = { data: { campaign: { utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "", promotional_id: "" }, isCampaign: false, isAdClick: false, campaignParamsSaved: false, APPKEY: "" }, init: function(APPKEY, instance) { if (typeof APPKEY === "undefined") { return }
            this.data.APPKEY = APPKEY;
            this.DATracker = instance;
            this.checkCampaign();
            this.checkAdClick();
            this.setParams(); if (this.data.isCampaign) { this.save() } }, campaignParams: function() { var campaign_keywords = "utm_source utm_medium utm_campaign utm_content utm_term promotional_id".split(" "),
                kw = "",
                params = {};
            _.each(campaign_keywords, function(kwkey) { kw = _.getQueryParam(document.URL, kwkey); if (kw.length) { params[kwkey] = kw } }); return params }, setParams: function() { var params = {}; if (this.data.isCampaign) { params = this.campaignParams() } else { var cookie = _.cookie.get("hb_" + this.data.APPKEY + "_u"); if (cookie) { params = _.JSONDecode(cookie) } }
            this.data.campaign = _.extend(this.data.campaign, params) }, getParams: function() { this.setParams(); return this.changeParams() }, checkCampaign: function() { var params = this.campaignParams(); if (typeof params.utm_source !== "undefined" && typeof params.utm_medium !== "undefined" && typeof params.utm_campaign !== "undefined") { this.data.isCampaign = true } }, checkAdClick: function() { var t_rs = _.getQueryParam(document.URL, "t_rs"); if (this.data.isCampaign) { if (document.referrer && !t_rs) { this.data.isAdClick = true } } }, save: function() { if (!this.data.campaignParamsSaved) { _.cookie.set("hb_" + this.data.APPKEY + "_u", _.JSONEncode(this.data.campaign), 30, this.DATracker.get_config("cross_subdomain_cookie"));
                this.data.campaignParamsSaved = true } }, changeParams: function() { var campaign = this.data.campaign; var turnParams = { utmSource: campaign.utm_source, utmMedium: campaign.utm_medium, promotionalID: campaign.promotional_id, utmCampaign: campaign.utm_campaign, utmContent: campaign.utm_content, utmTerm: campaign.utm_term }; if (!turnParams.utmSource) { delete turnParams.utmSource } if (!turnParams.utmMedium) { delete turnParams.utmMedium } if (!turnParams.promotionalID) { delete turnParams.promotionalID } if (!turnParams.utmCampaign) { delete turnParams.utmCampaign } if (!turnParams.utmContent) { delete turnParams.utmContent } if (!turnParams.utmTerm) { delete turnParams.utmTerm } return turnParams } };

    function on(obj, event, callFn) { if (obj[event]) { var fn = obj[event];
            obj[event] = function() { var args = Array.prototype.slice.call(arguments);
                callFn.apply(this, args);
                fn.apply(this, args) } } else { obj[event] = function() { var args = Array.prototype.slice.call(arguments);
                callFn.apply(this, args) } } }

    function getPath() { return location.pathname + location.search }
    var single_page = {
        config: { mode: "hash", track_replace_state: false, callback_fn: function() {} },
        init: function(config) { this.config = _.extend(this.config, config || {});
            this.path = getPath();
            this.event() },
        event: function() { var self = this; if (this.config.mode === "history") { if (!history.pushState || !window.addEventListener) { return }
                on(history, "pushState", _.bind(this.pushStateOverride, this));
                on(history, "replaceState", _.bind(this.replaceStateOverride, this));
                window.addEventListener("popstate", _.bind(this.handlePopState, this)) } else { if (this.config.mode === "hash") { _.register_hash_event(_.bind(this.handleHashState, this)) } } },
        pushStateOverride: function() { this.handleUrlChange(true) },
        replaceStateOverride: function() { this.handleUrlChange(false) },
        handlePopState: function() {
            this.handleUrlChange(true)
        },
        handleHashState: function() { this.handleUrlChange(true) },
        handleUrlChange: function(historyDidUpdate) { var self = this;
            setTimeout(function() { if (self.config.mode === "hash") { if (typeof self.config.callback_fn === "function") { self.config.callback_fn.call() } } else { if (self.config.mode === "history") { var oldPath = self.path; var newPath = getPath(); if (oldPath != newPath && self.shouldTrackUrlChange(newPath, oldPath)) { self.path = newPath; if (historyDidUpdate || self.config.track_replace_state) { if (typeof self.config.callback_fn === "function") { self.config.callback_fn.call() } } } } } }, 0) },
        shouldTrackUrlChange: function(newPath, oldPath) { return !!(newPath && oldPath) }
    };
    var source = { data: { secondLevelSource: "", outsideReferer: false, APPKEY: "" }, init: function(APPKEY) { if (typeof APPKEY === "undefined") { return }
            this.data.APPKEY = APPKEY;
            this.checkReferer();
            this.setParams();
            this.save() }, checkReferer: function() { if (document.referrer) { if (_.get_host(document.referrer) != window.location.host) { this.data.outsideReferer = true } } }, setParams: function() { var cookieSecondLevelSource = _.cookie.get("hb_" + this.data.APPKEY + "_source"); if (!cookieSecondLevelSource) { cookieSecondLevelSource = "" } if (this.data.outsideReferer) { cookieSecondLevelSource = _.get_host(document.referrer) }
            this.data.secondLevelSource = cookieSecondLevelSource }, save: function() { if (this.data.outsideReferer) { _.cookie.set("hb_" + this.data.APPKEY + "_source", this.data.secondLevelSource, 30, true) } }, getParams: function() { return { secondLevelSource: this.data.secondLevelSource } } };
    var heatmap = {
        getDomIndex: function(el) { var indexof = [].indexOf; if (!el.parentNode) { return -1 } var list = el.parentNode.children; if (!list) { return -1 } var len = list.length; if (indexof) { return indexof.call(list, el) } for (var i = 0; i < len; ++i) { if (el == list[i]) { return i } } return -1 },
        selector: function(el) { var i = el.parentNode && 9 == el.parentNode.nodeType ? -1 : this.getDomIndex(el); if (el.id) { return "#" + el.id } else { return el.tagName.toLowerCase() + (~i ? ":nth-child(" + (i + 1) + ")" : "") } },
        getDomSelector: function(el, arr) { if (!el || !el.parentNode || !el.parentNode.children) { return false }
            arr = arr && arr.join ? arr : []; var name = el.nodeName.toLowerCase(); if (!el || name === "body" || 1 != el.nodeType) { arr.unshift("body"); return arr.join(" > ") }
            arr.unshift(this.selector(el)); if (el.id) { return arr.join(" > ") } return this.getDomSelector(el.parentNode, arr) },
        na: function() { var a = document.documentElement.scrollLeft || window.pageXOffset; return parseInt(isNaN(a) ? 0 : a, 10) },
        i: function() { var a = 0; try { a = o.documentElement.scrollTop || m.pageYOffset, a = isNaN(a) ? 0 : a } catch (b) { a = 0 } return parseInt(a, 10) },
        getBrowserWidth: function() { var a = window.innerWidth || document.body.clientWidth; return isNaN(a) ? 0 : parseInt(a, 10) },
        getBrowserHeight: function() { var a = window.innerHeight || document.body.clientHeight; return isNaN(a) ? 0 : parseInt(a, 10) },
        getScrollWidth: function() { var a = parseInt(document.body.scrollWidth, 10); return isNaN(a) ? 0 : a },
        W: function(a) { var b = parseInt(+a.clientX + +this.na(), 10); var a = parseInt(+a.clientY + +this.i(), 10); return { x: isNaN(b) ? 0 : b, y: isNaN(a) ? 0 : a } },
        start: function(ev, target, tagName) { var heatmapConfig = this.DATracker.config.heatmap; var hasSetSelector = false; if (heatmapConfig && heatmapConfig.collect_element && !heatmapConfig.collect_element(target, this)) { return false } if (heatmapConfig && heatmapConfig.set_collect_element_path && _.isFunction(heatmapConfig.set_collect_element_path)) { hasSetSelector = true } var selector; if (hasSetSelector) { selector = heatmapConfig.set_collect_element_path(target, this); if (!selector) { console.error("无元素path"); return false } } else { selector = this.getDomSelector(target) } var prop = _.getEleInfo({ target: target }, heatmapConfig, this); var eventId;
            prop.path = selector ? selector : ""; if (heatmapConfig && heatmapConfig.custom_property) { var customP = heatmapConfig.custom_property(target); if (_.isObject(customP)) { prop = _.extend(prop, customP) } } if (tagName === "a" && heatmapConfig && heatmapConfig.isTrackLink === true) { eventId = _.sha1(prop.path);
                this.trackLink({ event: ev, target: target }, eventId, prop) } else { if (prop.path) { try { eventId = _.sha1(prop.path);
                        this.DATracker.track(eventId, prop, undefined, "auto") } catch (error) {} } } },
        trackLink: function(obj, eventId, eventProp) { obj = obj || {}; var link = null; var that = this; if (obj.ele) { link = obj.ele } if (obj.event) { if (obj.target) { link = obj.target } else { link = obj.event.target } }
            eventProp = eventProp || {}; if (!link || typeof link !== "object") { return false } if (!link.href || /^javascript/.test(link.href) || link.target || link.download || link.onclick) { that.DATracker.track(eventId, eventProp, undefined, "auto"); return false }

            function linkFunc(e) { e.stopPropagation();
                e.preventDefault(); var hasCalled = false;

                function track_a_click() { if (!hasCalled) { hasCalled = true;
                        location.href = link.href } }
                setTimeout(track_a_click, 1000);
                that.DATracker.track(eventId, eventProp, track_a_click, "auto") } if (obj.event) { linkFunc(obj.event) } },
        hasElement: function(e) { var path = e._getPath(); if (_.isArray(path) && path.length > 0) { for (var i = 0; i < path.length; i++) { if (path[i] && path[i].tagName && path[i].tagName.toLowerCase() === "a") { return path[i] } } } return false },
        trackHeatmap: function(target) {
            if (typeof target === "object" && target.tagName) {
                var tagName = target.tagName.toLowerCase();
                var parent_ele = target.parentNode.tagName.toLowerCase();
                if (tagName !== "button" && tagName !== "a" && parent_ele !== "a" && parent_ele !== "button" && tagName !== "input" && tagName !== "textarea") { this.start(null, target, tagName) }
            }
        },
        initHeatmap: function() { var that = this; var heatmapConfig = that.DATracker.config.heatmap; if (!_.isObject(heatmapConfig) || heatmapConfig.clickmap !== "default") { return false } if (_.isFunction(heatmapConfig.collect_url) && !heatmapConfig.collect_url()) { return false } if (heatmapConfig.collect_elements === "all") { heatmapConfig.collect_elements = "all" } else { heatmapConfig.collect_elements = "interact" } if (heatmapConfig.collect_elements === "all") { _.addEvent(document, "click", function(e) { var ev = e || window.event; if (!ev) { return false } var target = ev.target || ev.srcElement; if (typeof target !== "object") { return false } if (typeof target.tagName !== "string") { return false } var tagName = target.tagName.toLowerCase(); if (tagName.toLowerCase() === "body" || tagName.toLowerCase() === "html") { return false } if (!target || !target.parentNode || !target.parentNode.children) { return false } var parent_ele = target.parentNode.tagName.toLowerCase(); if (parent_ele === "a" || parent_ele === "button") { that.start(ev, target.parentNode, target.parentNode.tagName.toLowerCase()) } else { that.start(ev, target, tagName) } }) } else { _.addEvent(document, "click", function(e) { var ev = e || window.event; if (!ev) { return false } var target = ev.target || ev.srcElement; if (typeof target !== "object") { return false } if (typeof target.tagName !== "string") { return false } var tagName = target.tagName.toLowerCase(); if (tagName.toLowerCase() === "body" || tagName.toLowerCase() === "html") { return false } if (!target || !target.parentNode || !target.parentNode.children) { return false } var parent_ele = target.parentNode; if (tagName === "a" || tagName === "button" || tagName === "input" || tagName === "textarea") { that.start(ev, target, tagName) } else { if (parent_ele.tagName.toLowerCase() === "button" || parent_ele.tagName.toLowerCase() === "a") { that.start(ev, parent_ele, target.parentNode.tagName.toLowerCase()) } else { if (tagName === "area" && parent_ele.tagName.toLowerCase() === "map" && _.ry(parent_ele).prev().tagName && _.ry(parent_ele).prev().tagName.toLowerCase() === "img") { that.start(ev, _.ry(parent_ele).prev(), _.ry(parent_ele).prev().tagName.toLowerCase()) } else { var hasA = that.hasElement(e); if (hasA) { that.start(ev, hasA, hasA.tagName.toLowerCase()) } } } } }) } },
        prepare: function(todo) { var match = location.href.match(/hubble_heatmap_id=([^&#]+)/); var me = this; var heatmap_url = me.DATracker.config.heatmap_url; var heatmap_getdateUrl = me.DATracker.config.heatmap_getdateUrl; var heatmapConfig = me.DATracker.config.heatmap; var loadTimeout = 3000; if (_.isObject(heatmapConfig)) { loadTimeout = heatmapConfig.loadTimeout }

            function isReady(data) { if (heatmap_url) { _.loadScript({ success: function() { setTimeout(function() { if (typeof hubble_jssdk_heatmap_render !== "undefined") { hubble_jssdk_heatmap_render(me.DATracker, data, heatmap_getdateUrl) } }, loadTimeout || 3000) }, error: function() {}, type: "js", url: heatmap_url + "?_=" + Math.random() }) } else { console.error("没有指定heatmap_url的路径") } } if (match && match[0] && match[1]) { me.DATracker.set_config({ hubble_render_mode: true }); if (_.sessionStorage.isSupport()) { sessionStorage.setItem("hubble_heatmap_id", match[1]) }
                isReady(match[1]) } else { if (_.sessionStorage.isSupport() && typeof sessionStorage.getItem("hubble_heatmap_id") === "string") { me.DATracker.set_config({ hubble_render_mode: true });
                    isReady(sessionStorage.getItem("hubble_heatmap_id")) } else { todo(); if (_.isObject(heatmapConfig)) { me.initHeatmap();
                        me.DATracker.track_heatmap = _.bind(me.trackHeatmap, me) } } } },
        init: function(DATracker, todo) { if (!DATracker || !todo) { return }
            this.DATracker = DATracker;
            this.DATracker.heatmap = this;
            this.DATracker.track_heatmap = function() {};
            this.prepare(todo) }
    };

    function safeAdd(x, y) { var lsw = (x & 65535) + (y & 65535); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return msw << 16 | lsw & 65535 }

    function bitRotateLeft(num, cnt) { return num << cnt | num >>> 32 - cnt }

    function md5cmn(q, a, b, x, s, t) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b) }

    function md5ff(a, b, c, d, x, s, t) { return md5cmn(b & c | ~b & d, a, b, x, s, t) }

    function md5gg(a, b, c, d, x, s, t) { return md5cmn(b & d | c & ~d, a, b, x, s, t) }

    function md5hh(a, b, c, d, x, s, t) { return md5cmn(b ^ c ^ d, a, b, x, s, t) }

    function md5ii(a, b, c, d, x, s, t) { return md5cmn(c ^ (b | ~d), a, b, x, s, t) }

    function binlMD5(x, len) {
        x[len >> 5] |= 128 << len % 32;
        x[(len + 64 >>> 9 << 4) + 14] = len;
        var i;
        var olda;
        var oldb;
        var oldc;
        var oldd;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;
            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5gg(b, c, d, a, x[i], 20, -373897302);
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5hh(d, a, b, c, x[i], 11, -358537222);
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5ii(a, b, c, d, x[i], 6, -198630844);
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safeAdd(a, olda);
            b = safeAdd(b, oldb);
            c = safeAdd(c, oldc);
            d = safeAdd(d, oldd)
        }
        return [a, b, c, d]
    }

    function binl2rstr(input) { var i; var output = ""; var length32 = input.length * 32; for (i = 0; i < length32; i += 8) { output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255) } return output }

    function rstr2binl(input) { var i; var output = [];
        output[(input.length >> 2) - 1] = undefined; for (i = 0; i < output.length; i += 1) { output[i] = 0 } var length8 = input.length * 8; for (i = 0; i < length8; i += 8) { output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << i % 32 } return output }

    function rstrMD5(s) { return binl2rstr(binlMD5(rstr2binl(s), s.length * 8)) }

    function rstrHMACMD5(key, data) { var i; var bkey = rstr2binl(key); var ipad = []; var opad = []; var hash;
        ipad[15] = opad[15] = undefined; if (bkey.length > 16) { bkey = binlMD5(bkey, key.length * 8) } for (i = 0; i < 16; i += 1) { ipad[i] = bkey[i] ^ 909522486;
            opad[i] = bkey[i] ^ 1549556828 }
        hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8); return binl2rstr(binlMD5(opad.concat(hash), 512 + 128)) }

    function rstr2hex(input) { var hexTab = "0123456789abcdef"; var output = ""; var x; var i; for (i = 0; i < input.length; i += 1) { x = input.charCodeAt(i);
            output += hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15) } return output }

    function str2rstrUTF8(input) { return unescape(encodeURIComponent(input)) }

    function rawMD5(s) { return rstrMD5(str2rstrUTF8(s)) }

    function hexMD5(s) { return rstr2hex(rawMD5(s)) }

    function rawHMACMD5(k, d) { return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d)) }

    function hexHMACMD5(k, d) { return rstr2hex(rawHMACMD5(k, d)) }

    function md5(string, key, raw) { if (!key) { if (!raw) { return hexMD5(string) } return rawMD5(string) } if (!raw) { return hexHMACMD5(key, string) } return rawHMACMD5(key, string) }
    var get8To24Md5 = function(str) { str = str.substring(8, 24); return str };
    var debug = {
        _queue: [],
        _callbackList: [],
        _loadControlComplete: false,
        init: function(instance) { if (!instance) { return } var that = this;
            that.DATracker = instance; var abtest = that.DATracker.get_config("abtest") || {};
            that._control = null; if (that._isTestDebug()) { abtest.interval_mins_abtest = 0;
                that.DATracker.set_config({ abtest: abtest });
                that._loadControlJs(); if (abtest.enable_abtest) { that._prepare(function() { if (typeof hubbleData_render_mode_fn === "function") { that._control = new hubbleData_render_mode_fn(that.DATracker, { type: "abtest_debug", data: { hubble_abtest_debug_key: that.getDebugKeyData() } }).control;
                            _.each(that._queue, function(data) { that.debugTrack(data) });
                            that._queue = [] } }) } else { that._prepare(function() { if (typeof hubbleData_render_mode_fn === "function") { new hubbleData_render_mode_fn(that.DATracker, { type: "abtest_debug_but_abtest_disable" }) } }) } } },
        _isTestDebug: function() { var match = location.href.match(/hubble_abtest_debug_key=([^&#]+)/); var bool = false; if (match && match[0] && match[1]) { bool = true; if (_.sessionStorage.isSupport()) { sessionStorage.setItem("hubble_abtest_debug_key", match[1]) } } else { if (_.sessionStorage.isSupport() && typeof sessionStorage.getItem("hubble_abtest_debug_key") === "string") { if (sessionStorage.getItem("hubble_abtest_debug_key")) { bool = true } } } return bool },
        _loadControlJs: function() {
            var that = this;
            var control_js_url = that.DATracker.config.control_js_url;
            if (control_js_url) {
                _.loadScript({ success: function() { that._loadControlComplete = true;
                        _.each(that._callbackList, function(callback) { callback.call(that) });
                        that._callbackList = [] }, error: function() {}, type: "js", url: control_js_url + "?_=" + Math.random() })
            } else { console.error("没有指定control_js_url的路径") }
        },
        _prepare: function(callback) { if (!this._loadControlComplete) { if (callback) { this._callbackList.push(callback) } } if (callback) { callback.call(this) } },
        getDebugKeyData: function() { var match = location.href.match(/hubble_abtest_debug_key=([^&#]+)/); var keyData = ""; if (match && match[0] && match[1]) { keyData = match[1] } else { if (_.sessionStorage.isSupport() && typeof sessionStorage.getItem("hubble_abtest_debug_key") === "string") { keyData = sessionStorage.getItem("hubble_abtest_debug_key") } } return keyData },
        debugTrack: function(data) { try { if (this._control) { this._control.addEvent(data) } else { this._queue.push(data) } } catch (error) { console.error(error) } },
        debugNoData: function() { var that = this; if (that._isTestDebug()) { that._prepare(function() { if (typeof hubbleData_render_mode_fn === "function") { new hubbleData_render_mode_fn(that.DATracker, { type: "abtest_debug_abtest_no_data" }) } }) } }
    };
    var multilinkAbest = { multilinkArr: [], isTestDebug: debug._isTestDebug, setMultilinkArr: function(multilinkArr) { this.multilinkArr = multilinkArr || [] }, jump: function(variableObj, callback) { variableObj = variableObj || this.getVariable(); var nowUrl = this.getNowUrl(); var fuzzyBoolCanJump = true; var nowUrlPath = this.getNowProtocolDommainAndPath(); if (variableObj) { if (variableObj.type == 1) { if (nowUrlPath === variableObj.url || nowUrlPath + "/" === variableObj.url) { fuzzyBoolCanJump = false } } if (variableObj.url !== nowUrl && variableObj.url !== nowUrl + "/" && fuzzyBoolCanJump) { if (this.isTestDebug()) { variableObj.url += variableObj.url.indexOf("?") > -1 ? "&" : "?";
                        variableObj.url = variableObj.url + "hubble_abtest_debug_key=" + debug.getDebugKeyData() }
                    window.location.href = variableObj.url } else { callback && callback() } } else { callback && callback() } }, getNowUrl: function() { var url = window.location.href; var match; if (this.isTestDebug()) { if (url.indexOf("?hubble_abtest_debug_key=") > -1) { match = url.match(/\?hubble_abtest_debug_key=([^&#]+)/) } else { if (url.indexOf("&hubble_abtest_debug_key=") > -1) { match = url.match(/\&hubble_abtest_debug_key=([^&#]+)/) } } if (match && match[0]) { url = url.replace(match[0], "") } } return url }, getNowProtocolDommainAndPath: function() { var _protocol = "https:" == document.location.protocol ? "https://" : "http://"; var protocolDommainAndPath = _protocol + _.info.referringDomain(window.location.href) + window.location.pathname; return protocolDommainAndPath }, getVariable: function() { var nowUrlPath = this.getNowProtocolDommainAndPath(); var nowHref = this.getNowUrl(); var nowVariableObj = { variable: "", url: "", type: "" }; var jsMd5NowUrlPath = get8To24Md5(md5(nowUrlPath)); var jsMd5NowUrlPath_ = get8To24Md5(md5(nowUrlPath + "/")); var jsMd5NowHref = get8To24Md5(md5(nowHref)); var jsMd5NowHref_ = get8To24Md5(md5(nowHref + "/")); var perfectMatchingArr = []; var fuzzyMatchingArr = []; for (var i = 0; i < this.multilinkArr.length; i++) { var key = this.multilinkArr[i][0].replace(new RegExp("^\\$", "g"), ""); if (nowHref !== nowUrlPath) { if (key === jsMd5NowHref || key === jsMd5NowHref_) { perfectMatchingArr.push({ variable: this.multilinkArr[i][0], url: this.multilinkArr[i][1], type: 0, key: key === jsMd5NowHref ? nowHref : nowHref + "/" }) } else { if (key === jsMd5NowUrlPath || key === jsMd5NowUrlPath_) { fuzzyMatchingArr.push({ variable: this.multilinkArr[i][0], url: this.multilinkArr[i][1], type: 1, key: key === jsMd5NowUrlPath ? nowUrlPath : nowUrlPath + "/" }) } } } else { if (key === jsMd5NowUrlPath || key === jsMd5NowUrlPath_) { fuzzyMatchingArr.push({ variable: this.multilinkArr[i][0], url: this.multilinkArr[i][1], type: 1, key: key === jsMd5NowUrlPath ? nowUrlPath : nowUrlPath + "/" }) } } } if (perfectMatchingArr.length) { nowVariableObj = perfectMatchingArr[0] } else { if (fuzzyMatchingArr.length) { nowVariableObj = fuzzyMatchingArr[0] } else { nowVariableObj = null } } return nowVariableObj } };
    var visualizationAbest = {
        _visualizationArr: [],
        _settimeNum: 0,
        _loadControlJs: function(callback) { var that = this; var control_js_url = that.DATracker.config.control_js_url; if (control_js_url) { _.loadScript({ success: function() { if (typeof callback === "function") { callback() } }, error: function() {}, type: "js", url: control_js_url + "?_=" + Math.random() }) } else { console.error("没有指定control_js_url的路径") } },
        isEditor: function() { var match = location.href.match(/hubble_abtest_editor_key=([^&#]+)/); var bool = false; if (match && match[0] && match[1]) { bool = true } return bool },
        _querySelector: function(selector, parentEl) { try { return (parentEl || document).querySelector(selector) } catch (e) { return null } },
        _getNowUrl: function() { var url = window.location.href; var match; if (this.isTestDebug()) { if (url.indexOf("?hubble_abtest_debug_key=") > -1) { match = url.match(/\?hubble_abtest_debug_key=([^&#]+)/) } else { if (url.indexOf("&hubble_abtest_debug_key=") > -1) { match = url.match(/\&hubble_abtest_debug_key=([^&#]+)/) } } if (match && match[0]) { url = url.replace(match[0], "") } } return url },
        _setType: function() {
            console.log(this._visualizationArr);
            try {
                for (var i = 0; i < this._visualizationArr.length; i += 1) {
                    if (this._visualizationArr[i][1]) {
                        this._visualizationArr[i][1] = _.JSONDecode(this._visualizationArr[i][1]);
                        if (this._visualizationArr[i][1].pattern) {
                            try { this._visualizationArr[i][1].pattern = _.JSONDecode(this._visualizationArr[i][1].pattern) } catch (error) { console.error(error) }
                            this._visualizationArr[i][2] = 0
                        } else { this._visualizationArr[i][2] = 1 }
                    }
                }
            } catch (error) { console.error(error) }
        },
        _filtrateElementItem: function(itemConfig, $element) { var bool = true; var nodeName = itemConfig.nodeName; if (nodeName !== $element.nodeName.toLocaleUpperCase()) { bool = false } return bool },
        _resetConfig: function(variationsList) { var variations = [];
            _.each(variationsList, function(item, j) { var itemArr = item["variations"];
                _.each(itemArr, function(itemConfig, k) { variations.push(itemConfig) }) }); return variations },
        init: function(instance, ABTEST) { if (!instance) { return } var that = this;
            that.DATracker = instance;
            that.ABTEST = ABTEST; if (this.isEditor()) { var abtest = that.DATracker.get_config("abtest") || {}; var callback = function() { if (typeof hubbleData_render_mode_fn === "function") { if (abtest.enable_abtest) { new hubbleData_render_mode_fn(that.DATracker, { type: "abtest_editor" }) } else { new hubbleData_render_mode_fn(that.DATracker, { type: "abtest_editor_but_abtest_disable" }) } try { that.ABTEST._showPage() } catch (error) {} } };
                that._loadControlJs(callback) } },
        isTestDebug: debug._isTestDebug,
        setVisualizationArr: function(visualizationArr) { this._visualizationArr = visualizationArr || [];
            this._setType() },
        _hidePathStyleSet: function(configArr) { var styleCss = "{opacity:0 !important;}"; var styleText = "";
            _.each(configArr, function(item) { styleText += item.selector + styleCss }); var $styleNode = document.getElementById("_hb_abtesting_path_hides"); if ($styleNode) { if ($styleNode.styleSheet) { $styleNode.styleSheet.cssText = styleText } else { $styleNode.innerText = "";
                    $styleNode.appendChild(document.createTextNode(styleText)) } } else { var styleNode = document.createElement("style"); var head = document.getElementsByTagName("head")[0];
                styleNode.setAttribute("id", "_hb_abtesting_path_hides");
                styleNode.setAttribute("type", "text/css"); if (styleNode.styleSheet) { styleNode.styleSheet.cssText = styleText } else { styleNode.innerText = "";
                    styleNode.appendChild(document.createTextNode(styleText)) }
                head.appendChild(styleNode) } },
        render: function(variationsList) { if (!variationsList) { return } var self = this;
            clearTimeout(self._settimeNum); var variationsArr = this._resetConfig(variationsList); var notRenderArr = []; var callback = function($element, config) { _.each(config.css, function(data, key) { $element.style[key] = data });
                _.each(config.attributes, function(data, key) { $element.setAttribute(key, data) });
                _.each(config, function(data, key) { if (!_.include(["css", "attributes", "nodeName", "selector"], key)) { $element[key] = data } }) }; try { for (var k = 0; k < variationsArr.length; k += 1) { if (variationsArr[k].selector) { var $element = this._querySelector(variationsArr[k].selector); var config = variationsArr[k]; if ($element) { if (this._filtrateElementItem(config, $element)) { callback($element, config) } } else { notRenderArr.push(variationsArr[k]) } } } } catch (error) { console.error(error) } var tt = function() { var notRender = 0; var ttnotRenderArr = [];
                self._hidePathStyleSet(notRenderArr); for (var k = 0; k < notRenderArr.length; k += 1) { if (notRenderArr[k].selector) { var $element = self._querySelector(notRenderArr[k].selector); var config = notRenderArr[k]; if ($element) { if (self._filtrateElementItem(config, $element)) { callback($element, config) } } else { ttnotRenderArr.push(notRenderArr[k]) } }
                    notRender++ }
                notRenderArr = ttnotRenderArr; if (notRender > 0) { self._settimeNum = setTimeout(function() { tt() }, 0) } else { clearTimeout(self._settimeNum) }
                self._hidePathStyleSet(notRenderArr) };
            tt() },
        getVariables: function() { var that = this; var nowVisualizationVariableArr = []; var checkSingPagePartIn = function(singPageTest) { var bool = false; if (!singPageTest) { return bool } var nowHref = that._getNowUrl(); var jsMd5NowHref_ = get8To24Md5(md5(nowHref + "/")); var jsMd5NowHref = get8To24Md5(md5(nowHref)); var key = singPageTest[0].replace(new RegExp("^\\%", "g"), ""); if (key === jsMd5NowHref || key === jsMd5NowHref_) { bool = true } return bool }; var checkNotSingPagePartIn = function(notSingPageTest) { var bool = false; if (!notSingPageTest) { return bool } var pattern = notSingPageTest[1].pattern; if (pattern) { var conditions = pattern.conditions; if (pattern.relation === "OR" || pattern.relation === "") { for (var i = 0; i < conditions.length; i += 1) { var condition = conditions[i] || {}; var field = condition.field; var func = condition.func; var params = condition.params; var nowUrl = that._getNowUrl(); if (field === "URL") { if (func === "EQUAL") { if (_.include(params, nowUrl) || _.include(params, nowUrl + "/")) { bool = true; break } } if (func === "CONTAIN") { if (nowUrl.indexOf(params[0]) > -1 || (nowUrl + "/").indexOf(params[0]) > -1) { bool = true; break } } if (func === "REG_MATCH") { try { var eval2 = eval; var reg = eval2(params[0]); if (reg.test(nowUrl) || reg.test(nowUrl + "/")) { bool = true; break } } catch (error) { console.error(error) } } } } } } return bool }; for (var k = 0; k < that._visualizationArr.length; k += 1) { var type = that._visualizationArr[k][2]; var bool = false; if (type === 1) { bool = checkSingPagePartIn(that._visualizationArr[k]) } else { if (type === 0) { bool = checkNotSingPagePartIn(that._visualizationArr[k]) } } if (bool && that._visualizationArr[k][1]) { nowVisualizationVariableArr.push({ variations: that._visualizationArr[k][1].variations, type: 2, variable: that._visualizationArr[k][0] }) } } return nowVisualizationVariableArr }
    };
    var abtest = {
        data: { experiments: [], variables: {} },
        abtest_config: { enable_abtest: false, interval_mins_abtest: 60, default_variables: {}, url: "", multilinkTimeOutMs: 300, timeoutMs: 500, hasCacheRender: false },
        _default_variables: {},
        _getVariableInfoComplete: false,
        _queue: [],
        _showPage: function() {
            if (typeof DATrackerABTestingLeadCode !== "undefined") {
                if (DATrackerABTestingLeadCode && DATrackerABTestingLeadCode.showPage) {
                    DATrackerABTestingLeadCode.showPage()
                }
            }
        },
        init: function(instance) { if (!instance) { return null }
            this.DATracker = instance;
            debug.init(this.DATracker);
            visualizationAbest.init(this.DATracker, this);
            this.localStorageName = "hb_" + this.DATracker.get_config("token") + "_abtest"; var visualizationEditBool = visualizationAbest.isEditor(); var self = this; var callback = function() { try { var abtest = self.DATracker.get_config("abtest") || {};
                    self._default_variables = abtest.default_variables || {};
                    self.abtest_config = _.deepMerge(self.abtest_config, abtest); if (self.abtest_config.enable_abtest) { self.data.variables = self.abtest_config.default_variables; if (!visualizationEditBool) { if (self._checkUpdateTime()) { self.async_get_variable() } else { var localObj = self._getLocalStorageData();
                                self.data = localObj.data;
                                self._getVariableInfoComplete = true;
                                self._dataClass() } } else { self._getVariableInfoComplete = true } } } catch (error) { if (!visualizationEditBool) { self.async_get_variable() } else { self._getVariableInfoComplete = true;
                        self._showPage() } } };
            callback();
            _.innerEvent.on("singlePage:change", function() { callback() }) },
        debugTrack: function(data) { debug.debugTrack(data) },
        _dataClass: function() { if (!this._getVariableInfoComplete) { return false } var that = this; var variables = that.data.variables; var multilinkArr = []; var visualizationArr = []; for (var key in variables) { if (variables.hasOwnProperty(key)) { if (that._getExperimentType(key) === 3) { multilinkArr.push([key, variables[key]]) } if (that._getExperimentType(key) === 2) { visualizationArr.push([key, variables[key]]) } } }
            multilinkAbest.setMultilinkArr(multilinkArr);
            visualizationAbest.setVisualizationArr(visualizationArr); var nowMultilinkVariableObj = multilinkAbest.getVariable(); var nowVisualizationVariableArr = visualizationAbest.getVariables(); if (nowMultilinkVariableObj) { var multilinkAbestExecute = function() { that.get_variation(function(abtest) { try { var jump = function() { multilinkAbest.jump(nowMultilinkVariableObj, that._showPage) };
                            setTimeout(jump, abtest.abtest_config.multilinkTimeOutMs);
                            abtest.get(nowMultilinkVariableObj.variable, window.location.href, jump, { variableObj: nowMultilinkVariableObj }) } catch (error) { that._showPage();
                            console.error(error) } }) };
                multilinkAbestExecute() } else { if (nowVisualizationVariableArr.length) { var visualizationAbestExecute = function() { that.get_variation(function(abtest) { try { visualizationAbest.render(nowVisualizationVariableArr); for (var j = 0; j < nowVisualizationVariableArr.length; j += 1) { var item = nowVisualizationVariableArr[j];
                                    abtest.get(item.variable, {}, function() {}, { variableObj: item }) } } catch (error) { console.error(error) } }) };
                    visualizationAbestExecute() }
                that._showPage() } },
        isTestDebug: function() { return debug._isTestDebug() },
        isEditor: function() { return visualizationAbest.isEditor() },
        getDebugKeyData: function() { return debug.getDebugKeyData() },
        _saveLocal: function() { var obj = { data: this.data }; try { if (this.abtest_config.interval_mins_abtest) { _.localStorage.set(this.localStorageName, JSON.stringify(obj)) } } catch (error) {} },
        _getLocalStorageData: function() { var localObj; try { localObj = JSON.parse(_.localStorage.get(this.localStorageName)) } catch (error) { localObj = null } return localObj },
        _checkUpdateTime: function() { var bool = true; try { var interval_mins_abtest = this.abtest_config.interval_mins_abtest; var localObj = this._getLocalStorageData(); var updatedTime = localObj.data.updatedTime / 1000; var nowDateTime = 1 * new Date().getTime() / 1000; if (nowDateTime <= updatedTime + 60 * interval_mins_abtest) { bool = false } } catch (error) { bool = true } return bool },
        _getExperimentType: function(variable) { var type = 1; try { if (variable.indexOf("$") === 0) { type = 3 } if (variable.indexOf("%") === 0) { type = 2 } } catch (error) { console.error(error) } return type },
        _variableToFindExperiment: function(variable) { var dataObj = { $experimentId: [], $versionId: [], $experimentType: this._getExperimentType(variable) }; var multilinkAbestObj; for (var i = 0; i < this.data.experiments.length; i++) { var experimentId = this.data.experiments[i]["experimentId"]; var versionId = this.data.experiments[i]["versionId"]; var variables = this.data.experiments[i]["variables"]; if (_.include(variables, variable)) { if (!_.include(dataObj.$experimentId, experimentId)) { dataObj.$experimentId.push(experimentId) } if (!_.include(dataObj.$versionId, versionId)) { dataObj.$versionId.push(versionId) } } }
            dataObj.$experimentId = dataObj.$experimentId.join(",");
            dataObj.$versionId = dataObj.$versionId.join(","); if (dataObj.$experimentType === 3) { multilinkAbestObj = multilinkAbest.getVariable(); if (multilinkAbestObj) { dataObj.$source = multilinkAbestObj.key;
                    dataObj.$target = multilinkAbestObj.url } } else { if (dataObj.$experimentType === 2) {} else { dataObj[variable] = this.data.variables[variable] } } return dataObj },
        _track_abtest: function(attributes, callback) { if (!attributes) { return }
            this.DATracker.track("da_abtest", attributes, callback || function() {}) },
        _getUserId: function() { var userId = this.DATracker.get_user_id() || this.DATracker.get_distinct_id(); if (this.isTestDebug()) { userId = this.getDebugKeyData() } return userId },
        get: function(variable, defalut, _callback, _typeObj) {
            try {
                if (typeof this.data.variables[variable] !== "undefined") {
                    var attributes = this._variableToFindExperiment(variable) || {};
                    if (attributes.$experimentId && attributes.$versionId && attributes.$experimentType) {
                        this._track_abtest(attributes, _callback)
                    } else { if (typeof _callback === "function") { _callback() } }
                    return this.data.variables[variable]
                } else { return defalut }
            } catch (error) { return defalut }
        },
        get_variation: function(callback) { if (!this._getVariableInfoComplete) { return this._queue.push(arguments), !1 } if (typeof callback === "function") { callback(this) } },
        async_get_variable: function() { if (this.isEditor()) { this._getVariableInfoComplete = true; return } try { var abtest_config = this.abtest_config; var enable_abtest = abtest_config.enable_abtest; if (enable_abtest) { var that = this; var userId = that._getUserId(); var appKey = that.DATracker.get_config("token"); var callback = function(params) { this._getVariableInfoComplete = true; if (!params.error) { if (params.code === 200) { var _default_variables = _.JSONDecode(_.JSONEncode(this._default_variables));
                                this.data.experiments = params.data.experiments;
                                this.data.variables = _.deepMerge(_default_variables, params.data.variables);
                                this.data.updatedTime = new Date().getTime();
                                this._saveLocal();
                                this._dataClass(); if (this.isTestDebug()) { if (!params.data.experiments.length) { debug.debugNoData() } } } } else { if (this.isTestDebug()) { debug.debugNoData() } } if (this._queue.length) { _.each(that._queue, function(t) { that.get_variation.apply(that, Array.prototype.slice.call(t)) });
                            that._queue = [] } };
                    that._getVariableInfoComplete = false; var url = that.DATracker.get_config("api_host") + "/cc/a_exp"; var timeout = 500; try { timeout = that.abtest_config.timeoutMs } catch (error) { timeout = 500 } if (abtest_config.url) { url = abtest_config.url } var properties = _.extend({}, _.info.properties(), that.DATracker["persistence"].properties());
                    _.ajax.post(url, { userId: userId, appKey: appKey, property: { deviceOs: properties.deviceOs, deviceOsVersion: properties.deviceOsVersion, screenWidth: properties.screen_width, screenHeight: properties.screen_height, devicePlatform: properties.hb_lib, pageOpenScene: that.DATracker["pageOpenScene"] } }, _.bind(callback, that), timeout) } } catch (error) {} },
        is_abtest_debug: debug._isTestDebug,
        get_hubble_abtest_debug_key_str: function() { var str = ""; if (debug._isTestDebug()) { str = "hubble_abtest_debug_key=" + debug.getDebugKeyData() } return str },
        hasLocalCache: function() { return !this._checkUpdateTime() }
    };
    var init_type;
    var DATracker_master;
    var INIT_MODULE = 0;
    var INIT_SNIPPET = 1;
    var INIT_SYNC = 2;
    var SDKTYPE = "js";
    var PRIMARY_INSTANCE_NAME = "DATracker";
    var SET_QUEUE_KEY = "__mps";
    var SET_ONCE_QUEUE_KEY = "__mpso";
    var ADD_QUEUE_KEY = "__mpa";
    var APPEND_QUEUE_KEY = "__mpap";
    var UNION_QUEUE_KEY = "__mpu";
    var SET_ACTION = "attributes";
    var SET_ONCE_ACTION = "attributes";
    var ADD_ACTION = "attributes";
    var APPEND_ACTION = "attributes";
    var UNION_ACTION = "$union";
    var PEOPLE_DISTINCT_ID_KEY = "$people_distinct_id";
    var EVENT_TIMERS_KEY = "costTime";
    var RESERVED_PROPERTIES = [SET_QUEUE_KEY, SET_ONCE_QUEUE_KEY, ADD_QUEUE_KEY, APPEND_QUEUE_KEY, UNION_QUEUE_KEY, PEOPLE_DISTINCT_ID_KEY, EVENT_TIMERS_KEY];
    var USE_XHR = window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest();
    var ENQUEUE_REQUESTS = !USE_XHR && userAgent.indexOf("MSIE") === -1 && userAgent.indexOf("Mozilla") === -1;
    var DEFAULT_CONFIG = { "api_host": "https://hubble.netease.com", "app_host": "https://hubble.netease.com", "autotrack": false, "cdn": "https://hubble.netease.com", "cross_subdomain_cookie": true, "persistence": "cookie", "persistence_name": "", "cookie_name": "", "loaded": function() {}, "store_google": true, "test": false, "verbose": false, "img": false, "track_pageview": true, "debug": false, "track_links_timeout": 300, "cookie_expiration": 730, "upgrade": false, "disable_persistence": false, "disable_cookie": false, "secure_cookie": false, "ip": true, "property_blacklist": [], "session_interval_mins": 30, "is_single_page": false, "single_page_config": { mode: "hash", track_replace_state: false }, "pageview": true, "use_app_track": false, "hubble_render_mode": false, "heatmap_url": "https://hubble.netease.com/track/w/heatmap/heatmap.js", "heatmap_getdateUrl": "https://hubble.netease.com/hwi/heatmap/query", "send_error": false, "control_js_url": "https://hubble.netease.com/track/w/control/control.js", "visualization_editor_js_url": "https://hubble.netease.com/track/w/visualization/visualization.js", "truncateLength": -1 };
    var DATATYPE = "e";
    var DEFAULTEVENTID = { "da_session_start": { "dataType": "ie" }, "da_session_close": { "dataType": "ie" }, "da_u_login": { "dataType": "ie" }, "da_u_logout": { "dataType": "ie" }, "da_u_signup": { "dataType": "ie" }, "da_user_profile": { "dataType": "ie" }, "da_screen": { "dataType": "pv" }, "da_ad_click": { "dataType": "ie" }, "da_activate": { "dataType": "ie" }, "da_abtest": { "dataType": "ie" }, "da_send_error": { "dataType": "ie" } };
    var DOM_LOADED = false;
    var DomTracker = function() {};
    DomTracker.prototype.create_properties = function() {};
    DomTracker.prototype.event_handler = function() {};
    DomTracker.prototype.after_track_handler = function() {};
    DomTracker.prototype.init = function(mixpanel_instance) { this.mp = mixpanel_instance; return this };
    DomTracker.prototype.track = function(query, event_name, properties, user_callback) {
        var that = this;
        var elements = _.dom_query(query);
        if (elements.length === 0) { console.error("The DOM query (" + query + ") returned 0 elements"); return }
        _.each(elements, function(element) {
            _.register_event(element, this.override_event, function(e) {
                var options = {};
                var props = that.create_properties(properties, this);
                var timeout = that.mp.get_config("track_links_timeout");
                that.event_handler(e, this, options);
                window.setTimeout(that.track_callback(user_callback, props, options, true), timeout);
                that.mp.track(event_name, props, that.track_callback(user_callback, props, options))
            })
        }, this);
        return true
    };
    DomTracker.prototype.track_callback = function(user_callback, props, options, timeout_occured) { timeout_occured = timeout_occured || false; var that = this; return function() { if (options.callback_fired) { return }
            options.callback_fired = true; if (user_callback && user_callback(timeout_occured, props) === false) { return }
            that.after_track_handler(props, options, timeout_occured) } };
    DomTracker.prototype.create_properties = function(properties, element) { var props; if (typeof properties === "function") { props = properties(element) } else { props = _.extend({}, properties) } return props };
    var LinkTracker = function() { this.override_event = "click" };
    _.inherit(LinkTracker, DomTracker);
    LinkTracker.prototype.create_properties = function(properties, element) { var props = LinkTracker.superclass.create_properties.apply(this, arguments); if (element.href) { props["url"] = element.href } return props };
    LinkTracker.prototype.event_handler = function(evt, element, options) { options.new_tab = evt.which === 2 || evt.metaKey || evt.ctrlKey || element.target === "_blank";
        options.href = element.href; if (!options.new_tab) { evt.preventDefault() } };
    LinkTracker.prototype.after_track_handler = function(props, options) { if (options.new_tab) { return }
        setTimeout(function() { window.location = options.href }, 0) };
    var DATrackerPersistence = function(config) { this["props"] = {}; if (config["persistence_name"]) { this.name = "mp_" + config["persistence_name"] } else { this.name = "mp_" + config["token"] + "_hubble" } var storage_type = config["persistence"]; if (storage_type !== "cookie" && storage_type !== "localStorage") { console.critical("Unknown persistence type " + storage_type + "; falling back to cookie");
            storage_type = config["persistence"] = "cookie" } var localStorage_supported = function() { var supported = true; try { var key = "__hbssupport__",
                    val = "xyz";
                _.localStorage.set(key, val); if (_.localStorage.get(key) !== val) { supported = false }
                _.localStorage.remove(key) } catch (err) { supported = false } if (!supported) { console.error("localStorage unsupported; falling back to cookie store") } return supported }; if (storage_type === "localStorage" && localStorage_supported()) { this.storage = _.localStorage } else { this.storage = _.cookie }
        this.load();
        this.update_config(config);
        this.upgrade(config);
        this.save() };
    DATrackerPersistence.prototype.properties = function() { var p = {};
        _.each(this["props"], function(v, k) { if (!_.include(RESERVED_PROPERTIES, k)) { p[k] = v } }); return p };
    DATrackerPersistence.prototype.load = function() { if (this.disabled) { return } var entry = this.storage.parse(this.name); if (entry) { this["props"] = _.extend({}, entry) } };
    DATrackerPersistence.prototype.upgrade = function(config) { var upgrade_from_old_lib = config["upgrade"],
            old_cookie_name, old_cookie; if (upgrade_from_old_lib) { old_cookie_name = "mp_super_properties"; if (typeof upgrade_from_old_lib === "string") { old_cookie_name = upgrade_from_old_lib }
            old_cookie = this.storage.parse(old_cookie_name);
            this.storage.remove(old_cookie_name);
            this.storage.remove(old_cookie_name, true); if (old_cookie) { this["props"] = _.extend(this["props"], old_cookie["all"], old_cookie["events"]) } } if (!config["cookie_name"] && config["name"] !== "DATracker") { old_cookie_name = "mp_" + config["token"] + "_" + config["name"];
            old_cookie = this.storage.parse(old_cookie_name); if (old_cookie) { this.storage.remove(old_cookie_name);
                this.storage.remove(old_cookie_name, true);
                this.register_once(old_cookie) } } if (this.storage === _.localStorage) { old_cookie = _.cookie.parse(this.name);
            _.cookie.remove(this.name);
            _.cookie.remove(this.name, true); if (old_cookie) { this.register_once(old_cookie) } } };
    DATrackerPersistence.prototype.save = function() { if (this.disabled) { return }
        this.storage.set(this.name, _.JSONEncode(this["props"]), this.expire_days, this.cross_subdomain, this.secure) };
    DATrackerPersistence.prototype.remove = function() { this.storage.remove(this.name, false);
        this.storage.remove(this.name, true) };
    DATrackerPersistence.prototype.clear = function() { this.remove();
        this["props"] = {} };
    DATrackerPersistence.prototype.register_once = function(props, default_value, days) { if (_.isObject(props)) { if (typeof default_value === "undefined") { default_value = "None" }
            this.expire_days = typeof days === "undefined" ? this.default_expiry : days;
            _.each(props, function(val, prop) { if (!this["props"][prop] || this["props"][prop] === default_value) { this["props"][prop] = val } }, this);
            this.save(); return true } return false };
    DATrackerPersistence.prototype.register = function(props, days) { if (_.isObject(props)) { this.expire_days = typeof days === "undefined" ? this.default_expiry : days;
            _.extend(this["props"], props);
            this.save(); return true } return false };
    DATrackerPersistence.prototype.unregister = function(prop) { if (prop in this["props"]) { delete this["props"][prop];
            this.save() } };
    DATrackerPersistence.prototype.safe_merge = function(props) { _.each(this["props"], function(val, prop) { if (!(prop in props)) { props[prop] = val } }); return props };
    DATrackerPersistence.prototype.update_config = function(config) {
        this.default_expiry = this.expire_days = config["cookie_expiration"];
        this.set_disabled(config["disable_persistence"]);
        this.set_cross_subdomain(config["cross_subdomain_cookie"]);
        this.set_secure(config["secure_cookie"])
    };
    DATrackerPersistence.prototype.set_disabled = function(disabled) { this.disabled = disabled; if (this.disabled) { this.remove() } };
    DATrackerPersistence.prototype.set_cross_subdomain = function(cross_subdomain) { if (cross_subdomain !== this.cross_subdomain) { this.cross_subdomain = cross_subdomain;
            this.remove();
            this.save() } };
    DATrackerPersistence.prototype.get_cross_subdomain = function() { return this.cross_subdomain };
    DATrackerPersistence.prototype.set_secure = function(secure) { if (secure !== this.secure) { this.secure = secure ? true : false;
            this.remove();
            this.save() } };
    DATrackerPersistence.prototype._add_to_people_queue = function(queue, data) { var q_key = this._get_queue_key(queue),
            q_data = data[queue],
            set_q = this._get_or_create_queue(SET_ACTION),
            set_once_q = this._get_or_create_queue(SET_ONCE_ACTION),
            add_q = this._get_or_create_queue(ADD_ACTION),
            union_q = this._get_or_create_queue(UNION_ACTION),
            append_q = this._get_or_create_queue(APPEND_ACTION, []); if (q_key === SET_QUEUE_KEY) { _.extend(set_q, q_data);
            this._pop_from_people_queue(ADD_ACTION, q_data);
            this._pop_from_people_queue(UNION_ACTION, q_data) } else { if (q_key === SET_ONCE_QUEUE_KEY) { _.each(q_data, function(v, k) { if (!(k in set_once_q)) { set_once_q[k] = v } }) } else { if (q_key === ADD_QUEUE_KEY) { _.each(q_data, function(v, k) { if (k in set_q) { set_q[k] += v } else { if (!(k in add_q)) { add_q[k] = 0 }
                            add_q[k] += v } }, this) } else { if (q_key === UNION_QUEUE_KEY) { _.each(q_data, function(v, k) { if (_.isArray(v)) { if (!(k in union_q)) { union_q[k] = [] }
                                union_q[k] = union_q[k].concat(v) } }) } else { if (q_key === APPEND_QUEUE_KEY) { append_q.push(q_data) } } } } }
        console.log("打印数据:");
        console.log(data);
        this.save() };
    DATrackerPersistence.prototype._pop_from_people_queue = function(queue, data) { var q = this._get_queue(queue); if (!_.isUndefined(q)) { _.each(data, function(v, k) { delete q[k] }, this);
            this.save() } };
    DATrackerPersistence.prototype._get_queue_key = function(queue) { if (queue === SET_ACTION) { return SET_QUEUE_KEY } else { if (queue === SET_ONCE_ACTION) { return SET_ONCE_QUEUE_KEY } else { if (queue === ADD_ACTION) { return ADD_QUEUE_KEY } else { if (queue === APPEND_ACTION) { return APPEND_QUEUE_KEY } else { if (queue === UNION_ACTION) { return UNION_QUEUE_KEY } else { console.error("Invalid queue:", queue) } } } } } };
    DATrackerPersistence.prototype._get_queue = function(queue) { return this["props"][this._get_queue_key(queue)] };
    DATrackerPersistence.prototype._get_or_create_queue = function(queue, default_val) { var key = this._get_queue_key(queue);
        default_val = _.isUndefined(default_val) ? {} : default_val; return this["props"][key] || (this["props"][key] = default_val) };
    DATrackerPersistence.prototype.set_event_timer = function(event_name, timestamp) { var timers = this["props"][EVENT_TIMERS_KEY] || {};
        timers[event_name] = timestamp;
        this["props"][EVENT_TIMERS_KEY] = timers;
        this.save() };
    DATrackerPersistence.prototype.remove_event_timer = function(event_name) { var timers = this["props"][EVENT_TIMERS_KEY] || {}; var timestamp = timers[event_name]; if (!_.isUndefined(timestamp)) { delete this["props"][EVENT_TIMERS_KEY][event_name];
            this.save() } return timestamp };
    var DATrackerLib = function() {};
    var DATrackerPeople = function() {};
    var DATrackerABtest = abtest;
    var create_DAlib = function(token, config, name) { var instance, target = name === PRIMARY_INSTANCE_NAME ? DATracker_master : DATracker_master[name]; if (target && init_type === INIT_MODULE || target && init_type === INIT_SYNC) { instance = target } else { if (target && !_.isArray(target)) { console.error("You have already initialized " + name); return }
            instance = new DATrackerLib() }
        instance._init(token, config, name);
        instance["people"] = new DATrackerPeople();
        instance["people"]._init(instance);
        instance["abtest"] = DATrackerABtest;
        instance["abtest"].init(instance);
        Config.DEBUG = Config.DEBUG || instance.get_config("debug");
        instance["__autotrack_enabled"] = instance.get_config("autotrack"); if (!_.isUndefined(target) && _.isArray(target)) { instance._execute_array.call(instance["people"], target["people"]);
            instance._execute_array(target);
            instance._execute_array.call(instance["abtest"], target["abtest"]) } return instance };
    DATrackerLib.prototype.init = function(token, config, name) { if (_.isUndefined(name)) { console.error("You must name your new library: init(token, config, name)"); return } if (name === PRIMARY_INSTANCE_NAME) { console.error("You must initialize the main DATracker object right after you include the DATracker js snippet"); return } var instance = create_DAlib(token, config, name);
        DATracker_master[name] = instance;
        instance._loaded(); return instance };
    DATrackerLib.prototype._init = function(token, config, name) {
        var _self = this;
        _self["__loaded"] = true;
        _self["config"] = {};
        if (typeof config !== "undefined") { if (typeof config.single_page_config !== "undefined") { if (typeof config.single_page_config.track_replace_state === "undefined") { config.single_page_config.track_replace_state = DEFAULT_CONFIG.single_page_config.track_replace_state } } }
        _self["pageOpenScene"] = "Browser";
        _self.set_config(_.extend({}, DEFAULT_CONFIG, config, { "name": name, "token": token, "callback_fn": (name === PRIMARY_INSTANCE_NAME ? name : PRIMARY_INSTANCE_NAME + "." + name) + "._jsc" }));
        source.init(token);
        campaign.init(token, this);
        _self["_jsc"] = function() {};
        _self.__dom_loaded_queue = [];
        _self.__request_queue = [];
        _self.__disabled_events = [];
        _self._flags = { "disable_all_events": false };
        _self["persistence"] = _self["cookie"] = new DATrackerPersistence(_self["config"]);
        _self["cookie"].register({ sessionReferrer: document.referrer });
        _self["cookie"].register_once({ updatedTime: 0, sessionStartTime: 0 });
        _self["cookie"].register_once({ sendNumClass: { allNum: 0, errSendNum: 0 } });
        var heatmapConfig = _self.get_config("heatmap");
        if (_.isObject(heatmapConfig)) { heatmapConfig.clickmap = heatmapConfig.clickmap || "default" }
        var bridegObj = app_js_bridge(_self);
        _self.get_appStatus = function(func) { var callback = function(app_info) { try { if (typeof func === "function") { func(app_info) } } catch (e) {} };
            bridegObj.getAppStatus(callback) };
        _self._get_SendCall = function(data, event_name, callback, jsTrack) { if (_self.get_config("hubble_render_mode")) { return false }
            bridegObj.getSendCall(data, event_name, callback, jsTrack) };
        heatmap.init(_self, function() { if (DATrackerABtest.isTestDebug() || DATrackerABtest.isEditor()) { _self.set_config({ hubble_render_mode: true }) } else { _self.set_config({ hubble_render_mode: false }) }
            _self._loaded();
            _self._send_da_activate(); if (campaign.data.isAdClick) { _self._ad_click() } if (_self.get_config("is_single_page")) { _self["cookie"].register({ currentReferrer: location.href });
                _self._single_page() } if (_self.get_config("track_pageview")) { _self.track_pageview() } else { _self._session() } })
    };
    DATrackerLib.prototype._sendNativeCall = function(data, event_name, callback, jsTrack) { if (this.get_config("use_app_track")) { if (typeof this._get_SendCall === "function") { this._get_SendCall(data, event_name, callback, jsTrack) } } };
    DATrackerLib.prototype._ad_click = function() { var data = this.track("da_ad_click"); return data };
    DATrackerLib.prototype._session = function(pvCallback) { var sessionStartTime = 1 * this["cookie"].props.sessionStartTime / 1000; var updatedTime = 1 * this["cookie"].props.updatedTime / 1000; var sessionUuid = this["cookie"].props.sessionUuid; var nowDateTime = new Date().getTime(); var nowDate = 1 * nowDateTime / 1000; var otherWBool = !this._check_referer(); if (sessionStartTime == 0 || nowDate > updatedTime + 60 * this.config.session_interval_mins || otherWBool) { if (sessionStartTime == 0) { this["cookie"].register({ sessionUuid: _.UUID(), sessionStartTime: new Date().getTime() });
                this._track_da_session_start() } else { this._track_da_session_close();
                this["cookie"].register({ sessionUuid: _.UUID(), sessionStartTime: new Date().getTime() });
                this._track_da_session_start() } }
        this["cookie"].register({ updatedTime: nowDateTime }); if (typeof pvCallback === "function") { pvCallback() } };
    DATrackerLib.prototype._track_da_session_start = function(page) { var data = this.track("da_session_start"); return data };
    DATrackerLib.prototype._track_da_session_close = function(page) { var time = new Date().getTime() - 1; var sessionStartTime = this.cookie.props.sessionStartTime; if (this.cookie.props.LASTEVENT && this.cookie.props.LASTEVENT.time) { time = this.cookie.props.LASTEVENT.time + 1 } var sessionCloseTime = time; var sessionTotalLength = sessionCloseTime - sessionStartTime; var data = this.track("da_session_close", { sessionCloseTime: sessionCloseTime, sessionTotalLength: sessionTotalLength }); return data };
    DATrackerLib.prototype._check_referer = function() { var referrer = this.cookie.props.sessionReferrer; var bool = true; if (!referrer) { bool = true } else { if (_.get_host(referrer) != window.location.host) { bool = false } } return bool };
    DATrackerLib.prototype._single_page = function() { var _self = this; var current_page_url = location.href; var callback_fn = function() {}; var change = function() { _.innerEvent.trigger("singlePage:change") }; if (this.get_config("single_page_config").mode === "hash") { callback_fn = function() { _self["cookie"].register({ sessionReferrer: current_page_url });
                _self._single_pageview();
                current_page_url = location.href;
                change() } } else { if (this.get_config("single_page_config").mode === "history") { callback_fn = function() { _self._single_pageview();
                    change() } } }
        single_page.init({ mode: this.get_config("single_page_config").mode, callback_fn: callback_fn, track_replace_state: this.get_config("single_page_config").track_replace_state }) };
    DATrackerLib.prototype._loaded = function() { this.get_config("loaded")(this) };
    DATrackerLib.prototype._dom_loaded = function() { _.each(this.__dom_loaded_queue, function(item) { this._track_dom.apply(this, item) }, this);
        _.each(this.__request_queue, function(item) { this._send_request.apply(this, item) }, this);
        delete this.__dom_loaded_queue;
        delete this.__request_queue };
    DATrackerLib.prototype._track_dom = function(DomClass, args) { if (this.get_config("img")) { console.error("You can't use DOM tracking functions with img = true."); return false } if (!DOM_LOADED) { this.__dom_loaded_queue.push([DomClass, args]); return false } var dt = new DomClass().init(this); return dt.track.apply(dt, args) };
    DATrackerLib.prototype._prepare_callback = function(callback, data) {
        if (_.isUndefined(callback)) { return null }
        if (USE_XHR) { var callback_function = function(response) { callback(response, data) }; return callback_function } else {
            var jsc = this["_jsc"];
            var randomized_cb = "" + Math.floor(Math.random() * 100000000);
            var callback_string = this.get_config("callback_fn") + "[" + randomized_cb + "]";
            jsc[randomized_cb] = function(response) { delete jsc[randomized_cb];
                callback(response, data) };
            return callback_string
        }
    };
    DATrackerLib.prototype._send_request = function(url, data, callback, errorFn, otherFn) { if (ENQUEUE_REQUESTS) { this.__request_queue.push(arguments); return } var verbose_mode = this.get_config("verbose"); if (data["verbose"]) { verbose_mode = true } if (this.get_config("test")) { data["test"] = 1 } if (verbose_mode) { data["verbose"] = 1 } if (this.get_config("img")) { data["img"] = 1;
            url += "da.gif" } if (!USE_XHR) { if (callback) { data["callback"] = callback } else { if (verbose_mode || this.get_config("test")) { data["callback"] = "(function(){})" } } }
        data["_"] = new Date().getTime().toString();
        url += "?" + _.HTTPBuildQuery(data); if ("img" in data) { var img = document.createElement("img");
            img.src = url;
            img.width = 1;
            img.height = 1; if (typeof callback === "function") { callback(0) }
            img.onload = function() { this.onload = null };
            img.onerror = function() { this.onerror = null };
            img.onabort = function() { this.onabort = null } } else { if (USE_XHR) { try { var req = new XMLHttpRequest();
                    req.open("GET", url, true);
                    req.withCredentials = false;
                    req.onreadystatechange = function() { if (req.readyState === 4) { if (otherFn) { otherFn() } if (req.status === 200) { if (callback) { if (verbose_mode) { callback(_.JSONDecode(req.responseText)) } else { callback(Number(req.responseText)) } } } else { var error = "Bad HTTP status: " + req.status + " " + req.statusText;
                                console.error(error); if (callback) { if (verbose_mode) { callback({ status: 0, error: error }) } else { callback(0) } } if (errorFn) { errorFn({ state: req.status, statusText: req.statusText }) } } } };
                    req.send(null) } catch (e) { console.error(e); if (otherFn) { otherFn() } if (errorFn) { errorFn({ state: "notSend", statusText: e }) } } } else { var script = document.createElement("script");
                script.type = "text/javascript";
                script.async = true;
                script.defer = true;
                script.src = url; var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(script, s) } } };
    DATrackerLib.prototype._execute_array = function(array) { var fn_name, alias_calls = [],
            other_calls = [],
            tracking_calls = [];
        _.each(array, function(item) { if (item) { fn_name = item[0]; if (typeof item === "function") { item.call(this) } else { if (_.isArray(item) && fn_name === "alias") { alias_calls.push(item) } else { if (_.isArray(item) && fn_name.indexOf("track") !== -1 && typeof this[fn_name] === "function") { tracking_calls.push(item) } else { other_calls.push(item) } } } } }, this); var execute = function(calls, context) { _.each(calls, function(item) { if (_.isFunction(this[item[0]])) { this[item[0]].apply(this, item.slice(1)) } }, context) };
        execute(alias_calls, this);
        execute(other_calls, this);
        execute(tracking_calls, this) };
    DATrackerLib.prototype.push = function(item) { this._execute_array([item]) };
    DATrackerLib.prototype.disable = function(events) { if (typeof events === "undefined") { this._flags.disable_all_events = true } else { this.__disabled_events = this.__disabled_events.concat(events) } };
    DATrackerLib.prototype.track = function(event_name, properties, callback, setData_type) {
        if (typeof callback !== "function") { callback = function() {} }
        if (_.isUndefined(event_name)) { console.error("No event name provided to DATracker.track"); return }
        if (this._event_is_disabled(event_name)) { callback(0); return }
        this["cookie"].load();
        properties = properties || {};
        var otherProperties = {};
        var userSetProperties = _.JSONDecode(_.JSONEncode(properties));
        var start_timestamp = this["persistence"].remove_event_timer(event_name);
        if (!_.isUndefined(start_timestamp)) { var duration_in_ms = new Date().getTime() - start_timestamp;
            otherProperties[EVENT_TIMERS_KEY] = duration_in_ms }
        if (event_name == "da_session_close") { otherProperties["sessionCloseTime"] = userSetProperties["sessionCloseTime"];
            otherProperties["sessionTotalLength"] = userSetProperties["sessionTotalLength"];
            delete userSetProperties["sessionCloseTime"];
            delete userSetProperties["sessionTotalLength"] }
        properties = _.extend({}, _.info.properties(), this["persistence"].properties(), otherProperties);
        var property_blacklist = this.get_config("property_blacklist");
        if (_.isArray(property_blacklist)) { _.each(property_blacklist, function(blacklisted_prop) { delete properties[blacklisted_prop] }) } else { console.error("Invalid value for property_blacklist config: " + property_blacklist) }
        var data_type = DATATYPE;
        if (DEFAULTEVENTID[event_name]) { data_type = DEFAULTEVENTID[event_name].dataType } else { if (setData_type) { data_type = setData_type } }
        if (!_.include(["da_session_start", "da_session_close", "da_activate"], event_name)) { this._session() }
        if (data_type === "e") { if (!this._check_referer()) { this["cookie"].register({ sessionReferrer: location.href }) } }
        if (!this.get_config("is_single_page")) { if (_.include(["da_activate", "da_session_close"], event_name)) { this["cookie"].register({ sessionReferrer: location.href }) } }
        if (this.get_config("is_single_page")) { if (properties["sessionReferrer"] != properties["referrer"]) { properties["referrer"] = properties["sessionReferrer"];
                properties["referring_domain"] = _.info.referringDomain(properties["sessionReferrer"]) } }
        var time = new Date().getTime();
        if (event_name == "da_session_close") { time = properties.sessionCloseTime }
        if (event_name == "da_session_start") {
            time = properties.sessionStartTime
        }
        this.register_once({ "persistedTime": time }, "");
        var data = { "dataType": data_type, "sessionUuid": this.cookie.props.sessionUuid, "userId": this.persistence.props.user_id, "currentUrl": properties.current_url, "referrer": properties.referrer, "referrerDomain": properties.referring_domain, "sdkVersion": properties.lib_version, "sdkType": SDKTYPE, "deviceOs": properties.deviceOs, "deviceOsVersion": properties.deviceOsVersion, "devicePlatform": properties.hb_lib, "browser": properties.browser, "browserVersion": properties.browser_version, "screenWidth": properties.screen_width, "screenHeight": properties.screen_height, "sessionTotalLength": properties.sessionTotalLength, "eventId": event_name, "appKey": this.get_config("token"), "time": time, "persistedTime": this.cookie.props.persistedTime, "deviceUdid": this.get_distinct_id(), "deviceModel": _.trim(properties.deviceModel), "pageTitle": properties.title, "urlPath": properties.url_path, "currentDomain": properties.currentDomain, "pageOpenScene": this["pageOpenScene"] };
        var utm = campaign.getParams();
        var secondLevelSource = source.getParams();
        data = _.extend(data, utm);
        data = _.extend(data, secondLevelSource);
        if (data_type === "e") { userSetProperties = _.extend({}, this.cookie.props["superProperties"] || {}, userSetProperties) }
        if (data_type === "pv") { if (typeof this.pageview_attributes === "object") { userSetProperties = _.extend({}, this.pageview_attributes || {}, userSetProperties) } }
        data["attributes"] = userSetProperties;
        if (!_.size(data["attributes"])) { delete data["attributes"] }
        if (!data["referrer"]) { delete data["referrer"] }
        if (!data["referrerDomain"]) { delete data["referrerDomain"] }
        if (!data["pageTitle"]) { delete data["pageTitle"] }
        if (!data["urlPath"]) { delete data["urlPath"] }
        if (!data["userId"]) { delete data["userId"] }
        if (properties[EVENT_TIMERS_KEY]) { data[EVENT_TIMERS_KEY] = properties[EVENT_TIMERS_KEY];
            delete properties[EVENT_TIMERS_KEY] }
        if (this.get_config("hubble_render_mode")) { DATrackerABtest.debugTrack(data); return false }
        var truncateLength = this.get_config("truncateLength");
        var truncated_data = data;
        if (Object.prototype.toString.call(truncateLength) === "[object Number]" && truncateLength > 0) { truncated_data = _.truncate(data, truncateLength) }
        var json_data = _.JSONEncode(truncated_data);
        var encoded_data = _.base64Encode(json_data);
        var appkey_data = _.sha1(this.get_config("token"));
        console.log(PRIMARY_INSTANCE_NAME + " REQUEST:");
        console.log(truncated_data);
        var self = this;
        var otherFn = function() { var sendNumClass = self.cookie.props.sendNumClass; if (event_name === "da_session_start") { sendNumClass.allNum = 0;
                sendNumClass.errSendNum = 0 } if (event_name !== "da_send_error" && event_name !== "da_activate") { sendNumClass.allNum += 1 }
            self["cookie"].register({ sendNumClass: sendNumClass }) };
        var errorFn = function(errObj) { if (event_name !== "da_send_error" && event_name !== "da_activate") { var errSendNum = self.cookie.props.sendNumClass.errSendNum; var allNum = self.cookie.props.sendNumClass.allNum; if (event_name === "da_session_start") { errSendNum = 0 }
                errSendNum += 1; if (self.get_config("send_error")) { errObj = _.extend({ eventId: event_name, time: time, allNum: self.cookie.props.sendNumClass.allNum, errSendNum: errSendNum }, errObj);
                    self.track("da_send_error", errObj) }
                self["cookie"].register({ sendNumClass: { allNum: self.cookie.props.sendNumClass.allNum, errSendNum: errSendNum } }) } };
        var jsTrack = function() { self._send_request(self.get_config("api_host") + "/track/w/", { "data": encoded_data, "appKey": appkey_data }, self._prepare_callback(callback, truncated_data), errorFn, otherFn) };
        if (this.get_config("use_app_track")) { this._sendNativeCall(json_data, event_name, callback, jsTrack) } else { jsTrack() }
        if (this.get_config("debug")) { if (_.isFunction(this.debug)) { if (this.get_config("use_app_track")) { if (!_.include(["da_session_close", "da_session_start", "da_activate", "da_u_login", "da_u_logout", "da_u_signup"], event_name)) { this.debug({ data: encoded_data }) } } else { this.debug({ data: encoded_data }) } } }
        if (!_.include(["da_session_close", "da_session_start"], event_name)) { this["cookie"].register({ LASTEVENT: { eventId: event_name, time: time } }) }
        return truncated_data
    };
    DATrackerLib.prototype.track_pageview = function(attributes, page, call) { if (_.isUndefined(page)) { page = document.location.href } var self = this; var callback = function() { var data = self.track("da_screen", _.extend({}, attributes)); if (typeof call === "function") { call(data) } };
        this._session(callback) };
    DATrackerLib.prototype._send_da_activate = function() { var data = {}; if (!this.get_distinct_id()) { this.register_once({ "deviceUdid": _.UUID() }, "");
            data = this.track("da_activate") } return data };
    DATrackerLib.prototype.register_attributes = function(attributes) { if (typeof attributes === "object") { var superProperties = this.cookie.props["superProperties"] || {};
            superProperties = _.extend({}, superProperties, attributes);
            this.register({ "superProperties": superProperties }) } };
    DATrackerLib.prototype.register_attributes_once = function(attributes) { if (typeof attributes === "object") { var superProperties = this.cookie.props["superProperties"] || {};
            superProperties = _.extend({}, attributes, superProperties);
            this.register({ "superProperties": superProperties }) } };
    DATrackerLib.prototype.current_attributes = function(callback) {
        if (typeof callback === "function") {
            callback(this.cookie.props["superProperties"] || {})
        }
    };
    DATrackerLib.prototype.unregister_attributes = function(propertyName) { if (typeof propertyName === "string") { var superProperties = this.cookie.props["superProperties"] || {};
            delete superProperties[propertyName];
            this.register({ "superProperties": superProperties }) } };
    DATrackerLib.prototype.clear_attributes = function() { this.register({ "superProperties": {} }) };
    DATrackerLib.prototype.single_pageview = function() {};
    DATrackerLib.prototype._single_pageview = function() { var current_page_url = location.href; var currentReferrer = this.cookie.props.currentReferrer || location.href; if (this.get_config("is_single_page")) { if (this.get_config("single_page_config").mode === "hash" || this.get_config("single_page_config").mode === "history" || this.get_config("single_page_config").mode === "memoryhistory") { this["cookie"].register({ sessionReferrer: currentReferrer, currentReferrer: current_page_url }) }
            this.track_pageview({}, current_page_url) } };
    DATrackerLib.prototype.track_links = function() { return this._track_dom.call(this, LinkTracker, arguments) };
    DATrackerLib.prototype.time_event = function(event_name) { if (_.isUndefined(event_name)) { console.error("No event name provided to DATracker.time_event"); return } if (this._event_is_disabled(event_name)) { return }
        this["persistence"].set_event_timer(event_name, new Date().getTime()) };
    DATrackerLib.prototype.register = function(props, days) { this["persistence"].register(props, days) };
    DATrackerLib.prototype.register_once = function(props, default_value, days) { this["persistence"].register_once(props, default_value, days) };
    DATrackerLib.prototype.unregister = function(property) { this["persistence"].unregister(property) };
    DATrackerLib.prototype._register_single = function(prop, value) { var props = {};
        props[prop] = value;
        this.register(props) };
    DATrackerLib.prototype.signup = function(user_id) { var oldUserId = this.get_user_id(); var data = {};
        oldUserId = oldUserId == undefined ? "" : oldUserId; if (oldUserId == user_id) { return } else { this._register_single("user_id", user_id);
            data = this.track("da_u_signup", { "oldUserId": oldUserId, "newUserId": user_id }) } return data };
    DATrackerLib.prototype.login = function(user_id) { var data_signup = this.signup(user_id); var data_login = this.track("da_u_login");
        this._register_single("user_id", user_id); return { data_signup: data_signup, data_login: data_login } };
    DATrackerLib.prototype.logout = function(callback) { this.unregister("user_id"); var hasCalled = false;

        function track_callback() { if (!hasCalled) { hasCalled = true; if (typeof callback === "function") { callback() } } }
        setTimeout(track_callback, this.get_config("track_links_timeout")); var data = this.track("da_u_logout", {}, track_callback); return data };
    DATrackerLib.prototype.set_userId = function(user_id) { this._register_single("user_id", user_id) };
    DATrackerLib.prototype.reset = function() { this["persistence"].clear();
        this.register_once({ "deviceUdid": _.UUID() }, "") };
    DATrackerLib.prototype.get_distinct_id = function() { return this.get_property("deviceUdid") };
    DATrackerLib.prototype.get_user_id = function() { return this.get_property("user_id") };
    DATrackerLib.prototype.set_config = function(config) { if (_.isObject(config)) { _.extend(this["config"], config); if (!this.get_config("persistence_name")) { this["config"]["persistence_name"] = this["config"]["cookie_name"] } if (!this.get_config("disable_persistence")) { this["config"]["disable_persistence"] = this["config"]["disable_cookie"] } if (this["persistence"]) { this["persistence"].update_config(this["config"]) }
            Config.DEBUG = Config.DEBUG || this.get_config("debug") } };
    DATrackerLib.prototype.get_config = function(prop_name) { return this["config"][prop_name] };
    DATrackerLib.prototype.get_property = function(property_name) { return this["persistence"]["props"][property_name] };
    DATrackerLib.prototype.toString = function() { var name = this.get_config("name"); if (name !== PRIMARY_INSTANCE_NAME) { name = PRIMARY_INSTANCE_NAME + "." + name } return name };
    DATrackerLib.prototype._event_is_disabled = function(event_name) { return _.isBlockedUA(userAgent) || this._flags.disable_all_events || _.include(this.__disabled_events, event_name) };
    DATrackerPeople.prototype._init = function(mixpanel_instance) { this._DATracker = mixpanel_instance };
    DATrackerPeople.prototype.set = function(prop, to, callback) { var data = {}; var $set = {}; if (_.isObject(prop)) { _.each(prop, function(v, k) { if (!this._is_reserved_property(k)) { $set[k] = v } }, this);
            callback = to } else { $set[prop] = to } if ($set["$userProfile"] === undefined) { $set["$type"] = "profile_set";
            $set = { "$userProfile": $set } }
        data[SET_ACTION] = $set; return this._send_request(data, callback) };
    DATrackerPeople.prototype.set_once = function(prop, to, callback) { var data = {}; var $set_once = {}; if (_.isObject(prop)) { _.each(prop, function(v, k) { if (!this._is_reserved_property(k)) { $set_once[k] = v } }, this);
            callback = to } else { $set_once[prop] = to } if ($set_once["$userProfile"] === undefined) { $set_once["$type"] = "profile_set_once";
            $set_once = { "$userProfile": $set_once } }
        data[SET_ONCE_ACTION] = $set_once; return this._send_request(data, callback) };
    DATrackerPeople.prototype.set_realname = function(realname) { this.set({ "$realName": realname }) };
    DATrackerPeople.prototype.set_country = function(country) { this.set({ "$country": country }) };
    DATrackerPeople.prototype.set_province = function(region) { this.set({ "$region": region }) };
    DATrackerPeople.prototype.set_region = function(region) { this.set({ "$region": region }) };
    DATrackerPeople.prototype.set_city = function(city) { this.set({ "$city": city }) };
    DATrackerPeople.prototype.set_age = function(age) { this.set({ "$age": age }) };
    DATrackerPeople.prototype.set_gender = function(gender) { if (gender == 0 || gender == 1 || gender == 2) { this.set({ "$gender": gender }) } };
    DATrackerPeople.prototype.set_birthday = function(birthday) { if (!_.checkTime(birthday)) { return }
        this.set({ "$birthday": birthday }) };
    DATrackerPeople.prototype.set_account = function(account) { this.set({ "$account": account }) };
    DATrackerPeople.prototype.set_populationWithAccount = function(account, realname, birthday, gender) { if (!account || !realname || !birthday || !gender) { return } if (!_.checkTime(birthday)) { return }
        this.set({ "$account": account, "$realName": realname, "$birthday": birthday, "$gender": gender }) };
    DATrackerPeople.prototype.set_location = function(country, region, city) { if (!country || !region || !city) { return }
        this.set({ "$country": country, "$region": region, "$city": city }) };
    DATrackerPeople.prototype.append = function(list_name, value, callback) { var data = {}; var $append = {}; if (_.isObject(list_name)) { _.each(list_name, function(v, k) { if (!this._is_reserved_property(k)) { $append[k] = v } }, this);
            callback = value } else { $append[list_name] = value } if ($append["$userProfile"] === undefined) { $append["$type"] = "profile_append";
            $append = { "$userProfile": $append } }
        data[SET_ONCE_ACTION] = $append; return this._send_request(data, callback) };
    DATrackerPeople.prototype.toString = function() { return this._DATracker.toString() + ".people" };
    DATrackerPeople.prototype._send_request = function(data, callback) { if (this._DATracker.cookie.props.hubble_render_mode) { return false }
        data["dataType"] = "ie";
        data["appKey"] = this._get_config("token");
        data["deviceUdid"] = this._DATracker.get_distinct_id();
        data["userId"] = this._DATracker.get_user_id();
        data["time"] = new Date().getTime();
        data["sdkType"] = SDKTYPE;
        data["eventId"] = "da_user_profile";
        data["persistedTime"] = this._DATracker.cookie.props.persistedTime;
        data["pageOpenScene"] = "Browser"; var utm = campaign.getParams(); var secondLevelSource = source.getParams();
        data = _.extend(data, utm);
        data = _.extend(data, secondLevelSource); var date_encoded_data = _.encodeDates(data); var truncateLength = this._DATracker.get_config("truncateLength"); var truncated_data = date_encoded_data; if (Object.prototype.toString.call(truncateLength) === "[object Number]" && truncateLength > 0) { truncated_data = _.truncate(date_encoded_data, truncateLength) } var json_data = _.JSONEncode(date_encoded_data); var encoded_data = _.base64Encode(json_data); if (!true) {}
        console.log("打印数据:");
        console.log(truncated_data); var appkey_data = _.sha1(this._DATracker.get_config("token")); var self = this; var jsTrack = function() { self._DATracker._send_request(self._get_config("api_host") + "/track/w/", { "data": encoded_data, "appKey": appkey_data }, self._DATracker._prepare_callback(callback, truncated_data)) }; if (this._DATracker.get_config("use_app_track")) { this._DATracker._sendNativeCall(json_data, "$da_user_profile", callback, jsTrack) } else { jsTrack() } if (this._DATracker.get_config("debug")) { if (_.isFunction(this._DATracker.debug)) { this._DATracker.debug({ data: encoded_data }) } } return truncated_data };
    DATrackerPeople.prototype._get_config = function(conf_var) { return this._DATracker.get_config(conf_var) };
    DATrackerPeople.prototype._user_logined = function() { var user_id = this._DATracker.get_user_id(); return user_id !== undefined };
    DATrackerPeople.prototype._enqueue = function(data) { if (SET_ACTION in data) { this._DATracker["persistence"]._add_to_people_queue(SET_ACTION, data) } else { if (SET_ONCE_ACTION in data) { this._DATracker["persistence"]._add_to_people_queue(SET_ONCE_ACTION, data) } else { if (ADD_ACTION in data) { this._DATracker["persistence"]._add_to_people_queue(ADD_ACTION, data) } else { if (APPEND_ACTION in data) { this._DATracker["persistence"]._add_to_people_queue(APPEND_ACTION, data) } else { if (UNION_ACTION in data) { this._DATracker["persistence"]._add_to_people_queue(UNION_ACTION, data) } else { console.error("Invalid call to _enqueue():", data) } } } } } };
    DATrackerPeople.prototype._is_reserved_property = function(prop) { return prop === "$deviceUdid" || prop === "$token" };
    DATrackerLib.prototype["init"] = DATrackerLib.prototype.init;
    DATrackerLib.prototype["reset"] = DATrackerLib.prototype.reset;
    DATrackerLib.prototype["disable"] = DATrackerLib.prototype.disable;
    DATrackerLib.prototype["time_event"] = DATrackerLib.prototype.time_event;
    DATrackerLib.prototype["track"] = DATrackerLib.prototype.track;
    DATrackerLib.prototype["track_links"] = DATrackerLib.prototype.track_links;
    DATrackerLib.prototype["track_pageview"] = DATrackerLib.prototype.track_pageview;
    DATrackerLib.prototype["register"] = DATrackerLib.prototype.register;
    DATrackerLib.prototype["register_once"] = DATrackerLib.prototype.register_once;
    DATrackerLib.prototype["unregister"] = DATrackerLib.prototype.unregister;
    DATrackerLib.prototype["alias"] = DATrackerLib.prototype.alias;
    DATrackerLib.prototype["set_config"] = DATrackerLib.prototype.set_config;
    DATrackerLib.prototype["get_config"] = DATrackerLib.prototype.get_config;
    DATrackerLib.prototype["get_property"] = DATrackerLib.prototype.get_property;
    DATrackerLib.prototype["get_distinct_id"] = DATrackerLib.prototype.get_distinct_id;
    DATrackerLib.prototype["toString"] = DATrackerLib.prototype.toString;
    DATrackerLib.prototype["login"] = DATrackerLib.prototype.login;
    DATrackerLib.prototype["logout"] = DATrackerLib.prototype.logout;
    DATrackerLib.prototype["get_user_id"] = DATrackerLib.prototype.get_user_id;
    DATrackerLib.prototype["register_attributes"] = DATrackerLib.prototype.register_attributes;
    DATrackerLib.prototype["register_attributes_once"] = DATrackerLib.prototype.register_attributes_once;
    DATrackerLib.prototype["clear_attributes"] = DATrackerLib.prototype.clear_attributes;
    DATrackerLib.prototype["unregister_attributes"] = DATrackerLib.prototype.unregister_attributes;
    DATrackerLib.prototype["current_attributes"] = DATrackerLib.prototype.current_attributes;
    DATrackerPersistence.prototype["properties"] = DATrackerPersistence.prototype.properties;
    DATrackerPersistence.prototype["get_cross_subdomain"] = DATrackerPersistence.prototype.get_cross_subdomain;
    DATrackerPersistence.prototype["clear"] = DATrackerPersistence.prototype.clear;
    DATrackerPeople.prototype["set"] = DATrackerPeople.prototype.set;
    DATrackerPeople.prototype["set_once"] = DATrackerPeople.prototype.set_once;
    DATrackerPeople.prototype["append"] = DATrackerPeople.prototype.append;
    DATrackerPeople.prototype["toString"] = DATrackerPeople.prototype.toString;
    var instances = {};
    var extend_mp = function() { _.each(instances, function(instance, name) { if (name !== PRIMARY_INSTANCE_NAME) { DATracker_master[name] = instance } });
        DATracker_master["_"] = _ };
    var override_mp_init_func = function() { DATracker_master["init"] = function(token, config, name) { if (name) { if (!DATracker_master[name]) { DATracker_master[name] = instances[name] = create_DAlib(token, config, name);
                    DATracker_master[name]._loaded() } return DATracker_master[name] } else { var instance = DATracker_master; if (instances[PRIMARY_INSTANCE_NAME]) { instance = instances[PRIMARY_INSTANCE_NAME] } else { if (token) { instance = create_DAlib(token, config, PRIMARY_INSTANCE_NAME);
                        instance._loaded();
                        instances[PRIMARY_INSTANCE_NAME] = instance } }
                DATracker_master = instance; if (init_type === INIT_SNIPPET || init_type === INIT_SYNC) { window[PRIMARY_INSTANCE_NAME] = DATracker_master }
                extend_mp() } } };
    var add_dom_loaded_handler = function() {
        function dom_loaded_handler() { if (dom_loaded_handler.done) { return }
            dom_loaded_handler.done = true;
            DOM_LOADED = true;
            ENQUEUE_REQUESTS = false;
            _.each(instances, function(inst) { inst._dom_loaded() }) }

        function do_scroll_check() { try { document.documentElement.doScroll("left") } catch (e) { setTimeout(do_scroll_check, 1); return }
            dom_loaded_handler() } if (document.addEventListener) { if (document.readyState === "complete") { dom_loaded_handler() } else { document.addEventListener("DOMContentLoaded", dom_loaded_handler, false) } } else { if (document.attachEvent) { document.attachEvent("onreadystatechange", dom_loaded_handler); var toplevel = false; try { toplevel = window.frameElement === null } catch (e) {} if (document.documentElement.doScroll && toplevel) { do_scroll_check() } } }
        _.register_event(window, "load", dom_loaded_handler, true) };

    function init_from_snippet() { init_type = INIT_SNIPPET;
        DATracker_master = window[PRIMARY_INSTANCE_NAME]; if (_.isUndefined(DATracker_master)) { console.critical('"DATracker" object not initialized. Ensure you are using the latest version of the DATracker JS Library along with the snippet we provide.'); return } if (DATracker_master["__loaded"] || DATracker_master["config"] && DATracker_master["persistence"]) { console.error("DATracker library has already been downloaded at least once."); return } var snippet_version = DATracker_master["__SV"] || 0; if (snippet_version < 1.1) { console.critical("Version mismatch; please ensure you're using the latest version of the DATracker code snippet."); return }
        _.each(DATracker_master["_i"], function(item) { if (item && _.isArray(item)) { instances[item[item.length - 1]] = create_DAlib.apply(this, item) } });
        override_mp_init_func();
        DATracker_master["init"]();
        _.each(instances, function(instance) { instance._loaded() });
        add_dom_loaded_handler() }
    init_from_snippet()
}());