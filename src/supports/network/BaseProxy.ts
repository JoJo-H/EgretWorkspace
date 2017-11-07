class ProxyErrorCode {
    public static ERROR_DATA:number = 100000;
    public static TIME_OUT:number = 100001;
    public static ERROR_REQUEST:number = 100002;
}


class BaseProxy extends egret.EventDispatcher {

    private _params : any;
    private _requestUrl : string;
    private _method : string;
    public _customParams:any;

    private _isTimeout:boolean = false;
    private _timeoutId:number = null;
    constructor(params:any){
        super();
        this._customParams = {};
        this._params = this.formatParams(params);
        this._requestUrl = "http://httpbin.org/get";
    }

    private formatParams(params:Object):any {
        if( params && !params.hasOwnProperty('do') && params.hasOwnProperty('mod')) {
            var mod : string = params['mod'];
            if( mod.indexOf('.') != -1 ) {
                var modArr : any[] = mod.split('.');
                params['mod'] = modArr[0];
                params['do'] = modArr[1];
            }
        }
    }

    load():void {
        var url : string = this._requestUrl.indexOf('?') == -1 ? this._requestUrl+'?' : this._requestUrl;
        if( url[url.length - 1] != '?' && url[url.length - 1] != "&" ) {
            url += '&';
        } 

        var request : egret.HttpRequest = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);

        this._timeoutId = egret.setTimeout(() => {
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            request.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
            request.removeEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
            egret.clearTimeout(this._timeoutId);

            this._errorCode = ProxyErrorCode.TIME_OUT;
            this._errorMessage = "请求超时";
            this._isTimeout = true;
            this.dispatchEvent(new ProxyEvent(ProxyEvent.TIME_OUT, this));
            this.dispatchEvent(new ProxyEvent(ProxyEvent.ERROR, this));
        }, this, BaseProxy._timeout);


        var params  = {'data':this.params};
        if(this._method == egret.HttpMethod.GET) {
            var queryString : string = network.paramsToQueryString(params,this._customParams,BaseProxy._globalParams);
            url += queryString;
            request.open(url,egret.HttpMethod.GET);
            request.send();
        }else {
            var queryString : string = network.paramsToQueryString(params,this._customParams,BaseProxy._globalParams);
            request.open(url,egret.HttpMethod.POST);
            request.send(queryString);
        }
    }

    private onComplete(event:egret.Event):void {
        egret.clearTimeout(this._timeoutId);
        var data : any = null;
        try{
            //todo
            data = JSON.parse(event.target.response);
        }catch(e){

        }
        this.onResponse(data);
    }

    private onError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
        this._errorMessage = "请求失败";
        egret.clearTimeout(this._timeoutId);
        this.dispatchEvent(new ProxyEvent(ProxyEvent.REQUEST_FAIL, this));
        this.dispatchEvent(new ProxyEvent(ProxyEvent.ERROR, this));
    }

    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        egret.clearTimeout(this._timeoutId);
    }

    public onResponse(data:any):void {
        this._responseData = data;
        this._isResponseSucceed = false;

        //标识,0表示成功,其他表示错误码,可以进行解析弹tips提醒
        if (this._responseData && this._responseData.hasOwnProperty("s")) {
            this._isResponseSucceed = this._responseData["s"] == 0;
        }
        this._errorCode = this._responseData ? this._responseData["s"] : ProxyErrorCode.ERROR_DATA;
        this._isRequestSucceed = true;

        if (this._isResponseSucceed) {
            this.dispatchEvent(new ProxyEvent(ProxyEvent.RESPONSE_SUCCEED, this));
        } else {
            this.dispatchEvent(new ProxyEvent(ProxyEvent.RESPONSE_ERROR, this));
            this.dispatchEvent(new ProxyEvent(ProxyEvent.ERROR, this));
        }
    }
    public proxyDone():void {
        if (this.canClearEventListener()) {
            this.clearEventListener();
        }
    }
    private canClearEventListener():boolean {
        if (this._isResponseSucceed) {
            return true;
        }
        return false;
    }
    private _listeners:any[] = [];
    
    public addEventListener(type:string, listener:(e:ProxyEvent) => void, thisObject:any, useCapture:boolean = false, priority:number = 0):void {
        super.addEventListener(type, listener, thisObject, useCapture, priority);
        this._listeners.push({'type': type, 'listener': listener, 'thisObj': thisObject, 'capture': useCapture, 'priority': priority});
    }

    public clearEventListener():void {
        while (this._listeners.length > 0) {
            var obj:any = this._listeners.shift();
            this.removeEventListener(obj['type'], obj['listener'], obj['thisObj'], obj['capture']);
        }
    }


    public getParamByName(name:string):any {
        if (!this._params) {
            return null;
        }
        return this._params[name];
    }

    public hasParamByName(name:string):boolean {
        if (!this._params) {
            return false;
        }
        return this._params.hasOwnProperty(name);
    }

    public get params():any {
        return this._params;
    }

    public get responseData():any {
        return this._responseData;
    }
    public get errorMessage():string {
        return this._errorMessage;
    }

    public get errorCode():number {
        return this._errorCode;
    }

    public get isResponseSucceed():boolean {
        return this._isResponseSucceed;
    }

    public get isRequestSucceed():boolean {
        return this._isRequestSucceed;
    }

    public get requestUrl():string {
        return this._requestUrl;
    }

    public set requestUrl(value:string) {
        this._requestUrl = value;
    }

    public get method():string {
        return this._requestUrl;
    }

    public set method(value:string) {
        this._method = value;
    }

    private static _globalParams:any = {};
    
    public static addGlobalParams<Z>(key:string, params:Z):void {
        this._globalParams[key] = params;
    }

    public static getGlobalParam(key:string):any {
        return this._globalParams[key];
    }

    public static removeGlobalParams(key:string): void {
        delete this._globalParams[key];
    }


    public _responseData:any;
    public _isResponseSucceed:boolean;
    public _isRequestSucceed:boolean;
    //错误码：表示哪种报错
    public _errorCode:number;
    public _errorMessage:string;
    private static _timeout:number = 20000;
}