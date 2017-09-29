
class GameTurntableView extends BaseComponent {

    public imgRing : eui.Image;
    public imgStart : eui.Image;
    public btnStart : BaseButton;
    constructor(){
        super();
        this.skinName = "GameTurntableSkin";
    }

    onEnter():void {
        super.onEnter();
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
    }

    private items : any[] = [1,2,3,4,5,6,7,8,9,10];
    private onStart():void {
        var index = Math.floor(Math.random() * this.items.length) ;
        var angle = index * ( 360 / this.items.length ) + ( 360 / this.items.length / 2);
        this.stopRotate();
        this.rotate({
            angle: 0,
			animateTo: angle + 1800,
			duration: 8000,
			easing: (x,t,b,c,d) => -c * ((t=t/d-1)*t*t*t - 1) + b,
			callback: () => {
				console.log(index);
			}
        });
    }

    private _angle : number;
    private _timeId : number;
    private _params:any;
    rotate(obj:any):void {
        this._angle = obj.angle;
        this._params = obj;
        if(this._angle == obj.animateTo) {
            this.doRotate(this._angle);
        }else {
            this.animateStart();
        }
    }

    private _startTime = 0;
	private _startAngle = 0;
    animateStart(){
        this.stopRotate();
        this._startTime = + new Date;
        this._startAngle = this._angle;
        this.animate();
    }

    animate():void {
        var actualTime = +new Date;
        var checkEnd = actualTime - this._startTime > this._params.duration;
        if(checkEnd) {
            this.stopRotate();
        }else {
            var angle = this._params.easing(0, actualTime - this._startTime, this._startAngle, this._params.animateTo - this._startAngle, this._params.duration);
            this.doRotate((~~(angle*10)/10));
            this._timeId = egret.setTimeout(() => {
				this.animate();
			}, this, 10);
        }

        if (this._params.callback && checkEnd) {
			this._angle = this._params.animateTo;
			this.doRotate(this._angle);
			this._params.callback();
		}
    }

    doRotate(angle) {
		this._angle = angle;
		this.imgStart.rotation = angle;
	}

	stopRotate() {
		egret.clearTimeout(this._timeId);
	}

    onEixt():void {
        super.onExit();
        this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
    }
}