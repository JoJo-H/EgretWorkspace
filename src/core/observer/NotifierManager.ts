

class NotifierManager {

    private _observerMap : any = {};
    constructor(){

    }

    addNotification(notifyName:string,notifyMethod:Function,context:any, priority:number = 0):void {
        this.registerObserver(notifyName,new Observer(notifyMethod,context,priority));
    }

    private registerObserver(notifyName:string,observer:IObserver):void {
        let observers : IObserver[] = this._observerMap[notifyName];
        if( observers && observers.length > 0 ){
            if(!this.checkObserver(notifyName,observer.getNotifyContext())){
                observers.push(observer);
                observers.sort((a:IObserver,b:IObserver)=>{
                    return b.getPriority() - a.getPriority();
                });
            }else{
                console.warn('registerObserver重复注册:',notifyName)
            }
        }else{
            this._observerMap[notifyName] = [observer];
        }
    }
    private checkObserver(notifyName:string,context:any):boolean {
        let observers : IObserver[] = this._observerMap[notifyName];
        let len = observers.length;
        for( let i = 0 ; i < len ; i++ ) {
            let observer = observers[i];
            if(observer.compareNotifyContext(context)){
                return true;
            }
        }
        return false;
    }


    sendNotification(notifyName:string,body:any=null,type:any=null):void{
        this.notifyObservers(new NotificationOption(notifyName,body,type));
    }

    private notifyObservers(notification:INotificationOption):void {
        let notifyName : string = notification.getName();
        let observers : IObserver[] = this._observerMap[notifyName];
        if(observers){
            //copy
            let observersRef = observers.slice(0);
            let len = observersRef.length;
            for( let i = 0 ; i < len ; i++ ) {
                let observer = observersRef[i];
                observer.notifyObserver(notification);
            }
        }
    }

    removeNotification(notifyName:string,context:any):void{
        this.removeObserver(notifyName,context);
    }

    removeNotificationByName(notifyName:string):void{
        this.removeObserverByName(notifyName);
    }

    removeNotificationByContext(context:any):void{
        this.removeObserverByContext(context);
    }

    private removeObserver(notifyName:string,context:any):void{
        let observers : IObserver[] = this._observerMap[notifyName];
        if(observers){
            let i = observers.length;
            while(i --){
                let observer = observers[i];
                if(observer.compareNotifyContext(context)){
                    observers.splice(i,1);
                    break;
                }
            }
        }
    }

    private removeObserverByName(notifyName:string):void{
        this._observerMap[notifyName] = [];
    }
    
    private removeObserverByContext(context:any):void{
        for(let notifyName in this._observerMap){
            this.removeObserver(notifyName,context);
        }
    }
}