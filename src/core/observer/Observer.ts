
//实现观察者模式
class Observer implements IObserver{

    private notify : Function = null;
    private context : any = null;

    constructor(notifyMethod:Function,notifyContext:any){
        this.setNotifyMethod(notifyMethod);
        this.setNotifyContext(notifyContext);
    }

    getNotifyMethod():Function
    {
        return this.notify;
    }

    setNotifyMethod( notifyMethod:Function ):void
    {
        this.notify = notifyMethod;
    }
    
    getNotifyContext():any
    {
        return this.context;
    }
        
    setNotifyContext( notifyContext:any ):void
    {
        this.context = notifyContext;
    }

    notifyObserver(notification:INotificationOption):void{
        this.getNotifyMethod().call(this.context,notification);
    }

    compareNotifyContext(object:any):boolean {
        return this.context == object;
    }
}


interface IObserver
{
    getNotifyMethod():void;
    setNotifyMethod( notifyMethod:Function ):void;
    getNotifyContext():void;
    setNotifyContext( notifyContext:any ):void;
    notifyObserver( notification:INotificationOption ):void;
    compareNotifyContext( object:any ):boolean;
}