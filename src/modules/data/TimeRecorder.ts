
class TimeRecorder {
    private _date:Date;
    private _lastDate:any = -1;
    private _offsetTime:number = 0;
    private _tickNum:number = 0;
    get tickNum():number {
        return this._tickNum;
    }

    private _seconds:number;
    get seconds():number {
        return this._seconds;
    }

    tick():number {
        var seconds = 1;
        this._date = new Date();
        var t = this._date.getTime();
        if (this._lastDate != -1) {
            var v = (t - this._lastDate) / 1000;
            seconds = Math.floor(v);
            if (seconds < 1) {
                seconds = 1;
            }
            this._offsetTime += (v - seconds);
            if (this._offsetTime >= 1) {
                v = Math.floor(this._offsetTime);
                seconds += v;
                this._offsetTime = this._offsetTime - v;
            }
        }
        this._lastDate = t;
        this._tickNum += seconds;
        this._seconds = seconds;
        return seconds;
    }
}