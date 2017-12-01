
class Tools {

    constructor(){}

    private _tooltip:ITooltip;
    getTooltip():ITooltip {
        if (!this._tooltip) {
            this._tooltip = Tools.getDefinitionInstance<ITooltip>(App.GlobalData.GameConfig.TooltipClass,Tooltip);
            if (this._tooltip) {
                App.UI.addTooltip(this._tooltip);
            }
            if (DEBUG && !this._tooltip) {
                console.error("请配置TooltipClass");
            }
        }
        return this._tooltip;
    }

    tooltip(info:TooltipInfo|string, skinName?:string):void {
        var tip = this.getTooltip();
        if (tip) {
            tip.show(info, skinName);
        }
    }

    /**
     * 获取指定类的类型
     * @param name 类型名称
     * @param defaultType 默认类型
     * @returns {any}
     */
    public static getDefinitionType(name,defaultType):any{
        if (is.truthy(name)) {
            var t = egret.getDefinitionByName(name);
            if (is.truthy(t)) {
                return t;
            }
        }
        return defaultType;
    }

    /**
     * 获取指定类的实例
     * @param args 类型构造函数参数列表
     * @param name 类型名称
     * @param defaultType 默认类型
     * @param args 类型构造函数参数列表
     * @returns {null}
     */
    public static getDefinitionInstance<T>(name:string, defaultType:any = null, ...args):T {
        var define = Tools.getDefinitionType(name, defaultType);
        if( is.truthy(define)) {
            return new define(...args);
        }
        return null;
    }
    
    public static propertyChange(obj,...arg):void {
        for (var i = 0; i < arg.length; i++) {
            eui.PropertyEvent.dispatchPropertyEvent(obj, eui.PropertyEvent.PROPERTY_CHANGE, arg[i]);
        }
    }
}