
enum MovieType {
    DRAGON ,
    DBFAST ,
    MOVIECLIP ,
    SEQUNCE_MOVIE

}

interface IMovie extends egret.DisplayObject {
    play(name: string, playTimes?: number): void;
    gotoAndStop(name:string, frame:any):void;
    gotoAndPlay(name:string, frame:any, playTimes?:number):void;
    dispose():void;
    /**
     * 动画是否停留在最后
     */
    atLast: boolean;
    frameRate: number;
    /**
     * 是否缓存进对象池
     */
    isCache:boolean;
}

class BaseFactory {

    constructor(){
        
    }

    private static _egretFactory;
    public static getEgretFactory():dragonBones.EgretFactory{
        if(!this._egretFactory) {
            this._egretFactory = new dragonBones.EgretFactory();
        }
        return this._egretFactory;
    }

    static create(path:string,type:MovieType,armatur?:string):IMovie{
        var arr = path.split("/");
        var fileName = arr[arr.length - 1];
        var movie : any;
        switch(type) {
            case MovieType.DRAGON :
                break;
            case MovieType.DBFAST :
                movie = new DBFaseMovie();
                movie.setPath(path);
                break;
            case MovieType.MOVIECLIP :
                break;
            default :
                break;
        }
        return movie;
    }

    static getFilenameWithoutExt(path: string): string {
        var arr = path.split('/');
        var filename = arr[arr.length - 1];
        arr = filename.split('.');
        return arr[0];
    }
}


class MovieEvent extends egret.Event {
    static FRAME_LABEL: string = "Frame_Label";
    static LOOP_COMPLETE: string = "Loop_Complete";
    static COMPLETE: string = "Complete";

    constructor(name: string, label: string = null) {
        super(name);
        this._frameLabel = label;
    }

    private _frameLabel: string;
    get frameLabel(): string {
        return this._frameLabel;
    }
}