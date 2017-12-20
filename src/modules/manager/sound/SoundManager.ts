
class SoundManager {

    private _bg : SoundBg;
    private _effect : SoundEffect;

    private _curBgSoundName : string;
    //是否开启背景音乐
    private _openBg : boolean = true;
    private _effectOn = true;

    private _bgVolume:number;
    private _effectVolume:number;
    constructor(){

        this._bgVolume = 0.5;
        this._effectVolume = 0.5;

        this._bg = new SoundBg();
        this._bg.volume = this._bgVolume;

        this._effect = new SoundEffect();
        this._effect.volume = this._effectVolume;
    }

    public playBg(name:string):void {
        this._curBgSoundName = name;
        if(!this._openBg){
            return;
        }
        this._bg.play(name);
    }

    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    public setBgOn($isOn:boolean):void {
        this._openBg = $isOn;
        if (!this._openBg) {
            this.stopBg();
        } else {
            if (this._curBgSoundName) {
                this.playBg(this._curBgSoundName);
            }
        }
    }
    public switchBgOpenOrnot():void {
        this.setBgOn(!this.isOpenBg);
    }

    public stopBg():void {
        this._bg.stop();
    }
    public get isOpenBg():boolean {
        return this._openBg;
    }

    public setBgVolume(volume:number):void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this._bgVolume = volume;
        this._bg.setVolume(this._bgVolume);
    }
    public getBgVolume():number {
        return this._bgVolume;
    }


    /**
     * 播放音效
     * @param effectName
     */
    public playEffect(effectName:string):void {
        if (!this._effectOn)
            return;

        this._effect.play(effectName);
    }
    /**
     * 设置音效是否开启
     * @param $isOn
     */
    public setEffectOn($isOn:boolean):void {
        this._effectOn = $isOn;
    }
    /**
     * 设置音效音量
     * @param volume
     */
    public setEffectVolume(volume:number):void {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this._effectVolume = volume;
        this._effect.setVolume(this._effectVolume);
    }
    public getEffectVolume():number {
        return this._effectVolume;
    }
}