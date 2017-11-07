

interface ProxyInfo {
    /**
     * 接口名称
     */
    moddo : string;
    /**
     * 请求是否显示简单载入条(遮罩,默认是)
     */
    mask ?: boolean;
    /**
     * 请求数据是否进行缓存（默认否）
     */
    cache ?: boolean;
    /**
     * 请求参数
     */
    params ?: any;
    /**
     * 合并数据
     */
    dataMerge ?: any;
    /**
     * 数据失效时间（时间内重复请求无效）
     * {time,type},type表示类型，一个标识
     */
    delay ?: any;
}

class network {

    public static request(info:ProxyInfo):Promise<any> {
        return new Promise<any>((resolve,reject)=>{
            var proxy = new SingleProxy(info);
            proxy.addEventListener(ProxyEvent.RESPONSE_SUCCEED,(e:ProxyEvent)=>{
                resolve(e.responseData);
            },this);
            proxy.addEventListener(ProxyEvent.ERROR, (e:ProxyEvent) => {
                reject(e);
            },this);
            proxy.load();
        });
    }

    public static proxyInfo2Param(info:ProxyInfo):any {
        var proxyParams = {};
        if(info.moddo) {
            proxyParams['mod'] = info.moddo;
        }
        if(info.params) {
            proxyParams['p'] = info.params;
        }
        if(info.mask == true) {
            proxyParams['mask'] = true;
        }
        if(info.cache == true) {
            proxyParams['cache'] = true;
        }
        if (info.dataMerge === true) {
            proxyParams["dataMerge"] = true;
        }
        if(info.delay == true) {
            proxyParams['delay'] = true;
        }
        return proxyParams;
    }

    public static paramsToQueryString(...args):string {
        var params:Array<string> = [];
        for (var i:number = 0; i < args.length; i ++) {
            var item:Object = args[i];
            for (var key in item) {
                params.push(key + "=" + item[key]);
            }
        }
        return params.join("&");
    }
}