

//http://developer.egret.com/cn/article/index/id/709
//画图识字母 :此例子{ 0:V,1:一竖，2：一横，3：^，4：&，5：Z}
class DrawTest extends egret.Sprite{

    constructor(){
        super();
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this),
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this),
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this)
    }

    private _mouseDatas = [];
    private _currentPoint : egret.Point;
    mouseDown (e) {
        this.graphics.clear(),
        this._mouseDatas = [];
        var t = new egret.Point(e.stageX,e.stageY);
        this._mouseDatas.push(t),
        this._currentPoint = t
    }

    mouseMove(e) {
        var t = new egret.Point(e.stageX,e.stageY);
        this._mouseDatas.push(t),
        this.graphics.lineStyle(5, 0),
        this.graphics.moveTo(this._currentPoint.x, this._currentPoint.y),
        this.graphics.lineTo(t.x, t.y),
        this.graphics.endFill(),
        this._currentPoint = t
    }

    mouseUp(e) {
        var t = new egret.Point(e.stageX,e.stageY);
        this._mouseDatas.push(t),
        this.graphics.clear(),
        this.motion()
    }

    motion() {
        var e = []
          , t = 0
          , i = this._mouseDatas.length;
        e.push(this._mouseDatas[t]);
        //过滤,从原点获取大于30的点
        for (var n = 0; i > n; n++){
            if(egret.Point.distance(this._mouseDatas[t], this._mouseDatas[n]) > 30){
                t = n
                e.push(this._mouseDatas[t]);
            }
        }
        this._mouseDatas = e,
        this.parseDirection()
    }

    private _dirsArr = [];
    parseDirection() {
        this._dirsArr = [];
        var len = this._mouseDatas.length
        for (var t = 0; len > t; t++)
            if (this._mouseDatas[t + 1]) {
                var curPt = this._mouseDatas[t]
                  , nextPt = this._mouseDatas[t + 1]
                  , s = curPt.y - nextPt.y
                  , a = egret.Point.distance(curPt, nextPt)
                  , r = Math.asin(s / a)    //弧度
                  , o = 57.29578 * r        //角度 π = 180
                  , h = this.quadrant(curPt, nextPt)
                  , g = this.getDirByAngQuad(o, h);
                this._dirsArr.push(g)
            }
        var u = this.repDiff(this._dirsArr);
        console.log(u);
        var d = this.sweep(u);
        console.log("type: ", d),
        this.disEvent(d)
    }
    //坐标轴象限
    quadrant(cur, next) {
        return next.x >= cur.x ? next.y <= cur.y ? 1 : 4 : next.y <= cur.y ? 2 : 3
    }

    getDirByAngQuad(angle, t) {
        switch (t) {
        case 1:
            return 22.5 >= angle && angle >= 0 ? 1 : 67.5 >= angle && angle > 22.5 ? 8 : 7;
        case 2:
            return 22.5 >= angle && angle >= 0 ? 5 : 67.5 >= angle && angle > 22.5 ? 6 : 7;
        case 3:
            return -67.5 >= angle && angle >= -90 ? 3 : -22.5 >= angle && angle > -67.5 ? 4 : 5;
        case 4:
            return -67.5 >= angle && angle >= -90 ? 3 : -22.5 >= angle && angle > -67.5 ? 2 : 1
        }
    }

    repDiff(arr) {
        var len = arr.length;
        var t = "";
        for (var n = 0, i = 0; len > i; i++)
        {
            if(n != arr[i]){
                n = arr[i];
                t += arr[i];
            }
        }
        return t
    }

    sweep(e) {
        for (var t = -1, i = -1, n = this._symbol.length, s = 0; n > s; s++) {
            var a = this.Levenshtein_Distance_Percent(this._symbol[s], e);
            a > i && (i = a,
            t = this._symbolG[s])
        }
        return .4 > i && (t = -1),
        t
    }

    Levenshtein_Distance_Percent(e, t) {
        var i = e.length > t.length ? e.length : t.length
          , n = this.Levenshtein_Distance(e, t);
        return 1 - n / i
    }
    Levenshtein_Distance(e, t) {
        var i, n, s, a, r, o = e.length, h = t.length, g = [];
        if (0 == o)
            return h;
        if (0 == h)
            return o;
        for (i = 0; o >= i; i++)
            g[i] = [],
            g[i][0] = i;
        for (n = 0; h >= n; n++)
            g[0][n] = n;
        for (i = 1; o >= i; i++)
            for (s = e.charAt(i - 1),
            n = 1; h >= n; n++)
                a = t.charAt(n - 1),
                r = s == a ? 0 : 1,
                g[i][n] = this.Minimum(g[i - 1][n] + 1, g[i][n - 1] + 1, g[i - 1][n - 1] + r);
        return g[o][h]
    }
    Minimum = function(e, t, i) {
        return t > e ? i > e ? e : i : i > t ? t : i
    }

    disEvent = function(e) {
        // Data.type = e,
        egret.MainContext.instance.stage.dispatchEvent(new egret.Event("action"));
    }

    private _symbol = ["28", "46", "82", "64", "141", "585", "3", "7", "5", "1", "4321876", "2345678"];
    private _symbolG = [0, 0, 3, 3, 5, 5, 1, 1, 2, 2, 4, 4]
}