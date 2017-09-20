var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DBFaseMovie = (function (_super) {
    __extends(DBFaseMovie, _super);
    function DBFaseMovie() {
        var _this = _super.call(this) || this;
        _this.isCache = false;
        _this._atLast = false;
        _this._playName = "";
        _this._frameRate = null;
        return _this;
    }
    DBFaseMovie.prototype.setPath = function (path) {
        this._dataPath = path;
        this._texturePath = path.replace("_ske.dbmv", "_tex.png");
        this._fileName = BaseFactory.getFilenameWithoutExt(path).replace("_ske", "");
    };
    DBFaseMovie.prototype.prepareResource = function () {
        var ske = RES.getRes(this._dataPath);
        //preload预加载png图集
        var tex = RES.getRes(this._texturePath);
        if (ske && tex) {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
        else {
            RES.createGroup(this._fileName, [this._dataPath]);
            return RES.loadGroup(this._fileName);
        }
    };
    DBFaseMovie.prototype.play = function (name, playTimes) {
        var _this = this;
        if (playTimes === void 0) { playTimes = 0; }
        playTimes = playTimes == 0 ? -1 : playTimes;
        this.prepareResource().then(function () {
            _this._playName = name;
            _this.getMC().play(name, playTimes);
        });
    };
    DBFaseMovie.prototype.gotoAndStop = function (name, frame) {
        var _this = this;
        this.prepareResource().then(function () {
            _this.getMC().gotoAndStop(name, frame / 24);
        });
    };
    DBFaseMovie.prototype.gotoAndPlay = function (name, frame, playTimes) {
        var _this = this;
        if (playTimes === void 0) { playTimes = 0; }
        playTimes = playTimes == 0 ? -1 : playTimes == -1 ? 0 : playTimes;
        this.prepareResource().then(function () {
            _this.getMC().gotoAndPlay(name, frame / 24, playTimes);
        });
    };
    DBFaseMovie.prototype.getMC = function () {
        if (this._mc == null) {
            this._mc = dragonBones.buildMovie(this._fileName);
            this.addChild(this._mc);
        }
        if (this._mc && this._frameRate != null) {
            this._mc.clipTimeScale = this._frameRate / 24;
        }
        return this._mc;
    };
    Object.defineProperty(DBFaseMovie.prototype, "frameRate", {
        get: function () {
            return this._frameRate;
        },
        set: function (val) {
            this._frameRate = val;
            if (this._mc) {
                this._mc.clipTimeScale = this._frameRate / 24;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DBFaseMovie.prototype, "atLast", {
        get: function () {
            return this._atLast;
        },
        set: function (val) {
            this._atLast = val;
        },
        enumerable: true,
        configurable: true
    });
    DBFaseMovie.prototype.clearEvents = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        if (this._mc) {
            this._mc.removeEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.onLoopComplete, this);
            this._mc.removeEventListener(dragonBones.MovieEvent.COMPLETE, this.onComplete, this);
            this._mc.removeEventListener(dragonBones.MovieEvent.FRAME_EVENT, this.onFrameLabel, this);
        }
    };
    DBFaseMovie.prototype.initEvents = function () {
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        if (this._mc) {
            this._mc.addEventListener(dragonBones.MovieEvent.LOOP_COMPLETE, this.onLoopComplete, this);
            this._mc.addEventListener(dragonBones.MovieEvent.COMPLETE, this.onComplete, this);
            this._mc.addEventListener(dragonBones.MovieEvent.FRAME_EVENT, this.onFrameLabel, this);
        }
    };
    DBFaseMovie.prototype.onLoopComplete = function (e) {
        this.dispatchEvent(new MovieEvent(MovieEvent.LOOP_COMPLETE));
    };
    DBFaseMovie.prototype.onComplete = function (e) {
        this.dispatchEvent(new MovieEvent(MovieEvent.COMPLETE));
        if (!this.atLast) {
            Display.removeFromParent(this._mc);
        }
    };
    DBFaseMovie.prototype.onFrameLabel = function (e) {
        this.dispatchEvent(new MovieEvent(MovieEvent.FRAME_LABEL, e.name));
    };
    DBFaseMovie.prototype.onRemoved = function (e) {
        this.dispose();
    };
    DBFaseMovie.prototype.dispose = function () {
        if (this.isCache) {
            if (this._mc) {
                this._mc.stop();
            }
        }
        else {
            if (this._mc) {
                this._mc.dispose();
                this.clearEvents();
                Display.removeFromParent(this._mc);
                this._mc = null;
            }
        }
    };
    return DBFaseMovie;
}(egret.DisplayObjectContainer));
__reflect(DBFaseMovie.prototype, "DBFaseMovie", ["IMovie", "egret.DisplayObject"]);
