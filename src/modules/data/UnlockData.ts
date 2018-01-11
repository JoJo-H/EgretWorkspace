///<reference path="../../core/supports/ProxyInfo.ts"/>
enum UnlockType {
    userLv = 1
}

class UnlockInfo {
    private _type:UnlockType;
	private _val:any;

	private _unlock:boolean;
	private _name:string;
    constructor(name:string, type:UnlockType, val:any){
        this._name = name;
		this._type = type;
        this._val = val;
        this._unlock = this.check();

        if(!this._unlock) {
            this.onListener();
        }
    }

    private _event : { dispose:()=>void};
    private onListener():void {
        switch(this._type) {
            case UnlockType.userLv:
                var userObj = PUser.getCache('i');
                var watch = eui.Binding.bindHandler(userObj, ['lv'], this.onEvent, this);
                this._event = {
                    dispose : ()=>{
                        watch.unwatch();
                    }
                };
                break;
        }
    }

    private onEvent():void {
        this._unlock = this.check();
        if(this._unlock) {
            this.unlistener();
        }
    }
    private unlistener() {
		if (this._sel) {
			this._sel.call(this._context);
		}
		if (this._event) {
            //白鹭的bug：需要推迟在下一帧；不然eui还是会执行该watch所绑定的方法，但是该方法已经释放，就会报错。
            egret.callLater(()=>{
                this._event.dispose();
                this._event = null;
            },this);
		}
	}

    private _sel:Function;
	private _context:Object;
    onUpdate(sel:Function,context:Object):void {
        this._sel = sel;
		this._context = context;
    }

    getName():string {
        return this._name;
    }

    getUnlockTip() :string{
		switch (this._type) {
			case UnlockType.userLv: 
				return '声望等级达到'+this._val+'级后开启';
        }
        return "";
    }
    
    get unlock() {
		return this._unlock;
    }
    
    private check():boolean {
        switch(this._type) {
            case UnlockType.userLv : 
                return PUser.getCache("i.lv") >= this._val;
        }
        return true;
    }
}

class UnlockData {

    private _userLv3 : UnlockInfo;
    private _userLv5 : UnlockInfo;
    private _userLv7 : UnlockInfo;
    private _userLv10 : UnlockInfo;
    private _userLv12 : UnlockInfo;
    private _userLv15 : UnlockInfo;
    // private _userLv20 : UnlockInfo; 
    private _userLv30 : UnlockInfo;
    private _userLv31 : UnlockInfo; // 轮盘10连
    // private _userLv17 : UnlockInfo;
    // private _userLv50 : UnlockInfo;

    constructor(){
        // meru.addNotification(meru.k.Cache("User.getInfo"),this.initData,this);
    }

    private hasProxyData ():boolean {
        return PUser.getCache("");
    }

    private initData():void {
        if(!this.hasProxyData()) {
            return;
        }
        // meru.removeNotificationByTarget(this);

        this._userLv3 = new UnlockInfo("userLv3",UnlockType.userLv,3);
        this.onUpdate(this._userLv3);

        this._userLv5 = new UnlockInfo("userLv5",UnlockType.userLv,5);
        this.onUpdate(this._userLv5);

        this._userLv7 = new UnlockInfo("userLv7",UnlockType.userLv,7);
        this.onUpdate(this._userLv7);

        this._userLv10 = new UnlockInfo("userLv10",UnlockType.userLv,10);
        this.onUpdate(this._userLv10);

        this._userLv12 = new UnlockInfo("userLv12",UnlockType.userLv,12);
        this.onUpdate(this._userLv12);

        this._userLv15 = new UnlockInfo("userLv15",UnlockType.userLv,15);
        this.onUpdate(this._userLv15);

        // this._userLv20 = new UnlockInfo("userLv20",UnlockType.userLv,20);
        // this.onUpdate(this._userLv20);

        this._userLv30 = new UnlockInfo("userLv30",UnlockType.userLv,30);
        this.onUpdate(this._userLv30);

        this._userLv31 = new UnlockInfo("userLv31",UnlockType.userLv,31);
        this.onUpdate(this._userLv31);

        // this._userLv17 = new UnlockInfo("userLv17",UnlockType.userLv,17);
        // this.onUpdate(this._userLv17);

        // this._userLv50 = new UnlockInfo("userLv50",UnlockType.userLv,50);
        // this.onUpdate(this._userLv50);
    }

    private onUpdate(info:UnlockInfo):void {
        info.onUpdate( ()=>{
            Tools.propertyChange(this,info.getName());
        },this);
    }

    getUnlockTip(name:string):string {
		var info = this['_' + name];
		return info.getUnlockTip();
	}

    get userLv3():boolean {
        return this._userLv3.unlock;
    }
    get userLv5():boolean {
        return this._userLv5.unlock;
    }
    get userLv7():boolean {
        return this._userLv7.unlock;
    }
    get userLv10():boolean {
        return this._userLv10.unlock;
    }
    get userLv12():boolean {
        return this._userLv12.unlock;
    }
    get userLv15():boolean {
        return this._userLv15.unlock;
    }
    get userLv30():boolean {
        return this._userLv30.unlock;
    }
    get userLv31():boolean {
        return this._userLv31.unlock;
    }
    // get userLv17():boolean {
    //     return this._userLv17.unlock;
    // }
    // get userLv20():boolean {
    //     return this._userLv20.unlock;
    // }
    // get userLv50():boolean {
    //     return this._userLv50.unlock;
    // }




}
