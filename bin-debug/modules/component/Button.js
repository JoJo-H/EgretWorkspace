var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super.call(this) || this;
        _this._throttleTime = null;
        _this._notice = '';
        _this._dataMapArr = [];
        //eui.Button 源代码
        _this.labelDisplay = null;
        _this._label = "";
        _this.iconDisplay = null;
        _this._icon = null;
        /**
         * @private
         * 指示第一次分派 TouchEvent.TOUCH_BEGIN 时，触摸点是否在按钮上。
         */
        _this.touchCaptured = false;
        _this.touchChildren = false;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    Button.prototype.onAddToStage = function (e) {
        this.onEnter();
    };
    Object.defineProperty(Button.prototype, "throttleTime", {
        get: function () {
            if (this._throttleTime == null || this._throttleTime <= 0) {
                return Button.THROTTLE_TIME;
            }
            return this._throttleTime;
        },
        set: function (val) {
            this._throttleTime = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "notice", {
        get: function () {
            return this._notice;
        },
        set: function (notice) {
            this._notice = notice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "data", {
        set: function (value) {
            this._data = value;
            if (value != null) {
                this.addDataMap('data');
            }
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "data");
            this.dataChanged();
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.addDataMap = function (name) {
        if (this._dataMapArr.indexOf(name) == -1) {
            this._dataMapArr.push(name);
        }
    };
    Button.prototype.dataChanged = function () {
    };
    Button.prototype.onEnter = function () {
    };
    Button.prototype.onExit = function () {
    };
    Object.defineProperty(Button.prototype, "throttleFun", {
        get: function () {
            if (this._throttleFun == null) {
                this._throttleFun = fun.throttle(this.buttonReleased, this.throttleTime);
            }
            return this._throttleFun;
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.onRemoveFromStage = function (e) {
        this.onExit();
    };
    Button.prototype.destoryData = function () {
        while (this._dataMapArr.length) {
            this[this._dataMapArr.shift()] = null;
        }
    };
    Button.prototype.dispose = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    Object.defineProperty(Button.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            if (this.labelDisplay) {
                this.labelDisplay.text = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        set: function (value) {
            this._icon = value;
            if (this.iconDisplay) {
                this.setIconSource(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.setIconSource = function (icon) {
        if (this.iconDisplay && is.truthy(icon)) {
            this.iconDisplay.source = icon;
            this.iconDisplay.includeInLayout = this.iconDisplay.visible = true;
        }
        else if (this.iconDisplay) {
            this.iconDisplay.includeInLayout = this.iconDisplay.visible = false;
        }
    };
    /**
     * 解除触碰事件处理。
     * @param event 事件 <code>egret.TouchEvent</code> 的对象。
     * @version Egret 3.0.1
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    Button.prototype.onTouchCancle = function (event) {
        var stage = event.$currentTarget;
        stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        this.touchCaptured = false;
        this.invalidateState();
    };
    /**
    * 触碰事件处理。
    * @param event 事件 <code>egret.TouchEvent</code> 的对象。
    * @version Egret 2.4
    * @version eui 1.0
    * @platform Web,Native
    * @language zh_CN
    */
    Button.prototype.onTouchBegin = function (event) {
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        this.touchCaptured = true;
        this.invalidateState();
        event.updateAfterEvent();
    };
    /**
    * @private
    * 舞台上触摸弹起事件
    */
    Button.prototype.onStageTouchEnd = function (event) {
        var stage = event.$currentTarget;
        stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancle, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
        if (this.contains(event.target)) {
            if (this.throttleTime > 0) {
                this.throttleFun();
            }
            else {
                this.buttonReleased();
            }
        }
        this.touchCaptured = false;
        this.invalidateState();
    };
    /**
     * @inheritDoc
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    Button.prototype.getCurrentState = function () {
        var oldState = this.skin.currentState;
        var newState = 'up';
        if (!this.enabled)
            newState = "disabled";
        if (this.touchCaptured)
            newState = "down";
        if (this.skin.hasState(newState)) {
            return newState;
        }
        return oldState;
    };
    /**
     * @inheritDoc
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    Button.prototype.partAdded = function (partName, instance) {
        if (instance === this.labelDisplay) {
            this.labelDisplay.text = this._label;
        }
        else if (instance == this.iconDisplay) {
            this.iconDisplay.source = this._icon;
        }
    };
    /**
     * 当在用户单击按钮之后处理 <code>egret.TouchEvent.TOUCH_END</code> 事件时，将调用此方法。
     * 仅当以按钮为目标，并且 <code>touchCaptured</code> 为 <code>true</code> 时，才会调用此方法。
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    Button.prototype.buttonReleased = function () {
        if (is.truthy(this._notice)) {
            var data = this.data;
            if (!data) {
                var host = Display.getHostComponent(this);
                if (host) {
                    data = host.data;
                }
            }
            GlobalAPI.facede.sendNotification(this._notice, { date: data, host: host, button: this });
        }
        if (this.name) {
            GlobalAPI.facede.sendNotification(GameDefine.CLICK_BUTTON, { name: this.name, button: this });
        }
    };
    return Button;
}(eui.Component));
Button.THROTTLE_TIME = 0;
__reflect(Button.prototype, "Button");
