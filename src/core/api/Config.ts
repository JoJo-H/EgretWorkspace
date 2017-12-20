
class Config {

    private _configMap : Map<string,any> = new Map();

    getConfig<T>(name:string,key:string,defaultValue:T):T{
        let json = this.getJson(name);
        if(key == null) {
            return json || defaultValue;
        }
        var ret = defaultValue;
        if(json) {
            ret = obj.getValue(json, key, defaultValue);
        }
        return ret;
    }

    /**
     * 预先加载好zip
     * @param name name格式 xxx_json
     */
    private getJson(name:string):any {
        if(this._configMap.has(name)) {
            return this._configMap.get(name);
        }
        let json : any = null;
        if(this._zip) {
            let fileName = name.split('_').join('.');
            json = this._zip.file(fileName);
            if(json) {
                this._configMap.set(name,JSON.parse(json.asText()));
                return this._configMap.get(name);
            }
        }
        json = RES.getRes(name);
        if(json) {
            this._configMap.set(name,json);
        }
        return this._configMap.get(name);
    }

    exists(name:string, key:string):boolean {
        if (!this._configMap.has(name)) {
            var data = RES.getRes(name);
            if (data) {
                this._configMap.set(name,data);
            }
        }
        if (this._configMap.has(name)) {
            if (obj.hasValue(this._configMap[name], key)) {
                return true;
            }
        }
        return false;
    }

    static get(name:string,key:string=null,defaultValue:any = null):any{
        return App.Config.getConfig(name,key,defaultValue);
    }

    static exists(name:string, key:string):boolean {
        return App.Config.exists(name, key);
    }



    private _zip : JSZip ;
    loadZip():Promise<any> {
        if(this._zip) return Promise.resolve();
        return new Promise<any>((resolve,reject)=>{
            var r = RES.getResourceInfo('assets/config/tempJsons.zip');
            console.log(r);
            RES.getResByUrl("resource/"+r.url,(data)=>{
                //解压数据
                this._zip = new JSZip(data);
                resolve();
            },this,RES.ResourceItem.TYPE_BIN);
        })
    }

    static loadZip():Promise<any>{
        return App.Config.loadZip();
    }
    static getZip():JSZip {
        return App.Config._zip;
    }
}