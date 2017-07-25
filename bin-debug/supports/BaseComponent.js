var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        var _this = _super.call(this) || this;
        _this._dataMapArr = [];
        _this._args = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
        return _this;
    }
    BaseComponent.prototype.getArgs = function () {
        return this._args;
    };
    BaseComponent.prototype.setArgs = function (args) {
        this._args = args;
    };
    Object.defineProperty(BaseComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            if (value != null) {
                this.addDataMap('data');
            }
            this.dataChanged();
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.addDataMap = function (name) {
        if (this._dataMapArr.indexOf(name) == -1) {
            this._dataMapArr.push(name);
        }
    };
    BaseComponent.prototype.setData = function (data, type) {
        if (type === void 0) { type = 'data'; }
        if (type == 'data') {
            this.data = data;
            if (data != null) {
                this.addDataMap('data');
                Global.propertyChange(this, "data");
            }
        }
        else {
            this[type] = data;
            if (data != null) {
                this.addDataMap(type);
            }
        }
        return this;
    };
    BaseComponent.prototype.dataChanged = function () {
    };
    BaseComponent.prototype.setCompName = function (name) {
        this.componentName = name;
        return this;
    };
    Object.defineProperty(BaseComponent.prototype, "componentName", {
        get: function () {
            return this._componentName;
        },
        set: function (value) {
            this._componentName = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseComponent.prototype.onAddToStage = function (e) {
        this.onEnter(this.getArgs());
    };
    BaseComponent.prototype.onRemoveFromStage = function (e) {
        this.onExit();
    };
    BaseComponent.prototype.onEnter = function (args) {
    };
    BaseComponent.prototype.onExit = function () {
    };
    BaseComponent.prototype.destoryData = function () {
        while (this._dataMapArr.length) {
            this[this._dataMapArr.shift()] = null;
        }
        this._args = [];
        this._data = null;
        this.componentName = "";
        this.onExit();
        Display.destoryChildren(this);
    };
    BaseComponent.prototype.dispose = function () {
        this.destoryData();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    };
    return BaseComponent;
}(eui.Component));
__reflect(BaseComponent.prototype, "BaseComponent");
