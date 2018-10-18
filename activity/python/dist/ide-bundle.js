(function e(t, n, r) {
    function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} };
            t[o][0].call(l.exports, function(e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++) s(r[o]); return s })({
    1: [function(require, module, exports) {
        "use strict";
        //////////////////////////////////////////////////////////////////////////////////////
        //
        //  Copyright (c) 2014-present, Egret Technology.
        //  All rights reserved.
        //  Redistribution and use in source and binary forms, with or without
        //  modification, are permitted provided that the following conditions are met:
        //
        //     * Redistributions of source code must retain the above copyright
        //       notice, this list of conditions and the following disclaimer.
        //     * Redistributions in binary form must reproduce the above copyright
        //       notice, this list of conditions and the following disclaimer in the
        //       documentation and/or other materials provided with the distribution.
        //     * Neither the name of the Egret nor the
        //       names of its contributors may be used to endorse or promote products
        //       derived from this software without specific prior written permission.
        //
        //  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
        //  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
        //  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
        //  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
        //  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
        //  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
        //  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
        //  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
        //  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
        //  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        //
        //////////////////////////////////////////////////////////////////////////////////////
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        var PreloaderView_1 = require("./PreloaderView");
        var UIManager_1 = require("./manager/UIManager");
        var MainScene_1 = require("./view/scene/MainScene");
        var DataManager_1 = require("./manager/DataManager");
        var Main = /** @class */ (function(_super) {
            __extends(Main, _super);

            function Main() {
                var _this = _super.call(this) || this;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            Main.prototype.onAddToStage = function(event) {
                //设置加载进度界面
                //Config to load process interface
                this.loadingView = new PreloaderView_1.default();
                this.stage.addChild(this.loadingView);
                if (window.location.href.indexOf("runner.html") < 0)
                    document.getElementById("splash-cover").style.display = "block";
                //初始化Resource资源加载库
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
                RES.loadConfig("resource/default.res.json", "resource/");
            };
            /**
             * 配置文件加载完成,开始预加载preload资源组。
             * configuration file loading is completed, start to pre-load the preload resource group
             */
            Main.prototype.onConfigComplete = function(event) {
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                RES.loadGroup("preload");
            };
            /**
             * preload资源组加载完成
             * Preload resource group is loaded
             */
            Main.prototype.onResourceLoadComplete = function(event) {
                if (event.groupName == "preload") {
                    this.stage.removeChild(this.loadingView);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                    if (window.location.href.indexOf("runner.html") >= 0)
                        this.enterGame();
                    else {
                        DataManager_1.default.getInstance().addEventListener(DataManager_1.default.SERVERINITIALLED, this.enterGame, this);
                        if (!localStorage.getItem('user_id'))
                            localStorage.setItem('user_id', 'guest_' + Math.floor(100000 * Math.random()));
                        DataManager_1.default.getInstance().userName = egret.localStorage.getItem("user_id");
                        DataManager_1.default.getInstance().init();
                    }
                }
            };
            /**
             * 资源组加载出错
             *  The resource group loading failed
             */
            Main.prototype.onItemLoadError = function(event) {
                console.warn("Url:" + event.resItem.url + " has failed to load");
            };
            /**
             * 资源组加载出错
             *  The resource group loading failed
             */
            Main.prototype.onResourceLoadError = function(event) {
                console.warn("Group:" + event.groupName + " has failed to load");
                this.onResourceLoadComplete(event);
            };
            /**
             * preload资源组加载进度
             * Loading process of preload resource group
             */
            Main.prototype.onResourceProgress = function(event) {
                if (event.groupName == "preload") {
                    this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
                }
            };
            /**
             * 结束preload，进入游戏场景
             * enterGame
             */
            Main.prototype.enterGame = function() {
                UIManager_1.default.getInstance().init(this.stage);
                UIManager_1.default.getInstance().pushScene(new MainScene_1.default(), 1);
            };
            return Main;
        }(egret.DisplayObjectContainer));
        exports.default = Main;
    }, { "./PreloaderView": 2, "./manager/DataManager": 6, "./manager/UIManager": 8, "./view/scene/MainScene": 27 }],
    2: [function(require, module, exports) {
        "use strict";
        //////////////////////////////////////////////////////////////////////////////////////
        //
        //  Copyright (c) 2014-present, Egret Technology.
        //  All rights reserved.
        //  Redistribution and use in source and binary forms, with or without
        //  modification, are permitted provided that the following conditions are met:
        //
        //     * Redistributions of source code must retain the above copyright
        //       notice, this list of conditions and the following disclaimer.
        //     * Redistributions in binary form must reproduce the above copyright
        //       notice, this list of conditions and the following disclaimer in the
        //       documentation and/or other materials provided with the distribution.
        //     * Neither the name of the Egret nor the
        //       names of its contributors may be used to endorse or promote products
        //       derived from this software without specific prior written permission.
        //
        //  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
        //  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
        //  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
        //  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
        //  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
        //  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
        //  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
        //  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
        //  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
        //  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
        //
        //////////////////////////////////////////////////////////////////////////////////////
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        var PreloaderView = /** @class */ (function(_super) {
            __extends(PreloaderView, _super);

            function PreloaderView() {
                var _this = _super.call(this) || this;
                _this.createView();
                return _this;
            }
            PreloaderView.prototype.createView = function() {
                this.textField = new egret.TextField();
                this.addChild(this.textField);
                this.textField.y = 300;
                this.textField.width = 480;
                this.textField.height = 100;
                this.textField.textAlign = "center";
            };
            PreloaderView.prototype.setProgress = function(current, total) {
                this.textField.text = "Loading..." + current + "/" + total;
            };
            return PreloaderView;
        }(egret.Sprite));
        exports.default = PreloaderView;
    }, {}],
    3: [function(require, module, exports) {
        "use strict";
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * Created by sam on 2017/5/31.
         * 场景类。游戏场景分主场景和战斗场景
         */
        var Scene = /** @class */ (function(_super) {
            __extends(Scene, _super);

            function Scene() {
                return _super.call(this) || this;
            }
            Scene.prototype.getData = function() {
                return this._data;
            };
            Scene.prototype.setData = function(data) {
                this._data = data;
            };
            Scene.prototype.onEnter = function() {};
            Scene.prototype.openNewProject = function() {};
            Scene.prototype.callback = function(data) {};
            return Scene;
        }(egret.Sprite));
        exports.default = Scene;
    }, {}],
    4: [function(require, module, exports) {
        Main = require('./Main').default;

        /**
         * {
         * "renderMode":, //引擎渲染模式，"canvas" 或者 "webgl"
         * "audioType": "" //使用的音频类型，0:默认，1:qq audio，2:web audio，3:audio
         * "antialias": //WebGL模式下是否开启抗锯齿，true:开启，false:关闭，默认为false
         * }
         **/

        egret.runEgret({
            renderMode: "webgl",
            audioType: 0
        });
    }, { "./Main": 1 }],
    5: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var DataManager_1 = require("./DataManager");
        /**
         * Created by sam on 2016/11/10.
         * 配置文件数据管理。
         */
        var ConfigManager = /** @class */ (function() {
            function ConfigManager() {
                this._dictionary = new Object();
                this._textDic = new Object();
            }
            ConfigManager.getInstance = function() {
                return this._instance || (this._instance = new ConfigManager());
            };
            ConfigManager.prototype.hasText = function(url) {
                if (this._textDic[url])
                    return true;
                return false;
            };
            ConfigManager.prototype.getText = function(url) {
                return this._textDic[url];
            };
            ConfigManager.prototype.saveText = function(url, text) {
                this._textDic[url] = text;
            };
            //保存配置文件
            ConfigManager.prototype.parseConfig = function(fileName) {
                var fileData = RES.getRes(fileName);
                console.assert(fileData != void 0, '[ConfigManager.parseConfig] file ' + fileName + '找不到！！！');
                var lines = fileData.split("\n");
                var keys;
                this._dictionary[fileName] = new Object();
                if (fileName == "skill")
                    this._dictionary[fileName + "name"] = new Object();
                for (var i = 0; i < lines.length - 1; i++) {
                    if (0 == i) {
                        keys = lines[i].split("^");
                    } else if (lines[i].length > 0) {
                        var values = lines[i].split("^");
                        var dat = new Object();
                        for (var n = 1; n < keys.length - 1; n++) {
                            dat[keys[n]] = values[n];
                        }
                        if (dat[keys[1]] && dat)
                            this._dictionary[fileName][dat[keys[1]]] = dat;
                    }
                }
            };
            //初始化配置文件，将preloader中的数据存库
            ConfigManager.prototype.init = function() {
                this.parseConfig("draw.csv");
                this.parseConfig("picture.csv");
                this.parseConfig("music.csv");
                this.parseConfig("tool.csv");
            };
            //加载配置文件并存库
            ConfigManager.prototype.loadConfig = function(fileName) {
                var url = "resource/config/" + fileName + ".csv";
                var cfgLoader = new egret.URLLoader();
                cfgLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                cfgLoader.addEventListener(egret.Event.COMPLETE, function(event) {
                    ConfigManager.getInstance().parseConfig(fileName);
                    event.target.dispatchEvent(new egret.Event(ConfigManager.CONFIGLOADED, false, false, fileName));
                }, url);
                cfgLoader.load(new egret.URLRequest(url));
            };
            //读取单项配置的所有文件
            ConfigManager.prototype.getConfigs = function(fileName) {
                return this._dictionary[fileName];
            };
            ConfigManager.prototype.getConfig = function(fileName, key) {
                return this._dictionary[fileName][key];
            };
            /**
             * 读取配置中的具体值
             * @param pk 配置的primary key
             * @param key 获取配置primary key下对应的具体值
             */
            ConfigManager.prototype.getValue = function(fileName, pkey, key) {
                return this._dictionary[fileName][pkey][key];
            };
            ConfigManager.prototype.getLanguageByKey = function(pkey) {
                if (DataManager_1.default.getInstance().getLanguage())
                    return this._dictionary["language.csv"][pkey]['cn_value'];
                else
                    return this._dictionary["language.csv"][pkey]['en_value'];
            };
            ConfigManager.CONFIGLOADED = "config_loaded"; //单个文件加载完成
            return ConfigManager;
        }());
        exports.default = ConfigManager;
    }, { "./DataManager": 6 }],
    6: [function(require, module, exports) {
        "use strict";
        /**
         * Created by sam on 2017/5/31.
         * 配置文件数据管理。
         */
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        var DataManager = /** @class */ (function(_super) {
            __extends(DataManager, _super);

            function DataManager() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.roomUIDs = "";
                _this.inRoomName = "";
                _this.autoRunMode = true;
                _this.cn_language = false;
                _this.teacherCtrl = false;
                _this.teacherID = 0;
                _this.studentID = 0;
                _this.teacherLook = 0;
                _this.isCommunitWork = false; //ide中是否是社区作品
                _this.serverIdHeader = "llid_";
                _this.roomNameHeader = "llroom_";
                _this.urlLoaded = [];
                _this._isInitialled = false;
                _this._gateSocketPort = "3010";
                _this._gateSocketIP = "115.29.112.82";
                return _this;
            }
            DataManager.getInstance = function() {
                if (this._instance == null) {
                    this._instance = new DataManager();
                }
                return this._instance;
            };
            DataManager.prototype.getLanguage = function() {
                return this.cn_language;
            };
            DataManager.prototype.changeLanguage = function() {
                this.cn_language = !this.cn_language;
            };
            //初始化配置文件，将preloader中的数据存库
            DataManager.prototype.init = function() {
                this.roomDatas = [];
                this.inRoomName = "";
                this.studentWork = null;
                this.teacherID = 0;
                var gatePomelo = new Pomelo();
                gatePomelo.on('io-error', function(e) {
                    console.log("socket has error:");
                });
                this.socket = new Pomelo();
                this.socket.on('io-error', function(e) {
                    console.log("socket has error:");
                });
                this.socket.on('close', function(e) {
                    console.log("socket is closed!");
                    // UIManager.getInstance().showMessage("text_warning_netlink");
                });
                this.socket.on('onResponse', function(e) {
                    console.log("onResponse");
                });
                var that = this;
                gatePomelo.init({ host: this._gateSocketIP, port: this._gateSocketPort }, function() {
                    gatePomelo.request('gate.gateHandler.queryEntry', {
                        name: that.userName
                    }, function(data) {
                        gatePomelo.disconnect();
                        if (data.code === 500)
                            console.log("Has error with GATE connection");
                        that.uid = data.uid;
                        that.socket.init({ host: data.host, port: data.port }, function() {
                            that._isInitialled = true;
                            that.dispatchEvent(new egret.Event(DataManager.SERVERINITIALLED));
                        });
                    });
                });
            };
            //访问后台socket
            DataManager.prototype.callServerSocket = function(route, value) {
                var _this = this;
                if (this._isInitialled) {
                    if (value)
                        value['uid'] = this.uid;
                    else
                        value = { uid: this.uid };
                    console.log('[ServerManager.callServerSocket] sent data:', value);
                    // 这里可以做个重连
                    if (DataManager.isWrong) {
                        window.location.reload();
                        DataManager.isWrong = false;
                    }
                    // console.log("什么情况呢？");
                    // pomelo 连接
                    this.socket.request(route, value, function(data) {
                        // 问题 DataManager.SERVERCALLBACK 在哪里
                        _this.dispatchEvent(new egret.Event(DataManager.SERVERCALLBACK, false, false, { "route": route, "data": data }));
                    });
                } else
                    console.log("服务器连接还没有初始化完成");
            };
            //接受服务器返回 cb逻辑处理function
            DataManager.prototype.onServerCall = function(route, cb) {
                if (this._isInitialled) {
                    this.socket.on(route, cb);
                }
            };
            DataManager.CONFIGLOADED = "config_loaded"; //单个文件加载完成
            DataManager.CONFIGALLLOADED = "config_all_loaded"; //全部文件加载完成
            DataManager.SERVERINITIALLED = "server_data_initial";
            DataManager.SERVERCALLBACK = "server_data_callback";
            DataManager.USER_GET_TOKEN = 'chat.chatHandler.getToken';
            DataManager.ROUTE_LOGIN = 'connector.entryHandler.enter';
            DataManager.GAME_NEW_WORK = 'game.gameHandler.newWork';
            DataManager.GAME_IMPORT_WORK = 'game.gameHandler.importWork';
            DataManager.GAME_CLONE_WORK = 'game.gameHandler.cloneWork';
            DataManager.GAME_SAVE_WORK = 'game.gameHandler.saveWork';
            DataManager.GAME_RENAME_WORK = 'game.gameHandler.renameWork';
            DataManager.GAME_JSPLUS_WORK = 'game.gameHandler.changeJs';
            DataManager.GAME_MODE_WORK = 'game.gameHandler.changeMode';
            DataManager.GAME_GET_WORK = 'game.gameHandler.getWork';
            DataManager.GAME_DELETE_WORK = 'game.gameHandler.deleteWork';
            DataManager.GAME_GET_PAGES = 'game.gameHandler.getPages';
            DataManager.GAME_PUBLISH_PAGE = 'game.gameHandler.publishPage';
            DataManager.GAME_AUTOSAVE_WORK = 'game.gameHandler.autoSaveWork';
            DataManager.GAME_SET_TEACHER = 'game.gameHandler.setTeacher';
            DataManager.GAME_ADD_AMOUNT = 'game.gameHandler.addAmount';
            DataManager.GAME_SET_NICKNAME = 'game.gameHandler.setNickname';
            DataManager.GAME_GET_PAGEBYID = 'game.gameHandler.getPageByID';
            DataManager.GAME_GET_CLASSES = 'game.gameHandler.getClasses';
            DataManager.GAME_ROOM_CREATE = 'chat.chatHandler.create';
            DataManager.GAME_ROOM_JOIN = 'connector.entryHandler.join';
            DataManager.GAME_ROOM_LEAVE = 'connector.entryHandler.leave';
            DataManager.GAME_ROOM_SEND = 'connector.entryHandler.send';
            DataManager.GAME_PASS_CODE = 'connector.entryHandler.workToB';
            DataManager.GAME_PUBLISH_CODE = 'connector.entryHandler.workToC';
            DataManager.GAME_CLASS_BEGIN = 'connector.entryHandler.beginClass';
            DataManager.GAME_CLASS_END = 'connector.entryHandler.endClass';
            DataManager.GAME_HAND_UP = 'connector.entryHandler.handup';
            DataManager.GAME_HAND_DOWN = 'connector.entryHandler.handdown';
            DataManager.GAME_HAND_CHOOSE = 'connector.entryHandler.choose';
            DataManager.GAME_HAND_STOP = 'connector.entryHandler.handstop';
            DataManager.GAME_CODE_CTRL = 'connector.entryHandler.codeCtrl';
            DataManager.GAME_CTRL_STOP = 'connector.entryHandler.stopCtrl';
            DataManager.GAME_CODE_UP = 'connector.entryHandler.upCode';
            DataManager.GAME_CODE_LOOK = 'connector.entryHandler.lookCode';
            DataManager.GAME_CODE_STOPLOOK = 'connector.entryHandler.stopLookCode';
            DataManager.GAME_WORK_GOOD = 'connector.entryHandler.workGood';
            DataManager.GAME_USER_INVITE = 'connector.entryHandler.invite';
            DataManager.GAME_USER_REFRESH = 'connector.entryHandler.refreshPC';
            DataManager.GAME_MOUSE_CLICK = 'connector.entryHandler.mouseClick';
            DataManager.GAME_CLASS_LIST = 'game.gameHandler.getClasses';
            DataManager.ROUTE_WORK_UPDATE = 'onWorkUpdate';
            DataManager.ROUTE_REFRESH_PAGE = 'onRefreshPage';
            DataManager.ROUTE_BACK_JOIN = 'onJoin';
            DataManager.ROUTE_CLASS_LEAVE = 'onLeave';
            DataManager.ROUTE_CHAT_CONTENT = 'onChat';
            DataManager.ROUTE_CLASS_BEGIN = 'onClassBegin';
            DataManager.ROUTE_CLASS_END = 'onClassEnd';
            DataManager.ROUTE_CLASS_HANDUP = 'onHandup';
            DataManager.ROUTE_CLASS_HANDDN = 'onHanddown';
            DataManager.ROUTE_CLASS_CHOOSE = 'onChoose';
            DataManager.ROUTE_CLASS_STOP = 'onHandStop';
            DataManager.ROUTE_CLASS_CTRL = 'onCtrl';
            DataManager.ROUTE_CLASS_CTRLSTOP = 'onCtrlStop';
            DataManager.ROUTE_CLASS_CODE = 'onCodeUp';
            DataManager.ROUTE_SAY_GOOD = 'onGoodSay';
            DataManager.ROUTE_CLASS_INVITED = 'onInvited';
            DataManager.ROUTE_CLASS_REFRESH = 'onRefresh';
            DataManager.ROUTE_MOUSE_CLICK = 'onMouseClick';
            DataManager.ROUTE_CLASS_LOOK = 'onLook';
            DataManager.ROUTE_CLASS_LOOKSTOP = 'onLookStop';
            DataManager.netStatus = null;
            DataManager.llido = null;
            DataManager.llidt = null;
            DataManager.isWrong = false;
            return DataManager;
        }(egret.EventDispatcher));
        exports.default = DataManager;
    }, {}],
    7: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var OpenProjectView_1 = require("../view/document/OpenProjectView");
        var CloneView_1 = require("../view/document/CloneView");
        var LeftBarView_1 = require("../view/document/LeftBarView");
        var NewProjectView_1 = require("../view/document/NewProjectView");
        var MenuContentView_1 = require("../view/document/MenuContentView");
        var LoginView_1 = require("../view/document/LoginView");
        var AppMain_1 = require("../view/document/AppMain");
        var ImportProjectView_1 = require("../view/document/ImportProjectView");
        /**
         * Created by sam on 2017/5/31.
         *   网页文件管理。
         */
        var DocumentManager = /** @class */ (function() {
            function DocumentManager() {}
            DocumentManager.getInstance = function() {
                if (this._instance == null) {
                    this._instance = new DocumentManager();
                }
                return this._instance;
            };
            DocumentManager.prototype.init = function() {
                OpenProjectView_1.default.initOpenProject();
                LeftBarView_1.default.init();
                CloneView_1.default.init();
                NewProjectView_1.default.init();
                ImportProjectView_1.default.init();
                MenuContentView_1.default.init();
                LoginView_1.default.init();
                AppMain_1.default.init();
            };
            return DocumentManager;
        }());
        exports.default = DocumentManager;
    }, { "../view/document/AppMain": 14, "../view/document/CloneView": 15, "../view/document/ImportProjectView": 16, "../view/document/LeftBarView": 17, "../view/document/LoginView": 18, "../view/document/MenuContentView": 19, "../view/document/NewProjectView": 20, "../view/document/OpenProjectView": 21 }],
    8: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var ConfigManager_1 = require("./ConfigManager");
        /**
         * Created by sam on 2017/5/31.
         * 界面管理。
         */
        var UIManager = /** @class */ (function() {
            function UIManager() {}
            UIManager.getInstance = function() {
                if (this._instance == null) {
                    this._instance = new UIManager();
                }
                return this._instance;
            };
            //初始化界面管理器
            UIManager.prototype.init = function(stage) {
                this._scenes = [];
                this._stage = stage;
            };
            //服务器返回的数据分派到各界面
            UIManager.prototype.serverBack = function(data) {
                this._scenes[this._scenes.length - 1].callback(data);
            };
            //层级scen层级管理
            UIManager.prototype.getRunningScene = function() {
                return this._scenes[this._scenes.length - 1];
            };
            UIManager.prototype.popScene = function() {
                this._stage.removeChild(this._scenes[this._scenes.length - 1]);
                this._scenes.pop();
                this._scenes[this._scenes.length - 1].onEnter();
            };
            UIManager.prototype.pushScene = function(scene, data) {
                this._scenes.push(scene);
                this._stage.addChild(this._scenes[this._scenes.length - 1]);
                this._scenes[this._scenes.length - 1].onEnter();
                if (data)
                    this._scenes[this._scenes.length - 1].setData(data);
            };
            UIManager.prototype.getStage = function() {
                return this._stage;
            };
            UIManager.prototype.replaceScene = function(scene, data) {
                this.popScene();
                this._scenes.push(scene);
                this._stage.addChild(this._scenes[this._scenes.length - 1]);
                this._scenes[this._scenes.length - 1].onEnter();
                if (data)
                    this._scenes[this._scenes.length - 1].setData(data);
            };
            UIManager.prototype.showMessage = function(test) {
                $("#system-notice-text").text(ConfigManager_1.default.getInstance().getLanguageByKey(test));
                document.getElementById('system-notice-text').style.display = "block";
                TweenLite.killTweensOf(this._stage);
                TweenLite.to(this._stage, 1.5, {
                    onComplete: function() {
                        document.getElementById('system-notice-text').style.display = "none";
                    }
                });
            };
            UIManager.prototype.showText = function(txt) {
                $("#system-notice-text").text(txt);
                document.getElementById('system-notice-text').style.display = "block";
                TweenLite.killTweensOf(this._stage);
                TweenLite.to(this._stage, 1.5, {
                    onComplete: function() {
                        document.getElementById('system-notice-text').style.display = "none";
                    }
                });
            };
            return UIManager;
        }());
        exports.default = UIManager;
    }, { "./ConfigManager": 5 }],
    9: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var CodeWorker_1 = require("../worker/CodeWorker");
        var EditorView_1 = require("../view/sprite/EditorView");
        /**
         * Created by sam on 2017/5/31.
         * 工人管理。
         */
        var WorkerManager = /** @class */ (function() {
            function WorkerManager() {
                this.funcNames = {};
                this._language = "python";
                this.isPaused = false;
                this._markers = [];
            }
            Object.defineProperty(WorkerManager.prototype, "language", {
                get: function() {
                    return this._language;
                },
                set: function(l) {
                    this._language = l;
                },
                enumerable: true,
                configurable: true
            });
            WorkerManager.getInstance = function() {
                if (this._instance == null) {
                    this._instance = new WorkerManager();
                }
                return this._instance;
            };
            WorkerManager.prototype.init = function(actor) {
                this._mainWorker = new CodeWorker_1.default(actor);
                this._editorView = new EditorView_1.default();
                this._editorView.init();
            };
            WorkerManager.prototype.changeLangue = function(l) {
                if (this.language != l) {
                    if (this._editorView)
                        this._editorView.dispose();
                    this._editorView = new EditorView_1.default();
                    this._editorView.init(l);
                    this.updateHighLight();
                    this.language = l;
                }
            };
            WorkerManager.prototype.saveFunctionName = function(l, v) {
                this.funcNames[l] = v;
            };
            WorkerManager.prototype.getFunctionName = function(l) {
                return this.funcNames[l];
            };
            WorkerManager.prototype.getMainWork = function() {
                return this._mainWorker;
            };
            WorkerManager.prototype.getEditor = function() {
                return this._editorView;
            };
            WorkerManager.prototype.dispose = function() {
                this._mainWorker.dispose();
            };
            WorkerManager.prototype.updateHighLight = function() {
                this._markers = []; //清除编辑器标记
                if (this._mainWorker.getEngine().lastAST) {
                    this.setAstCodeHighLight(this._mainWorker.getEngine().lastAST);
                }
            };
            WorkerManager.prototype.setEditorText = function(text) {
                this._editorView.editor.setValue(text, 1);
            };
            WorkerManager.prototype.getEditorText = function() {
                return this._editorView.editor.getSession().getValue();
            };
            WorkerManager.prototype.insertSnippet = function(snippet) {
                this._editorView.editor['completer'] && this._editorView.editor['completer'].insertMatch(snippet, this._editorView.editor);
            };
            WorkerManager.prototype.getEffectiveCodeLine = function() {
                return this._editorView.getValidCodeLines();
            };
            /**
             * 不同语言的语法树结构不完全相同，单独处理高亮显示
             * @param ast
             */
            WorkerManager.prototype.setAstCodeHighLight = function(ast) {
                switch (this._editorView.language) {
                    case 'javascript':
                        {
                            this.setJSAstCodeHighLight(ast);
                            break;
                        }
                    case 'python':
                        {
                            this.setPythonAstCodeHighLight(ast);
                            break;
                        }
                }
            };
            WorkerManager.prototype.saveObj = function(obj) {
                var line = 0;
                if (this._mainWorker._codeEngine._aether.esperEngine.evaluator.topFrame.ast.originalRange)
                    line = this._mainWorker._codeEngine._aether.esperEngine.evaluator.topFrame.ast.originalRange.start.row;
                var funcName = this.getFunctionName(line);
                if (funcName)
                    this._mainWorker._codeEngine.addObject(funcName, obj);
                return obj;
            };
            /**
             * JavaScript 高亮设置
             */
            WorkerManager.prototype.setJSAstCodeHighLight = function(ast) {
                var range = ast.loc;
                var Range = ace.require('./range').Range;
                var rr = new Range(range.start.line - 1, range.start.column, range.end.line - 1, range.end.column);
                this._markers.push(this._editorView.editor.getSession().addMarker(rr, 'executing', 'text', true));
                this.highlightCurrGutterLine(range.start.line);
            };
            /**
             * Python 高亮设置
             */
            WorkerManager.prototype.setPythonAstCodeHighLight = function(ast) {
                var range = ast.originalRange;
                if (!range)
                    return;
                var startLine = range.start.row;
                var startColumn = range.start.col;
                var endLine = range.end.row;
                var endColumn = range.end.col;
                var initStartLine = startLine;
                var initEndColumn = endColumn;
                if (ast.srcName && ast.type === 'CallExpression') {
                    var lineNum = this._editorView.editor.getSession().getLength();
                    var srcPart = ast.srcName.split('(')[0];
                    var line = this._editorView.editor.getSession().getLine(initStartLine);
                    while (line.indexOf(srcPart) === -1) {
                        line = this._editorView.editor.getSession().getLine(++initStartLine);
                        if (line.indexOf(srcPart) != -1) {
                            initEndColumn = srcPart.length;
                        }
                        if (initStartLine >= lineNum) {
                            initStartLine = startLine;
                            initEndColumn = endColumn;
                            break;
                        }
                    }
                    startLine = endLine = initStartLine;
                    endColumn = initEndColumn;
                }
                var Range = ace.require('./range').Range;
                var rr = new Range(startLine, startColumn, endLine, endColumn);
                this._markers.push(this._editorView.editor.getSession().addMarker(rr, 'executing', 'text', true));
                this.highlightCurrGutterLine(startLine);
                if (ast.srcName && ast.srcName.indexOf('.') != -1) {}
            };
            WorkerManager.prototype.highlightCurrGutterLine = function(row) {
                //运行时,箭头指向的变化
                var docLength = this._editorView.editor.getSession().getLength();
                for (var i = 0; i < docLength; ++i) {
                    this._editorView.editor.renderer.removeGutterDecoration(i, 'executing');
                }
                if (row > 0) {
                    this._editorView.editor.renderer.addGutterDecoration(row, 'executing');
                    this._editorView.editor.clearSelection();
                    this._editorView.editor.moveCursorTo(row);
                    this._editorView.editor.renderer.scrollToRow(row);
                }
            };
            return WorkerManager;
        }());
        exports.default = WorkerManager;
    }, { "../view/sprite/EditorView": 29, "../worker/CodeWorker": 33 }],
    10: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * Created by sam on 2017/5/25.
         * 颜色管理
         */
        var ColorUtil = /** @class */ (function() {
            function ColorUtil() {}
            ColorUtil.getColor = function(n) {
                if (n == "yellow")
                    return 0xffff00;
                else if (n == "red")
                    return 0xff0000;
                else if (n == "green")
                    return 0x00ff00;
                else if (n == "blue")
                    return 0x0000ff;
                else if (n == "black")
                    return 0x000000;
                else if (n == "white")
                    return 0xffffff;
                else if (n == "pink")
                    return 0xffc0cb;
                else if (n == "purple")
                    return 0x9400d3;
                else if (n == "brown")
                    return 0xa52a2a;
                else if (n == "orange")
                    return 0xffa500;
                return 0xffffff;
            };
            return ColorUtil;
        }());
        exports.default = ColorUtil;
    }, {}],
    11: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * Created by sam on 2017/5/25.
         * 实现plist动画文件的读取,显示
         */
        var PlistParser = /** @class */ (function() {
            function PlistParser(plistName) {
                this.isLoop = false;
                this._name = plistName;
                this._allTexture = new Object();
                var plist = RES.getRes(plistName + ".json");
                var image = new egret.Bitmap();
                image.texture = RES.getRes(plist.meta.image);
                for (var i = 0; i < plist.frames.length; i++) {
                    var drawTexture = new egret.RenderTexture();
                    var frame = plist.frames[i];
                    drawTexture.drawToTexture(image, new egret.Rectangle(frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h), 1);
                    drawTexture.$initData(0, 0, frame.sourceSize.w, frame.sourceSize.h, frame.spriteSourceSize.x, frame.spriteSourceSize.y, frame.frame.w, frame.frame.h, frame.sourceSize.w, frame.sourceSize.h);
                    this._allTexture[frame.filename] = drawTexture;
                }
            }
            PlistParser.prototype.getTexture = function(name) {
                return this._allTexture[name];
            };
            PlistParser.prototype.dispose = function() {
                for (var texKey in this._allTexture) {
                    this._allTexture[texKey].dispose();
                    this._allTexture[texKey] = null;
                }
                this._allTexture = null;
            };
            return PlistParser;
        }());
        exports.default = PlistParser;
    }, {}],
    12: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var CanvasView_1 = require("../view/sprite/CanvasView");
        var DataManager_1 = require("../manager/DataManager");
        var WorkerManager_1 = require("../manager/WorkerManager");
        /**
         * Created by ken on 2017/08/03.
         * thumbnail
         * */
        var ThumbnailUtil = /** @class */ (function() {
            function ThumbnailUtil() {}
            ThumbnailUtil.worksPath = function() {
                var width = Math.floor((document.body.clientWidth - 73) / 2);
                var height = document.body.clientHeight - 86;
                var size = (width > height) ? height : width;
                if (WorkerManager_1.default.getInstance().getEditor().editor.getValue().indexOf("getElementById") >= 0) {
                    var myiframe = document.getElementById("drawBoard");
                    var myCanvas = myiframe.contentWindow.document.getElementById("canvas");
                    var tmp = document.createElement("canvas");
                    tmp.width = 300;
                    tmp.height = 300;
                    tmp.getContext("2d").drawImage(myCanvas, 0, 0, size, size, 0, 0, 300, 300);
                    var request = new egret.HttpRequest();
                    request.responseType = egret.HttpResponseType.TEXT;
                    request.open("http://" + location.hostname + "/python/resource/works/upload.php", egret.HttpMethod.POST);
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    //设置图片跨域访问
                    request.send("key=" + DataManager_1.default.getInstance().curWork.id + "&data=" + tmp.toDataURL("image/png"));
                } else {
                    var renderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(CanvasView_1.default.getInstance(), new egret.Rectangle(0, 0, size, size), 300.0 / size);
                    var request = new egret.HttpRequest();
                    request.responseType = egret.HttpResponseType.TEXT;
                    request.open("http://" + location.hostname + "/python/resource/works/upload.php", egret.HttpMethod.POST);
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    request.send("key=" + DataManager_1.default.getInstance().curWork.id + "&data=" + renderTexture.toDataURL("image/png"));
                }
            };
            ThumbnailUtil.pagesPath = function(id) {
                var width = Math.floor((document.body.clientWidth - 73) / 2);
                var height = document.body.clientHeight - 86;
                var size = (width > height) ? height : width;
                if (WorkerManager_1.default.getInstance().getEditor().editor.getValue().indexOf("getElementById") >= 0) {
                    var myCanvas = document.getElementById("canvas");
                    var tmp = document.createElement("canvas");
                    tmp.width = 300;
                    tmp.height = 300;
                    tmp.getContext("2d").drawImage(myCanvas, 0, 0, size, size, 0, 0, 300, 300);
                    var request = new egret.HttpRequest();
                    request.responseType = egret.HttpResponseType.TEXT;
                    console.log(location.hostname);
                    request.open("http://" + location.hostname + "/python/resource/pages/upload.php", egret.HttpMethod.POST);
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    //设置图片跨域访问
                    //tmp.setAttribute('crossOrigin', 'anonymous');
                    //tmp.onload = function () {
                    request.send("key=" + id + "&data=" + tmp.toDataURL("image/png"));
                    //}
                } else {
                    var renderTexture = new egret.RenderTexture();
                    renderTexture.drawToTexture(CanvasView_1.default.getInstance(), new egret.Rectangle(0, 0, size, size), 300.0 / size);
                    var request = new egret.HttpRequest();
                    request.responseType = egret.HttpResponseType.TEXT;
                    request.open("http://" + location.hostname + "/python/resource/pages/upload.php", egret.HttpMethod.POST);
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    request.send("key=" + id + "&data=" + renderTexture.toDataURL("image/png"));
                }
            };
            return ThumbnailUtil;
        }());
        exports.default = ThumbnailUtil;
    }, { "../manager/DataManager": 6, "../manager/WorkerManager": 9, "../view/sprite/CanvasView": 28 }],
    13: [function(require, module, exports) {
        "use strict";
        /**
         * Created by sam on 2017/5/25.
         * 时间管理
         */
        Object.defineProperty(exports, "__esModule", { value: true });
        var TimeUtil = /** @class */ (function() {
            function TimeUtil() {}
            TimeUtil.getTime = function(timevalue) {
                var date = new Date(eval(timevalue) * 1000);
                var Y = date.getFullYear() + '-',
                    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
                    h = date.getHours() + ':',
                    m = date.getMinutes() + ':';
                var YY = date.getFullYear(),
                    MM = date.getMonth() + 1,
                    DD = date.getDate(),
                    hh = date.getHours(),
                    mm = date.getMinutes(),
                    ss = date.getSeconds();
                var currentTime = new Date();
                var CY = currentTime.getFullYear(), //获取完整的年份(4位,1970-????)
                    CM = currentTime.getMonth() + 1, //获取当前月份(0-11,0代表1月)
                    CD = currentTime.getDate(), //获取当前日(1-31)
                    Ch = currentTime.getHours(), //获取当前小时数(0-23)
                    Cm = currentTime.getMinutes(), //获取当前分钟数(0-59)
                    Cs = currentTime.getSeconds(); //获取当前秒数(0-59)
                if (CY == YY && CM == MM) {
                    if (CD > DD) {
                        var day = CD - DD;
                        return day + "<span id='days-ago'>" + TimeUtil.daytitle + "</span>";
                    } else if (Ch > hh) {
                        var hours = Ch - hh;
                        return hours + "<span id='hours-ago'>" + TimeUtil.hourtitle + "</span>";
                    } else if (Cm > mm) {
                        var minutes = Cm - mm;
                        return minutes + "<span id='minutes-ago'>" + TimeUtil.minutetitle + "</span>";
                    } else if (Cs > ss) {
                        var seconds = Cs - ss;
                        return seconds + "<span id='seconds-ago'>" + TimeUtil.secondtitle + "</span>";
                    }
                } else {
                    return Y + M + D;
                }
            };
            TimeUtil.daytitle = "days ago";
            TimeUtil.hourtitle = "hours ago";
            TimeUtil.minutetitle = "minutes ago";
            TimeUtil.secondtitle = "seconds ago";
            return TimeUtil;
        }());
        exports.default = TimeUtil;
    }, {}],
    14: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * Created by sam on 2017/5/22.
         * 控制头部栏和左边栏点击事件
         */
        var DataManager_1 = require("../../manager/DataManager");
        var LoginView_1 = require("./LoginView");
        var MenuContentView_1 = require("./MenuContentView");
        var WorkerManager_1 = require("../../manager/WorkerManager");
        var AppMain = /** @class */ (function() {
            function AppMain() {}
            AppMain.init = function() {
                var clickHandler = function(e) {
                    if ($(this).attr("id") == "toolbar-item-language")
                        return;
                    if ($(this).attr("id") == "toolbar-item-classroom")
                        return;
                    if ($(this).attr("id") != "toolbar-item-file")
                        document.getElementById("toolbar-item-file").className = "toolbar-item";
                    if (this.className != "toolbar-item open")
                        this.className = "toolbar-item open";
                    else
                        this.className = "toolbar-item";
                    var all = document.querySelectorAll('.toolbar-dropdown-community-title li');
                    for (var i = 0; i < all.length; i++) {
                        all[i].className = '';
                    }
                };
                var closePageHandler = function(e) {
                    document.getElementById('open-project').style.display = "none";
                    document.getElementById('new-project').style.display = "none";
                    document.getElementById('clone-project').style.display = "none";
                    document.getElementById('import-project').style.display = "none";
                    document.getElementById('backgroundBoardId').style.display = "none";
                    document.getElementById("editor-pane-nav-options-menu").style.display = "none";
                };
                $("#account-exit").click(function(e) {
                    $("#class-list-box").remove();
                    localStorage.removeItem('user_id');
                    localStorage.removeItem('classroom_name');
                    localStorage.removeItem("nick_name"); // 添加昵称
                    LoginView_1.default.checkLogin();
                    location.reload();
                });
                $(".dropdown").click(function(e) {
                    if (this.className != "dropdown expanded") {
                        this.className = "dropdown expanded";
                        if ($(this).attr("id") == "dropdown-file")
                            document.getElementById("dropdown-content-file").style.display = "block";
                        else if ($(this).attr("id") == "dropdown-share") {
                            var url = "http://" + location.hostname + "/python/show.html?v=" + DataManager_1.default.getInstance().curWork.id;
                            document.getElementById("share-content-qrcode").innerHTML = "";
                            var qrcode = new QRCode(document.getElementById("share-content-qrcode"), { width: 200, height: 200 });
                            qrcode.makeCode(url);
                            document.getElementById("share-content-urltext").innerHTML = url;
                            document.getElementById("dropdown-content-share").style.display = "block";
                        } else if ($(this).attr("id") == "dropdown-help")
                            document.getElementById("dropdown-content-help").style.display = "block";
                        else
                            $("#dropdown-content-login").show();
                        $("#click-underlay").css("display", "block");
                        $("#click-underlay").css("width", "100%");
                        $("#click-underlay").css("height", "100%");
                    } else {
                        this.className = "dropdown";
                        if ($(this).attr("id") == "dropdown-file")
                            document.getElementById("dropdown-content-file").style.display = "none";
                        else if ($(this).attr("id") == "dropdown-share")
                            document.getElementById("dropdown-content-share").style.display = "none";
                        else
                            document.getElementById("dropdown-content-help").style.display = "none";
                        $("#click-underlay").css("display", "none");
                        $("#click-underlay").css("width", 0);
                        $("#click-underlay").css("height", 0);
                    }
                });
                $("#click-underlay").click(function(e) {
                    $("#btn-function").css('background-color', "transparent");
                    $("#btn-insert").css('background-color', "transparent");
                    $("#btn-picture").css('background-color', "transparent");
                    if (MenuContentView_1.default.moonMode == false) {
                        $("#btn-function img").attr('src', "resource/assets/brush.svg");
                        $("#btn-insert img").attr('src', "resource/assets/code.svg");
                        $("#btn-picture img").attr('src', "resource/assets/picture.svg");
                    }
                    $("#dropdown-content-file").css("display", "none");
                    $("#dropdown-content-share").css("display", "none");
                    $("#dropdown-content-help").css("display", "none");
                    $("#click-underlay").css("display", "none");
                    $("#click-underlay").css("width", 0);
                    $("#click-underlay").css("height", 0);
                    $("#btn-function-content").css('display', "none");
                    $("#btn-insert-content").css('display', "none");
                    $("#btn-picture-content").css('display', "none");
                    document.getElementById("editor-pane-nav-options-menu").style.display = "none";
                    document.getElementById("editor-pane-nav-snippets-menu").style.display = "none";
                    document.getElementById("dropdown-file").className = "dropdown";
                    document.getElementById("dropdown-share").className = "dropdown";
                    document.getElementById("dropdown-help").className = "dropdown";
                });
                var isHided = false;
                $("#switch-left").click(function(e) {
                    if (isHided) {
                        isHided = false;
                        document.getElementById("switch-left-icon").style.backgroundImage = "url(./resource/assets/left_arrow_in.png)";
                        document.getElementById("switch-left-icon").style.left = "40px";
                        document.getElementById("switch-left").style.width = "90px";
                        document.getElementById("banner-left").style.display = "block";
                        document.getElementById("content-left").style.display = "block";
                        document.getElementById("content").style.left = "90px";
                        document.getElementById("content-top").style.left = "90px";
                        $("#content-top-right").width(document.body.clientWidth - parseInt(document.getElementById("content-top-right").style.left) - 90);
                    } else {
                        isHided = true;
                        document.getElementById("switch-left-icon").style.backgroundImage = "url(./resource/assets/left_arrow_out.png)";
                        document.getElementById("switch-left-icon").style.left = "10px";
                        document.getElementById("switch-left").style.width = "30px";
                        document.getElementById("banner-left").style.display = "none";
                        document.getElementById("content-left").style.display = "none";
                        document.getElementById("content").style.left = "0px";
                        document.getElementById("content-top").style.left = "0px";
                        $("#content-top-right").width(document.body.clientWidth - parseInt(document.getElementById("content-top-right").style.left));
                    }
                });
                $(".toolbar-item").click(clickHandler);
                $(".toolbar-dropdown").click(function(event) {
                    event.stopPropagation();
                });
                $(".page-close").click(closePageHandler);
                $(".menu-button-cancel").click(closePageHandler);
                $("#game-area").height(document.body.clientHeight - 210);
                $("#content").height(document.body.clientHeight - 210);
                $('#code-area').css('height', $(window).height() - 210);
                $('#drag-line').css('height', $(window).height() - 210);
                $("#room-container-chat-content").height(document.body.clientHeight - 468);
                var midWidth = document.body.clientWidth / 2;
                $("#code-area").width(midWidth - 90);
                $("#drag-line").css('left', midWidth - 90);
                $("#ui-ruler").css('left', midWidth - 90);
                $("#drawBoard").css('left', midWidth - 90);
                $("#drawBoard").width(document.body.clientWidth - midWidth + 90);
                $("#content-top-right").css('left', midWidth - 90);
                $("#content-top-left").width(midWidth - 90);
                $("#content-top-right").width(document.body.clientWidth - midWidth);
                var dragging = false;
                $("#drag-line").bind('mousedown', function() {
                    dragging = true;
                });
                window.onmousemove = function(e) {
                    if (dragging) {
                        $("#code-area").width(e.pageX - 90);
                        $("#drag-line").css('left', e.pageX - 90);
                        $("#ui-ruler").css('left', e.pageX - 90);
                        $("#drag-line").width(document.body.clientWidth - e.pageX + 90);
                        $("#drawBoard").css('left', e.pageX - 90);
                        $("#drawBoard").width(document.body.clientWidth - e.pageX + 90);
                        $("#content-top-right").css('left', e.pageX - 90);
                        $("#content-top-left").width(e.pageX - 90);
                        $("#content-top-right").width(document.body.clientWidth - e.pageX);
                        WorkerManager_1.default.getInstance().getEditor().editor.resize();
                    }
                };
                $(document).mouseup(function(e) {
                    dragging = false;
                    e.cancelBubble = true;
                    $("#drag-line").width(8);
                });
                $(document).on('mousedown', 'img', function(e) {
                    e.preventDefault();
                });
                $(document).on('click', function(e) {
                    var tar = $('#room-container-student');
                    if (!tar.is(e.target) && tar.has(e.target).length === 0) {
                        $('#room-bottom-tool').hide();
                    }
                });
                $("#classroom-util-layer div").on("mouseover", function() {
                    var popValue = $(this).attr('info');
                    var xAxis = $(this).offset().left;
                    var yAxis = $(this).offset().top - $(document).scrollTop();
                    var domWidth = $(this).width();
                    var domHeight = $(this).height();
                    $("#titleTips1").show();
                    $("#titleTips1").css("top", (yAxis + domHeight + 4) - 30 + "px");
                    var smallTipsWidth = $("#titleTips1").width();
                    $("#titleTips1").css("left", xAxis + domWidth / 2 - smallTipsWidth / 2 - 45);
                    $("#titleTips1").html(popValue);
                });
                $("#classroom-util-layer div").on("mouseout", function() {
                    $("#titleTips1").hide();
                });
                $('#toolbar-item-language').trigger('click');
                window.addEventListener("resize", function() {
                    var midWidth = document.body.clientWidth / 2;
                    $("#code-area").width(midWidth - 90);
                    $("#drag-line").css('left', midWidth - 90);
                    $("#drawBoard").css('left', midWidth - 90);
                    $("#ui-ruler").css('left', midWidth - 90);
                    $("#drawBoard").width(document.body.clientWidth - midWidth + 90);
                    $("#content-top-right").css('left', midWidth - 90);
                    $("#content-top-left").width(midWidth - 90);
                    $("#content-top-right").width(document.body.clientWidth - midWidth);
                });
            };
            return AppMain;
        }());
        exports.default = AppMain;
    }, { "../../manager/DataManager": 6, "../../manager/WorkerManager": 9, "./LoginView": 18, "./MenuContentView": 19 }],
    15: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var CanvasView_1 = require("../sprite/CanvasView");
        var DataManager_1 = require("../../manager/DataManager");
        var WorkerManager_1 = require("../../manager/WorkerManager");
        /**
         * Created by sam on 2017/5/25.
         * library 界面管理
         */
        var CloneView = /** @class */ (function() {
            function CloneView() {}
            CloneView.init = function() {
                document.getElementById('clone-button-confirm-id').onclick = function(e) {
                    var txt = document.getElementById("clone-project-text").value;

                    function getByteLen(val) {
                        var len = 0;
                        for (var i = 0; i < val.length; i++) {
                            var a = val.charAt(i);
                            if (a.match(/[^\x00-\xff]/ig) != null) {
                                len += 2;
                            } else {
                                len += 1;
                            }
                        }
                        return len;
                    }
                    var valc = getByteLen(txt);
                    var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5\s]+$/;
                    if (valc < 1) {
                        document.getElementById("clone-project-text-notice").style.display = "block";
                        TweenLite.to(CanvasView_1.default.getInstance(), 1.5, {
                            onComplete: function() {
                                document.getElementById('clone-project-text-notice').style.display = "none";
                            }
                        });
                    } else if (valc > 20) {
                        document.getElementById("clone-project-text-notice-length").style.display = "block";
                        TweenLite.to(CanvasView_1.default.getInstance(), 1.5, {
                            onComplete: function() {
                                document.getElementById('clone-project-text-notice-length').style.display = "none";
                            }
                        });
                    } else if (!reg.test(txt)) {
                        document.getElementById("clone-reg-input").style.display = "block";
                        TweenLite.to(CanvasView_1.default.getInstance(), 1.5, {
                            onComplete: function() {
                                document.getElementById('clone-reg-input').style.display = "none";
                            }
                        });
                    } else {
                        DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_CLONE_WORK, { title: txt, code: DataManager_1.default.getInstance().curWork.codes, jsplus: "" });
                    }
                    $(".divider-publish").show();
                };
                document.getElementById("file-3").onclick = function(e) {
                    if (DataManager_1.default.getInstance().isCommunitWork == false) {
                        DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_SAVE_WORK, { id: DataManager_1.default.getInstance().curWork.id, name: document.getElementById("project-title-in").innerText, code: WorkerManager_1.default.getInstance().getEditorText() });
                    } else {}
                };
                document.getElementById("file-4").onclick = function(e) {
                    document.getElementById('backgroundBoardId').style.display = "block";
                    document.getElementById('clone-project').style.display = "block";
                    document.getElementById("clone-project-text").value = "";
                };
            };
            return CloneView;
        }());
        exports.default = CloneView;
    }, { "../../manager/DataManager": 6, "../../manager/WorkerManager": 9, "../sprite/CanvasView": 28 }],
    16: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var DataManager_1 = require("../../manager/DataManager");
        /**
         * Created by sam on 2017/5/25.
         * library 界面管理
         */
        var ImportProjectView = /** @class */ (function() {
            function ImportProjectView() {}
            ImportProjectView.init = function() {
                document.getElementById('import-button-confirm-id').onclick = function(e) {
                    var txt = document.getElementById("import-project-text").value;
                    DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_IMPORT_WORK, { id: txt });
                };
                document.getElementById("file-7").onclick = function(e) {
                    document.getElementById('backgroundBoardId').style.display = "block";
                    document.getElementById('import-project').style.display = "block";
                    document.getElementById("import-project-text").value = "";
                };
            };
            return ImportProjectView;
        }());
        exports.default = ImportProjectView;
    }, { "../../manager/DataManager": 6 }],
    17: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var ConfigManager_1 = require("../../manager/ConfigManager");
        var WorkerManager_1 = require("../../manager/WorkerManager");
        var DataManager_1 = require("../../manager/DataManager");
        /**
         * Created by sam on 2017/5/25.
         * library 界面管理
         */
        var LeftBarView = /** @class */ (function() {
            function LeftBarView() {}
            LeftBarView.init = function() {
                var dics = ConfigManager_1.default.getInstance().getConfigs("draw.csv");
                var typeShapes = [];
                var x;
                for (x in dics) {
                    typeShapes.push(dics[x]);
                }
                dics = ConfigManager_1.default.getInstance().getConfigs("tool.csv");
                var typeTool = [];
                for (x in dics) {
                    typeTool.push(dics[x]);
                }
                dics = ConfigManager_1.default.getInstance().getConfigs("picture.csv");
                var typePictures = [];
                for (x in dics) {
                    typePictures.push(dics[x]);
                }
                var funcTip1 = "<h4 class='shapes-title'>绘图函数</h4><ul class='shapes-ul'>";
                for (var i = 0; i < typeShapes.length; i++) {
                    funcTip1 += "<li dataZd=" + typeShapes[i]['fundefault'] + "><div>" + typeShapes[i]['describes'] + "</div><img src='http://activity.youyoucode.cn/ide" + typeShapes[i].url + "' width='40' height='40'/><span>" + typeShapes[i]['name'] + "</span></li>";
                }
                funcTip1 += "</ul>";
                $('#btn-function-content').append(funcTip1);
                funcTip1 = "<h4 class='shapes-title'>基础函数</h4><ul class='shapes-ul'>";
                for (var i = 0; i < typeTool.length; i++) {
                    funcTip1 += "<li dataZd=" + typeTool[i]['fundefault'] + "><div>" + typeTool[i]['describes'] + "</div><img src='http://activity.youyoucode.cn/ide" + typeTool[i].url + "' width='40' height='40'/><span>" + typeTool[i]['name'] + "</span></li>";
                }
                funcTip1 += "</ul>";
                $('#btn-insert-content').append(funcTip1);
                funcTip1 = "<h4 class='shapes-title'>图片素材</h4>";
                for (var i = 0; i < typePictures.length; i++) {
                    funcTip1 += "<div class = 'image-grid-padding' dataZd =" + typePictures[i].thumbnailfile + " imageName=" + typePictures[i].fileName + " imagedefault=" + typePictures[i].initfunc + "><div class = 'image-grid-box picture_img' ><img src=" + typePictures[i].thumbnailfile + "></div><div class = 'image-grid-name'>" + typePictures[i].fileName + "</div></div>";
                    funcTip1 += "<div class = 'image-grid-divider'></div>";
                }
                $('#btn-picture-content').append(funcTip1);
                $('#btn-picture-content .image-grid-padding').each(function(i) {
                    $(this).on('click', function(e) {
                        var imageDefault = $(this).attr('imageDefault');
                        if (WorkerManager_1.default.getInstance().getEditor().editor.getCursorPosition().column > 0)
                            WorkerManager_1.default.getInstance().getEditor().editor.insert('\n' + imageDefault);
                        else
                            WorkerManager_1.default.getInstance().getEditor().editor.insert(imageDefault);
                        WorkerManager_1.default.getInstance().getMainWork().refreshFrame();
                    });
                });
                $('.shapes-ul li').each(function(i) {
                    $(this).on('click', function(e) {
                        var dataZd = $(this).attr('dataZd');
                        dataZd = dataZd.replace(/&nbsp;/g, " ");
                        dataZd = dataZd.replace(/\/n/g, "\n");
                        if (WorkerManager_1.default.getInstance().getEditor().editor.getCursorPosition().column > 0)
                            WorkerManager_1.default.getInstance().getEditor().editor.insert('\n' + dataZd);
                        else
                            WorkerManager_1.default.getInstance().getEditor().editor.insert(dataZd);
                        $("#btn-insert-content").css('display', "none");
                        $("#btn-function-content").css('display', "none");
                    });
                });
                $(".shapes-ul li").on("mouseover", function() {
                    var popValue = $(this).find('div').html();
                    var xAxis = $(this).offset().left;
                    var yAxis = $(this).offset().top - $(document).scrollTop();
                    var domWidth = $(this).width();
                    var domHeight = $(this).height();
                    $("#titleTips").show();
                    $("#titleTips").css("top", (yAxis + domHeight + 4) + "px");
                    var smallTipsWidth = $("#titleTips").width();
                    $("#titleTips").css("left", xAxis + domWidth / 2 - smallTipsWidth / 2);
                    $("#titleTips").html(popValue);
                });
                $(".shapes-ul li").on("mouseout", function() {
                    $("#titleTips").hide();
                });
                $("#btn-function").click(function(e) {
                    $("#btn-function").css('background-color', "#ffa226");
                    $("#btn-insert-content").css('display', "none");
                    $("#btn-picture-content").css('display', "none");
                    $("#btn-function-content").css('display', "block");
                    $("#btn-function-content .left-arrow-tip").css('top', 12);
                    $("#click-underlay").css("display", "block");
                    $("#click-underlay").css("width", "100%");
                    $("#click-underlay").css("height", "100%");
                    $("#btn-function img").attr('src', "resource/assets/brush_white.svg");
                });
                $("#btn-insert").click(function(e) {
                    $("#btn-insert").css('background-color', "#ffa226");
                    $("#btn-picture-content").css('display', "none");
                    $("#btn-function-content").css('display', "none");
                    $("#btn-insert-content").css('display', "block");
                    $("#btn-insert-content .left-arrow-tip").css('top', 12);
                    $("#click-underlay").css("display", "block");
                    $("#click-underlay").css("width", "100%");
                    $("#click-underlay").css("height", "100%");
                    $("#btn-insert img").attr('src', "resource/assets/code_white.svg");
                });
                $("#btn-picture").click(function(e) {
                    $("#btn-picture").css('background-color', "#ffa226");
                    $("#btn-function-content").css('display', "none");
                    $("#btn-insert-content").css('display', "none");
                    $("#btn-picture-content").css('display', "block");
                    $("#btn-picture-content .left-arrow-tip").css('top', 12);
                    $("#click-underlay").css("display", "block");
                    $("#click-underlay").css("width", "100%");
                    $("#click-underlay").css("height", "100%");
                    $("#btn-picture img").attr('src', "resource/assets/picture_white.svg");
                });
                $("#btn-classlist").click(function(e) {
                    DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_CLASS_LIST, { uid: DataManager_1.default.getInstance().uid });
                });
                /*
                var musicLibs = LibraryView.musics;
                var mLibs = [];
                var sLibs = [];
                var x;
                // console.log('music',musicLibs)
                for(x in musicLibs){
                    if(musicLibs[x].category == 1){
                       mLibs.push(musicLibs[x]);
                    }else{
                       sLibs.push(musicLibs[x])
                    }
                }

                 mLibs.sort(function(a,b){
                        return Date.parse(a.uploadtime) < Date.parse(b.uploadtime) ? 1 : -1;
                 });
                 sLibs.sort(function(a,b){
                        return Date.parse(a.uploadtime) < Date.parse(b.uploadtime) ? 1 : -1;
                 });
                var musicStr = "";
                for (var i = 0; i < mLibs.length; i++) {
                        musicStr += "<div class = 'image-grid-padding'><div class = 'image-grid-box music-img' id=" + mLibs[i].id + " initfunc= "+ mLibs[i].initfunc +" state=" + mLibs[i].STATUS +" musicName=" +mLibs[i].name +"  musicUrl="+ mLibs[i].originUrl + mLibs[i].sound_url + mLibs[i].fileName+"><img src='resource/music/icon_music.png'/></div><div class = 'image-grid-name'>" + mLibs[i].name + "</div></div>";
                        musicStr += "<div class = 'image-grid-divider'></div>";
                }
                $('.music-box').append(musicStr);

                var soundStr = "";
                for (var i = 0; i < sLibs.length; i++) {
                        soundStr += "<div class = 'image-grid-padding'><div class = 'image-grid-box music-img' id=" + sLibs[i].id + "  initfunc= "+ sLibs[i].initfunc +" state=" + sLibs[i].STATUS +" musicName=" +sLibs[i].name +" musicUrl="+ sLibs[i].originUrl + sLibs[i].sound_url + sLibs[i].fileName+"><img src='resource/music/icon_music.png'/></div><div class = 'image-grid-name'>" + sLibs[i].name + "</div></div>";
                        soundStr += "<div class = 'image-grid-divider'></div>";
                }
                $('.sound-box').append(soundStr);

                 $('.music-img').hover(function(){
                    var musicUrl = $(this).attr('musicUrl')
                         $('#audio_s').attr('src',musicUrl);
                         $('#audio_s').trigger('play');
                   },function(){
                         $('#audio_s').trigger('pause');
                });
                  $('.music-box,.sound-box').on('click','.music-img',function(e){
                 var tt: any = e.currentTarget;
                 var musicUrl = $(this).attr('musicUrl')
                 var musicName = $(this).attr('musicName')
                 var initfunc = $(this).attr('initfunc')
                 var state = $(this).attr('state')
                        if (WorkerManager.getInstance().getEditor().editor.getCursorPosition().column > 0) WorkerManager.getInstance().getEditor().editor.insert("\n"+initfunc);
                        else WorkerManager.getInstance().getEditor().editor.insert(initfunc);
                        document.getElementById("toolbar-item-library").className = "toolbar-item";
                });


                document.getElementById('rename-button-confirm-id').onclick = function(e) {
                    var txt = (<HTMLInputElement>document.getElementById("rename-project-text")).value;
                          function getByteLen(val) {
                              var len = 0;
                              for (var i = 0; i < val.length; i++) {
                                var a = val.charAt(i);
                                if (a.match(/[^\x00-\xff]/ig) != null) {
                                  len += 2;
                                }
                                else {
                                  len += 1;
                                }
                              }
                              return len;
                            }
                    var valc= getByteLen(txt);
                    var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5\s]+$/;
                    if(valc < 1){
                        document.getElementById("rename-project-text-notice").style.display = "block";
                        TweenLite.to(CanvasView.getInstance(),1.5,{onComplete:function (){
                            document.getElementById('rename-project-text-notice').style.display = "none";
                        }});
                    }else if(valc > 20){
                         document.getElementById("rename-project-text-notice-length").style.display = "block";
                        TweenLite.to(CanvasView.getInstance(),1.5,{onComplete:function (){
                            document.getElementById('rename-project-text-notice-length').style.display = "none";
                        }});
                    }else if(!reg.test(txt)){
                    document.getElementById("rename-reg-input").style.display = "block";
                        TweenLite.to(CanvasView.getInstance(),1.5,{onComplete:function (){
                            document.getElementById('rename-reg-input').style.display = "none";
                        }});
                    }else{
                        DataManager.getInstance().callServerSocket(DataManager.GAME_RENAME_WORK,
                            {id:DataManager.getInstance().curWork.id,name:txt});
                    }
                };

                document.getElementById("file-5").onclick = function(e) {
                    if(DataManager.getInstance().isCommunitWork == false) {
                        document.getElementById("toolbar-item-file").className = "toolbar-item";
                        document.getElementById('backgroundBoardId').style.display="block";
                        document.getElementById('rename-project').style.display="block";
                        (<HTMLInputElement>document.getElementById("rename-project-text")).value="";
                    }else{

                    }
                };*/
            };
            return LeftBarView;
        }());
        exports.default = LeftBarView;
    }, { "../../manager/ConfigManager": 5, "../../manager/DataManager": 6, "../../manager/WorkerManager": 9 }],
    18: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * Created by sam on 2017/5/25.
         * login 界面管理
         */
        var LoginView = /** @class */ (function() {
            function LoginView() {}
            LoginView.init = function() {
                $("#input_Phone_Email").focusin(function() {
                    $(".error_info").hide();
                });
                $(".eye1-student").on("click", function() { $(this).hide();
                    $(".eye2-student").show();
                    $("#password").attr("type", "text"); });
                $(".eye2-student").on("click", function() { $(this).hide();
                    $(".eye1-student").show();
                    $("#password").attr("type", "password"); });
                $('#dropdownMenu1').on('click', function() {
                    $('#dropdown-menu').toggle();
                });
                $(document).on('click', function(e) {
                    var targetDiv = $('#dropdownMenu1');
                    if (!targetDiv.is(e.target) && targetDiv.has(e.target).length === 0) {
                        $('#dropdown-menu').hide();
                    }
                });
                document.getElementById("login-link").onclick = function(e) {
                    document.getElementById('loginBox').style.display = "block";
                };
                document.getElementById("loginBoxCloseImg").onclick = function(e) {
                    document.getElementById('loginBox').style.display = "none";
                };
                document.getElementById("loginButton").onclick = function(e) {
                    LoginView.login();
                };
                document.getElementById("loginBox").addEventListener("keydown", function(event) {
                    if (event.keyCode == 13)
                        LoginView.login();
                }, true);
            };
            LoginView.login = function() {
                function isEmail(str) {
                    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                    return reg.test(str);
                }

                function isMobilePhone(str) {
                    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                    return myreg.test(str);
                }
                var user = { password: $("#password").val() };
                var userName = $("#input_Phone_Email").val();
                if (isEmail(userName)) {
                    user.email = userName;
                } else if (isMobilePhone(userName)) {
                    user.email = userName;
                } else {
                    user.username = userName;
                }
                var URL_ = "http://sso.youyoucode.cn/api/users/login"; //http://sso.youyoucode.cn/api/users/login
                if (userName.length < 1 || user.password < 1)
                    $(".error_info").show();
                else
                    $.ajax({
                        url: URL_,
                        type: "post",
                        data: user,
                        dataType: "json",
                        success: function(data) {
                            if (data.userId) {
                                localStorage.setItem('nick_name', userName);
                                localStorage.setItem('user_id', userName);
                                $('#studentLogin').hide();
                                location.reload();
                            } else {
                                $(".error_info").show();
                            }
                        },
                        error: function(err) {
                            $(".error_info").show();
                        }
                    });
            };
            LoginView.checkLogin = function() {
                if (localStorage.getItem("nick_name")) {
                    $('#loginBox').hide();
                    document.getElementById("hackathonAccount").innerHTML = localStorage.getItem("nick_name");
                    $('#dropdownMenu1').show();
                    $('#toolbar-item-signup').hide();
                    $('#divider').hide();
                    $('#studentLogin').hide();
                } else {
                    $('#toolbar-item-signup').show();
                    $('#loginMenu1').show();
                    $('#dropdownMenu1').hide();
                }
            };
            return LoginView;
        }());
        exports.default = LoginView;
    }, {}],
    19: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var DataManager_1 = require("../../manager/DataManager");
        var WorkerManager_1 = require("../../manager/WorkerManager");
        /**
         * Created by sam on 2017/5/25.
         * library 界面管理
         */
        var MenuContentView = /** @class */ (function() {
            function MenuContentView() {}
            MenuContentView.init = function() {
                $("#navbar-project-title").click(function(e) {
                    if (document.getElementById("project-title-in").style.display != "none") {
                        document.getElementById("project-title-in").style.display = "none";
                        var teditor = document.getElementById("project-title-out");
                        teditor.value = document.getElementById("project-title-in").innerText;
                        teditor.style.display = "inline";
                        teditor.focus();
                        document.getElementById("project-rename-save").style.display = "inline";
                        document.getElementById("navbar-rename-project").style.display = "none";
                        $("#navbar-project-title.shadow").css("background-color", "rgba(0,0,0,0)");
                    }
                });
                var finishHandler = function(e) {
                    document.getElementById("project-title-in").style.display = "inline";
                    document.getElementById("project-rename-save").style.display = "none";
                    document.getElementById("project-title-out").style.display = "none";
                    document.getElementById("navbar-rename-project").style.display = "inline";
                    $("#navbar-project-title.shadow").hover(function() {
                        $("#navbar-project-title.shadow").css("background-color", "rgba(85,140,140,.15)");
                    }, function() {
                        $("#navbar-project-title.shadow").css("background-color", "rgba(0,0,0,0)");
                    });
                    e.stopPropagation();
                };
                $("#project-rename-save").click(finishHandler);
                $("#preview-pane-nav-refresh").click(function(event) {
                    this.className = "spin";
                    WorkerManager_1.default.getInstance().getMainWork().refreshFrame();
                    setTimeout(function() { $("#preview-pane-nav-refresh").removeClass("spin"); }, 1000);
                    event.stopPropagation();
                });
                $("#preview-pane-refresh-wrapper").click(function(e) {
                    DataManager_1.default.getInstance().autoRunMode = !DataManager_1.default.getInstance().autoRunMode;
                    if (this.className != "refresh-wrapper enabled")
                        this.className = "refresh-wrapper enabled";
                    else
                        this.className = "refresh-wrapper";
                });
                $("#editor-pane-nav-options").click(function(event) {
                    document.getElementById("editor-pane-nav-options-menu").style.display = "block";
                    document.getElementById("editor-pane-nav-options-menu").style.left = (parseInt(document.getElementById("content-top-right").style.left) - 161) + "px";
                    $("#click-underlay").css("display", "block");
                    $("#click-underlay").css("width", "100%");
                    $("#click-underlay").css("height", "100%");
                });
                $("#editor-pane-nav-snippets").click(function(event) {
                    document.getElementById("editor-pane-nav-snippets-menu").style.display = "block";
                    document.getElementById("editor-pane-nav-snippets-menu").style.left = (parseInt(document.getElementById("content-top-right").style.left) - 343) + "px";
                    $("#click-underlay").css("display", "block");
                    $("#click-underlay").css("width", "100%");
                    $("#click-underlay").css("height", "100%");
                });
                $("#project-rename-save").click(function(event) {
                    $("#project-title-in").text($("#project-title-out").val());
                    DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_RENAME_WORK, { id: DataManager_1.default.getInstance().curWork.id, name: $("#project-title-out").val() });
                });
                $("#editor-pane-nav-snippets-menu-btn").click(function(event) {
                    var url = $("#editor-pane-nav-snippets-menu-input").val();
                    if (url.length > 0 && url.indexOf("http") > -1 && url.indexOf("http://www.youyoucode.cn") < 0) {
                        var request = new egret.HttpRequest();
                        request.responseType = egret.HttpResponseType.TEXT;
                        request.open("http://www.youyoucode.cn/python/resource/images/upload.php", egret.HttpMethod.POST);
                        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        request.send("url=" + url);
                        var dd = url.split("/");
                        document.getElementById('editor-pane-nav-snippets-menu-input').value = "http://www.youyoucode.cn/python/resource/images/" + dd[dd.length - 1];
                    }
                });
                var font = 20;
                $("#editor-pane-nav-decrease-font").click(function(event) {
                    if (font > 14)
                        font = font - 1;
                    WorkerManager_1.default.getInstance().getEditor().editor.setFontSize(font + "px");
                });
                $("#editor-pane-nav-increase-font").click(function(event) {
                    if (font < 30)
                        font = font + 1;
                    WorkerManager_1.default.getInstance().getEditor().editor.setFontSize(font + "px");
                });
                $("#editor-pane-nav-toggle-theme").click(function(event) {
                    if (MenuContentView.moonMode) {
                        $("#theme-active").css("left", 35);
                        $("#moon-white").css("display", "inline");
                        $("#moon-green").css("display", "none");
                        $("#sun-white").css("display", "none");
                        $("#sun-green").css("display", "inline");
                        document.getElementById("bodyid").style.backgroundColor = "#fbf8f9";
                        document.getElementById("content-top").style.backgroundColor = "#f7f6fb";
                        document.getElementById("content-left").style.backgroundColor = "#f7f6fb";
                        $(".refresh-wrapper .toggle-auto-update").css("background", "#f9f9f9");
                        $(".preview-device-toggle").css("background", "#f9f9f9");
                        MenuContentView.moonMode = false;
                        $(".editor-pane-button").css("background", "#ffffff");
                        $("#content-top-left").css("background", "#ffffff");
                        $("#code-area").css("background", "#ffffff");
                        $("#content-top-left .editor-pane-nav-title").css("color", "#000000");
                        $("#code-area").css("color", "#222222");
                        WorkerManager_1.default.getInstance().getEditor().editor.setTheme("ace/theme/github");
                        document.getElementById("btn-function").style.color = "#000000";
                        document.getElementById("btn-insert").style.color = "#000000";
                        document.getElementById("btn-picture").style.color = "#000000";
                        $("#btn-function img").attr('src', "resource/assets/brush.svg");
                        $("#btn-insert img").attr('src', "resource/assets/code.svg");
                        $("#btn-picture img").attr('src', "resource/assets/picture.svg");
                    } else {
                        $("#theme-active").css("left", 2);
                        $("#moon-white").css("display", "none");
                        $("#moon-green").css("display", "inline");
                        $("#sun-white").css("display", "inline");
                        $("#sun-green").css("display", "none");
                        document.getElementById("bodyid").style.backgroundColor = "#cccccc";
                        document.getElementById("content-top").style.backgroundColor = "#bbbbbb";
                        document.getElementById("content-left").style.backgroundColor = "#444444";
                        $(".refresh-wrapper .toggle-auto-update").css("background", "#bbbbbb");
                        $(".preview-device-toggle").css("background", "#bbbbbb");
                        MenuContentView.moonMode = true;
                        $(".editor-pane-button").css("background", "#333333");
                        $("#content-top-left").css("background", "#333333");
                        $("#content-top-left .editor-pane-nav-title").css("color", "#ffffff");
                        $("#code-area").css("background", "#333333");
                        $("#code-area").css("color", "#fbf8f9");
                        WorkerManager_1.default.getInstance().getEditor().editor.setTheme("ace/theme/monokai");
                        document.getElementById("btn-function").style.color = "#ffffff";
                        document.getElementById("btn-insert").style.color = "#ffffff";
                        document.getElementById("btn-picture").style.color = "#ffffff";
                        $("#btn-function img").attr('src', "resource/assets/brush_white.svg");
                        $("#btn-insert img").attr('src', "resource/assets/code_white.svg");
                        $("#btn-picture img").attr('src', "resource/assets/picture_white.svg");
                    }
                });
                var gridSwitch = false;
                $("#line-grid-toggle").click(function(event) {
                    if (gridSwitch) {
                        $(".toggle-grid-button").css("left", 30);
                        $("#editor-option-grid span").text("显示网格");
                        gridSwitch = false;
                        TweenLite.delayedCall(0.4, function() {
                            $("#ui-ruler").css("display", "none");
                        });
                    } else {
                        $(".toggle-grid-button").css("left", 0);
                        $("#editor-option-grid span").text("关闭网格");
                        gridSwitch = true;
                        TweenLite.delayedCall(0.4, function() {
                            $("#ui-ruler").css("display", "block");
                        });
                    }
                });
                $("#line-wrap-toggle").click(function(event) {});
                document.getElementById("editor-pane-nav-undo").onclick = function(e) {
                    WorkerManager_1.default.getInstance().getEditor().editor.undo();
                };
                document.getElementById("editor-pane-nav-redo").onclick = function(e) {
                    WorkerManager_1.default.getInstance().getEditor().editor.redo();
                };
                document.getElementById("menu-content-eraser").onclick = function(e) {
                    var canvas = document.getElementById('drawBlackboard');
                    var ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, 1280, 960);
                    DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_MOUSE_CLICK, { room: DataManager_1.default.getInstance().inRoomName, type: 3, x: 0, y: 0 });
                };
                document.getElementById("menu-content-pen").onclick = function(e) {};
            };
            MenuContentView.isPenOpen = false;
            MenuContentView.moonMode = false;
            return MenuContentView;
        }());
        exports.default = MenuContentView;
    }, { "../../manager/DataManager": 6, "../../manager/WorkerManager": 9 }],
    20: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var CanvasView_1 = require("../sprite/CanvasView");
        var DataManager_1 = require("../../manager/DataManager");
        /**
         * Created by sam on 2017/5/25.
         * library 界面管理
         */
        var NewProjectView = /** @class */ (function() {
            function NewProjectView() {}
            NewProjectView.init = function() {
                document.getElementById('new-button-confirm-id').onclick = function(e) {
                    var txt = document.getElementById("new-project-text").value;

                    function getByteLen(val) {
                        var len = 0;
                        for (var i = 0; i < val.length; i++) {
                            var a = val.charAt(i);
                            if (a.match(/[^\x00-\xff]/ig) != null) {
                                len += 2;
                            } else {
                                len += 1;
                            }
                        }
                        return len;
                    }
                    var valc = getByteLen(txt);
                    var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5\s]+$/;
                    if (txt.length < 1) {
                        document.getElementById("new-project-text-notice").style.display = "block";
                        TweenLite.to(CanvasView_1.default.getInstance(), 1.5, {
                            onComplete: function() {
                                document.getElementById('new-project-text-notice').style.display = "none";
                            }
                        });
                    } else if (valc > 20) {
                        document.getElementById("new-project-text-notice-length").style.display = "block";
                        TweenLite.to(CanvasView_1.default.getInstance(), 1.5, {
                            onComplete: function() {
                                document.getElementById('new-project-text-notice-length').style.display = "none";
                            }
                        });
                    } else if (!reg.test(txt)) {
                        document.getElementById("new-reg-input").style.display = "block";
                        TweenLite.to(CanvasView_1.default.getInstance(), 1.5, {
                            onComplete: function() {
                                document.getElementById('new-reg-input').style.display = "none";
                            }
                        });
                    } else
                        DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_NEW_WORK, { title: txt, code: "# Make something amazing \n\n", mode: 1 });
                    // 新建作品之后点赞功能消失
                    DataManager_1.default.getInstance().isCommunitWork = false;
                };
                document.getElementById("file-2").onclick = function(e) {
                    document.getElementById('backgroundBoardId').style.display = "block";
                    document.getElementById('new-project').style.display = "block";
                    document.getElementById("new-project-text").value = "";
                };
            };
            return NewProjectView;
        }());
        exports.default = NewProjectView;
    }, { "../../manager/DataManager": 6, "../sprite/CanvasView": 28 }],
    21: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var TimeUtil_1 = require("../../util/TimeUtil");
        var DataManager_1 = require("../../manager/DataManager");
        var UIManager_1 = require("../../manager/UIManager");
        /**
         * Created by sam on 2017/5/25.
         * open project 界面管理
         */
        var OpenProjectView = /** @class */ (function() {
            function OpenProjectView() {}
            OpenProjectView.initOpenProject = function() {
                document.getElementById("file-1").onclick = function(e) {
                    OpenProjectView.updateOpenProject();
                };
            };
            OpenProjectView.updateOpenProject = function() {
                var str = "";
                var jstr = "onerror=\"javascript:this.src ='resource/works/default.png'\"";
                for (var i = 0; i < DataManager_1.default.getInstance().works.length; i++) {
                    str += "<div class = 'image-padding'>" +
                        "<div class = 'image-box' id = work_" + DataManager_1.default.getInstance().works[i].id + ">" +
                        "<img class='open-img' src='resource/works/work_" + DataManager_1.default.getInstance().works[i].id + ".png?v=" + Math.random() + "' " + jstr + "/>" +
                        "</div>" +
                        "<div class = 'image-time'>" + TimeUtil_1.default.getTime(DataManager_1.default.getInstance().works[i].updateTime) + "</div>" +
                        "<div class = 'image-name'>" + DataManager_1.default.getInstance().works[i].wname + "</div>" +
                        "<div class = 'delete-img' id = icon_" + DataManager_1.default.getInstance().works[i].id + "><img src='resource/assets/delete.png'/></div>" +
                        "</div>";
                    str += "<div class = 'image-divider'></div>";
                }
                document.getElementById("open-project-content").innerHTML = "" + str;
                var that = this;
                var works = DataManager_1.default.getInstance().works;
                for (var i = 0; i < works.length; i++) {
                    if (works[i]) {
                        var id = works[i].id;
                        document.getElementById("work_" + works[i].id).onclick = function(e) {
                            var tt = e.currentTarget;
                            tt = tt.id.split("_");
                            var wid = parseInt(tt[1]);
                            for (var j = 0; j < works.length; j++) {
                                if (works[j].id - wid == 0) {
                                    if (DataManager_1.default.getInstance().curWork.id - wid != 0) {
                                        DataManager_1.default.getInstance().curWork = works[j];
                                        UIManager_1.default.getInstance().getRunningScene().openNewProject();
                                    }
                                    document.getElementById('open-project').style.display = "none";
                                    document.getElementById('backgroundBoardId').style.display = "none";
                                    break;
                                }
                            }
                            // 打开作品之后点赞功能消失
                            DataManager_1.default.getInstance().isCommunitWork = false;
                        };
                        document.getElementById("icon_" + DataManager_1.default.getInstance().works[i].id).onclick = function(e) {
                            var tt = e.currentTarget;
                            tt = tt.id.split("_");
                            var wid = parseInt(tt[1]);
                            var del = document.getElementById('del-dialog');
                            var yesBtn = document.getElementById('yes-btn');
                            var noBtn = document.getElementById('no-btn');
                            var btnW = document.getElementById('btn-w');
                            // 如果只剩一个项目，那么提示不能删除
                            if (works.length == 1) {
                                UIManager_1.default.getInstance().showMessage("text_prompt_deleate");
                            } else {
                                del.style.display = 'block';
                            }
                            btnW.onclick = function(e) {
                                var dat = e.target;
                                var id = dat.id;
                                if (id === 'yes-btn') {
                                    del.style.display = 'none';
                                    DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_DELETE_WORK, { id: wid });
                                } else {
                                    del.style.display = 'none';
                                    return;
                                }
                            };
                        };
                    }
                }
                document.getElementById('backgroundBoardId').style.display = "block";
                document.getElementById('open-project').style.display = "block";
            };
            return OpenProjectView;
        }());
        exports.default = OpenProjectView;
    }, { "../../manager/DataManager": 6, "../../manager/UIManager": 8, "../../util/TimeUtil": 13 }],
    22: [function(require, module, exports) {
        "use strict";
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        var PlistParser_1 = require("../../util/PlistParser");
        var EngineImage = /** @class */ (function(_super) {
            __extends(EngineImage, _super);

            function EngineImage() {
                var _this = _super.call(this) || this;
                _this._oldW = 0;
                _this._oldH = 0;
                return _this;
            }
            EngineImage.prototype.loadpic = function(url) {
                if (url.indexOf("ttp:") > 0) {
                    RES.getResByUrl(url, this.onComplete, this, RES.ResourceItem.TYPE_IMAGE);
                } else {
                    this._bitmap = new egret.Bitmap(new PlistParser_1.default("res").getTexture(url + ".png"));
                    this.addChild(this._bitmap);
                }
            };
            EngineImage.prototype.onComplete = function(event) {
                this._bitmap = new egret.Bitmap(event);
                this.addChild(this._bitmap);
                if (this._oldW > 0) {
                    this.scaleX = this._oldW / this._bitmap.width;
                    this.scaleY = this._oldH / this._bitmap.height;
                } else {
                    this._oldW = this._bitmap.width;
                    this._oldH = this._bitmap.height;
                }
            };
            EngineImage.prototype.hit = function(bit) {
                if (this.x + this._oldW < bit.x || bit.x + bit._oldW < this.x || this.y + this._oldH < bit.y || bit.y + this._oldH < this.y)
                    return false;
                else
                    return true;
            };
            EngineImage.prototype.setPosition = function(x, y) {
                this.x = x;
                this.y = y;
            };
            EngineImage.prototype.moveTo = function(x, y, t) {
                if (t == null)
                    t = 1;
                TweenLite.to(this, t, { x: x, y: y });
            };
            EngineImage.prototype.scaleTo = function(s, t) {
                if (t == null)
                    t = 1;
                TweenLite.to(this, t, { scaleX: s, scaleY: s });
            };
            EngineImage.prototype.setSize = function(w, h) {
                if (w > 0) {
                    this._oldW = w;
                    this._oldH = h;
                    this.width = w;
                    this.height = h;
                }
            };
            EngineImage.prototype.dispose = function() {
                this._bitmap.texture.dispose();
            };
            return EngineImage;
        }(egret.Sprite));
        exports.default = EngineImage;
    }, { "../../util/PlistParser": 11 }],
    23: [function(require, module, exports) {
        "use strict";
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        var ColorUtil_1 = require("../../util/ColorUtil");
        var EngineSprite = /** @class */ (function(_super) {
            __extends(EngineSprite, _super);

            function EngineSprite() {
                return _super.call(this) || this;
            }
            EngineSprite.prototype.drawRect = function(x, y, w, h, c) {
                this.graphics.beginFill(ColorUtil_1.default.getColor(c));
                this.graphics.drawRect(x, y, w, h);
                this.graphics.endFill();
            };
            EngineSprite.prototype.drawEllipse = function(x, y, w, h, c) {
                this.graphics.beginFill(ColorUtil_1.default.getColor(c));
                this.graphics.drawEllipse(x, y, w, h);
                this.graphics.endFill();
            };
            EngineSprite.prototype.drawCircle = function(x, y, r, c) {
                this.graphics.beginFill(ColorUtil_1.default.getColor(c));
                this.graphics.drawCircle(x, y, r);
                this.graphics.endFill();
            };
            EngineSprite.prototype.drawArc = function(x, y, radius, startAngle, endAngle, c) {
                this.graphics.beginFill(ColorUtil_1.default.getColor(c));
                this.graphics.drawArc(x, y, radius, startAngle, endAngle);
                this.graphics.endFill();
            };
            EngineSprite.prototype.drawTriangle = function(x1, y1, x2, y2, x3, y3, c) {
                this.graphics.beginFill(ColorUtil_1.default.getColor(c));
                this.graphics.moveTo(x1, y1);
                this.graphics.lineTo(x2, y2);
                this.graphics.lineTo(x3, y3);
                this.graphics.lineTo(x1, y1);
                this.graphics.endFill();
            };
            EngineSprite.prototype.drawLine = function(x, y, w, h, r, c) {
                this.graphics.beginFill(ColorUtil_1.default.getColor(c));
                this.graphics.lineStyle(r, ColorUtil_1.default.getColor(c));
                this.graphics.moveTo(x, y);
                this.graphics.lineTo(w, h);
                this.graphics.endFill();
            };
            EngineSprite.prototype.drawText = function(x, y, s, v, c) {
                var label = new egret.TextField();
                label.x = x;
                label.y = y;
                label.size = s;
                label.text = v;
                label.textColor = ColorUtil_1.default.getColor(c);
                this.addChild(label);
            };
            EngineSprite.prototype.setPosition = function(x, y) {
                this.x = x - this.width / 2;
                this.y = y - this.height / 2;
            };
            EngineSprite.prototype.moveTo = function(x, y, t) {
                if (t == null)
                    t = 1;
                TweenLite.to(this, t, { x: x, y: y });
            };
            EngineSprite.prototype.rotateTo = function(r, t) {
                if (t == null)
                    t = 1;
                TweenLite.to(this, t, { rotate: r });
            };
            EngineSprite.prototype.scaleTo = function(t, s) {
                TweenLite.to(this, t, { scaleX: s, scaleY: s });
            };
            EngineSprite.prototype.setSize = function(w, h) {
                if (w > 0) {
                    this.scaleX = w / this.width;
                    this.scaleY = h / this.height;
                }
            };
            EngineSprite.prototype.clear = function() {
                this.graphics.clear();
            };
            EngineSprite.prototype.dispose = function() {
                this.graphics.clear();
                this.removeChildren();
            };
            return EngineSprite;
        }(egret.Sprite));
        exports.default = EngineSprite;
    }, { "../../util/ColorUtil": 10 }],
    24: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var EngineImage_1 = require("./EngineImage");
        var CanvasView_1 = require("../sprite/CanvasView");
        var EngineSprite_1 = require("./EngineSprite");
        var WorkerManager_1 = require("../../manager/WorkerManager");
        var ColorUtil_1 = require("../../util/ColorUtil");
        var WorldView_1 = require("../sprite/WorldView");
        var GameUtil = /** @class */ (function() {
            function GameUtil() {
                egret.ImageLoader.crossOrigin = "anonymous";
            }
            GameUtil.getInstance = function() {
                if (this._instance == null) {
                    this._instance = new GameUtil();
                }
                return this._instance;
            };
            GameUtil.prototype.line = function(x, y, w, h, r, c) {
                var sp = new EngineSprite_1.default();
                sp.drawLine(x, y, w, h, r, c);
                this.addChild(sp);
                return WorkerManager_1.default.getInstance().saveObj(sp);
            };
            GameUtil.prototype.circle = function(x, y, r, c) {
                var sp = new EngineSprite_1.default();
                sp.drawCircle(x, y, r, c);
                this.addChild(sp);
                return WorkerManager_1.default.getInstance().saveObj(sp);
            };
            GameUtil.prototype.triangle = function(x1, y1, x2, y2, x3, y3, c) {
                var sp = new EngineSprite_1.default();
                sp.drawTriangle(x1, y1, x2, y2, x3, y3, c);
                this.addChild(sp);
                return WorkerManager_1.default.getInstance().saveObj(sp);
            };
            GameUtil.prototype.rectangle = function(x, y, w, h, c) {
                var sp = new EngineSprite_1.default();
                sp.drawRect(x, y, w, h, c);
                this.addChild(sp);
                return WorkerManager_1.default.getInstance().saveObj(sp);
            };
            GameUtil.prototype.ellipse = function(x, y, w, h, c) {
                var sp = new EngineSprite_1.default();
                sp.drawEllipse(x, y, w, h, c);
                this.addChild(sp);
                return WorkerManager_1.default.getInstance().saveObj(sp);
            };
            GameUtil.prototype.sprite = function() {
                var sp = new EngineSprite_1.default();
                this.addChild(sp);
                return WorkerManager_1.default.getInstance().saveObj(sp);
            };
            GameUtil.prototype.image = function(url, x, y, w, h) {
                var sp = new EngineImage_1.default();
                sp.setPosition(x, y);
                sp.setSize(w, h);
                sp.loadpic(url);
                this.addChild(sp);
                return WorkerManager_1.default.getInstance().saveObj(sp);
            };
            GameUtil.prototype.playAudio = function(url) {
                var explode = new Audio(url);
                explode.play();
            };
            GameUtil.prototype.sleep = function(t) {
                WorkerManager_1.default.getInstance().isPaused = true;
                TweenLite.delayedCall(t / 1000, function() {
                    WorkerManager_1.default.getInstance().isPaused = false;
                });
            };
            GameUtil.prototype.text = function(x, y, s, v, c) {
                var label = new egret.TextField();
                label.x = x;
                label.y = y;
                label.size = s;
                label.text = v;
                label.textColor = ColorUtil_1.default.getColor(c);
                this.addChild(label);
                return WorkerManager_1.default.getInstance().saveObj(label);
            };
            GameUtil.prototype.sphere = function() {
                var geom = new egret3d.SphereGeometry();
                var mater = new egret3d.TextureMaterial();
                var sphere = new egret3d.Mesh(geom, mater);
                WorldView_1.default.getInstance().view3D.addChild3D(sphere);
                return sphere;
            };
            GameUtil.prototype.rand = function(from, to) {
                return Math.floor((to - from) * Math.random()) + from;
            };
            GameUtil.prototype.addChild = function(obj) {
                CanvasView_1.default.getInstance().addChild(obj);
            };
            GameUtil.prototype.removeChild = function(obj) {
                CanvasView_1.default.getInstance().removeChild(obj);
            };
            GameUtil.prototype.onLoop = function(fn, millisec) {
                if (millisec === void 0) { millisec = 0; }
                window.setInterval(function() {
                    WorkerManager_1.default.getInstance().getMainWork().runFuction(fn);
                }, millisec);
            };
            return GameUtil;
        }());
        exports.default = GameUtil;
    }, { "../../manager/WorkerManager": 9, "../../util/ColorUtil": 10, "../sprite/CanvasView": 28, "../sprite/WorldView": 31, "./EngineImage": 22, "./EngineSprite": 23 }],
    25: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var KeyboradUtil = /** @class */ (function() {
            function KeyboradUtil() {
                this.keyCode = 0;
                document.onkeydown = function(e) {
                    KeyboradUtil.getInstance().keyCode = window.event ? e.keyCode : e.which;
                };
                document.onkeyup = function() {
                    KeyboradUtil.getInstance().keyCode = 0;
                };
            }
            KeyboradUtil.getInstance = function() {
                if (this._instance == null) {
                    this._instance = new KeyboradUtil();
                }
                return this._instance;
            };
            return KeyboradUtil;
        }());
        exports.default = KeyboradUtil;
    }, {}],
    26: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var MouseUtil = /** @class */ (function() {
            function MouseUtil() {
                this.mouseX = 0;
                this.mouseY = 0;
                this.isClicked = false;
                window.onmousedown = function(e) {
                    MouseUtil.getInstance().mouseX = e.clientX;
                    MouseUtil.getInstance().mouseY = e.clientY;
                    MouseUtil.getInstance().isClicked = true;
                };
                window.onmousemove = function(e) {
                    MouseUtil.getInstance().mouseX = e.clientX;
                    MouseUtil.getInstance().mouseY = e.clientY;
                };
                window.onmouseup = function(e) {
                    MouseUtil.getInstance().mouseX = e.clientX;
                    MouseUtil.getInstance().mouseY = e.clientY;
                    MouseUtil.getInstance().isClicked = false;
                };
            }
            MouseUtil.getInstance = function() {
                if (this._instance == null) {
                    this._instance = new MouseUtil();
                }
                return this._instance;
            };
            return MouseUtil;
        }());
        exports.default = MouseUtil;
    }, {}],
    27: [function(require, module, exports) {
        "use strict";
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        var Scene_1 = require("../../base/view/Scene");
        var WorkerManager_1 = require("../../manager/WorkerManager");
        var CanvasView_1 = require("../sprite/CanvasView");
        var DataManager_1 = require("../../manager/DataManager");
        var DocumentManager_1 = require("../../manager/DocumentManager");
        var ConfigManager_1 = require("../../manager/ConfigManager");
        var OpenProjectView_1 = require("../document/OpenProjectView");
        var ThumbnailUtil_1 = require("../../util/ThumbnailUtil");
        var UIManager_1 = require("../../manager/UIManager");
        var MouseUtil_1 = require("../engine/MouseUtil");
        var MainScene = /** @class */ (function(_super) {
            __extends(MainScene, _super);

            function MainScene() {
                var _this = _super.call(this) || this;
                _this.newOpened = true;
                _this.isSended = false;
                _this.oldLines = 0;
                _this.pages = [];
                _this.readIndex = 0;
                return _this;
            }
            MainScene.prototype.setData = function(data) {
                _super.prototype.setData.call(this, data);
                ConfigManager_1.default.getInstance().init();
                this.addChild(CanvasView_1.default.getInstance());
                var spr1 = new egret.Sprite();
                spr1.graphics.beginFill(0x00ff00, 0);
                spr1.graphics.drawRect(0, 0, 1000, 1000);
                spr1.graphics.endFill();
                this.addChild(spr1);
                spr1.touchEnabled = true;
                spr1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                spr1.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                spr1.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                WorkerManager_1.default.getInstance().init(this);
                if (window.location.href.indexOf("runner.html") >= 0) {
                    WorkerManager_1.default.getInstance().getMainWork().runCode(localStorage.getItem("code"));
                    return;
                }
                DataManager_1.default.getInstance().addEventListener(DataManager_1.default.SERVERCALLBACK, this.onServerDataReceived, this);
                DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.ROUTE_LOGIN, { uid: DataManager_1.default.getInstance().uid, cell: localStorage.getItem('user_id') });
                if (window.location.href.indexOf("show.html") < 0) {
                    DocumentManager_1.default.getInstance().init();
                    WorkerManager_1.default.getInstance().getEditor().addEventListener("user_code_change", this.onGetUserCode, this);
                } else
                    return;
                if (localStorage.getItem("nick_name")) {
                    var nick_name = localStorage.getItem("nick_name");
                    $('#dropdown-login .dropdown-toggle').html(nick_name + "<img class='icon-arrow-down' src='resource/assets/dropdown-arrow.svg'>"); //
                    $('#finish-login').show();
                    $('#navbar-login').hide();
                }
            };
            MainScene.prototype.onTouchBegin = function(evt) {
                MouseUtil_1.default.getInstance().mouseX = evt.stageX;
                MouseUtil_1.default.getInstance().mouseY = evt.stageY;
                MouseUtil_1.default.getInstance().isClicked = true;
            };
            MainScene.prototype.onTouchMove = function(evt) {
                MouseUtil_1.default.getInstance().mouseX = evt.stageX;
                MouseUtil_1.default.getInstance().mouseY = evt.stageY;
            };
            MainScene.prototype.onTouchEnd = function(evt) {
                MouseUtil_1.default.getInstance().mouseX = evt.stageX;
                MouseUtil_1.default.getInstance().mouseY = evt.stageY;
                MouseUtil_1.default.getInstance().isClicked = false;
            };
            MainScene.prototype.onGetUserCode = function(e) {
                var that = this;
                var text = WorkerManager_1.default.getInstance().getEditorText();
                if (DataManager_1.default.getInstance().studentWork) {
                    if (this.isSended == false) {
                        this.isSended = true;
                        DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_PASS_CODE, { room: DataManager_1.default.getInstance().inRoomName, id: DataManager_1.default.getInstance().studentWork.uid, code: text });
                    } else {
                        TweenLite.killTweensOf(this);
                        TweenLite.to(CanvasView_1.default.getInstance(), 2, {
                            onComplete: function() {
                                that.isSended = false;
                                DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_PASS_CODE, { room: DataManager_1.default.getInstance().inRoomName, id: DataManager_1.default.getInstance().studentWork.uid, code: text });
                            }
                        });
                    }
                } else if (DataManager_1.default.getInstance().teacherID > 0) {
                    UIManager_1.default.getInstance().showMessage("text_classroom_teacher_onshow");
                } else if (DataManager_1.default.getInstance().userinfo.vip - 10 >= 0) {
                    UIManager_1.default.getInstance().showMessage("text_classroom_teacher_onlook");
                } else if (DataManager_1.default.getInstance().teacherCtrl == false || DataManager_1.default.getInstance().userinfo.vip - 10 >= 0) {
                    if (undefined != DataManager_1.default.getInstance().curWork)
                        DataManager_1.default.getInstance().curWork.codes = text == undefined ? "" : text;
                    if (undefined != DataManager_1.default.getInstance().curWork && DataManager_1.default.getInstance().curWork.codes.length > 0 && this.newOpened == false) {
                        DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_AUTOSAVE_WORK, { id: DataManager_1.default.getInstance().curWork.id, name: DataManager_1.default.getInstance().curWork.wname, code: DataManager_1.default.getInstance().curWork.codes });
                    }
                }
                if (DataManager_1.default.getInstance().teacherCtrl && DataManager_1.default.getInstance().userinfo.vip - 10 >= 0) {
                    DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_PUBLISH_CODE, { uid: DataManager_1.default.getInstance().uid, room: DataManager_1.default.getInstance().inRoomName, code: DataManager_1.default.getInstance().curWork.codes });
                } else if (DataManager_1.default.getInstance().teacherLook > 0) {
                    if (this.isSended == false) {
                        this.isSended = true;
                        DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_PASS_CODE, { room: DataManager_1.default.getInstance().inRoomName, id: DataManager_1.default.getInstance().teacherLook, code: text });
                    } else {
                        TweenLite.killTweensOf(this);
                        TweenLite.to(CanvasView_1.default.getInstance(), 2, {
                            onComplete: function() {
                                that.isSended = false;
                                DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_PASS_CODE, { room: DataManager_1.default.getInstance().inRoomName, id: DataManager_1.default.getInstance().teacherLook, code: text });
                            }
                        });
                    }
                }
                if (DataManager_1.default.getInstance().autoRunMode == false)
                    return;
                if (this.newOpened) {
                    this.newOpened = false;
                    return;
                }
                WorkerManager_1.default.getInstance().getMainWork().refreshFrame();
                this.oldLines = WorkerManager_1.default.getInstance().getEditor().getValidCodeLines();
            };
            MainScene.prototype.updateWork = function() {
                if (DataManager_1.default.getInstance().curWork) {
                    WorkerManager_1.default.getInstance().setEditorText(DataManager_1.default.getInstance().curWork.codes);
                    document.getElementById('project-title-in').innerHTML = DataManager_1.default.getInstance().curWork.wname;
                    //$("#editor-pane-nav-snippets-menu-input").text(DataManager.getInstance().curWork.jsplus);
                    WorkerManager_1.default.getInstance().getMainWork().refreshFrame();
                }
            };
            MainScene.prototype.openNewProject = function() {
                this.newOpened = true;
                this.updateWork();
                WorkerManager_1.default.getInstance().getMainWork().refreshFrame();
            };
            MainScene.prototype.onServerDataReceived = function(event) {
                var rawData = event.data;
                var route = rawData.route;
                var dat = rawData.data.data;
                if (route == DataManager_1.default.ROUTE_LOGIN) {
                    if (localStorage.getItem('nick_name') && dat.userinfo.nickName !== localStorage.getItem('nick_name')) {
                        dat.userinfo.nickName = localStorage.getItem('nick_name');
                        DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_SET_NICKNAME, { uid: DataManager_1.default.getInstance().uid, name: localStorage.getItem('nick_name') });
                    }
                    DataManager_1.default.getInstance().userinfo = dat.userinfo;
                    DataManager_1.default.getInstance().works = [];
                    for (var j = 0; j < dat.works.length; j++) {
                        if (dat.works[j].mode + 0 > 0)
                            DataManager_1.default.getInstance().works.push(dat.works[j]);
                    }
                    if (window.location.href.indexOf("show.html") < 0) {
                        DataManager_1.default.getInstance().works.sort(function(a, b) {
                            return b.updateTime - a.updateTime;
                        });
                        if (DataManager_1.default.getInstance().works.length > 0)
                            DataManager_1.default.getInstance().curWork = DataManager_1.default.getInstance().works[0];
                        document.getElementById("splash-cover").style.display = "none";
                        this.newOpened = true;
                        if (window.location.href.indexOf("v=") >= 0) {
                            var vals = window.location.href.split("v=");
                            if (vals.length > 1)
                                DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_GET_WORK, { id: vals[1] });
                        } else
                            this.updateWork();
                    } else {
                        var vals = window.location.href.split("v=");
                        if (vals.length > 1)
                            DataManager_1.default.getInstance().callServerSocket(DataManager_1.default.GAME_GET_WORK, { id: vals[1] });
                    }
                } else if (route == DataManager_1.default.GAME_NEW_WORK) {
                    if (dat.work) {
                        dat.work.mode = 0;
                        DataManager_1.default.getInstance().curWork = dat.work;
                        DataManager_1.default.getInstance().works.push(dat.work);
                        DataManager_1.default.getInstance().works.sort(function(a, b) {
                            return b.updateTime - a.updateTime;
                        });
                        this.updateWork();
                        document.getElementById('new-project').style.display = "none";
                        document.getElementById('backgroundBoardId').style.display = "none";
                    } else {
                        document.getElementById('new-project-text-notice1').style.display = "block";
                        TweenLite.to(this, 1.5, {
                            onComplete: function() {
                                document.getElementById('new-project-text-notice1').style.display = "none";
                            }
                        });
                        document.getElementById('new-project').style.display = "block";
                        document.getElementById('backgroundBoardId').style.display = "block";
                        return;
                    }
                    // 打开本地作品之后点赞功能消失
                    DataManager_1.default.getInstance().isCommunitWork = false;
                } else if (route == DataManager_1.default.GAME_IMPORT_WORK) {
                    document.getElementById('backgroundBoardId').style.display = "none";
                    document.getElementById('import-project').style.display = "none";
                    if (dat.work) {
                        DataManager_1.default.getInstance().curWork = dat.work;
                        DataManager_1.default.getInstance().works.push(dat.work);
                        DataManager_1.default.getInstance().works.sort(function(a, b) {
                            return b.updateTime - a.updateTime;
                        });
                        this.updateWork();
                        UIManager_1.default.getInstance().showMessage("text_prompt_clone");
                    } else {
                        UIManager_1.default.getInstance().showMessage("text_failed_clone");
                    }
                } else if (route == DataManager_1.default.GAME_CLONE_WORK) {
                    if (dat.work) {
                        DataManager_1.default.getInstance().curWork = dat.work;
                        DataManager_1.default.getInstance().works.push(dat.work);
                        DataManager_1.default.getInstance().works.sort(function(a, b) {
                            return b.updateTime - a.updateTime;
                        });
                        document.getElementById('clone-project').style.display = "none";
                        document.getElementById('backgroundBoardId').style.display = "none";
                        this.updateWork();
                        UIManager_1.default.getInstance().showMessage("text_prompt_clone");
                        //ThumbnailUtil.worksPath();
                        window.location.href = 'http://www.youyoucode.cn/python/';
                    } else {
                        UIManager_1.default.getInstance().showMessage("text_nameWrong_project");
                        return;
                    }
                } else if (route == DataManager_1.default.GAME_RENAME_WORK) {
                    if (dat.work) {
                        DataManager_1.default.getInstance().curWork.wname = dat.work.wname;
                        DataManager_1.default.getInstance().works.sort(function(a, b) {
                            return b.updateTime - a.updateTime;
                        });
                        this.updateWork(); // 保存缩略图
                        UIManager_1.default.getInstance().showMessage("text_prompt_rename");
                        ThumbnailUtil_1.default.worksPath();
                    } else {
                        UIManager_1.default.getInstance().showMessage("text_nameWrong_project");
                    }
                } else if (route == DataManager_1.default.GAME_SAVE_WORK) {
                    UIManager_1.default.getInstance().showMessage("text_prompt_save");
                    var finded = false;
                    for (var j = 0; j < DataManager_1.default.getInstance().works.length; j++) {
                        if (DataManager_1.default.getInstance().works[j].id - dat.work.id == 0)
                            finded = true;
                    }
                    if (finded == false) {
                        DataManager_1.default.getInstance().works.push(dat.work);
                    }
                    for (var j = 0; j < DataManager_1.default.getInstance().works.length; j++) {
                        if (DataManager_1.default.getInstance().works[j].id - dat.work.id == 0) {
                            DataManager_1.default.getInstance().works[j].wname = dat.work.wname;
                            DataManager_1.default.getInstance().works[j].codes = dat.work.codes;
                            DataManager_1.default.getInstance().works[j].updateTime = dat.work.updateTime;
                        }
                    }
                    DataManager_1.default.getInstance().works.sort(function(a, b) {
                        return b.updateTime - a.updateTime;
                    });
                    DataManager_1.default.getInstance().curWork = dat.work;
                    this.updateWork();
                    ThumbnailUtil_1.default.worksPath(); // 保存之后点赞功能消失
                    DataManager_1.default.getInstance().isCommunitWork = false;
                    if (finded == false)
                        window.location.href = 'http://www.youyoucode.cn/python/';
                } else if (route == DataManager_1.default.GAME_AUTOSAVE_WORK) {
                    var finded = false;
                    for (var j = 0; j < DataManager_1.default.getInstance().works.length; j++) {
                        if (DataManager_1.default.getInstance().works[j].id - dat.work.id == 0)
                            finded = true;
                    }
                    if (finded == false) {
                        DataManager_1.default.getInstance().curWork = dat.work;
                        DataManager_1.default.getInstance().works.push(dat.work);
                        DataManager_1.default.getInstance().works.sort(function(a, b) {
                            return b.updateTime - a.updateTime;
                        });
                        this.updateWork();
                        window.location.href = 'http://www.youyoucode.cn/python/';
                    }
                } else if (route == DataManager_1.default.GAME_GET_WORK) {
                    if (dat.work)
                        DataManager_1.default.getInstance().curWork = dat.work;
                    if (window.location.href.indexOf("show.html") >= 0) {
                        if (dat.work) {
                            $("#game-area").hide();
                            WorkerManager_1.default.getInstance().setEditorText(dat.work.codes);
                            //$("#editor-pane-nav-snippets-menu-input").text(dat.work.jsplus);
                            WorkerManager_1.default.getInstance().getMainWork().refreshFrame();
                        }
                    } else
                        this.updateWork();
                    document.getElementById("splash-cover").style.display = "none";
                } else if (route == DataManager_1.default.GAME_DELETE_WORK) {
                    var works = [];
                    for (var j = 0; j < DataManager_1.default.getInstance().works.length; j++) {
                        if (dat.id - DataManager_1.default.getInstance().works[j].id != 0) {
                            works.push(DataManager_1.default.getInstance().works[j]);
                        }
                    }
                    DataManager_1.default.getInstance().works = works;
                    if (dat.id - DataManager_1.default.getInstance().curWork.id == 0) {
                        if (DataManager_1.default.getInstance().works.length > 0) {
                            DataManager_1.default.getInstance().curWork = DataManager_1.default.getInstance().works[0];
                            this.updateWork();
                        }
                    }
                    OpenProjectView_1.default.updateOpenProject();
                }
            };
            MainScene.prototype.callback = function(dat) {};
            return MainScene;
        }(Scene_1.default));
        exports.default = MainScene;
    }, { "../../base/view/Scene": 3, "../../manager/ConfigManager": 5, "../../manager/DataManager": 6, "../../manager/DocumentManager": 7, "../../manager/UIManager": 8, "../../manager/WorkerManager": 9, "../../util/ThumbnailUtil": 12, "../document/OpenProjectView": 21, "../engine/MouseUtil": 26, "../sprite/CanvasView": 28 }],
    28: [function(require, module, exports) {
        "use strict";
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        var CanvasView = /** @class */ (function(_super) {
            __extends(CanvasView, _super);

            function CanvasView() {
                var _this = _super.call(this) || this;
                _this.sceneObjects = [];
                return _this;
            }
            CanvasView.getInstance = function() {
                if (this._instance == null) {
                    this._instance = new CanvasView();
                }
                return this._instance;
            };
            CanvasView.prototype.stopFrame = function() {
                if (this.updateIndex) {
                    clearInterval(this.updateIndex);
                    this.updateIndex = null;
                }
            };
            CanvasView.prototype.refresh = function() {
                this.stopFrame();
                this.removeChildren();
                this.sceneObjects = [];
            };
            return CanvasView;
        }(egret.Sprite));
        exports.default = CanvasView;
    }, {}],
    29: [function(require, module, exports) {
        "use strict";
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        var SyntaxCheckLoop_1 = require("../../worker/SyntaxCheckLoop");
        var ProblemAlertView_1 = require("./ProblemAlertView");
        var editModes = {
            'python': 'ace/mode/python',
        };
        var EditorView = /** @class */ (function(_super) {
            __extends(EditorView, _super);

            function EditorView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EditorView.prototype.init = function(language) {
                var _this = this;
                if (language === void 0) { language = "python"; }
                this.language = language;
                this.editor = ace.edit('code-area');
                this.editor.on('focus', function() {
                    _this.dispatchEvent(new egret.Event('EditEvent', false, false, { type: 'focus', data: true }));
                });
                this.editor.on('change', function() {
                    _this.dispatchEvent(new egret.Event('user_code_change', false, false, {}));
                });
                this.editor.getSession().setTabSize(4);
                this.editor.setFontSize('20px');
                this.editor.getSession().setUseSoftTabs(true);
                this.editor.getSession().setMode('ace/mode/' + language);
                this.editor.setTheme('ace/theme/github');
                this.editor.renderer.adjustWrapLimit();
                this.editor.setAutoScrollEditorIntoView(true);
                this.editor.renderer.setAnimatedScroll(true);
                this.editor.setOption('highlightGutterLine', true);
                var aceSession = this.editor.getSession();
                this.aceDoc = aceSession.getDocument();
                aceSession.setUseWorker(false);
                aceSession.setMode(editModes[language]);
                aceSession.setWrapLimitRange(null, null);
                aceSession.setUseWrapMode(true);
                aceSession.setNewLineMode('windows');
                aceSession.setUseSoftTabs(true);
                this.editor.setShowPrintMargin(false);
                this.editor.setShowInvisibles(false);
                this.editor.setBehavioursEnabled(true);
                this.editor.setShowFoldWidgets(false);
                this.editor.setKeyboardHandler(null);
                this.editor.setHighlightActiveLine(true);
                this.editor.$blockScrolling = Infinity;
                this.createShortcuts();
                this.initAutoComplete(true, this.language);
                //语法检查 - 线程
                this.syntaxLoop = new SyntaxCheckLoop_1.default(this, this.language);
                //错误展示 - html面板
                this.problemShow = new ProblemAlertView_1.default();
                var self = this;
                this.editor.commands['on']('exec', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if (-1 != ['Enter', 'Return'].indexOf(e.command.name) /*&& !e.editor.completer.popup.isOpen*/ ) {
                        if (_this.zatanna && _this.zatanna.on)
                            _this.zatanna.on();
                        return e.editor.execCommand('optimizeInsertMatch');
                    }
                    if (e.command && _this.editor && 'updateTokensOnEnter' == e.command.name) {
                        var cursor = _this.editor.getCursorPosition();
                        var cursorRow = cursor.row;
                        if (cursorRow >= _this.editor.getSession().getLength() - 2) {
                            e['editor'].renderer.scrollToRow(e['editor'].renderer.getLastVisibleRow());
                        }
                    }
                    if (_this.zatanna && _this.zatanna.on)
                        _this.zatanna.on();
                    e.command.exec(e.editor, e.args || {});
                });
                this.oldValue = "";
                this.newValue = this.editor.getValue();
                var self = this;
                this.editor.renderer['on']('afterRender', function() {
                    self.oldValue = self.newValue;
                    if (self.editor)
                        self.newValue = self.editor.getValue();
                    else {
                        self.newValue || (self.newValue = "");
                    }
                    if (self.oldValue != self.newValue) {
                        self.syntaxLoop.transpile(self.editor.getValue());
                    }
                });
            };;
            EditorView.prototype.initAutoComplete = function(autocomplete, language) {
                if (autocomplete === void 0) { autocomplete = true; }
                this.autocomplete = autocomplete;
                this.zatanna = new Zatanna(this.editor, {
                    basic: true,
                    liveCompletion: true,
                    snippetsLangDefaults: false,
                    completers: {
                        keywords: false,
                        snippets: autocomplete,
                        text: autocomplete
                    },
                    autoLineEndings: {
                        javascript: ';'
                    },
                    popupFontSizePx: 16,
                    popupWidthPx: 380
                });
                this.addSnippets(language);
            };
            EditorView.prototype.updateAutocomplete = function(autocomplete) {
                this.autocomplete = autocomplete;
                if (this.zatanna) {
                    this.zatanna.set('snippets', autocomplete);
                }
            };
            EditorView.prototype.getLength = function() {
                return this.editor.session.doc.getLength();
            };
            EditorView.prototype.getValidCodeLines = function() {
                var docLines = this.editor.session.doc.getAllLines();
                var docLength = this.editor.session.doc.getLength();
                var commentReg = /^\s*(#|\/\/)/; //单行注释
                var multiLineStartReg = /^\s*(\/\*)/;
                var multiLineEndReg = /.*(\*\/)/;
                var isInMultiComment = false;
                var notValidLineNum = 0;
                for (var i = 0; i < docLength; ++i) {
                    var docLine = docLines[i];
                    if (multiLineStartReg.test(docLine)) {
                        isInMultiComment = true;
                    } else if (multiLineEndReg.test(docLine)) {
                        isInMultiComment = false;
                        ++notValidLineNum;
                    }
                    if (true == isInMultiComment) {
                        ++notValidLineNum;
                    } else if (commentReg.test(docLine) || /^$/.test(docLine)) {
                        ++notValidLineNum;
                    }
                }
                return docLength - notValidLineNum;
            };
            EditorView.prototype.createShortcuts = function() {
                var _this = this;
                var addCommand = function(command) {
                    _this.editor.commands.addCommand(command);
                };
                addCommand({
                    name: 'test',
                    bindKey: 'F7',
                    exec: function() {
                        console.log('F7 pressed');
                        _this.syntaxLoop.transpile();
                    }
                });
                addCommand({
                    name: 'optimizeInsertMatch',
                    bindKey: 'Enter|Return',
                    exec: function() {
                        if (_this.editor.getSession().selection.isEmpty()) {
                            var cursor = _this.editor.getCursorPosition();
                            var line = _this.aceDoc.getLine(cursor.row);
                            var popup = _this.editor['completer'].popup;
                            var lineSlice = line.slice(0, cursor.column);
                            var lineData = lineSlice.split(/[^,]?\s*;\s*|[^,]?\s+/);
                            if (!popup.getData(popup.getRow()).snippet || lineData.length < 1) {
                                _this.editor['completer'].insertMatch();
                            } else {
                                if (_this.editor['completer'].popup.isOpen) {
                                    var snippetCode = popup.getData(popup.getRow()).snippet;
                                    var bracketRight = lineSlice.lastIndexOf(")");
                                    var heroRight = lineSlice.lastIndexOf("hero");
                                    if ((-1 != bracketRight && -1 != heroRight && bracketRight < heroRight) || (-1 == bracketRight && -1 != heroRight)) {
                                        var startColum = Math.max(cursor.column - lineData.slice(-1)[0].length, bracketRight);
                                        var Range_1 = ace.require('./range').Range;
                                        var range = new Range_1(cursor.row, startColum, cursor.row, cursor.column);
                                        _this.editor.getSession().remove(range);
                                    }
                                    _this.editor['completer'].insertMatch();
                                } else {
                                    _this.editor.execCommand('insertstring', '\n');
                                    _this.editor.renderer.scrollCursorIntoView();
                                    _this.editor.renderer['animateScrolling'](_this.editor.renderer['scrollTop']);
                                }
                            }
                        }
                    }
                });
            };
            /**
             * 添加与关卡,英雄技能相关的代码片段
             * @param {Array} snippets 一组snippet
             * @param {string} language
             * snippet: {
             *      content: 'hero.moveDown()',
             *      meta: 'press enter'.
             *      name: 'moveDown',
             *      tabTrigger: 'moveDown'
             * }
             */
            EditorView.prototype.addSnippets = function(language) {
                var snippets = [];
                snippets.push({
                    content: "circle(100,100,50,'red');\n",
                    meta: 'press enter',
                    name: 'circle',
                    tabTrigger: 'circle'
                });
                snippets.push({
                    content: "rect",
                    meta: 'press enter',
                    name: 'rect',
                    tabTrigger: 'rect'
                });
                snippets.push({
                    content: "ellipse",
                    meta: 'press enter',
                    name: 'ellipse',
                    tabTrigger: 'ellipse'
                });
                snippets.push({
                    content: "image",
                    meta: 'press enter',
                    name: 'image',
                    tabTrigger: 'image'
                });
                this.zatanna.addSnippets(snippets, language);
            };
            EditorView.prototype.dispose = function() {
                //终止线程
                this.syntaxLoop.terminate();
                //关闭错误提示界面
                ProblemAlertView_1.default.getInstance().hideProblems();
                this.editor = null;
            };
            return EditorView;
        }(egret.EventDispatcher));
        exports.default = EditorView;
    }, { "../../worker/SyntaxCheckLoop": 34, "./ProblemAlertView": 30 }],
    30: [function(require, module, exports) {
        "use strict";
        /**
         * 错误展示面板
         * @author sam
         * @time 2017-5-28
         */
        Object.defineProperty(exports, "__esModule", { value: true });
        var ProblemAlertView = /** @class */ (function() {
            function ProblemAlertView() {
                this.template = _.template("<p><div style='position:absolute; left:3px; width:248px; height:30px;border-bottom:1px solid white;'>" +
                    "<span style='position:relative; left:7px; top: 3px;font-size:16px; color: #ffffff;' id='error-box'><%= title %></span>" +
                    "<span style='position:absolute; top:3px; width: 31px; height: 31px; right:-3px;'>" +
                    "<span id='problem-alert-close-btn'" + "onmouseover='this.style.backgroundPosition=\"left -27px\"'" + "onmouseout='this.style.backgroundPosition=\"left top\"'" +
                    "style='position:absolute; width:27px; height:27px; background:url(\"" + "resource\/assets\/error_btn\.png" + "\")'" + "></span>" +
                    "</span>" +
                    "</div></p>" +
                    "<div style='height:120px;overflow:auto;overflow-x:hidden;margin:43px 0 0 0;'>" +
                    "<% for(var i=0; i<problems.length; ++ i) {%>" +
                    "<div style='left:10px; color: #000000; top: <%= 7 * i %>px; position:relative;line-height:120%;width: 225px;'><%= problems[i]['row']+':'+problems[i]['text'] %></div> <% } %>" +
                    "</div></div>");
                var problems = [{
                    'text': 'Unmerged error',
                    'raw': 'Merged Warning'
                }];
                this.errortitle = "Error";
                this.el = document.getElementById('problem-alert-view');
                this.el.innerHTML = this.template({ 'problems': problems, 'title': this.errortitle });
            }
            ProblemAlertView.getInstance = function() {
                return this.pInstance || (this.pInstance = new ProblemAlertView());
            };
            ProblemAlertView.prototype.destroy = function() {
                // super.destroy()
            };
            ProblemAlertView.prototype.onCloseBtnClick = function(e) {
                this.hideProblems();
            };
            ProblemAlertView.prototype.setProblems = function(problems) {
                if (!problems || problems.length <= 0) {
                    this.hideProblems();
                } else {
                    this.showProblems(problems);
                }
            };
            ProblemAlertView.prototype.showProblems = function(problems) {
                problems && problems.length && (this.problems = problems);
                if (this.problems && this.problems.length) {
                    this.el.innerHTML = this.template({ 'problems': this.problems, 'title': this.errortitle });
                    this.el.visible = true;
                    this.el.style.display = 'block';
                }
                if (null == document.getElementById('problem-alert-close-btn').onclick) {
                    var self = this;
                    document.getElementById('problem-alert-close-btn').onclick = function(e) {
                        self.hideProblems();
                    };
                }
            };
            ProblemAlertView.prototype.hideProblems = function() {
                this.el.visible = false;
                this.el.style.display = 'none';
            };
            return ProblemAlertView;
        }());
        exports.default = ProblemAlertView;
    }, {}],
    31: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var WorldView = /** @class */ (function() {
            function WorldView() {}
            WorldView.getInstance = function() {
                if (this._instance == null) {
                    this._instance = new WorldView();
                }
                return this._instance;
            };
            WorldView.prototype.initWork = function(ce) {
                var that = this;
                ce.addFunction('init3d', function() {
                    WorldView.getInstance().init3d();
                });
                ce.addFunction('Cube', function() {
                    var geom = new egret3d.CubeGeometry();
                    var mater = new egret3d.TextureMaterial();
                    var cube = new egret3d.Mesh(geom, mater);
                    that.view3D.addChild3D(cube);
                    return cube;
                });
                ce.addFunction('Sphere', function(url) {
                    var geom = new egret3d.SphereGeometry();
                    var mater = new egret3d.TextureMaterial();
                    var sphere = new egret3d.Mesh(geom, mater);
                    that.view3D.addChild3D(sphere);
                    if (url.length > 0) {
                        var loadManger = new egret3d.AssetManager();
                        loadManger.loadAsset(url, function(obj) {
                            console.log(obj);
                            var mTexture = new egret3d.TextureMaterial();
                            mTexture.diffuseTexture = obj.data;
                            sphere.material = mTexture;
                        }, that);
                    }
                    return sphere;
                });
            };
            WorldView.prototype.init3d = function() {
                var context3d = new egret3d.Egret3DCanvas();
                egret.setRendererContext(context3d);
                context3d.width = 500;
                context3d.height = 500;
                this.view3D = new egret3d.View3D(0, (context3d.height - context3d.width) / 2, context3d.width, context3d.height);
                this.view3D.camera3D.lookAt(new egret3d.Vector3D(0, 200, -200), new egret3d.Vector3D(0, 0, 0));
                this.view3D.backColor = 0xff0000;
                context3d.addView3D(this.view3D);
                context3d.start();
                this.cameraCtl = new egret3d.LookAtController(this.view3D.camera3D, new egret3d.Object3D());
                this.cameraCtl.lookAtObject.y = 0;
                this.cameraCtl.distance = 500;
                this.cameraCtl.rotationX = 30;
                this.cameraCtl.rotationY = 180;
                context3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
            };
            WorldView.prototype.update = function(e) {
                this.cameraCtl.update();
            };
            return WorldView;
        }());
        exports.default = WorldView;
    }, {}],
    32: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var WorkerManager_1 = require("../manager/WorkerManager");
        /**
         * Created by sam on 2017/5/31.
         */
        var CodeEngine = /** @class */ (function() {
            function CodeEngine(language) {
                this._interval = 0;
                this._code = '';
                this._oldcode = '';
                var aetherOptions = {
                    executionLimit: 90000000,
                    problems: {
                        jshint_W040: { level: "ignore" }
                    },
                    language: language,
                    includeFlow: true,
                    includeMetrics: true,
                    protectBuiltins: true,
                    protectAPI: false,
                    languageVersion: 'es6'
                };
                this._aether = new Aether(aetherOptions);
                this._aether.setLanguage(language);
                this._language = language;
            }
            Object.defineProperty(CodeEngine.prototype, "lastAST", {
                get: function() {
                    return this._lastAST;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CodeEngine.prototype, "language", {
                get: function() {
                    return this._language;
                },
                enumerable: true,
                configurable: true
            });
            CodeEngine.prototype.getCode = function() {
                return this._code;
            };
            CodeEngine.prototype.getOldCode = function() {
                return this._oldcode;
            };
            CodeEngine.prototype.setCode = function(code) {
                this._oldcode = code;
                code = code.replace(/rand\(/g, "game.rand(");
                code = code.replace(/image\(/g, "game.image(");
                code = code.replace(/sprite\(/g, "game.sprite(");
                code = code.replace(/ellipse\(/g, "game.ellipse(");
                code = code.replace(/rectangle\(/g, "game.rectangle(");
                code = code.replace(/triangle\(/g, "game.triangle(");
                code = code.replace(/circle\(/g, "game.circle(");
                code = code.replace(/line\(/g, "game.line(");
                code = code.replace(/playAudio\(/g, "game.playAudio(");
                code = code.replace(/onLoop\(/g, "game.onLoop(");
                code = code.replace(/sleep\(/g, "game.sleep(");
                code = code.replace(/text\(/g, "game.text(");
                this._code = code;
            };
            CodeEngine.prototype.getAether = function() {
                return this._aether;
            };
            CodeEngine.prototype.getCompileInfo = function() {
                if (this._aether) {
                    return {
                        'problems': this._aether.problems,
                        'flow': this._aether.flow,
                        'metrics': this._aether.metrics
                    };
                }
            };
            CodeEngine.prototype.compile = function() {
                this._aether.transpile(this._code);
                this._aether.createFunction();
                this._aether.esperEngine.loadAST(this._aether.ast);
            };
            CodeEngine.prototype.runFuction = function(fn, args) {
                if (fn) {
                    var functionname = fn.toString().slice(10, -1);
                    for (var i = 0; i < this._aether.ast.body.length; i++) {
                        var node = this._aether.ast.body[i];
                        if (node.type == "FunctionDeclaration" && node.id.name == functionname) {
                            for (var j = 0; j < node.params.length; j++) {
                                this.addObject(node.params[j].name, args[j]);
                            }
                            var dd = this._aether.esperEngine.functionFromASTSync(node.body, false, null);
                            if (dd)
                                dd.apply(this._aether.esperEngine, null);
                            break;
                        }
                    }
                }
            };
            CodeEngine.prototype.initFunction = function() {
                for (var i = 0; i < this._aether.ast.body.length; i++) {
                    var node = this._aether.ast.body[i];
                    if (node.type == "FunctionDeclaration") {
                        this.addFunction(node.id.name, this._aether.esperEngine.functionFromASTSync(node.body, false, null));
                    } else if (node.type == "VariableDeclaration" && node.declarations) {
                        for (var j = 0; j < node.declarations.length; j++) {
                            if (node.declarations[j].init) {
                                if (node.declarations[j].init.type == "CallExpression")
                                    WorkerManager_1.default.getInstance().saveFunctionName(node.declarations[j].id.originalRange.end.row, node.declarations[j].id.name);
                                else if (node.declarations[j].init.arguments) {
                                    var arr = [];
                                    for (var k = 0; k < node.declarations[j].init.arguments.length; k++) {
                                        arr.push(node.declarations[j].init.arguments[k].value);
                                    }
                                    this.addArray(node.declarations[j].id.name, arr);
                                } else if (node.declarations[j].init.type == "Literal") {
                                    this.addValue(node.declarations[j].id.name, node.declarations[j].init.value);
                                }
                            }
                        }
                    }
                }
            };
            CodeEngine.prototype.addObject = function(name, object) {
                this._aether.esperEngine.addGlobalBridge(name, object);
            };
            CodeEngine.prototype.addFunction = function(name, func) {
                this._aether.esperEngine.addGlobalFx(name, func);
            };
            CodeEngine.prototype.addValue = function(name, val) {
                if (this._aether.esperEngine)
                    this._aether.esperEngine.addGlobalValue(name, val);
            };
            CodeEngine.prototype.addArray = function(name, val) {
                this._aether.esperEngine.addGlobal(name, val);
            };
            CodeEngine.prototype.runCode = function() {
                this._aether.run();
            };
            CodeEngine.prototype.stepCode = function() {
                clearInterval(this._interval);
                this._interval = setInterval(this.update, 0, this);
            };
            CodeEngine.prototype.update = function(context) {
                if (WorkerManager_1.default.getInstance().isPaused)
                    return;
                var result = context.stepOne(); //执行一步
                if (result) {
                    clearInterval(context._interval);
                    WorkerManager_1.default.getInstance().highlightCurrGutterLine(0);
                }
            };
            CodeEngine.prototype.reset = function() {
                this._aether.reset();
                this._aether.esperEngine = null;
            };
            /**
             * 执行一步代码
             * @param engine
             * @returns {boolean}
             */
            CodeEngine.prototype.stepOne = function() {
                var engine = this._aether.esperEngine;
                var result;
                try {
                    result = engine.step();
                } catch (e) {
                    result = e;
                }
                this.collectStepAST(engine);
                if (result) {
                    return true;
                } else {
                    return false;
                }
            };
            CodeEngine.prototype.collectStepAST = function(engine) {
                if (engine) {
                    var frames_1 = engine.evaluator.frames;
                    var ast = void 0;
                    for (var i = 0; i < frames_1.length; i++) {
                        if (frames_1[i].ast) {
                            ast = frames_1[i].ast;
                            break;
                        }
                    }
                    if (ast) {
                        this._lastAST = ast;
                    }
                }
            };
            CodeEngine.prototype.dispose = function() {
                this.reset();
            };
            return CodeEngine;
        }());
        exports.default = CodeEngine;
    }, { "../manager/WorkerManager": 9 }],
    33: [function(require, module, exports) {
        "use strict";
        var __extends = (this && this.__extends) || (function() {
            var extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] }
                    instanceof Array && function(d, b) { d.__proto__ = b; }) ||
                function(d, b) { for (var p in b)
                        if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return function(d, b) {
                extendStatics(d, b);

                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        Object.defineProperty(exports, "__esModule", { value: true });
        var CodeEngine_1 = require("./CodeEngine");
        var WorkerManager_1 = require("../manager/WorkerManager");
        var GameUtil_1 = require("../view/engine/GameUtil");
        var ProblemAlertView_1 = require("../view/sprite/ProblemAlertView");
        var KeyboradUtil_1 = require("../view/engine/KeyboradUtil");
        var MouseUtil_1 = require("../view/engine/MouseUtil");
        var WorldView_1 = require("../view/sprite/WorldView");
        /**
         * Created by sam on 2017/5/22.
         * 用户代码的处理类，包含编辑器和代码执行引擎两个部分。
         */
        var CodeWorker = /** @class */ (function(_super) {
            __extends(CodeWorker, _super);

            function CodeWorker(actor, target) {
                var _this = _super.call(this, target) || this;
                _this._isComplete = false; //是否彻底执行完所有动作，代码引擎执行
                _this._actor = actor;
                _this._codeEngine = new CodeEngine_1.default("python");
                return _this;
            }
            CodeWorker.prototype.getEngine = function() {
                return this._codeEngine;
            };
            Object.defineProperty(CodeWorker.prototype, "actor", {
                get: function() {
                    return this._actor;
                },
                enumerable: true,
                configurable: true
            });
            CodeWorker.prototype.runFuction = function(fn, args) {
                this._codeEngine.runFuction(fn, args);
            };
            CodeWorker.prototype.stepCode = function() {
                this._codeEngine.runCode();
            };
            CodeWorker.prototype.showErrorInfo = function(message, url, linenumber) {
                var error = {};
                error['type'] = 'error';
                error['row'] = "Line" + (linenumber - 10 || 1);
                error['text'] = message;
                ProblemAlertView_1.default.getInstance().setProblems([error]);
            };
            CodeWorker.prototype.refreshFrame = function() {
                //var lleft = document.getElementById("drawBoard").offsetLeft;
                //document.getElementById("drawBoard").outerHTML = '<iframe id="drawBoard" frameborder="0"></iframe>';
                this._codeEngine.reset();
                this._codeEngine.setCode(WorkerManager_1.default.getInstance().getEditor().editor.getValue());
                this._codeEngine.compile();
                var compileInfo = this._codeEngine.getCompileInfo();
                var errors = [];
                if (compileInfo) {
                    errors = compileInfo['problems']['errors'];
                    errors.forEach(function(error) {
                        error['type'] = 'error';
                        error['row'] = (error['range'] && error['range'][0] && error['range'][0]['row']) || 1;
                        error['text'] = error['message'];
                    });
                }
                WorkerManager_1.default.getInstance().getEditor().editor.renderer.setAnnotations(errors);
                if (errors.length < 1) {
                    localStorage.setItem('code', WorkerManager_1.default.getInstance().getEditor().editor.getValue());
                    $("#drawBoard").attr("src", "runner.html");
                }
            };
            CodeWorker.prototype.runCode = function(code) {
                this._codeEngine.reset();
                this._codeEngine.setCode(code);
                this._codeEngine.compile();
                //this._codeEngine.initFunction();
                WorldView_1.default.getInstance().initWork(this._codeEngine);
                this._codeEngine.addObject("game", GameUtil_1.default.getInstance());
                this._codeEngine.addObject("mouse", MouseUtil_1.default.getInstance());
                this._codeEngine.addObject("keyboard", KeyboradUtil_1.default.getInstance());
                this._codeEngine.stepCode();
            };
            CodeWorker.prototype.reset = function() {
                this._codeEngine.reset();
                this._isComplete = false;
            };
            CodeWorker.prototype.stop = function() {
                this.reset();
            };
            CodeWorker.prototype.dispose = function() {
                this.reset();
                this._codeEngine.dispose();
                this._actor.dispose();
                this._actor = null;
            };
            return CodeWorker;
        }(egret.EventDispatcher));
        exports.default = CodeWorker;
    }, { "../manager/WorkerManager": 9, "../view/engine/GameUtil": 24, "../view/engine/KeyboradUtil": 25, "../view/engine/MouseUtil": 26, "../view/sprite/ProblemAlertView": 30, "../view/sprite/WorldView": 31, "./CodeEngine": 32 }],
    34: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var SyntaxCheckLoop = /** @class */ (function() {
            function SyntaxCheckLoop(editorView, language) {
                this.editor = editorView.editor;
                //Worker
                this.worker = new Worker('lib/worker.js');
                var userCode = this.editor.getValue();
                this.worker.postMessage({
                    'type': 'transpile',
                    'rawCode': userCode
                });
                var notifyErrors = (function(e) {
                    var data = e.data;
                    var type = data['type'];
                    if ('compile_info' == type) {
                        var problems = data['problems'];
                        var errors = problems['errors'];
                        // if(errors && errors.length > 0)
                        {
                            errors.forEach(function(error) {
                                error['type'] = 'error';
                                error['row'] = (error['range'] && error['range'][0] && error['range'][0]['row']);
                                error['text'] = error['message'];
                            });
                            //this.editor.renderer.setAnnotations( errors );
                        }
                    }
                }).bind(this);
                this.worker.onmessage = notifyErrors;
            }
            SyntaxCheckLoop.prototype.transpile = function(userCode) {
                if (!userCode) {
                    userCode = this.editor.getValue();
                }
                this.worker.postMessage({
                    'type': 'transpile',
                    'language': this.language,
                    'rawCode': userCode
                });
            };
            SyntaxCheckLoop.prototype.terminate = function() {
                this.worker && this.worker.terminate();
            };
            return SyntaxCheckLoop;
        }());
        exports.default = SyntaxCheckLoop;
    }, {}]
}, {}, [4])

//# sourceMappingURL=ide-bundle.js.map