var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MovieType;
(function (MovieType) {
    MovieType[MovieType["DRAGON"] = 0] = "DRAGON";
    MovieType[MovieType["DBFAST"] = 1] = "DBFAST";
    MovieType[MovieType["MOVIECLIP"] = 2] = "MOVIECLIP";
    MovieType[MovieType["SEQUNCE_MOVIE"] = 3] = "SEQUNCE_MOVIE";
})(MovieType || (MovieType = {}));
var BaseFactory = (function () {
    function BaseFactory() {
    }
    BaseFactory.getEgretFactory = function () {
        if (!this._egretFactory) {
            this._egretFactory = new dragonBones.EgretFactory();
            this.initClock();
        }
        return this._egretFactory;
    };
    BaseFactory.initClock = function () {
        if (!this._movieClock) {
            this._movieClock = new MovieClock();
            this._movieClock.start();
        }
    };
    BaseFactory.create = function (path, type, armature) {
        //相对路径名称 assets/animation/fast/xxx_ske.dbmv 或 assets/animation/dragonBones/xxx_anim.json
        var arr = path.split("/");
        //动画文件名称
        var fileName = arr[arr.length - 1];
        var movie;
        switch (type) {
            case MovieType.DRAGON:
                //龙骨动画
                movie = new DragonMovie();
                movie.isCache = false;
                movie.setPath(path, armature);
                break;
            case MovieType.DBFAST:
                movie = new DBFaseMovie();
                movie.isCache = false;
                movie.setPath(path);
                break;
            case MovieType.MOVIECLIP:
                break;
            default:
                throw new Error("创建动画错误,动画类型:" + type);
        }
        return movie;
    };
    BaseFactory.fast = function (option, dbName) {
        var movie = this.create('assets/animation/fast/' + dbName, MovieType.DBFAST);
        option.actionName = option.actionName && option.actionName != "" ? option.actionName : "1";
        this.play(movie, option);
        return movie;
    };
    BaseFactory.playAnim = function (option, name, armature) {
        var movie = this.create('assets/animation/dragonBones/' + name, MovieType.DRAGON, armature);
        option.actionName = option.actionName && option.actionName != "" ? option.actionName : name;
        this.play(movie, option);
        return movie;
    };
    BaseFactory.play = function (movie, option) {
        var playTime = option.playTimes ? option.playTimes : 0;
        movie.play(option.actionName, playTime);
        movie.touchEnabled = false;
        movie.once(MovieEvent.COMPLETE, function () {
            if (option.onComplete) {
                option.onComplete();
            }
        }, this);
        movie.scaleX = option.scaleX ? option.scaleX : 1;
        movie.scaleY = option.scaleY ? option.scaleY : 1;
        if (option.container) {
            option.container.addChild(movie);
            movie.x = option.container.width / 2 + (option.offsetX || 0);
            movie.y = option.container.height / 2 + (option.offsetY || 0);
        }
        else {
            GlobalAPI.stage.addChild(movie);
            movie.x = GlobalAPI.stage.width / 2 + (option.offsetX || 0);
            movie.y = GlobalAPI.stage.height / 2 + (option.offsetY || 0);
        }
    };
    BaseFactory.getFilenameWithoutExt = function (path) {
        var arr = path.split('/');
        var filename = arr[arr.length - 1];
        arr = filename.split('.');
        return arr[0];
    };
    return BaseFactory;
}());
__reflect(BaseFactory.prototype, "BaseFactory");
var MovieEvent = (function (_super) {
    __extends(MovieEvent, _super);
    function MovieEvent(name, label) {
        if (label === void 0) { label = null; }
        var _this = _super.call(this, name) || this;
        _this._frameLabel = label;
        return _this;
    }
    Object.defineProperty(MovieEvent.prototype, "frameLabel", {
        get: function () {
            return this._frameLabel;
        },
        enumerable: true,
        configurable: true
    });
    return MovieEvent;
}(egret.Event));
MovieEvent.FRAME_LABEL = "Frame_Label";
MovieEvent.LOOP_COMPLETE = "Loop_Complete";
MovieEvent.COMPLETE = "Complete";
__reflect(MovieEvent.prototype, "MovieEvent");
var MovieClock = (function () {
    function MovieClock() {
        this._lastTime = 0;
    }
    MovieClock.prototype.start = function () {
        this._lastTime = egret.getTimer();
        egret.startTick(this.tick, this);
    };
    MovieClock.prototype.tick = function (time) {
        var gap = time - this._lastTime;
        this._lastTime = time;
        dragonBones.WorldClock.clock.advanceTime(gap / 1000);
        return false;
    };
    MovieClock.prototype.stop = function () {
        egret.stopTick(this.tick, this);
    };
    return MovieClock;
}());
__reflect(MovieClock.prototype, "MovieClock");
