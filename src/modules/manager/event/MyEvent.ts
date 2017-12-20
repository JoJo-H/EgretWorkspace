

class MyEvent extends egret.Event{
    private _data : any;
		constructor(type : string,data?:any, bubbles : boolean = false, cancelable : boolean = false) {
			super(type,bubbles,cancelable,data);
			this._data = data;
		}

		public get data() : any {
			return this._data;
		}

		public set data(data : any) {CustomEvent
			this._data = data;
		}

		clone(obj?:any):MyEvent {
			return new MyEvent(this.type,obj?obj:this.data,this.bubbles,this.cancelable);
		}
}
