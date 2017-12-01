interface ICountdownHost {
    onTimeUpdate():void;
    p:any;
    onCountUpdate():void;
    id?:any;
    onFinish?:Function;
}

class CountdownInfo {
    private _object:any;
    private _host:ICountdownHost;
    private _timeId:number;
    // private _watch:eui.Watcher[] = [];
    //是否在cd中
    private _isCding : boolean = false;

    constructor(host:ICountdownHost) {
        this._host = host;
        this._object = host.p;
        this.startCd();
    }

    startCd():void {
        this._recorder = new TimeRecorder();
        egret.clearInterval(this._timeId);
        this._timeId = egret.setInterval(this.tick, this, 1000);
        this._isCding = true;
    }

    getData():any {
        return this._object;
    }

    private _recorder:TimeRecorder;
    private tick():void {
        var seconds = this._recorder.tick();
        var max = this._object['max'];
        var val = this._object['num'];
        if (val < max) {
            this._object['nextUpdate'] -= seconds;
            if (this._host) {
                this._host.onTimeUpdate();
            }

            if (this._object['nextUpdate'] <= 0) {
                var num = Math.floor(Math.abs(this._object['nextUpdate']) / this._object['interval']) + 1;
                this._object['nextUpdate'] = this._object['interval'] - (Math.abs(this._object['nextUpdate']) % this._object['interval']);
                
                this._object['num'] = (this._object['num']+num) > this._object['max'] ? this._object['max'] : (this._object['num'] + num);
                if (this._host) {
                    this._host.onCountUpdate();
                }
                if ( this._object['num'] >= this._object['max'] ) {
                    this._isCding = false;
                    if(this._host.onFinish) {
                        this._host.onFinish();
                    }
                }
            }
        }
    }

    dispose():void {
        this._isCding = false;
        egret.clearInterval(this._timeId);
        this.removeWatcher();
    }

    isCding():boolean {
        return this._isCding;
    }

    private removeWatcher():void {
        // while (this._watch.length) {
        //     this._watch.shift().unwatch();
        // }
    }
}