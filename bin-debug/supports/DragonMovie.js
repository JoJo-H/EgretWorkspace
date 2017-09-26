var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DragonMovie = (function (_super) {
    __extends(DragonMovie, _super);
    function DragonMovie() {
        var _this = _super.call(this) || this;
        _this.isCache = false;
        _this._intialized = false;
        _this._replaceDisplayArr = [];
        _this._frameRate = null;
        return _this;
    }
    DragonMovie.prototype.setPath = function (path, armature) {
        // dir: assets/animation/dragonBones/xxx
        this._skeletonJson = path + "_anim.json";
        this._textureImage = path + "_texture.png";
        this._textureJson = path + "_texture.json";
        var fileName = BaseFactory.getFilenameWithoutExt(path);
        this._fileName = fileName + "_dragonGroup";
        this._armatureName = armature ? armature : fileName;
        if (!this._intialized) {
            this._intialized = true;
            if (this.stage) {
                this.onAddToStage();
            }
            if (!this.hasEventListener(egret.Event.ADDED_TO_STAGE)) {
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            }
            if (!this.hasEventListener(egret.Event.REMOVED_FROM_STAGE)) {
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            }
        }
    };
    Object.defineProperty(DragonMovie.prototype, "armature", {
        get: function () {
            return this._armatureName;
        },
        set: function (val) {
            this._armatureName = val;
        },
        enumerable: true,
        configurable: true
    });
    DragonMovie.prototype.play = function (name, playTimes) {
        var _this = this;
        this.prepareResource().then(function () {
            _this.getArmture().animation.play(name, playTimes);
        });
    };
    DragonMovie.prototype.getArmture = function () {
        if (!this._armature) {
            dragonBones.WorldClock.clock.remove(this._armature);
            var aniData = RES.getRes(this._skeletonJson);
            var texData = RES.getRes(this._textureJson);
            var texImg = RES.getRes(this._textureImage);
            //把动画数据添加到工厂里
            BaseFactory.getEgretFactory().addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(aniData));
            //把纹理集数据和图片添加到工厂里
            BaseFactory.getEgretFactory().addTextureAtlas(new dragonBones.EgretTextureAtlas(texImg, texData));
            //从工厂里创建出Armature
            this._armature = BaseFactory.getEgretFactory().buildArmature(this._armatureName);
            this._armature.display.x = this._armature.display.y = 0;
            this.addChild(this._armature.display);
            //插槽替换资源
            if (this._replaceDisplayArr.length) {
                var info = this._replaceDisplayArr.shift();
                this.replaceDisplay(info.name, info.display);
            }
            dragonBones.WorldClock.clock.add(this._armature);
            if (this._frameRate) {
                this.frameRate = this._frameRate;
            }
        }
        return this._armature;
    };
    DragonMovie.prototype.gotoAndStop = function (name, frame) {
    };
    DragonMovie.prototype.gotoAndPlay = function (name, frame, playTimes) {
    };
    DragonMovie.prototype.prepareResource = function () {
        var aniData = RES.getRes(this._armatureName);
        var texData = RES.getRes(this._textureJson);
        var texImg = RES.getRes(this._textureImage);
        if (aniData && texData && texImg) {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
        else {
            RES.createGroup(this._fileName, [this._skeletonJson, this._textureJson, this._textureImage]);
            return RES.loadGroup(this._fileName);
        }
    };
    DragonMovie.prototype.onFrame = function (e) {
        var ev = new MovieEvent(MovieEvent.FRAME_LABEL, e.frameLabel);
        this.dispatchEvent(ev);
    };
    DragonMovie.prototype.onComplete = function (e) {
        this.dispatchEvent(new MovieEvent(MovieEvent.COMPLETE));
    };
    DragonMovie.prototype.onAddToStage = function () {
        if (this._armature) {
            dragonBones.WorldClock.clock.add(this._armature);
            this._armature.addEventListener(dragonBones.EgretEvent.FRAME_EVENT, this.onFrame, this);
            this._armature.addEventListener(dragonBones.EgretEvent.COMPLETE, this.onComplete, this);
            this._armature.addEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
        }
    };
    DragonMovie.prototype.onRemoveFromStage = function () {
        dragonBones.WorldClock.clock.remove(this._armature);
        if (this._armature) {
            this._armature.animation.stop();
            this._armature.removeEventListener(dragonBones.EgretEvent.FRAME_EVENT, this.onFrame, this);
            this._armature.removeEventListener(dragonBones.EgretEvent.COMPLETE, this.onComplete, this);
            this._armature.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
        }
    };
    Object.defineProperty(DragonMovie.prototype, "frameRate", {
        get: function () {
            return this._frameRate;
        },
        set: function (val) {
            this._frameRate = val;
            if (this._armature) {
                this._armature.clock.timeScale = this._frameRate / 24;
            }
        },
        enumerable: true,
        configurable: true
    });
    DragonMovie.prototype.dispose = function () {
    };
    DragonMovie.prototype.replaceDisplay = function (slotName, display) {
        if (this._armature) {
            var slot = this._armature.getSlot(slotName);
            slot.displayIndex = 0;
            slot.display = display;
        }
    };
    DragonMovie.prototype.addReplaceDisplayInfo = function (info) {
        this._replaceDisplayArr.push(info);
    };
    return DragonMovie;
}(egret.DisplayObjectContainer));
__reflect(DragonMovie.prototype, "DragonMovie", ["IMovie", "egret.DisplayObject"]);
