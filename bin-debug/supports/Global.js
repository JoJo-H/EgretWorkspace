var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Global = (function () {
    function Global() {
    }
    /**
     * 获取指定类的类型
     * @param name 类型名称
     * @param defaultType 默认类型
     * @returns {any}
     */
    Global.getDefinitionType = function (name, defaultType) {
        if (is.truthy(name)) {
            var t = egret.getDefinitionByName(name);
            if (is.truthy(t)) {
                return t;
            }
        }
        return defaultType;
    };
    /**
     * 获取指定类的实例
     * @param args 类型构造函数参数列表
     * @param name 类型名称
     * @param defaultType 默认类型
     * @param args 类型构造函数参数列表
     * @returns {null}
     */
    Global.getDefinitionInstance = function (name, defaultType) {
        if (defaultType === void 0) { defaultType = null; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var define = Global.getDefinitionType(name, defaultType);
        if (is.truthy(define)) {
            return new (define.bind.apply(define, [void 0].concat(args)))();
        }
        return null;
    };
    Global.propertyChange = function (obj) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < arg.length; i++) {
            eui.PropertyEvent.dispatchPropertyEvent(obj, eui.PropertyEvent.PROPERTY_CHANGE, arg[i]);
        }
    };
    return Global;
}());
__reflect(Global.prototype, "Global");
