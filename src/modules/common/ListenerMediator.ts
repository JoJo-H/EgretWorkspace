
class ListenerMediator extends puremvc.Mediator implements puremvc.IMediator{
    
        public static NAME:string = "ListenerMediator";
        public static ResponseSucceed : string = "ResponseSucceed";

        constructor(viewComponet?:any){
            super(ListenerMediator.NAME,viewComponet);
        }
    
        listNotificationInterests():any[] {
            super.listNotificationInterests();
            return [ListenerMediator.ResponseSucceed];
        }
    
        handleNotification(notification : puremvc.INotification) : void {
            var notiData : any = notification.getBody();
            super.handleNotification(notification);
                switch(notification.getName()){
                    case ListenerMediator.ResponseSucceed :
                        if(notiData instanceof BaseProxy) {
                            let data = notiData.responseData;
                            ProxyCache.setCache(notiData);
                            if (data.hasOwnProperty('c')) {
                                ProxyUpdate.instance.update(notiData,ProxyCache.getCache());
                            }
                        }
                        break;
                }
        }
    
    }