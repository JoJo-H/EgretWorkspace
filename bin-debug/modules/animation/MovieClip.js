var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        var _this = _super.call(this) || this;
        _this._atLast = false;
        _this.isCache = false;
        _this._frameRate = null;
        _this._hasEvent = false;
        return _this;
    }
    Object.defineProperty(MovieClip.prototype, "atLast", {
        get: function () {
            return this._atLast;
        },
        set: function (val) {
            this._atLast = val;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.setPath = function (path) {
        this._dataPath = path;
        this._texturePath = path.replace('.json', '.png');
        this._filename = BaseFactory.getFilenameWithoutExt(this._dataPath);
    };
    MovieClip.prototype.prepareResource = function () {
        var factory = RES.getRes(this._dataPath);
        if (factory) {
            return new Promise(function (ok) {
                ok();
            });
        }
        else {
            RES.createGroup(this._filename, [this._dataPath]);
            return RES.loadGroup(this._filename);
        }
    };
    MovieClip.prototype.play = function (name, playTimes) {
        var _this = this;
        if (playTimes === void 0) { playTimes = 0; }
        this.prepareResource().then(function () {
            _this.getMC(name).play(playTimes);
        });
    };
    MovieClip.prototype.gotoAndStop = function (name, frame) {
        var _this = this;
        this.prepareResource().then(function () {
            _this.getMC(name).gotoAndStop(frame);
        });
    };
    MovieClip.prototype.gotoAndPlay = function (name, frame, playTimes) {
        var _this = this;
        if (playTimes === void 0) { playTimes = 0; }
        this.prepareResource().then(function () {
            _this.getMC(name).gotoAndPlay(frame, playTimes);
        });
    };
    MovieClip.prototype.getMC = function (name) {
        if (this._mc) {
            if (!this._hasEvent) {
                this.initEvents();
            }
            return this._mc;
        }
        var factory = RES.getRes(this._dataPath);
        if (factory) {
            this._mc = new egret.MovieClip(factory.generateMovieClipData(name));
            this.initEvents();
            this.addChild(this._mc);
        }
        return this._mc;
    };
    Object.defineProperty(MovieClip.prototype, "frameRate", {
        get: function () {
            return this._frameRate;
        },
        set: function (val) {
            this._frameRate = val;
            if (this._mc) {
                this._mc.frameRate = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.clearEvents = function () {
        this._hasEvent = false;
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        if (this._mc) {
            this._mc.removeEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopComplete, this);
            this._mc.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onComplete, this);
            this._mc.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabel, this);
        }
    };
    MovieClip.prototype.initEvents = function () {
        this._hasEvent = true;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        if (this._mc) {
            this._mc.addEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopComplete, this);
            this._mc.addEventListener(egret.MovieClipEvent.COMPLETE, this.onComplete, this);
            this._mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabel, this);
        }
    };
    MovieClip.prototype.onLoopComplete = function (e) {
        this.dispatchEvent(new MovieEvent(MovieEvent.LOOP_COMPLETE));
    };
    MovieClip.prototype.onComplete = function (e) {
        this.dispatchEvent(new MovieEvent(MovieEvent.COMPLETE));
        if (!this.atLast) {
            Display.removeFromParent(this);
        }
    };
    MovieClip.prototype.onFrameLabel = function (e) {
        this.dispatchEvent(new MovieEvent(MovieEvent.FRAME_LABEL, e.frameLabel));
    };
    MovieClip.prototype.onRemoved = function (e) {
        this.dispose();
    };
    MovieClip.prototype.dispose = function () {
        this.clearEvents();
    };
    return MovieClip;
}(egret.DisplayObjectContainer));
__reflect(MovieClip.prototype, "MovieClip", ["IMovie", "egret.DisplayObject"]);
