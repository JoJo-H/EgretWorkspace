
/**
 * http数据缓存类
 */
class ProxyCache {

    private _dataCache : any = {};

    constructor(){
        this._dataCache = new Map();
    }

    private static _instance : ProxyCache;
    public static get instance():ProxyCache {
        if(!this._instance) {
            this._instance = new ProxyCache();
        }
        return this._instance;
    }

    private getCache(smod:string = null, sdo:string = null):any {
        if (smod == null) {
            return this._dataCache;
        }
        if (this.isCache(smod, sdo)) {
            var params:Array<string> = this.formatParmas(smod, sdo);
            return this._dataCache[params[0]][params[1]];
        }
        return null;
    }

    public reset():void {
        var slist:any = this._dataCache["Server"]["getList"];
        this._dataCache = {"Server": {"getList": slist}};
    }

    public resetOne(smod:string, sdo:string = null):void {
        var marr = this.formatParmas(smod, sdo);
        if (this._dataCache.hasOwnProperty(marr[0])) {
            delete this._dataCache[marr[0]][marr[1]];
        }
    }

    private setCache(proxy:BaseProxy):void {
        var params:any = proxy.params;
        if (params && params.hasOwnProperty("cache") && params["cache"] === true) {
            var data = proxy.responseData;
            var smod = proxy.getParamByName("mod");
            var sdo = proxy.getParamByName("do");
            if (!this._dataCache.hasOwnProperty(smod)) {
                this._dataCache[smod] = {};
            }
            if (params.hasOwnProperty("dataMerge") && params["dataMerge"] === true) {
                this._dataCache[smod][sdo] = this.dataMerge(this._dataCache[smod][sdo], data);
            } else {
                this._dataCache[smod][sdo] = data;
            }
            GlobalAPI.facede.sendNotification(NotifyName.Cache(smod + "." + sdo), data);
            GlobalAPI.facede.sendNotification(NotifyName.All(smod + "." + sdo));
            GlobalAPI.facede.sendNotification(NotifyName.CacheChange, smod + "." + sdo, data);
        }
    }

    public getCacheData(key:string):any {
        if(this._dataCache.hasOwnProperty(key)) {
            return this._dataCache[key];
        }
        return null;
    }

    public clearCache():void {
        var keys = Object.keys(this._dataCache);
        for (var i:number = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            this._dataCache[key] = null;
            delete this._dataCache[key];
        }
    }

    private dataMerge(dist, source):any {
        var obj = dist || {};
        for (var key in source) {
            obj[key] = source[key];
        }
        return obj;
    }

    private isCache(smod:string, sdo:string = null):boolean {
        var params:Array<string> = this.formatParmas(smod, sdo);

        return this._dataCache.hasOwnProperty(params[0]) &&
            this._dataCache[params[0]].hasOwnProperty(params[1]);
    }

    private formatParmas(smod:string, sdo:string = null):Array<string> {
        if (sdo == null) {
            var arr:Array<string> = smod.split(".");
            smod = arr[0];
            sdo = arr[1];
        }
        return [smod, sdo];
    }



    public static setCache(proxy:BaseProxy):void {
        ProxyCache.instance.setCache(proxy);
    }

    /**
     * 获取缓存数据
     * @param moddo
     * @returns {Object}
     */
    public static getCache(moddo:string|ProxyInfo = null):any {
        return ProxyCache.instance.getCache(NotifyName.getModDo(moddo));
    }

    public static resetOne(moddo:string|ProxyInfo):void {
        ProxyCache.instance.resetOne(NotifyName.getModDo(moddo));
    }

    public static reset():void {
        return ProxyCache.instance.reset();
    }

    /**
     * 指定接口的数据是否已缓存
     * @param moddo
     * @returns {boolean}
     */
    public static isCache(moddo:string|ProxyInfo):boolean {
        return ProxyCache.instance.isCache(NotifyName.getModDo(moddo));
    }
}