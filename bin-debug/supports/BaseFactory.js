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
        }
        return this._egretFactory;
    };
    BaseFactory.create = function (path, type, armature) {
        var arr = path.split("/");
        var fileName = arr[arr.length - 1];
        var movie;
        switch (type) {
            case MovieType.DRAGON:
                break;
            case MovieType.DBFAST:
                movie = new DBFaseMovie();
                movie.setPath(path);
                break;
            case MovieType.MOVIECLIP:
                break;
            default:
                break;
        }
        return movie;
    };
    BaseFactory.fast = function (name, option, type) {
        var movie = this.create('assets/animation/fast/' + name, type);
        var playTime = option.playTimes ? option.playTimes : 0;
        movie.play('1', playTime);
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
        return movie;
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
