
class DragonMovie extends egret.DisplayObjectContainer implements IMovie {

    atLast: boolean;
    isCache:boolean = false;
    constructor(){
        super();
    }
    private _dragonBonsName : string;
    private _textureImage : string;
    private _textureFile : string;
    private _armatureName : string;
    private _fileName : string;
    private _intialized:boolean = false;
    setPath(name:string,armature:string=name):void {
        this._fileName = name + "_dragonGroup";
        this._dragonBonsName = name + "_anim.json";
        this._textureImage = name + "_texture.png";
        this._textureFile = name + "_texture.json";
        this._armatureName = armature;
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
    }

    get armature():string {
        return this._armatureName;
    }
    set armature(val:string) {
        this._armatureName = val;
    }

    play(name: string, playTimes?: number): void{
        this.prepareResource().then(()=>{

        });
    }

    private _armature : dragonBones.Armature;
    getArmture():dragonBones.Armature {
        if(!this._armature) {
            dragonBones.WorldClock.clock.remove(this._armature);
            var aniData = RES.getRes(this._armatureName);
            var texData = RES.getRes(this._textureFile);
            var texImg = RES.getRes(this._textureImage);
            //把动画数据添加到工厂里
            BaseFactory.getEgretFactory().addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(aniData));
            //把纹理集数据和图片添加到工厂里
            BaseFactory.getEgretFactory().addTextureAtlas(new dragonBones.EgretTextureAtlas(texImg,texData));
            //从工厂里创建出Armature
            this._armature = BaseFactory.getEgretFactory().buildArmature(this._armatureName);
            this._armature.display.x = this._armature.display.y = 0;
            
            this.initEvent();
            this.addChild(this._armature.display);
            //插槽替换资源

            dragonBones.WorldClock.clock.add(this._armature);

            if(this._frameRate){
                this.frameRate = this._frameRate;
            }
        }
        return this._armature;
    }
    gotoAndStop(name:string, frame:any):void{

    }
    gotoAndPlay(name:string, frame:any, playTimes?:number):void{

    }

    private prepareResource():Promise<any> {
        var aniData = RES.getRes(this._armatureName);
        var texData = RES.getRes(this._textureFile);
        var texImg = RES.getRes(this._textureImage);
        if( aniData && texData && texImg ) {
            return new Promise<any>((resolve,reject)=>{
                resolve();
            });
        }else {
            RES.createGroup(this._fileName,[this._armatureName,this._textureFile,this._textureImage]);
            return RES.loadGroup(this._fileName);
        }
    }

    initEvent():void {
        this._armature.addEventListener(dragonBones.EgretEvent.FRAME_EVENT,this.onFrame,this);
        this._armature.addEventListener(dragonBones.EgretEvent.COMPLETE,this.onComplete,this);
        this._armature.addEventListener(dragonBones.EgretEvent.LOOP_COMPLETE,this.onComplete,this);
    }
    private onFrame(e:dragonBones.EgretEvent):void {
        var ev = new MovieEvent(MovieEvent.FRAME_LABEL, e.frameLabel);
        this.dispatchEvent(ev);
    }

    private onComplete(e:dragonBones.EgretEvent):void {
        this.dispatchEvent(new MovieEvent(MovieEvent.COMPLETE));
    }

    private onAddToStage():void {

    }

    private onRemoveFromStage():void {

    }

    private _frameRate: number = null;
    get frameRate(): number {
        return this._frameRate;
    }
    set frameRate(val: number) {
        this._frameRate = val;
        if(this._armature){
            this._armature.clock.timeScale = this._frameRate / 24;
        }
    }

    dispose():void{

    }
}