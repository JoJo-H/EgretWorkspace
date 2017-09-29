var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIType;
(function (UIType) {
    UIType[UIType["SCENE"] = 0] = "SCENE";
    UIType[UIType["COMMON"] = 1] = "COMMON";
    UIType[UIType["PANEL"] = 2] = "PANEL";
    UIType[UIType["MENU"] = 3] = "MENU";
    UIType[UIType["BOX"] = 4] = "BOX";
    UIType[UIType["GUIDE"] = 5] = "GUIDE";
    UIType[UIType["TOOLTIP"] = 6] = "TOOLTIP";
})(UIType || (UIType = {}));
/**
* 游戏UI界面控制器
* 目前支持的容器(层级从下往上):场景层、公共UI层、面板层、菜单层、弹框层、新手引导层、浮动层
*/
var UI = (function (_super) {
    __extends(UI, _super);
    function UI() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this._scene = new eui.UILayer();
        _this._scene.touchEnabled = false;
        _this.addChild(_this._scene);
        _this._common = new eui.UILayer();
        _this._common.touchEnabled = false;
        _this.addChild(_this._common);
        _this._panel = new eui.UILayer();
        _this.addChild(_this._panel);
        _this._panel.touchEnabled = false;
        _this._menu = new eui.UILayer();
        _this.addChild(_this._menu);
        _this._menu.touchEnabled = false;
        _this._box = new eui.UILayer();
        _this.addChild(_this._box);
        _this._box.touchEnabled = false;
        _this._guide = new eui.UILayer();
        _this.addChild(_this._guide);
        _this._guide.touchEnabled = false;
        _this._tooltip = new eui.UILayer();
        _this.addChild(_this._tooltip);
        _this._tooltip.touchEnabled = false;
        _this._containerArr = [_this._scene, _this._common, _this._panel, _this._menu, _this._box, _this._guide, _this._tooltip];
        return _this;
    }
    UI.prototype.setRoot = function (container) {
        if (container) {
            container.addChild(this);
        }
    };
    UI.prototype.setMenu = function (menuType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._menuInst != null) {
            this.remove(this._menuInst);
        }
        var menuInst = this.getTypeInst(menuType, args, UIType.MENU);
        Display.setFullDisplay(menuInst);
        this._menuInst = menuInst;
        this._menuInst.bottom = 0;
        this._menuInst.horizontalCenter = 0;
        this._menu.addChild(this._menuInst);
    };
    UI.prototype.runScene = function (sceneType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._sceneInst) {
            this.remove(this._sceneInst);
        }
        var ret = this.addScene(sceneType, args);
        return ret;
    };
    UI.prototype.addScene = function (sceneType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var sceneInst = this.getTypeInst(sceneType, args, UIType.SCENE);
        Display.setFullDisplay(sceneInst);
        this._sceneInst = sceneInst;
        this._scene.addChild(sceneInst);
        return sceneInst;
    };
    UI.prototype.addBox = function (boxType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var boxInst = this.getTypeInst(boxType, args, UIType.BOX);
        Display.setFullDisplay(boxInst);
        this._box.addChild(boxInst);
        return boxInst;
    };
    UI.prototype.addPanel = function (panelType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var panelInst = this.getTypeInst(panelType, args, UIType.PANEL);
        Display.setFullDisplay(panelInst);
        this._panel.addChild(panelInst);
        return panelInst;
    };
    UI.prototype.addCommon = function (commonType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var commonInst = this.getTypeInst(commonType, args, UIType.COMMON);
        Display.setFullDisplay(commonInst);
        this._common.addChild(commonInst);
        return commonInst;
    };
    UI.prototype.getTypeInst = function (type, arg, uiType) {
        var inst = null;
        var skinName;
        if (typeof (type) == "string") {
            skinName = type;
            type = BaseComponent;
        }
        if (type.constructor.name == "Function") {
            inst = new (type.bind.apply(type, [void 0].concat(arg)))();
        }
        else {
            inst = type;
            inst.setArgs(arg);
            if (skinName) {
                inst.skinName = skinName;
            }
        }
        return inst;
    };
    UI.prototype.removeComponent = function (name) {
        var obj = this.getComponent(name);
        if (egret.is(obj, 'BaseComponent')) {
            if (!this.isSingleContainer(obj)) {
                this.remove(obj);
            }
        }
    };
    UI.prototype.getComponent = function (name) {
        for (var i = 0; i < this._containerArr.length; i++) {
            var container = this._containerArr[i];
            var component = this.getComponentByName(name, container);
            if (component) {
                return component;
            }
        }
        return null;
    };
    UI.prototype.getComponentByName = function (name, container) {
        var num = container.numChildren;
        for (var i = 0; i < num; i++) {
            var child = container.getChildAt(i);
            if (child.componentName == name) {
                return child;
            }
        }
        return null;
    };
    UI.prototype.isSingleContainer = function (component) {
        if (component.isType(UIType.SCENE) &&
            component.isType(UIType.MENU)) {
            return true;
        }
        return false;
    };
    UI.prototype.remove = function (component) {
        if (!component)
            return;
        component.dispose();
        Display.removeFromParent(component);
    };
    return UI;
}(eui.UILayer));
__reflect(UI.prototype, "UI");
