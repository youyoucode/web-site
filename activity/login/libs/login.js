! function(e) {
    function t(r) { if (n[r]) return n[r].exports; var a = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(a.exports, a, a.exports, t), a.l = !0, a.exports } var n = {}; return t.m = e, t.c = n, t.d = function(e, n, r) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r }) }, t.n = function(e) { var n = e && e.__esModule ? function() { return e["default"] } : function() { return e }; return t.d(n, "a", n), n }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 212) }({ 112: function(e, t, n) { "use strict";

        function r(e) { return /^1[3-9][0-9]{9}$/.test(e) }

        function a(e) { return /^[\d|\w]{4}$/.test(e) }

        function o(e) { return /^[\w|\d]{4}$/.test(e) }

        function i(e) { return /^[^\s]{6,20}$/.test(e) }

        function s(e) { return /^[\u4e00-\u9fa5]{2,8}$/.test(e) }

        function u(e) { return /^([A-Za-z]+\s?)*[A-Za-z]{0,16}$/.test(e) }

        function c(e) { return /^\d{4}(-)\d{1,2}(-)\d{1,2}$/.test(e) }

        function d() { return navigator.userAgent.indexOf("MSIE") > 0 && (navigator.userAgent.indexOf("MSIE 8.0") > 0 || !window.innerWidth) ? !0 : void 0 }
        Object.defineProperty(t, "__esModule", { value: !0 }), t.isMobile = r, t.isSMSCode = a, t.isImageCode = o, t.isPassword = i, t.isChineseName = s, t.isEnglishName = u, t.isBirthday = c, t.isIE_8 = d }, 127: function(e, t, n) { "use strict";

        function r() { return $.ajax({ url: "/rest/parentrest/api/parent/getParentInfo", cache: !1, method: "GET", dataType: "json", headers: { Authorization: f.a.get("Authorization").replace(/\"/g, "") } }) }

        function a(e) { return $.ajax({ url: "/rest/parentrest/api/student/getStudentInfo", cache: !1, method: "GET", data: { studentId: e }, dataType: "json", headers: { Authorization: f.a.get("Authorization").replace(/\"/g, "") } }) }

        function o(e, t, n, r, a) { return $.post("/rest/parentrest/api/parent/changePassword", { mobile: e, password: t, verifyCode: n, imageCode: r, key: a }) }

        function i() { return $.ajax({ url: "/rest/parentrest/api/verifycode/image", method: "GET", cache: !1 }) }

        function s(e, t, n, r) { return $.ajax({ url: "/rest/parentrest/api/verifycode/sms", data: { mobile: e, imageCode: t, key: n, source: r }, method: "POST", cache: !1 }) }

        function u(e, t, n, r) { return $.ajax({ url: "http://sso.youyoucode.cn/api/users/login", data: { mobile: e, password: t, imageCode: n, key: r }, method: "POST" }) }

        function c(e, t, n, r, a, o, i) { return $.ajax({ url: "/rest/parentrest/api/parent/signup", data: { mobile: e, birthday: t, password: n, verifyCode: r, referee: a ? a : "", channelId: o ? o : "156", channelKeyword: i ? i : "" }, method: "POST" }) }

        function d(e, t, n, r) { return $.ajax({ url: "/rest/parentrest/api/student/signup", data: { parentId: f.a.get("parentId"), chineseName: e, englishName: t, gender: n, birthday: r }, method: "POST", headers: { Authorization: f.a.get("Authorization").replace(/\"/g, "") } }) }
        n.d(t, "c", function() { return r }), n.d(t, "e", function() { return a }), n.d(t, "a", function() { return o }), n.d(t, "b", function() { return i }), n.d(t, "d", function() { return s }), n.d(t, "f", function() { return u }), n.d(t, "h", function() { return c }), n.d(t, "g", function() { return d }); var l = n(4),
            f = n.n(l) }, 212: function(e, t, n) { "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }); var r = n(112),
            a = n(127);
        $(document).ready(function() {
            function e(e, t) {
                function n() { $(a + " .message").removeClass("error").text("") }

                function r(e) { c(), $(a + " .message").text(e).addClass("error") } var a = e,
                    o = t; return $(a + " input").on("focus", function(e) { $(e.target).parent(".input-group").addClass("active") }), $(a + " input").on("blur", function(e) { n(), $(e.target).parent(".input-group").removeClass("active"); var t = $(e.target).val(); "" !== t && null !== t && (o.validate(t) ? n() : r(o.error)) }), { clear: function() { return $(a + " input").val("") }, aside: function() { return $(a + " .input-aside") }, val: function() { return $(a + " input").val() }, keypress: function(e) { return $(a + " input").keypress(e) }, show: function() { $(a).removeClass("hide") }, setErrorMessage: r, clearError: n, isEmpty: function() { return $(a).hasClass("hide") ? !1 : o.empty($(a + " input").val()) }, validate: function() { return $(a).hasClass("hide") ? !0 : o.validate($(a + " input").val()) ? !0 : (r(o.error), !1) } } }

            function t(e) { return "" === e || null === e }

            function o() { var e = ".vipkid.com.cn",
                    t = ""; if (E.prop("checked") === !0) { var n = new Date(new Date - 1 + 31536e6);
                    t = n.toUTCString() } return { domain: e, expires: t, path: "/" } }

            function i(e) { var t = o(); if (e) { var n = "";
                    (e.chineseName || e.englishName) && (n = e.chineseName && "" !== e.chineseName ? e.chineseName : e.englishName, l.set("userName", n, t)), e.id && (l.set("userId", e.id, t), l.set("studentId", e.id, t)) } }

            function s(e) { var t = o(); if (e) { if (e.token && e.id) { var n = "" === t.expires ? "" : ";Expires=" + t.expires;
                        document.cookie = 'Authorization="parent ' + e.id + " " + e.token + '";Domain=' + t.domain + n + ";path=/" }
                    e.familyId && l.set("familyId", e.familyId, t), e.token && l.set("userToken", e.token, t), e.id && l.set("parentId", e.id, t) } }

            function u() { window.location.href = "/" }

            function c() { var e = [v, _, I],
                    t = !0,
                    n = !1,
                    r = void 0; try { for (var a, o = e[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) { var i = a.value;
                        i.clearError() } } catch (s) { n = !0, r = s } finally { try {!t && o["return"] && o["return"]() } finally { if (n) throw r } } }

            function d(e) { x.val("登录中...").addClass("btn-disabled").attr("disabled", "disabled"), Object(a.f)(e.mobile, e.password, e.imageCode, e.key).done(function(e) { s(e.data), e.data.studentIds && e.data.studentIds[f] ? Object(a.e)(e.data.studentIds[f]).done(function(e) {
                        (e.data.chineseName || e.data.englishName) && (i(e.data), u()) }).fail(function() { u() }) : u() }).fail(function(e) { var t = {}; try { t = JSON.parse(e.responseText) } catch (n) { alert("出了点意外，登录不成功，请稍后再试。") } "INVALID_INPUT:LOGIN_FAIL" === t.msg ? _.setErrorMessage(p.USER_OR_PWD_ERROR) : "INVALID_INPUT:IMAGE_CODE_INVALID" === t.msg ? I.setErrorMessage(p.IMAGE_CODE_INVALID) : "INVALID_INPUT:EXCEED_LOGIN_FAIL_NUM" === t.msg ? I.enable() : _.setErrorMessage(p.USER_OR_PWD_ERROR), I.isEnabled && I.enable(), x.val("登录").removeClass("btn-disabled").attr("disabled", null) }) } var l = n(4),
                f = 0,
                p = { MOBILE_INVALID: "请正确输入手机号码", PASSWORD_INVALID: "请输入正确的密码", USER_OR_PWD_ERROR: "手机号或密码输入错误", IMAGE_CODE_INVALID: "验证码错误" },
                m = function() { return { empty: null, validate: null, error: null } },
                h = m();
            h.empty = t, h.validate = r.isMobile, h.error = p.MOBILE_INVALID; var g = m();
            g.empty = t, g.validate = r.isPassword, g.error = p.PASSWORD_INVALID; var y = m();
            y.empty = t, y.validate = r.isImageCode, y.error = p.IMAGE_CODE_INVALID; var v = e("#js-user-name", h),
                _ = e("#js-password", g),
                I = e("#js-image-code", y),
                b = $("#js-login-field"),
                E = $("#js-remember-me"),
                x = $("#js-submit-btn");
            I.isEnabled = !1, I.key = "", I.enable = function() { I.show(), b.addClass("with-image-code"), Object(a.b)().done(function(e) { I.clear(), I.aside().children("img").first().attr("src", e.data.imageCode), I.key = e.data.key, I.isEnabled = !0 }) }, I.aside().click(function() { I.enable() }), I.keypress(function(e) { 13 == e.which && x.click() }), _.keypress(function(e) { 13 == e.which && x.click() }), x.click(function() { return v.isEmpty() ? (v.setErrorMessage(p.MOBILE_INVALID), !1) : _.isEmpty() ? (_.setErrorMessage(p.PASSWORD_INVALID), !1) : I.isEmpty() ? (I.setErrorMessage(p.IMAGE_CODE_INVALID), !1) : void(v.validate() && _.validate() && I.validate() && d({ mobile: v.val(), password: _.val(), imageCode: I.val(), key: I.key })) }) }) }, 4: function(e, t, n) { var r, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e };! function(o, i) { "use strict"; var s = function(e) { if ("object" !== a(e.document)) throw new Error("Cookies.js requires a `window` with a `document` object"); var t = function n(e, t, r) { return 1 === arguments.length ? n.get(e) : n.set(e, t, r) }; return t._document = e.document, t._cacheKeyPrefix = "cookey.", t._maxExpireDate = new Date("Fri, 31 Dec 9999 23:59:59 UTC"), t.defaults = { path: "/", secure: !1 }, t.get = function(e) { t._cachedDocumentCookie !== t._document.cookie && t._renewCache(); var n = t._cache[t._cacheKeyPrefix + e]; return n === i ? i : decodeURIComponent(n) }, t.set = function(e, n, r) { return r = t._getExtendedOptions(r), r.expires = t._getExpiresDate(n === i ? -1 : r.expires), t._document.cookie = t._generateCookieString(e, n, r), t }, t.expire = function(e, n) { return t.set(e, i, n) }, t._getExtendedOptions = function(e) { return { path: e && e.path || t.defaults.path, domain: e && e.domain || t.defaults.domain, expires: e && e.expires || t.defaults.expires, secure: e && e.secure !== i ? e.secure : t.defaults.secure } }, t._isValidDate = function(e) { return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime()) }, t._getExpiresDate = function(e, n) { if (n = n || new Date, "number" == typeof e ? e = e === 1 / 0 ? t._maxExpireDate : new Date(n.getTime() + 1e3 * e) : "string" == typeof e && (e = new Date(e)), e && !t._isValidDate(e)) throw new Error("`expires` parameter cannot be converted to a valid Date instance"); return e }, t._generateCookieString = function(e, t, n) { e = e.replace(/[^#$&+\^`|]/g, encodeURIComponent), e = e.replace(/\(/g, "%28").replace(/\)/g, "%29"), t = (t + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent), n = n || {}; var r = e + "=" + t; return r += n.path ? ";path=" + n.path : "", r += n.domain ? ";domain=" + n.domain : "", r += n.expires ? ";expires=" + n.expires.toUTCString() : "", r += n.secure ? ";secure" : "" }, t._getCacheFromString = function(e) { for (var n = {}, r = e ? e.split("; ") : [], a = 0; a < r.length; a++) { var o = t._getKeyValuePairFromCookieString(r[a]);
                            n[t._cacheKeyPrefix + o.key] === i && (n[t._cacheKeyPrefix + o.key] = o.value) } return n }, t._getKeyValuePairFromCookieString = function(e) { var t = e.indexOf("=");
                        t = 0 > t ? e.length : t; var n, r = e.substr(0, t); try { n = decodeURIComponent(r) } catch (a) { console && "function" == typeof console.error && console.error('Could not decode cookie with key "' + r + '"', a) } return { key: n, value: e.substr(t + 1) } }, t._renewCache = function() { t._cache = t._getCacheFromString(t._document.cookie), t._cachedDocumentCookie = t._document.cookie }, t._areEnabled = function() { var e = "cookies.js",
                            n = "1" === t.set(e, 1).get(e); return t.expire(e), n }, t.enabled = t._areEnabled(), t },
                u = "object" === a(o.document) ? s(o) : s;
            r = function() { return u }.call(t, n, t, e), !(r !== i && (e.exports = r)) }("undefined" == typeof window ? this : window) } });