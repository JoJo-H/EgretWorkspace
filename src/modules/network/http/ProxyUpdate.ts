
/**
 * http数据更新类
 */
class ProxyUpdate {

    public constructor() {
    }

    private static _instance : ProxyUpdate;
    public static get instance():ProxyUpdate {
        if(!this._instance) {
            this._instance = new ProxyUpdate();
        }
        return this._instance;
    }

    public isArray(key:any):boolean {
        return key instanceof Array;
    }

    public isObject(key:string):boolean {
        return key.indexOf("object") > -1;
    }

    /**
     * @param key 
     * 数据更新例子:
     * c:
     * {
     *  Achieve.getInfo:
     *  {
     *      l:
     *      {
     *          @f_id_@104: { @s.progress : 70330 }
     *      }
     *  }
     * }
     */
    public isNormal(key:string):boolean {
        //@s.progress   @f_id_@104
        //如果存在着三种格式是需要进行数据处理的，否则就是层层递进取值
        var isAt:boolean = key.indexOf("@") > -1;
        var isDot:boolean = key.indexOf(".") > -1;
        var isUnderline:boolean = key.indexOf("_") > -1;

        return (!isAt && !isDot && !isUnderline);
    }

    public isAddToArray(key:string):boolean {
        return (key == "@a");
    }

    public isRemoveToArray(key:string):boolean {
        var arr:Array<any> = key.split("_");
        return (arr.length <= 3 && arr[0] == "@d");
    }

    public isFilter(key:string):boolean {
        var arr:Array<any> = key.split("_");
        return (arr[0] == "@f");
    }

    public isNumeric(v:string):boolean {
        return parseFloat(v).toString() == v.toString();
    }

    /**
     * 数据更新
     * @param key 
     * @param data 
     */
    public update(proxy:BaseProxy,dataCache:any):void {
        
        var data = proxy.responseData["c"];
        var modArr = [];
        for (var k1 in data)
        {
            var v1 = data[k1];
            var arr = k1.split('.');
            var pmod = arr[0];
            var pdo = arr[1];
            if ( dataCache.hasOwnProperty(pmod) && dataCache[pmod].hasOwnProperty(pdo) ) 
            {
                GlobalAPI.facede.sendNotification(NotifyName.BeforeChange(pmod + "." + pdo), v1);
                this._update(dataCache[pmod][pdo], v1);
                this.postAction(pmod, pdo, v1);
                modArr.push([pmod, pdo, v1]);
            }
        }

        for (var i = 0; i < modArr.length; i ++) {
            var item = modArr[i];
            GlobalAPI.facede.sendNotification(NotifyName.AfterChange(item[0] + '.' + item[1]), item[2]);
        }
    }

    private postAction(pmod, pdo, v1):void {
        GlobalAPI.facede.sendNotification(NotifyName.Change(pmod + "." + pdo), v1);
        GlobalAPI.facede.sendNotification(NotifyName.All(pmod + "." + pdo));
    }

    public customUpdate(pmod:string, obj:any):void {
        var cacheObj = ProxyCache.getCache(pmod);
        this._update(cacheObj, obj);
        var arr = pmod.split('.');
        this.postAction(arr[0], arr[1], obj);
    }

    private _update(cacheData:any, changeData:any):void {
        if (cacheData && changeData && this.isObject(changeData.toString())) {
            let keys = Object.keys(changeData);
            let len = keys.length;
            for (let i:number = 0 ; i < len; i++) {
                let k = keys[i];
                let v:any = changeData[k];
                if (this.isNormal(k) && this.isObject(v.toString())) {
                    if (cacheData.hasOwnProperty(k)) {
                        this._update(cacheData[k], v);
                    }
                }
                else if (this.isNormal(k) && this.isNumeric(v)) {
                    var cv:any = cacheData[k];
                    cacheData[k] = cv + v;
                }
                else if (this.isNormal(k)) {
                    cacheData[k] = v;
                }
                else if (this.isAddToArray(k)) {
                    this._addObjectToArray(cacheData, v);
                }
                else if (this.isRemoveToArray(k)) {
                    this._removeObjectFromArray(cacheData, k, v);
                }
                else if (this.isFilter(k)) {
                    var subCacheData:any = this._getFilterObject(k, cacheData);
                    if (subCacheData) {
                        this._update(subCacheData, v);
                    }
                }
                else {
                    this._updateObject(k, v, cacheData);
                }
            }
        }
    }

    private _updateObject(name:string, value:any, cacheData:any):void {
        var arr:Array<any> = name.split(".");
        if (arr[0] == "@a" || arr[0] == "@s") {
            if (this.isArray(cacheData)) {
                cacheData[parseInt(arr[1])] = value;
            }
            else {
                cacheData[arr[1]] = value;
            }
        }
        else if (arr[0] == "@d") {
            delete cacheData[arr[1]];
        }
    }

    private _addObjectToArray(cacheData:any, changeValue:any):void {
        if (this.isArray(changeValue)) {
            for (var i:number = 0; i < changeValue.length; i++) {
                cacheData.push(changeValue[i]);
            }
        }
        else {
            cacheData.push(changeValue);
        }
    }

    private _sliceCaceData(cacheData:any, idx:number):void {
        var obj = cacheData[idx];
        cacheData.splice(idx, 1);
    }

    private _removeObjectFromArray(cacheData:any, key:string, changeValue:any):void {
        var arr = key.split("_");
        if (arr.length <= 3 && arr[0] == "@d")
        {
            if (this.isArray(cacheData))
            {
                var count = cacheData.length;
                for (var i = count - 1; i >= 0; i --)
                {
                    var cacheDataItem = cacheData[i];
                    if (arr.length == 3)
                    {
                        if (cacheDataItem.hasOwnProperty(arr[1]))
                        {
                            var val = arr[2];
                            if (val[0] == "@")
                            {
                                val = val.replace("@", "");
                            }
                            if (val == cacheDataItem[arr[1]])
                            {
                                this._sliceCaceData(cacheData, i);
                            }
                        }
                    }
                    else if (arr.length == 2 && cacheDataItem.hasOwnProperty(arr[1]))
                    {
                        if (changeValue == cacheDataItem[arr[1]])
                        {
                            this._sliceCaceData(cacheData, i);
                        }
                    }
                    else if (arr.length == 1)
                    {
                        if (changeValue == cacheDataItem)
                        {
                            this._sliceCaceData(cacheData, i);
                        }
                    }
                }
            }
        }
    }

    private _getFilterObject(filter:string, cacheData:any):any {
        if (cacheData)
        {
            var arr = filter.split("_");
            if (arr.length == 2 && arr[0] == "@f" && this.isArray(cacheData)) {
                var idx = parseInt(arr[1]);
                return cacheData[idx];
            }
            if (arr.length == 3 && arr[0] == "@f" && this.isArray(cacheData))
            {
                var key = arr[1];
                var value = arr[2];

                for (var i = 0; i < cacheData.length; i ++)
                {
                    var v = cacheData[i];
                    if (arr.length == 3 && this.isObject(v))
                    {
                        var cacheValue = v[key];
                        if (cacheValue != null && cacheData != undefined)
                        {
                            if (value[0] == "@")
                            {
                                value = value.replace("@", "");
                            }
                            if (value == cacheValue)
                            {
                                return v;
                            }
                        }
                    }
                }
            }
        }
        return null;
    }
}