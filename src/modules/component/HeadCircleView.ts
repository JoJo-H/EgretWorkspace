/**
 * 圆形遮罩
 */
class HeadCircleView extends BaseComponent {
    constructor() {
        super();
    }

    private _watch:eui.Watcher[] = [];

    onEnter() {
        super.onEnter();
        this.check();
        this._watch.push(eui.Binding.bindHandler(this.img, ['source'], this.check, this));
    }

    check() {
        if(!this.img.hasEventListener(egret.Event.COMPLETE)){
            this.img.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        }
        if(this.img.texture) {
            this.onComplete();
        }
    }

    onComplete() {
        var w = this.img.texture.textureWidth;
        var h = this.img.texture.textureHeight;

        var size = this.width - 24;

        if (w > h) {
            this.img.scaleX = this.img.scaleY = size / w;
        } else {
            this.img.scaleX = this.img.scaleY = size / h;
        }
        if(!this._shape) {
            this._shape = new egret.Shape();
            this._shape.graphics.beginFill(0xffffff);
            this._shape.graphics.drawCircle(this.width/2,this.height/2,size/2);
            this._shape.graphics.endFill();
            this.addChild(this._shape);
            this.img.mask = this._shape;
        }
    }

    onExit() {
        this.img.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
        while (this._watch.length) {
            this._watch.shift().unwatch();
        }
        super.onExit();
    }

    public img:eui.Image;
    private _shape : egret.Shape;
}