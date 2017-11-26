

class SeverEvent extends egret.Event{

    public static DATA_CHANGE : string = "DATA_CHANGE";
    private _responseData : any;
    private _moddo : string;

    public constructor(type: string, moddo:string, bubbles?: boolean, cancelable?: boolean) {
        super(type, bubbles, cancelable);

    }
}