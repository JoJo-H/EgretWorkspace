
class SoundBg extends BaseSound{

    private _curBg:string;  //当前背景音乐名称
    private _curSoundChannel : egret.SoundChannel; // 当前背景音乐频道
    private _curSound:egret.Sound;
    private _volume : number = 0;
    constructor(){
        super();
        this._curBg = "";
    }

    play(name:string):void {
        if (this._curBg == name) {
            return;
        }
        this.stop();
        //网络慢会出现延迟,可以预先加载好
        this.prepareSound(name).then(()=>{
            if(!this._curSound) {
                this._curBg = name;
                this._curSound = RES.getRes(name);
                this._curSoundChannel = this._curSound.play(0, 0);
                this._curSoundChannel.volume = this._volume;
                //是否需要播放完成后操作 egret.SoundChannel可以监听egret.Event.SOUND_COMPLETE
            }
        });
    }

    /**
     * 停止当前音乐
     */
    public stop():void {
        if (this._curSoundChannel) {
            this._curSoundChannel.stop();
        }
        this._curSoundChannel = null;
        this._curSound = null;
        this._curBg = "";
    }

    /**
     * 设置音量
     * @param volume
     */
    public setVolume(volume:number):void {
        if( this._volume == volume ) return;
        this._volume = volume;
        if (this._curSoundChannel) {
            this._curSoundChannel.volume = this._volume;
        }
    }
    get volume():number {
        return this._volume;
    }
    set volume(val) {
        this._volume = val;
    }
}