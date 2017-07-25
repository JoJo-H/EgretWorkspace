

class MyCustomEvent extends egret.Event{
    private _data : Object;
		constructor(type : string,data?:any, bubbles : boolean = false, cancelable : boolean = false) {
			super(type,bubbles,cancelable,data);
			this._data = data;
		}

		public get data() : any {
			return this._data;
		}

		public set data(data : any) {
			this._data = data;
		}
}