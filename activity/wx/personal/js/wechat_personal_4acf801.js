P.app.on("env-ready", function() {
    function t(t, n) {
        if (0 == t.length) $(".tacitly-no").show(), $(".tacitly-info").hide();
        else
            for (var i = 0; i < t.length; i++) {
                var s = "";
                if (s += '<li class="tacitly-course">', s += '<p class="tacitly-time">' + e(t[i].stamp) + "</p>", s += '<div class="tacitly-lesson">', s += '<div class="lesson-pic">', 1 == t[i].ctype) {
                    for (var a = 0; a < n.users.length; a++)
                        if (n.users[a].id == t[i].infos.uid || n.users[a].id == t[i].infos.teaid) {
                            var o = n.users[a].name;
                            s += '<img src="' + n.users[a].avatar + '" alt=""/>'
                        }
                } else s += '<img src="/klian/web/dist/kid/mobile/bind_user/images/pictureCourse_01e9c3b.png" alt=""/>';
                s += "</div>", s += '<div class="lesson-info">';
                for (var c = 0; c < n.curriculums.length; c++) n.curriculums[c].kid == t[i].infos.kid && (s += '<div><span class="lesson-name">' + n.curriculums[c].title + "</span></div>", s += 1 == t[i].ctype ? '<div class="alike">' + o + "</div>" : '<div class="alike">伴鱼优选教师</div>');
                4 == t[i].ctype && 0 == t[i].infos.lessonid, s += "</div>", s += "</div>", s += "</li>", $(".tacitly-info").append(s)
            }
    }

    function n(t) {
        var n = [];
        return t.classroominfos.length > 0 && t.classroominfos.forEach(function(t) {
            n.push({
                ctype: 1,
                stamp: t.stamp,
                infos: t
            })
        }), t.distlessinfos.length > 0 && t.distlessinfos.forEach(function(t) {
            n.push({
                ctype: 4,
                stamp: t.stamp,
                infos: t
            })
        }), n
    }

    function e(t) {
        var n = 1e3 * t,
            e = new Date(n),
            i = e.getMonth() + 1,
            s = e.getDate(),
            a = e.getHours(),
            o = pad(e.getMinutes(), 2);
        return e.getFullYear() + "-" + i + "-" + s + "  " + a + ":" + o
    }

    function i(t, n) {
        var n = (n || "t") + "=",
            e = new RegExp(n + "\\d+"),
            i = +new Date;
        if (t.indexOf(n) > -1) return t.replace(e, n + i);
        if (t.indexOf("?") > -1) {
            var s = t.split("?");
            return s[1] ? s[0] + "?" + n + i + "&" + s[1] : s[0] + "?" + n + i
        }
        return t.indexOf("#") > -1 ? t.split("#")[0] + "?" + n + i + location.hash : t + "?" + n + i
    }
    var s = P.account.getUser();
    P.post("/profile/stu/me/wechat", {}, function(t) {
        var n = Math.floor(t.ent.duration / 60);
        t ? ($(".personal-name").text(t.ext.users[0].name), $(".personal-pic").attr("src", t.ext.users[0].avatar)) : ($(".personal-name").text(s.name), $(".personal-pic").attr("src", s.avatar)), $(".star-num").text(t.ent.starcn), $(".usable-num").text(t.ent.lessoncn + "节"), $(".add-num").text(n + "分钟")
    }, function(t) {
        PalfishUI.toast(t.msg)
    }), P.post("/reserve/my", {}, function(e) {
        var i = n(e.ent, e.ext.curriculums);
        t(i, e.ext), $(".into,.plan-course,.tacitly-btn").click(function() {
            $(".hint").show()
        })
    }, function(t) {
        PalfishUI.toast(t.msg)
    }), $(".download").on("click", function() {
        location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.xckj.talk_junior"
    }), $(".cancel").on("click", function() {
        $(".hint").hide()
    }), $(".log-out").click(function() {
        var t = localStorage.getItem("unionid"),
            n = localStorage.getItem("openid");
        P.post("/account/login/wechat/unbind", {
            uid: parseInt(P.user.id),
            openid: n,
            unionid: t
        }, function() {
            PalfishUI.toast("退出成功～"), P.account.clearAccountCookies(), location.replace(i("login.html"))
        }, function(t) {
            PalfishUI.toast(t.msg)
        })
    })
});