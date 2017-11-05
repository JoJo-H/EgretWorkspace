
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

            this._errorCode = 10000;
            this._errorMessage = "请求超时";
            this._isTimeout = true;
            this.dispatchEvent(new ProxyEvent(ProxyEvent.TIME_OUT, this));
            this.dispatchEvent(new ProxyEvent(ProxyEvent.ERROR, this));
        }, this, 20000);


        var params  = {'data':this.params};
        if(this._method == egret.HttpMethod.GET) {
            var queryString : string = network.paramsToQueryString(params,this._customParams);
            url += queryString;
            request.open(url,egret.HttpMethod.GET);
            request.send();
        }else {
            var queryString : string = network.paramsToQueryString(params,this._customParams);
            request.open(url,egret.HttpMethod.POST);
            request.send(queryString);
        }
    }

    private onComplete(event:egret.Event):void {
        egret.clearTimeout(this._timeoutId);
    }

    private onError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
        this._errorMessage = "请求失败";
        egret.clearTimeout(this._timeoutId);
    }

    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
        egret.clearTimeout(this._timeoutId);
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


    public _responseData:any;
    public _errorCode:number;
    public _errorMessage:string;
}