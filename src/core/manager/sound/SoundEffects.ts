

class SoundEffect  extends BaseSound{

    private _volume : number = 0;
    constructor(){
        super();
    }

    play(effectName:string):void {
        this.prepareSound(effectName).then(()=>{
            var sound:egret.Sound = RES.getRes(effectName);
            var channel:egret.SoundChannel = sound.play(0, 1);
            channel.volume = this._volume;
        });
    }

    public setVolume(volume:number):void {
        if( this._volume == volume ) return;
        this._volume = volume;
    }

    get volume():number {
        return this._volume;
    }
    set volume(val) {
        this._volume = val;
    }
}