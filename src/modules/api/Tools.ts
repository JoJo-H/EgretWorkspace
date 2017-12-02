
class Tools {

    constructor(){}
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

    static getStringLen(str:string):number {
        let len = 0;
        //for of会被编译成for循环
        // for( let c of str) {
        //     len ++;
        // }
        let  reduce = 0;
        for(let i = 0 ,len = str.length; i < len ; i ++) {
            if(str.codePointAt(i) > 0xFFFF) {
                reduce ++;
            }
            len ++;
        }
        len -= reduce;
        return len;
    }
    static formatName(str:string,len):string {
        for(let i = 0 ; i < str.length ; i ++) {
            if(str.codePointAt(i) > 0xFFFF) {
                len ++;
            }
        }
        return str.length > len ? str.substr(0,len) +'...' : str.substr(0,len);
    }

    static timeFormat(time:number):string {
        var h = Math.floor(time/3600);
        var s = Math.floor( (time - h*3600) / 60);
        var m = time - h*3600 - s*60;
        var str : string = ( (h+"").length<2 ? "0"+h : h + "" ) + ":" + ( (s+"").length<2 ? "0"+s : s + "" ) + ":" + ( (m+"").length<2 ? "0"+m : m + "" );
        return str;
    }
    
}