
class MultiProxy extends BaseProxy {

    protected _subProxys:SingleProxy[] = [];
    constructor(...args){
        super(null);
        var args:Array<any> = [];
        if (args.length > 0) {
            for (var i:number = 0; i < args.length; i ++) {
                args.push(args[i]);
            }
        }

        if (args) {
            for (var i:number = 0; i < args.length; i ++) {
                this.addSubProxy(args[i]);
            }
        }

        this.addParam("m", 1);
    }

    public addSubProxy(subProxy:any):void {
        if( subProxy && subProxy.hasOwnProperty("moddo") ) {
            var p1:SingleProxy = new SingleProxy(subProxy);
            this._subProxys.push(p1);
        }else if (subProxy instanceof SingleProxy) {
            this._subProxys.push(subProxy);
        } else if (subProxy instanceof MultiProxy) {
            var multiProxy:MultiProxy = <MultiProxy>subProxy;
            var that = this;
            multiProxy._subProxys.forEach(function(v) {
                that.addSubProxy(v);
            }, this);
        } 
    }

    public load():void {
        if (this._subProxys.length == 0) {
            return;
        }
        super.load();
    }

    public onResponse(data:any):void {
        if (data) {
            this._responseData = data;
            this._subProxys.forEach((v:SingleProxy) => {
                var smod = v.getParamByName("mod");
                var sdo = v.getParamByName("do");
                v.onResponse(this.responseData[smod][sdo]);
            }, this);

            this._isRequestSucceed = true;
            this._isResponseSucceed = true;


            this.dispatchEvent(new ProxyEvent(ProxyEvent.RESPONSE_SUCCEED, this));
            this.dispatchEvent(new ProxyEvent(ProxyEvent.REQUEST_SUCCEED, this));
        } else {
            this._isRequestSucceed = true;
            this._isResponseSucceed = false;
            this._errorCode = -1000;

            this.dispatchEvent(new ProxyEvent(ProxyEvent.RESPONSE_ERROR, this));
            this.dispatchEvent(new ProxyEvent(ProxyEvent.REQUEST_SUCCEED, this));
            this.dispatchEvent(new ProxyEvent(ProxyEvent.ERROR, this));
        }
        this.proxyDone();
    }

    public getParamString():string {
        var arr:Array<any> = [];
        this._subProxys.forEach(function(proxy:SingleProxy) {
            var ret:any = {};
            for (var key in proxy.params) {
                if (BaseProxy.frontProxyKeys.indexOf(key) == -1) {
                    ret[key] = proxy.params[key];
                }
            }
            arr.push(ret);
        }, this);
        return JSON.stringify(arr);
    }

    public getParamByName(name:string):any {
        for (var i = 0; i < this._subProxys.length; i ++) {
            var ret:any = this._subProxys[i].getParamByName(name);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    }

    public get subProxyList():SingleProxy[] {
        return this._subProxys;
    }
}