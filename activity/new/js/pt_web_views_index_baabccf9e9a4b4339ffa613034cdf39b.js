EDU("14789a970c9cd378abf63aa2fc52fcda", function(e, t) {
    return e.$extends({
        config: function() {
            t.extend(this.data, { tabs: [{ name: "趣味Python编辑器", tag: 2 }, { name: "趣味JS编辑器", tag: 3 }] });
            this.data.selectedTab = this.data.tabs[0];
            this.supr()
        },
        init: function() { this.supr() },
        goScratch: function(e, t) {
            2 === t ? this.data.handleGoScratch2(e) : this.data.handleGoScratch3(e);
            this.close(!0)
        },
        changeTab: function(e) {
            this.data.selectedTab = e;
            this.$update()
        },
        destroy: function() { this.supr() }
    })
}, "9173083a201290ad4cbd018c69f07c68", "4c5893540f7140e19de1dc1e26afb124");
EDU("f146f3cb1525560155f5099614a88054", '<div class="ux-modal ui-index-create-modal" r-animation="on:enter;wait:20;class: ux-modal-fadeIn, 3;on:leave;class: ux-modal-fadeOut, 2">\n    <div class="ux-modal_dialog f-pr"  on-click={this.cancelProgation($event)} ref="modalDialog">\n        <a class="ux-modal_close f-pa" on-click={this.close("null")}><i class="ux-icon ux-scratch-icon-close"></i></a>\n        <div class="title f-pr">\n           <ul class="tabs">\n               {#list tabs as tab}\n               <li class="tab" r-class="{{\'active\': tab.tag==selectedTab.tag}}" on-click="{this.changeTab(tab)}">{tab.name}</li>\n               {/list}\n           </ul>\n        </div>\n        <div class="content">\n            {#if selectedTab.tag == 2}\n            <img class="scratch2" src="./img/python_ide_logo.jpg" />\n            <div>\n                <p class="tit">\n                    Python 趣味创作平台<br/>基于人工智能编程语言Python,\n                </p>\n                <p class="desc">\n                    1 独创的Python趣味编程平台<br/>\n                    2 丰富的创作素材<br/>\n                    3 码上未来课程指定使用\n                </p>\n            </div>\n            {#elseif  selectedTab.tag == 3}\n            <img class="scratch3" src="./img/html5_ide_logo.jpeg" />\n            <div>\n                <p class="tit">\n                    JavaScript 趣味创作平台<br/>基于网页和游戏编程语言Javascript,\n                </p>\n                <p class="desc">\n                    1 更优的界面展示<br/>\n                    2 移动设备编辑创作<br/>\n                    3 更丰富的游戏库文件扩展\n                </p>\n            </div>\n            {/if}\n        </div>\n        <div class="footer">\n            {#if selectedTab.tag == 2}\n            <ux-button class="ux-modal-btn" on-click={this.goScratch($event, 2)} value="进入Python创作平台" />\n            {#elseif  selectedTab.tag == 3}\n            <ux-button class="ux-modal-btn" on-click={this.goScratch($event, 3)} value="进入JS创作平台" />\n            {/if}\n        </div>\n    </div>\n</div>\n\n');
EDU("f54751d9eb1d006519a08cc497f6ae18", '@charset "UTF-8";\n/* em-base */\n/* Height */\n/* Font Size */\n/* Padding */\n/* Border Radius */\n/* Brand Colors */\n/* Gray Colors */\n/* Base Colors */\n/* Shadow */\n/* dropdown */\n/* Dimensions */\n/* Colors */\n/* Form Control Item */\n/* Font Family */\n/* 衬线字体 */\n/* 非衬线字体 */\n.ui-index-create-modal .ux-modal_dialog {\n  padding: 0;\n  width: 480px;\n  height: 310px;\n  box-sizing: border-box;\n  background: #ffffff;\n  border-radius: 6px; }\n  .ui-index-create-modal .ux-modal_dialog .ux-modal_close {\n    top: 15px;\n    right: 15px;\n    font-size: 12px;\n    color: #999999;\n    z-index: 999; }\n  .ui-index-create-modal .ux-modal_dialog .title {\n    display: flex;\n    height: 60px;\n    background: #edf1f7; }\n    .ui-index-create-modal .ux-modal_dialog .title .tabs {\n      width: 480px;\n      display: flex;\n      justify-content: space-around; }\n    .ui-index-create-modal .ux-modal_dialog .title .tab {\n      display: flex;\n      height: 60px;\n      font-size: 16px;\n      color: #666666;\n      line-height: 60px;\n      cursor: pointer; }\n      .ui-index-create-modal .ux-modal_dialog .title .tab.active {\n        color: #39A5EF;\n        border-bottom: 3px solid #39a5ef; }\n  .ui-index-create-modal .ux-modal_dialog .content {\n    display: flex;\n    padding: 0 20px 0 30px; }\n    .ui-index-create-modal .ux-modal_dialog .content .scratch2 {\n      width: 170px;\n      height: 145px;\n      margin: 38px 20px 5px 0; }\n    .ui-index-create-modal .ux-modal_dialog .content .scratch3 {\n      width: 170px;\n      height: 145px;\n      margin: 38px 20px 5px 0; }\n    .ui-index-create-modal .ux-modal_dialog .content .tit {\n      font-size: 14px;\n      color: #333333;\n      line-height: 22px;\n      margin-top: 45px;\n      margin-bottom: 10px; }\n    .ui-index-create-modal .ux-modal_dialog .content .desc {\n      font-size: 14px;\n      color: #666666; }\n  .ui-index-create-modal .ux-modal_dialog .ux-btn {\n    display: inline-block;\n    min-width: 125px;\n    height: 32px;\n    line-height: 32px;\n    font-size: 14px;\n    color: #ffffff;\n    background: #39a5ef;\n    border-radius: 100px; }\n    .ui-index-create-modal .ux-modal_dialog .ux-btn:hover {\n      background: #4daef1; }\n  .ui-index-create-modal .ux-modal_dialog .footer {\n    display: flex;\n    justify-content: center; }\n');
EDU("c69bb67d6c5e5daf878771e5fc80077d", function(e, t, n) { return e.$extends({ name: "index-create-modal", template: t, css: n }) }, "14789a970c9cd378abf63aa2fc52fcda", "f146f3cb1525560155f5099614a88054", "f54751d9eb1d006519a08cc497f6ae18");
EDU("61be1e918a2e78477179fbb923ca3052", function() { return {} });
EDU("a9169136a1c187582fce89b26f944da3", function(e, t, n, i, a, o) {
    var r = "component-slider-carousel";
    n.$default(r, i);
    var s = e.$extends({
        config: function() {
            t.extend(this, { settingKey: r, intervalId: -1 });
            t.extend(this.data, { ratio: [1, 1], items: [], index: 0, isInfinite: !0, resize: !1, interval: 3e3, selfUI: "", indicatorsTemplate: "", itemTemplate: "", clazz: "" });
            if (this.data.items.length <= 0) throw new Error("items不能为空!");
            this.supr()
        },
        init: function() {
            this.supr();
            if (this.data.resize) {
                setTimeout(function() { this.$update("height", this.EF() + "px") }.ca(this), 0);
                o.Wb(window, "resize", function() { this.$update("height", this.EF() + "px") }.ca(this))
            }
        },
        destroy: function() { this.supr() },
        GF: function(e, n) { var i = { sender: this, originalEvent: e }; return t.extend(i, n) },
        EF: function() {
            var e = this.data.ratio[0],
                t = this.data.ratio[1];
            return this.$refs.self.clientWidth * t / e
        },
        startInfinite: function() {},
        stopInfinite: function() {},
        select: function(e, t) {},
        prev: function(e) { this.select(this.data.index - 1, e) },
        next: function(e) { this.select(this.data.index + 1, e) },
        changeBgColor: function(e) { this.$update("bgColor", e) }
    }).filter({ toLogData: function(e) { return JSON.stringify({ itemType: "url", type: "image", itemUrl: e.href }) }, toLogNode: function(e) { return JSON.stringify({ url: { name: e.href } }) } });
    return s
}, "40e05eb05978fe4f70e9bb302429377a", "4c5893540f7140e19de1dc1e26afb124", "7d7303b694f8bda8df3b58d515b18c00", "61be1e918a2e78477179fbb923ca3052", "c7bcf23018470914aae5ec1b0c126aa7", "27796781b0c7e12c44fc673817eb0c14");
EDU("3348c64d61d43ce902d4e9853e0dce01", '<div ref="self" class="ux-slider-carousel {clazz}" style="background-color:{bgColor};height:{height}">\n    <!--cnt-->\n    <div class="ux-slider-carousel-items" on-mouseenter={this.mouseenter()} on-mouseleave={this.mouseleave()}>\n        {#list items as item}\n            <div ref={\'item\'+item_index} class="ux-slider-carousel-item ga-click" data-cate="轮播图" data-action="{item_index}点击" data-label="{item.href}" data-log-id="slider" data-log-act="click" data-log-data={item | toLogData} data-log-node={item | toLogNode}>\n                {#if selfUI}\n                    <r-component is={selfUI} item={item}></r-component>\n                {#elseif itemTemplate}\n                    {#inc itemTemplate}\n                {#else}\n                    <a class="ux-slider-carousel-item-img-wrapper" r-class={{"ux-slider-carousel-item_pointered":!item.href}} on-click={this.onClick($event,item)} {#if item.href}href="{item.href}" target="{item.target||\'_blank\'}"{/if}>\n                        <img class="ux-slider-carousel-item-img {item.clazz}" src="{item.src}">\n                    </a>\n                {/if}\n            </div>\n        {/list}\n\n        <!--navigaros-->\n        {#if @(navigatorsTemplate)}\n            {#inc navigatorsTemplate}\n        {#else}\n            {#if showArrow}\n            <a class="ux-slider-carousel-navigator ux-slider-carousel-navigator-left ux-slider-carousel-icon ux-slider-carousel-icon-arrow_left ga-click" data-cate="轮播图" data-action="切换点击" data-label="左"\n               r-class={{\'z-show\':onHover}} on-click={this.onNavigateLeft()}></a>\n            <a class="ux-slider-carousel-navigator ux-slider-carousel-navigator-right ux-slider-carousel-icon ux-slider-carousel-icon-arrow_right ga-click" data-cate="轮播图" data-action="切换点击" data-label="右"\n               r-class={{\'z-show\':onHover}} on-click={this.onNavigateRight()}></a>\n            {/if}\n        {/if}\n\n        <!--indicators-->\n        {#if @(indicatorsTemplate)}\n            {#inc indicatorsTemplate}\n        {#elseif indicators.type==constant.INDICATORS_TYPE_CIRCLE}\n            {#if items.length>1}\n            <div class="ux-slider-carousel-indicators-wrapper">\n                <ul class="ux-slider-carousel-indicators">\n                    {#list items as item}\n                    <li class="ux-slider-carousel-indicator" r-class={{\'z-sel\':index==item_index}} on-click={this.onIndicatorClick($event,item_index)}\n                        on-mouseenter={this.onIndicatorMouseenter($event,item_index)} on-mouseleave={this.onIndicatorMouseleave($event,item_index)}>\n                        <i class="ux-slider-carousel-icon ux-slider-carousel-icon-circle"></i>\n                    </li>\n                    {/list}\n                </ul>\n            </div>\n            {/if}\n        {#else}\n            {#if items.length>1}\n            <div class="ux-slider-carousel-indicators-wrapper ux-slider-carousel-indicators-wrapper-rectangle">\n                <ul class="ux-slider-carousel-indicators">\n                    {#list items as item}\n                    <li class="ux-slider-carousel-indicator th-fs1fc5" r-class={{\'z-sel\':index==item_index,\'th-bg0\':index==item_index,\'z-notSel\':index!=item_index}} on-click={this.onIndicatorClick($event,item_index)}\n                        on-mouseenter={this.onIndicatorMouseenter($event,item_index)} on-mouseleave={this.onIndicatorMouseleave($event,item_index)}>\n                        {item.desc}\n                    </li>\n                    {/list}\n                </ul>\n            </div>\n            {/if}\n        {/if}\n    </div>\n</div>\n');
EDU("356a196d92c8bf402c6208a5ec4cdb62", ".ux-slider-carousel{box-sizing:border-box;position:relative;width:100%;height:100%;}.ux-slider-carousel-items{position:relative;width:960px;margin:0 auto;height:100%;}.ux-slider-carousel-item{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden;visibility:hidden;}.ux-slider-carousel-item.fadeIn{animation:ux-slider-carousel-fadeIn 1s ease-out forwards;}.ux-slider-carousel-item.fadeIn-polyfill{visibility:visible;opacity:1;}.ux-slider-carousel-item_pointered{cursor:default;}.ux-slider-carousel-item-img-wrapper{display:block;width:100%;height:100%;text-decoration:none;}.ux-slider-carousel-item-img{width:100%;height:100%;vertical-align:top;}.ux-slider-carousel-indicators-wrapper{position:absolute;bottom:0;left:0;height:37px;width:100%;z-index:1;}.ux-slider-carousel-indicators{width:100%;height:100%;text-align:center;font-size:0;}.ux-slider-carousel-indicator{box-sizing:border-box;display:inline-block;width:26px;height:26px;padding:8px;cursor:pointer;}.ux-slider-carousel-indicator.z-sel .ux-slider-carousel-icon-circle{background-position:0px -360px;}.ux-slider-carousel-indicators-wrapper.ux-slider-carousel-indicators-wrapper-rectangle{height:auto;bottom:20px;}.ux-slider-carousel-indicators-wrapper.ux-slider-carousel-indicators-wrapper-rectangle .ux-slider-carousel-indicator{user-select:none;padding:5px 7px;width:auto;height:auto;line-height:1.2;margin:0 5px;}.ux-slider-carousel-indicators-wrapper.ux-slider-carousel-indicators-wrapper-rectangle .ux-slider-carousel-indicator.z-notSel{background:rgba(255,255,255,0.7);}.ux-slider-carousel-indicators-wrapper.ux-slider-carousel-indicators-wrapper-rectangle .ux-slider-carousel-indicator.z-sel{color:white;}.ux-slider-carousel .ux-slider-carousel-navigator{display:none;position:absolute;margin-top:-40px;top:50%;cursor:pointer;z-index:1;}.ux-slider-carousel .ux-slider-carousel-navigator-left{left:20px;}.ux-slider-carousel .ux-slider-carousel-navigator-right{right:20px;}.ux-slider-carousel .ux-slider-carousel-navigator.z-show{display:block;}.ux-slider-carousel-icon{display:inline-block;background:url(./img/sprites_3276d1fa6cc482ea0e4e51bcd857b167.png);}.ux-slider-carousel-icon-arrow_left{width:50px;height:80px;background-position:0px -90px;}.ux-slider-carousel-icon-arrow_left:hover{background-position:0px 0px;}.ux-slider-carousel-icon-arrow_left_hover{width:50px;height:80px;background-position:0px 0px;}.ux-slider-carousel-icon-arrow_right{width:50px;height:80px;background-position:0px -270px;}.ux-slider-carousel-icon-arrow_right:hover{background-position:0px -180px;}.ux-slider-carousel-icon-arrow_right_hover{width:50px;height:80px;background-position:0px -180px;}.ux-slider-carousel-icon-arrow_right_hover{width:50px;height:80px;background-position:0px -180px;}.ux-slider-carousel-icon-circle{width:10px;height:10px;background-position:0px -380px;}.ux-slider-carousel-icon-circle_hover{width:10px;height:10px;background-position:0px -360px;}@keyframes ux-slider-carousel-fadeIn{from{opacity:0;}to{opacity:1;visibility:visible;}}");
EDU("6e4cb48eb26074ed4411d7109ab12d25", function() { return { INDICATORS_TRIGGER_CLICK: 0, INDICATORS_TRIGGER_HOVER: 1, INDICATORS_TYPE_CIRCLE: 1, INDICATORS_TYPE_RECTANGLE: 2, SELECT_TRIGGER_AUTO: 1, SELECT_TRIGGER_NAVIGATOR: 2, SELECT_TRIGGER_INDICATOR: 3 } });
EDU("23e0efae46fda123a6f71fa9206356f1", function(e, t, n, i, a, o, r) {
    var s = "fadeIn";
    return e.$extends({
        name: "ux-slider-carousel",
        css: n,
        template: t,
        config: function() {
            var e = { trigger: i.INDICATORS_TRIGGER_CLICK, throttle: 150, type: i.INDICATORS_TYPE_CIRCLE };
            a.extend(this, { HF: -1, IF: -1 });
            a.extend(this.data, { indicators: null, ratio: [960, 440], onHover: !1, bgColor: "transparent", navigatorsTemplate: "", showArrow: !0, hoverStop: !1, constant: i });
            if (!o.Ja(this.data.indicators)) this.data.indicators = {};
            a.extend(this.data.indicators, e);
            this.supr()
        },
        init: function() {
            this.supr();
            setTimeout(function() { this.select(this.data.index, { notEmit: !0 }) }.ca(this), 0)
        },
        JF: function() {
            if (this.KF()) return s;
            else return s + "-polyfill"
        },
        KF: function() {
            var e = document.createElement("div");
            if (void 0 !== e.style.animationName) return !0;
            else return !1
        },
        select: function(e, t) {
            t = t || {};
            var n = this.data.isInfinite,
                i = this.data.items,
                a = null,
                s = t.evt || null,
                c = t.notEmit || !1;
            if (!o.Fa(e)) e = 0;
            else {
                if (e < 0)
                    if (e == -1) e = i.length - 1;
                    else e = 0;
                if (e >= i.length)
                    if (e == i.length) e = 0;
                    else e = i.length - 1
            }
            a = i[e];
            n && this.stopInfinite();
            if (a.bgColor) this.changeBgColor(a.bgColor);
            else this.changeBgColor("transparent");
            r.zd(this.$refs["item" + this.data.index], this.JF());
            r.ld(this.$refs["item" + e], this.JF());
            this.$update("index", e);
            if (!n || this.data.hoverStop && this.data.onHover);
            else n && this.startInfinite();
            if (!c) this.$emit("select", this.GF(s, { index: e, item: a, trigger: t.trigger }))
        },
        startInfinite: function() {
            if (this.data.isInfinite) this.intervalId = setInterval(function() {
                var e = this.data.index + 1;
                if (e === this.data.items.length) e = 0;
                this.select(e, { trigger: i.SELECT_TRIGGER_AUTO })
            }.ca(this), this.data.interval)
        },
        stopInfinite: function() { clearInterval(this.intervalId) },
        onClick: function(e, t) { this.$emit("click", this.GF(e, { item: t })) },
        onIndicatorClick: function(e, t) {
            if (0 === this.data.indicators.trigger)
                if (t != this.data.index) this.select(t, { evt: e, trigger: i.SELECT_TRIGGER_INDICATOR })
        },
        onIndicatorMouseenter: function(e, t) {
            if (1 === this.data.indicators.trigger) {
                this.IF = t;
                if (t != this.data.index) {
                    clearTimeout(this.HF);
                    this.HF = setTimeout(function() { if (this.IF == t) this.select(t, { evt: e, trigger: i.SELECT_TRIGGER_INDICATOR }) }.ca(this), this.data.indicators.throttle)
                }
            }
        },
        onIndicatorMouseleave: function() { if (1 === this.data.indicators.trigger) this.IF = -1 },
        onNavigateLeft: function() { this.prev({ trigger: i.SELECT_TRIGGER_NAVIGATOR }) },
        onNavigateRight: function() { this.next({ trigger: i.SELECT_TRIGGER_NAVIGATOR }) },
        mouseenter: function() { this.data.onHover = !0; if (this.data.isInfinite && this.data.hoverStop) this.stopInfinite() },
        mouseleave: function() { this.data.onHover = !1; if (this.data.isInfinite && this.data.hoverStop) this.startInfinite() },
        destroy: function() {
            this.supr();
            this.stopInfinite()
        }
    })
}, "a9169136a1c187582fce89b26f944da3", "3348c64d61d43ce902d4e9853e0dce01", "356a196d92c8bf402c6208a5ec4cdb62", "6e4cb48eb26074ed4411d7109ab12d25", "4c5893540f7140e19de1dc1e26afb124", "350029dfbcf7aedb2963febdb0268e3a", "c7bcf23018470914aae5ec1b0c126aa7");
EDU("2a556605585ec901ca887562950786d8", function(e, t, n, i, a, o) {
    var r = window.webUser || {};
    var s = e.$extends({
        config: function() {
            var e = window.urlConfig || {};
            t.extend(this, {});
            t.extend(this.data, { items: [], bgColor: "#ccc", isInfinite: !0, interval: 4e3, indicators: { throttle: 300, trigger: 0, type: 2 }, createPage: e.createPagePath, createPageV3: e.createPagePathV3, isLogin: !1, userPic: r.largeFaceUrl && r.largeFaceUrl.split("?")[0], personalPagePath: a.Wl(e.personalPagePath, { id: (r || {}).uid }), nickName: r.nickName || "", defaultUserPic: i.DEFAULT_FACE_URL });
            this.supr();
            if (r && (r.uid || r.id || r.loginId)) this.data.isLogin = !0
        },
        init: function() { this.supr() },
        goMyPage: function(e) {
            if ("project" === e) window.open("https://kada.163.com/my.htm#/layout/create/unPublishProject/", "_self");
            else window.open("https://kada.163.com/my.htm#/layout/gallery/unPublishGallery/", "_self")
        },
        goDesignPage: function(e, t) { window.globalUtil.cu(e, function() { try { window.open(t, "_self") } catch (e) {} }) },
        getCreatePage: function(e) { var t = this; return function(n) { return t.goDesignPage.call(t, n, 3 === e ? t.data.createPageV3 : t.data.createPage) } },
        alertCreateModal: function() { new o({ data: { handleGoScratch2: this.getCreatePage(2), handleGoScratch3: this.getCreatePage(3) } }) },
        login: function() {
            n.show({ bizType: "star" });
            window.globalUtil.Jp("登录中心", "唤起登录", "-")
        },
        destroy: function() { this.supr() }
    });
    return s
}, "98296ef7481ded70048b72e05792aef0", "4c5893540f7140e19de1dc1e26afb124", "dfb8e777a4c11ae26e117f9bf8e48227", "427a4e959fe8a473ac3c9fcf28f37149", "325264f76538473c417a249522ab4b1d", "c69bb67d6c5e5daf878771e5fc80077d", "23e0efae46fda123a6f71fa9206356f1");
EDU("f56fc3ea368fdc955bd412f0cacc033a", '<div class="ux-banner">\n    <div class="f-fl ux-banner-slider ux-box-shadow" data-action="banner点击">\n        <ux-slider-carousel items={items} indicators={indicators} bgColor={bgColor} interval={interval} isInfinite=isInfinite showArrow={(items.length > 1) ? true : false} class=""></ux-slider-carousel>\n    </div>\n    <div class="ux-banner-login f-fr" data-action="展示区开始创作">\n        <div class="login-wrap index-page-imgs">\n            {#if !isLogin}\n                <div class="head-wrap">\n                    <img class="head-img" src="{userPic | formatImg : 120,120,defaultUserPic}"  alt="{nickName}">\n                </div>\n                <p>欢迎来到码上未来</p>\n                <p>青少儿编程社区</p>\n                <button class="login-btn" on-click="{this.login()}">登录/注册</button>\n            {#else}\n                <a class="ux-link" href="{personalPagePath}">\n                    <div class="head-wrap img-wrap">\n                        <img class="head-img" src="{userPic | formatImg : 120,120,defaultUserPic}" alt="{nickName}">\n                    </div>\n                    <p class="ellipsis user-name ux-link-text">{nickName}</p>\n                </a>\n\n                <div class="p-section">\n                    <div class="project-section" on-click="{this.goMyPage(\'project\')}">\n                        <div class="my-project">\n                            <i class="icon-k12-create"></i>\n                        </div>\n                        <p>我的作品</p>\n                    </div>\n                    <div class="project-section" on-click="{this.goMyPage(\'gallery\')}">\n                        <div class="my-project gallery-lists">\n                            <i class="icon-k12-topic" ></i>\n                        </div>\n                        <p>我的专题</p>\n                    </div>\n                </div>\n\n\n            {/if}\n        </div>\n        <button on-click="{this.alertCreateModal()}" class="ux-banner-product-entry index-page-imgs" data-label="_"></button>\n    </div>\n</div>\n');
EDU("bd0d386f6a1d3400eafb95db9d1fb1fd", '@charset "UTF-8";.ux-banner{width:1200px;height:380px;margin:0 auto;}.ux-banner-slider{width:960px;height:360px;box-shadow:0 0 4px 0 rgba(0, 0, 0, 0.1);border-radius:6px;margin-top:20px;background:#999;}.ux-banner-slider .ux-slider-carousel-items{width:960px;}.ux-banner-slider .ux-slider-carousel-items .ux-slider-carousel-item{border-radius:4px;}.ux-banner-slider .ux-slider-carousel-items .ux-slider-carousel-indicators .ux-slider-carousel-indicator{width:6px;height:6px;padding:0px;margin:0 2.5px;border-radius:3px;background:#fff;opacity:0.6;}.ux-banner-slider .ux-slider-carousel-items .ux-slider-carousel-indicators .z-sel{width:15px;background:#fff;opacity:0.6;}.ux-banner-login{width:220px;height:310px;margin-top:-10px;}.ux-banner-login .login-wrap{width:220px;height:310px;text-align:center;font-size:14px;}.ux-banner-login .login-wrap .head-wrap{display:inline-block;width:220px;height:60px;margin-top:108px;margin-bottom:10px;}.ux-banner-login .login-wrap .head-wrap .head-img{display:inline-block;width:60px;height:60px;cursor:pointer;border-radius:30px;background:#d8d8d8;}.ux-banner-login .login-wrap .img-wrap{margin-top:96px;margin-bottom:0;}.ux-banner-login .login-wrap .ux-scratch-icon-user{color:#FFF;font-size:50px;}.ux-banner-login .login-wrap p{color:#999999;letter-spacing:0;height:24px;line-height:24px;}.ux-banner-login .login-wrap .user-name{width:190px;margin:8px 0;}.ux-banner-login .login-wrap .login-btn{margin:20px auto 0;display:block;width:140px;height:30px;border-radius:18px;outline:none;background:#FFF;border:1px solid #3AA7F1;color:#0093DE;}.ux-banner-login .login-wrap .login-btn:hover{background:#39A5EF;color:#FFF;}.ux-banner-login .login-wrap .p-section{padding:0 27px;width:100%;height:70px;display:flex;justify-content:center;align-items:center;}.ux-banner-login .login-wrap .p-section .project-section{float:left;height:70px;cursor:pointer;}.ux-banner-login .login-wrap .p-section .project-section:first-child{margin-right:30px;}.ux-banner-login .login-wrap .p-section .project-section .my-project{width:44px;height:44px;border-radius:22px;background:rgba(57, 165, 239, 0.1);text-align:center;font-size:22px;color:#39A5EF;margin:0 auto 6px;}.ux-banner-login .login-wrap .p-section .project-section .my-project i{display:inline-block;margin-top:12px;}.ux-banner-login .login-wrap .p-section .project-section:hover .my-project{background:#39A5EF;color:#FFF;}.ux-banner-login .login-wrap .p-section .project-section:hover p{color:#39A5EF;}.ux-banner-login .login-wrap .p-section .gallery-lists{font-size:18px;}.ux-banner-product-entry{width:220px;height:60px;display:block;margin-top:20px;cursor:pointer;border:0;}');
EDU("62ad55a60b6bc3e06706d8d675741cbb", function(e, t, n) { return e.$extends({ name: "ux-banner", css: n, template: t }) }, "2a556605585ec901ca887562950786d8", "f56fc3ea368fdc955bd412f0cacc033a", "bd0d386f6a1d3400eafb95db9d1fb1fd");
EDU("e6c61be220964308969df80d0f133a42", function(e, t) {
    var n = e.$extends({
        config: function() {
            t.extend(this.data, {});
            this.supr()
        },
        init: function() { this.supr() },
        destroy: function() { this.supr() }
    });
    return n
}, "98296ef7481ded70048b72e05792aef0", "4c5893540f7140e19de1dc1e26afb124");
EDU("a494ea147a21343c3343929d7652c047", '<div class="ui-card-container">\n    <div class="card-container">\n        <div class="card-container-top f-cb">\n            <h2 class="card-container-title f-fl" r-html={title}></h2>\n            {#if showMore && !!moreLink}\n            <a target="_blank" href="{moreLink}" class="card-container-more-btn f-fr ga-click moreLink" data-label="查看更多">{moreText || "查看更多"}<i class=\'ux-icon-caret-right\'></i></a>\n            {/if}\n        </div>\n        <div class="card-container-list f-cb {className}">\n            {#inc this.$body}\n        </div>\n    </div>\n</div>\n');
EDU("f358ef50b98df50c430706e5d2529a90", ".ui-card-container .card-container-title {\n  font-size: 20px; }\n\n.ui-card-container .card-container-more-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 90px;\n  height: 30px;\n  box-sizing: border-box;\n  border: 1px solid #AAA;\n  padding-left: 6px;\n  border-radius: 15px;\n  font-size: 14px;\n  text-decoration: none;\n  color: #999; }\n  .ui-card-container .card-container-more-btn .ux-icon-caret-right {\n    vertical-align: text-top; }\n\n.ui-card-container .card-container-more-btn:hover {\n  text-decoration: none;\n  background: #39A5EF;\n  border: 1px solid #39A5EF;\n  color: #FFF; }\n");
EDU("b90ef1be46aa73d154c0675135404463", function(e, t, n) { var i = e.$extends({ name: "card-container", template: t, css: n }); return i }, "e6c61be220964308969df80d0f133a42", "a494ea147a21343c3343929d7652c047", "f358ef50b98df50c430706e5d2529a90");
EDU("06b8c20650089cde4ed52842b6eca321", function(e, t, n, i, a) {
    var o = window;
    var r = e.$extends({
        config: function() {
            var e = o.bannerSlider && o.bannerSlider.length > 0 ? o.bannerSlider : [{ imgUrl: "./img/da5c6378-2b82-458d-ab9c-0eed91f2039d.png?imageView&thumbnail=960y440&quality=100", link: o.urlConfig.kadaHost + "/about.htm" }],
                i = { item: [] };
            n.Qa(e, function(e) {
                var t = {};
                if ("object" != typeof e) try { t = JSON.parse(e) } catch (n) {} else t = e;
                i.item.push({ src: t.imgUrl, href: t.link })
            });
            t.extend(this.data, { recommend: { list: [], title: '<div class="title-box"><i class="star-icon index-page-imgs"></i><h2 class="title-text">精选作品</h2></div>' }, hot: { list: [], title: '<div class="title-box"><i class="fire-icon index-page-imgs"></i><h2 class="title-text">热门作品</h2></div>', moreLink: o.urlConfig.discoverPagePath, moreText: "更多作品" }, recommendGallery: { list: [], title: '<div class="title-box"><i class="moon-icon index-page-imgs"></i><h2 class="title-text">精选专题</h2></div>', moreLink: o.urlConfig.discoverPagePath + "#/layout/gallery/", moreText: "更多专题" }, ranking: { list: [] }, cardHref: o.urlConfig.projectPagePath, galleryCardHref: o.urlConfig.galleryPagePath, showControl: { remixCount: !1, commentCount: !1 }, sliderData: i || [] });
            this.supr()
        },
        init: function() {
            this.supr();
            this.MF = this.MF ? this.MF.Sd() : null;
            this.MF = i.Project.Od();
            var e = ["platform-recommend", "platform-hot"];
            n.Qa(e, function(e) { this.MF.getProjectListByType({ rqKey: e, data: { t: +new Date }, onload: this.onGetProjectList.ca(this) }) }.ca(this));
            this.NF = this.NF ? this.NF.Sd() : null;
            this.NF = a.Gallery.Od();
            this.NF.getGalleryListByType({ rqKey: "recommend", data: { t: +new Date }, onload: this.onGetGalleryList.ca(this) });
            this.getWeekRanking()
        },
        onGetProjectList: function(e) {
            (this.data[e.rqKey.replace("platform-", "")] || {}).list = e.list;
            this.$update()
        },
        onGetGalleryList: function(e) {
            var t = [];
            for (var n in e.list)
                if (e.list[n].galleryChoiceImgUrl) t.push(e.list[n]);
            var i = t && t.length;
            var a = i % 2 === 0 ? i : i - 1;
            (this.data.recommendGallery || {}).list = t.slice(0, a);
            this.$update()
        },
        getCardHref: function(e) { return this.data.cardHref.replace(/:id/, e) },
        getGalleryCardHref: function(e) { return this.data.galleryCardHref.replace(/:id/, e) },
        getWeekRanking: function() {
            var e = this;
            this.MF.rankingWeekCardlist({ data: { pageIndex: 1, pageSize: 6 }, onload: function(t) { e.data.ranking.list = t.list } })
        },
        destroy: function() { this.supr() }
    }).filter({ number: function(e, t) { return e.toFixed(t) } });
    return r
}, "98296ef7481ded70048b72e05792aef0", "4c5893540f7140e19de1dc1e26afb124", "350029dfbcf7aedb2963febdb0268e3a", "099c1065bf91bd55b20747dd7e6859da", "caaa4eaefd90361bd88e7db582b99aa1", "62ad55a60b6bc3e06706d8d675741cbb", "b90ef1be46aa73d154c0675135404463", "fdf78cf4d2d1adf90942c2c3a953ad17", "6404bd724ede063f9f03f9e944c345d9", "3973c3c6a5b7de211fa5881ffcf2dcf8", "2ba3ec918838401443e1d5b15c0304ae");
EDU("822a24d91e081d15f74292862d82f854", '<div class="ui-page-content-ui-box">\n    <!--banner-->\n    <div class="m-banner ui-banner">\n        <ux-banner items={sliderData.item}></ux-banner>\n    </div>\n\n    <!--卡片内容模块-->\n    <div class="m-carefully-chosen card-module-common" data-action="精选作品点击" r-hide={recommend.list.length < 1}>\n        <!--精选作品模块-->\n        <div class="ui-page-card-module-box recommend-card-module-box">\n            <card-container className="ui-common-project-card-container" title={recommend.title} showMore={!!(recommend.list && recommend.list.length)} moreText={recommend.moreText} moreLink={recommend.moreLink}>\n                {#list recommend.list as item}\n                    <project-card-224x280 item={item} index={item_index} cardHref={this.getCardHref(item.id)} showControl={showControl}></project-card-224x280>\n                {/list}\n            </card-container>\n        </div>\n        <div class="ui-ranking">\n            <div class="title-box">\n                <i class="ranking-icon index-page-imgs"></i>\n                <h2 class="title-text">劲作周榜</h2>\n            </div>\n            <div class="ui-ranking-conntainer">\n                <div class="ui-ranking-card-list">\n                    {#list ranking.list as item}\n                    <a href="{\'http://kada.163.com/project/\' + item.projectId + \'-\' + item.authorId + \'.htm\'}" class="ui-ranking-card ga-click" target="_blank" data-action="作品点击">\n                        <div class="ui-ranking-cover">\n                            <img src="{item.imgUrl}" alt="作品封面" class="ui-ranking-cover-img"/>\n                        </div>\n                        <div class="ui-ranking-project-name">{item.projectName}</div>\n                        <div class="ui-ranking-order" r-class="{{\'top-three\': item.order === 1 || item.order === 2 || item.order === 3}}">No.{item.order}</div>\n                        <div class="ui-ranking-score-number">{item.finalScore | number: \'1\'}</div>\n                    </a>\n                    {/list}\n                    {#if !(ranking.list && ranking.list.length)}\n                        <common-blank txt="暂无作品"></common-blank>\n                    {/if}\n                </div>\n                <a href="http://kada.163.com/ranking.htm?tag=#/layout/week/" class="ui-ranking-footer ga-click" target="_blank" data-action="作品排行榜">\n                    查看更多榜单\n                </a>\n            </div>\n        </div>\n    </div>\n\n    <div class="m-hot-project card-module-common" data-action="热门作品点击">\n        <!--热门作品模块-->\n        <div class="ui-page-card-module-box">\n            <card-container className="ui-common-project-card-container" title={hot.title} showMore={!!(hot.list && (hot.list.length >= 5))} moreText={hot.moreText} moreLink={hot.moreLink} >\n                {#list hot.list as item}\n                    <project-card-224x280 item={item} index={item_index} cardHref={this.getCardHref(item.id)} showControl={showControl}></project-card-224x280>\n                {/list}\n                {#if !(hot.list && hot.list.length)}\n                    <ux-empty txt=\'暂无作品\' emptyIcon=true />\n                {/if}\n            </card-container>\n        </div>\n    </div>\n\n    <div class="m-hot-gallery card-module-common" data-action="精选专题点击" r-hide={recommendGallery.list.length < 1}>\n        <!--精选专题模块-->\n        <card-container title={recommendGallery.title} showMore={!!(recommendGallery.list && (recommendGallery.list.length >= 0))} moreText={recommendGallery.moreText} moreLink={recommendGallery.moreLink}>\n            {#list recommendGallery.list as item}\n                <div class="galleryCard" r-class="{{\'oddCard\': item_index % 2 == 0}}">\n                    <a href={this.getGalleryCardHref(item.id)}>\n                        <img src={item.galleryChoiceImgUrl} alt="精选专题" />\n                    </a>\n                </div>\n            {/list}\n        </card-container>\n    </div>\n</div>\n');
EDU("f93d3e2227e7229723f7ff905c4a1f58", "@charset \"UTF-8\";\n/* em-base */\n/* Height */\n/* Font Size */\n/* Padding */\n/* Border Radius */\n/* Brand Colors */\n/* Gray Colors */\n/* Base Colors */\n/* Shadow */\n/* dropdown */\n/* Dimensions */\n/* Colors */\n/* Form Control Item */\n/* Font Family */\n/* 衬线字体 */\n/* 非衬线字体 */\n.ui-page-content-ui-box {\n  width: 1200px;\n  margin: 0 auto; }\n  .ui-page-content-ui-box .ui-banner {\n    margin-bottom: 50px; }\n  .ui-page-content-ui-box .card-module-common {\n    margin-top: 49px; }\n    .ui-page-content-ui-box .card-module-common .ui-card-container .card-container-more {\n      position: relative;\n      top: 12px; }\n    .ui-page-content-ui-box .card-module-common .card-container-top {\n      line-height: 30px;\n      margin-bottom: 16px; }\n    .ui-page-content-ui-box .card-module-common .galleryCard {\n      float: left;\n      width: 590px;\n      height: 150px;\n      margin-bottom: 20px;\n      border-radius: 6px;\n      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1); }\n      .ui-page-content-ui-box .card-module-common .galleryCard a {\n        display: inline-block; }\n      .ui-page-content-ui-box .card-module-common .galleryCard img {\n        border-radius: 6px;\n        width: 590px;\n        height: 150px; }\n      .ui-page-content-ui-box .card-module-common .galleryCard:hover {\n        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2); }\n    .ui-page-content-ui-box .card-module-common .oddCard {\n      margin-right: 20px; }\n  .ui-page-content-ui-box .m-carefully-chosen .title-box {\n    position: relative;\n    height: 30px;\n    min-width: 300px; }\n    .ui-page-content-ui-box .m-carefully-chosen .title-box i {\n      display: inline-block;\n      width: 27px;\n      height: 24px;\n      vertical-align: text-bottom; }\n    .ui-page-content-ui-box .m-carefully-chosen .title-box .title-text {\n      font-size: 24px;\n      color: #333333;\n      letter-spacing: 0;\n      position: absolute;\n      top: 0;\n      left: 24px;\n      z-index: 2;\n      height: 30px;\n      line-height: 30px;\n      font-weight: normal;\n      padding-left: 10px; }\n  .ui-page-content-ui-box .m-hot-project .title-box {\n    position: relative;\n    height: 30px;\n    min-width: 300px; }\n    .ui-page-content-ui-box .m-hot-project .title-box i {\n      display: inline-block;\n      width: 27px;\n      height: 24px;\n      vertical-align: text-bottom; }\n    .ui-page-content-ui-box .m-hot-project .title-box .title-text {\n      font-size: 24px;\n      color: #333333;\n      letter-spacing: 0;\n      position: absolute;\n      top: 0;\n      left: 24px;\n      z-index: 2;\n      height: 30px;\n      line-height: 30px;\n      font-weight: normal;\n      padding-left: 10px; }\n  .ui-page-content-ui-box .m-hot-gallery .title-box {\n    position: relative;\n    height: 30px;\n    min-width: 300px; }\n    .ui-page-content-ui-box .m-hot-gallery .title-box i {\n      display: inline-block;\n      width: 27px;\n      height: 24px;\n      vertical-align: text-bottom; }\n    .ui-page-content-ui-box .m-hot-gallery .title-box .title-text {\n      font-size: 24px;\n      color: #333333;\n      letter-spacing: 0;\n      position: absolute;\n      top: 0;\n      left: 24px;\n      z-index: 2;\n      height: 30px;\n      line-height: 30px;\n      font-weight: normal;\n      padding-left: 10px; }\n  .ui-page-content-ui-box .card-module-common {\n    overflow: hidden; }\n    .ui-page-content-ui-box .card-module-common .recommend-card-module-box {\n      width: 959px;\n      float: left; }\n      .ui-page-content-ui-box .card-module-common .recommend-card-module-box .card-container .ui-common-project-card-container .ui-project-card:nth-child(5n) {\n        margin-top: 20px;\n        margin-right: 20px; }\n      .ui-page-content-ui-box .card-module-common .recommend-card-module-box .card-container .ui-common-project-card-container .ui-project-card:nth-child(4n) {\n        margin-right: 0; }\n  .ui-page-content-ui-box .ui-ranking {\n    float: left;\n    margin-left: 19px; }\n    .ui-page-content-ui-box .ui-ranking .ui-ranking-title {\n      height: 30px; }\n    .ui-page-content-ui-box .ui-ranking .title-box {\n      min-width: auto;\n      margin-bottom: 16px; }\n      .ui-page-content-ui-box .ui-ranking .title-box .ranking-icon {\n        background-image: url(./img/650cb8ea-ee07-4903-8c08-be3e2dca66d6.png);\n        background-size: 24px 22px;\n        position: relative;\n        top: 3px; }\n    .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer {\n      width: 222px;\n      height: 580px;\n      background-color: #fff;\n      border-radius: 8px;\n      -webkit-transition: all 0.3s ease;\n      -moz-transition: all 0.3s ease;\n      -o-transition: all 0.3s ease;\n      transition: all 0.3s ease;\n      box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);\n      -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);\n      -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);\n      transform: translate3d(0, 0, 0);\n      /*父元素使用transform:translate3d 属性*/\n      -webkit-transform: translate3d(0, 0, 0); }\n      .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer:hover {\n        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);\n        -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);\n        -moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);\n        -webkit-transition: all 0.3s ease;\n        -moz-transition: all 0.3s ease;\n        -o-transition: all 0.3s ease;\n        transition: all 0.3s ease; }\n      .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list {\n        height: 533px;\n        padding: 0 12px; }\n        .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-ranking-card {\n          height: 89px;\n          border-bottom: 1px solid #eee;\n          overflow: hidden;\n          padding: 12px 0;\n          position: relative;\n          display: block;\n          -webkit-transition: all 0.3s ease;\n          -moz-transition: all 0.3s ease;\n          -o-transition: all 0.3s ease;\n          transition: all 0.3s ease; }\n          .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-ranking-card:hover .ui-ranking-cover .ui-ranking-cover-img {\n            -webkit-transform: scale(1.05);\n            -moz-transform: scale(1.05);\n            -ms-transform: scale(1.05);\n            transform: scale(1.05);\n            -webkit-transition: all 0.3s ease;\n            -moz-transition: all 0.3s ease;\n            -o-transition: all 0.3s ease;\n            transition: all 0.3s ease; }\n          .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-ranking-card .ui-ranking-cover {\n            float: left;\n            width: 88px;\n            height: 64px;\n            overflow: hidden;\n            position: relative;\n            border-radius: 4px;\n            border: 1px solid #ddd; }\n            .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-ranking-card .ui-ranking-cover .ui-ranking-cover-img {\n              width: 88px;\n              height: 64px;\n              border-radius: 4px;\n              -webkit-transition: all 0.3s ease;\n              -moz-transition: all 0.3s ease;\n              -o-transition: all 0.3s ease;\n              transition: all 0.3s ease; }\n          .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-ranking-card .ui-ranking-project-name {\n            float: left;\n            width: 100px;\n            margin-left: 7px;\n            font-size: 14px;\n            line-height: 20px;\n            color: #333;\n            display: -webkit-box;\n            -webkit-box-orient: vertical;\n            -webkit-line-clamp: 2;\n            overflow: hidden;\n            word-break: break-all; }\n            .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-ranking-card .ui-ranking-project-name:hover {\n              color: #39A5EF; }\n          .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-ranking-card .ui-ranking-order {\n            position: absolute;\n            left: 0;\n            top: 12px;\n            border-radius: 4px 0;\n            text-align: center;\n            font-size: 12px;\n            line-height: 19px;\n            width: 31px;\n            height: 19px;\n            color: #fff;\n            background-color: rgba(0, 0, 0, 0.4); }\n          .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-ranking-card .top-three {\n            background-color: #ff525a; }\n          .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-ranking-card .ui-ranking-score-number {\n            position: absolute;\n            right: 0;\n            bottom: 10px;\n            font-size: 20px;\n            line-height: 24px;\n            color: #ffb430;\n            font-family: DINAlternate-Bold, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif; }\n        .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-card-list .ui-common-blank {\n          padding-top: 100px; }\n      .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-footer {\n        display: block;\n        height: 47px;\n        line-height: 46px;\n        text-align: center;\n        color: #333;\n        font-size: 14px;\n        border-top: 1px solid #eee;\n        border-radius: 0 0 8px 8px; }\n        .ui-page-content-ui-box .ui-ranking .ui-ranking-conntainer .ui-ranking-footer:hover {\n          background-color: #f7f7f7;\n          color: #39A5EF; }\n");
EDU("f3366e592469cf627e6f0fbe1ac51804", function(e, t, n) { var i = e.$extends({ name: "page-content-ui-box", template: t, css: n }); return i }, "06b8c20650089cde4ed52842b6eca321", "822a24d91e081d15f74292862d82f854", "f93d3e2227e7229723f7ff905c4a1f58");
EDU("55a5e632e3fb052c0e718ffd11ec16d0", function(e, t, n, i, a, o, r) {
    o.OF = e.oa();
    r = o.OF.ra(i);
    r.qa = function(e) {
        this.sa(e);
        this.Lu = t.ub("j-pageContentUIBox")
    };
    r.Rd = function(e) {
        this.sa(e);
        var t = window.bannerSlider || [{ imgUrl: "./img/b81877ce-26a1-4a68-8591-bd96fe496f2d.jpg?imageView&thumbnail=960y440&quality=100", href: (window.urlConfig || {}).host }],
            i = { items: [] };
        n.Qa(t, function(e) { i.items.push({ src: e.imgUrl, href: e.href }) });
        this.Mu = this.Mu ? this.Mu.destroy() : null;
        this.Mu = new a({ data: i }).$inject(this.Lu)
    };
    r.Vd = function() { this.sa() };
    return o.OF
}, "25eb0d42b0db5a6dbc1f8509bb8a8d31", "c7bcf23018470914aae5ec1b0c126aa7", "350029dfbcf7aedb2963febdb0268e3a", "13c30c80aef50c8c7315ed3fa23d7b6c", "f3366e592469cf627e6f0fbe1ac51804");
EDU("3737833be5e1119bc293131bb4271c24", function(e) { e.Od() }, "55a5e632e3fb052c0e718ffd11ec16d0", "49d031e72e9391182f06d22efce1fc92");