
class ListenerMediator extends puremvc.Mediator implements puremvc.IMediator{
    
        public static NAME:string = "ListenerMediator";
        public static PROXY_RESPONSE : string = "PROXY_RESPONSE";
        public static PROXY_REQUEST : string = "PROXY_REQUEST";
        public static PROXY_TIMEOUT : string = "PROXY_TIMEOUT";
        public static PROXY_RESPONSE_SUCCEED : string = "PROXY_RESPONSE_SUCCEED";
        public static PROXY_REQUEST_ERROR : string = "PROXY_REQUEST_ERROR";
        public static PROXY_RESPONSE_ERROR : string = "PROXY_RESPONSE_ERROR";
        public static PROXY_MULTI_RESPONSE_ERROR : string = "PROXY_MULTI_RESPONSE_ERROR";

        constructor(viewComponet?:any){
            super(ListenerMediator.NAME,viewComponet);
        }
    
        listNotificationInterests():any[] {
            super.listNotificationInterests();
            return [ListenerMediator.PROXY_RESPONSE_SUCCEED,ListenerMediator.PROXY_REQUEST_ERROR,ListenerMediator.PROXY_RESPONSE_ERROR,
                ListenerMediator.PROXY_MULTI_RESPONSE_ERROR];
        }
    
        handleNotification(notification : puremvc.INotification) : void {
            var notiData : any = notification.getBody();
            super.handleNotification(notification);
                switch(notification.getName()){
                    case ListenerMediator.PROXY_RESPONSE_SUCCEED :
                        if(notiData instanceof BaseProxy) {
                            let data = notiData.responseData;
                            ProxyCache.setCache(notiData);
                            if (data.hasOwnProperty('c')) {
                                ProxyUpdate.instance.update(notiData,ProxyCache.getCache());
                            }
                        }
                        break;
                    case ListenerMediator.PROXY_REQUEST_ERROR :
                        break;
                    case ListenerMediator.PROXY_RESPONSE_ERROR :
                        this.responseError(notiData);
                        break;
                    case ListenerMediator.PROXY_MULTI_RESPONSE_ERROR :
                        break;
                }
        }

        private requestError(proxy:BaseProxy):void {
            this.checkReload(proxy);
        }

        private responseError(proxy:BaseProxy):void {
            this.showMessage(proxy);
        }

        private showMessage(proxy:BaseProxy):void {
            var callback = new ListenerCallback();
            if (callback) {
                // callback.doError(proxy);
            }
        }

        private multiResponseError(proxy:BaseProxy):void {
            this.removeSimpleLoading(proxy);
            this.checkReload(proxy);
        }

        private checkReload(proxy:BaseProxy):void {
            if (proxy.getParamByName('notReload') == true) {
                this.removeSimpleLoading(proxy);
                return;
            }

            if(proxy["reloadTimes"] >= 3) {
                // var callback = getSetting().ListenerCallback;
                // if (callback) {
                //     callback.reloadError(proxy);
                // }
                return;
            }
            if (!proxy['reloadTimes']) {
                proxy['reloadTimes'] = 0;
            }
            proxy['reloadTimes'] += 1;
            this.removeSimpleLoading(proxy);

            var prompt:any = '通用.重新请求';
            // if(andes.prompt) {
            //     if (!andes.prompt.has(prompt)) {
            //         prompt = {
            //             text: "网络环境不稳定\n请确保网络连接正常，然后重试\n错误码({code})",
            //             yes: '重试',
            //             type: 'confirm',
            //             no: '',
            //             close: false
            //         };
            //     }

            //     andes.prompt.show(prompt, {
            //         code: proxy.errorCode
            //     }).then(() => {
            //         proxy.load();
            //     });
            // }
        }

        private removeSimpleLoading(proxy:BaseProxy):void {

        }
    
    }