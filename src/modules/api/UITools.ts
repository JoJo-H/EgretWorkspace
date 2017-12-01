class UITools {

    constructor(){

    }

    private _tooltip:ITooltip;
    getTooltip():ITooltip {
        if (!this._tooltip) {
            this._tooltip = Tools.getDefinitionInstance<ITooltip>(App.GlobalData.GameConfig.TooltipClass,Tooltip);
            if (this._tooltip) {
                App.UI.addTooltip(this._tooltip);
            }
            if (DEBUG && !this._tooltip) {
                console.error("请配置TooltipClass");
            }
        }
        return this._tooltip;
    }
    /**
     * 显示浮动提示
     * @param info 浮动提示参数
     */
    tooltip(info:TooltipInfo|string, skinName?:string):void {
        var tip = this.getTooltip();
        if (tip) {
            tip.show(info, skinName);
        }
    }

    private _loading:ISimpleLoading;
    getSimpleLoading():ISimpleLoading {
        if (!this._loading) {
            this._loading = Tools.getDefinitionInstance<ISimpleLoading>(App.GlobalData.GameConfig.SimpleLoadingClass, null);
            if (DEBUG && !this._loading) {
                console.error("请配置SimpleLoadingClass");
            }
            if (this._loading) {
                App.UI.addTooltip(this._loading);
            }
        }
        return this._loading;
    }
    /**
     * 显示简单载入条
     */
    showSimpleLoading():void {
        var loading = this.getSimpleLoading();
        if (loading) {
            loading.show();
        }
    }
    /**
     * 隐藏简单载入条
     */
    hideSimpleLoading():void {
        var loading = this.getSimpleLoading();
        if (loading) {
            loading.hide();
        }
    }

    /**
     * 弹窗动画 -- 弹出放大
     * @param host
     * @returns {meru.BaseComponent}
     */
    static openTweenPanel(host:BaseComponent):BaseComponent {
        //设置锚点
        host.anchorOffsetX = host.width >> 1;
        host.anchorOffsetY = host.height >> 1;
        host.x = host.width >> 1;
        host.y = host.height >> 1;

        host.scaleY = host.scaleX = 0.8;
        host.alpha = 0.5;
        egret.Tween.get(host).to({scaleX:1,scaleY:1,alpha:1},200).call( ()=>{
            egret.Tween.removeTweens(host);
        });
        return host;
    }

    // static openConfirmPanel(title:string,desc:string,data?:any):Promise<any> {
    //     if(data) {
    //         data['title'] = title;
    //         data['desc'] = desc;
    //     }
    //     var obj = data ? data : {data:data,desc:desc,title:title};
    //     return new Promise( (resolve,reject)=>{
    //         var panel = UITools.openTweenPanel(App.UI.addBox("CurrencySkin"))
    //             .setData(obj)
    //             .addOperate(new andes.operates.NotificationOperate("COMMON_CONFIRM",(data,host)=>{
    //                 App.UI.remove(host);
    //                 obj["message"] = "confirm";
    //                 resolve(obj);
    //             }))
    //             .addOperate(new andes.operates.NotificationOperate("COMMON_CANCEL",(data,host)=>{
    //                 App.UI.remove(host);
    //                 obj["message"] = "cancel";
    //                 resolve(obj);
    //             }));
    //     });
    // }

    /**
     * 打开界面时资源加载
     * @param groupName 组名
     */
    static onLoadingGroup(groupName:string):Promise<any>{
        if(!groupName || groupName=="") return Promise.resolve();
        var that = this;
        var resolveFun : Function;
        var rejectFun : Function;
        var comp : BaseComponent;
        function onGroupComplete(event:RES.ResourceEvent):void {
            if (event.groupName == groupName) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onGroupComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onGroupLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onGroupProgress, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onItemLoadError, this);
                that.hideLoading();
                resolveFun("success");
            }
            console.log("Group:"+event.groupName + " load is complete");
        }
        function onGroupProgress(event:RES.ResourceEvent):void {
            console.log("Group:"+groupName,event.itemsLoaded, event.itemsTotal);
        }
        function onGroupLoadError(event:RES.ResourceEvent):void {
            console.warn("Group:" + event.groupName + " has failed to load");
            onGroupComplete(event);
        }
        function onItemLoadError(event:RES.ResourceEvent):void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }
        return new Promise( (resolve,reject)=>{
            resolveFun = resolve;
            rejectFun = reject;
            this.showLoading();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,onGroupComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,onGroupProgress,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,onGroupLoadError,this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,onItemLoadError,this);
            RES.loadGroup(groupName);
        });
    }

    private static _loading : SimpleLoading;
    private static _loadingCount : number = 0;
    private static showLoading():void {
        if (this._loadingCount == 0) {
            App.UITools.showSimpleLoading();
        }
        this._loadingCount ++;
    }
    private static hideLoading():void {
        if(this._loadingCount == 0) {
            return;
        }
        if(this._loadingCount > 0) {
            this._loadingCount --;
        }
        if(this._loadingCount == 0) {
            App.UITools.hideSimpleLoading()
        }
    }


    static showScroolTooltip(info:IScrollTooltipInfo,endV):void {
        var tip : BaseComponent = App.UI.addTooltip(ScrollTooltip,info);
        if (!info.hasOwnProperty('text')) {
			info.text = "";
        }
        //框架上display.setFullDisplay(tooltipInst);设置了该组件的宽高，就不能对该组件禁止缩放；可以skin设置或者对组件内部ui进行缩放
        egret.Tween.get(tip).to( {y:tip.y+(info.offsetY || 0),x:tip.x+(info.offsetX || 0)} ,200 ).call(()=>{
            egret.Tween.get(tip).to( {value:endV} ,1000 ).call(()=>{
                egret.Tween.removeTweens(tip);
                display.removeFromParent(tip);
            });
        });
    }
    
}