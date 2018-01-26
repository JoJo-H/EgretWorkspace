//资源验证，是否合法
//验证default.res.json 中的资源配置格式是否合法
class ResValidateTool {

    public resJson;
    constructor(){
        RES.getResByUrl('resource/default.res.json',(result)=>{
            this.resJson = result;
        },this,RES.ResourceItem.TYPE_JSON);
    }

    valid():void{
        if(!this.resJson){
            console.log('json初始化未完成,稍后重新调用')
            return;
        }
        this.findRepeat();
        this.findDifference();
        this.findSheetResRepeat();
        this.matchGroupRes();
        this.findPreload();
    }

    //查看是否有重复资源配置
    findRepeat():void{
        let tempList = [];
        let resList = this.resJson.resources;
        for(let val of resList) {
            if(tempList.indexOf(val.url) != -1) {
                console.log('资源重复：',val.name);
            }else{
                tempList.push(val.url);
            }
        }
    }
    //查看资源名称与url是否不匹配,不验证sound类型
    findDifference():void{
        let resList = this.resJson.resources;
        for(let val of resList) {
            if(val.type == 'sound') continue;
            let index = val.url.lastIndexOf('/') + 1;
            let urlName = val.url.slice(index).replace('.','_');
            if(urlName != val.name){
                console.log('资源不匹配：',val.url,val,name);
            }
        }
    }
    //查看多个图集中是否有重复子资源存在
    findSheetResRepeat():void{
        let tempList = [];
        let groups = this.resJson.groups;
        for(let group of groups){
            if(group.name.indexOf('sheet')!=-1){
                let keys = group.keys.split(',');
                for(let key of keys){
                    if(tempList.indexOf(key)!=-1){
                        console.log('sheet中存在相同的子资源',group.name,key);
                    }else{
                        tempList.push(key);
                    }
                }
            }
        }
    }

    //匹配group中的子资源是否存在
    matchGroupRes():void{
        let groups = this.resJson.groups;
        let resList = this.resJson.resources;
        let resMap = {};
        for(let val of resList){
            resMap[val.name] = val;
        }
        for(let group of groups){
            let name = group.name;
            let keys = group.keys;
            let keysList = keys.split(',');
            console.log('检测开始 ------- ',name);
            for(let name of keysList){
                if(!resMap[name]) {
                    console.log('不存在',name);
                }
            }
            console.log('检测结束 ------- ',name);
        }
    }

    //第一次调用加载全部资源吗，加载完成后再调用，查看是否有资源已删除，但是配置未删除的情况
    loadAll():void{
        let resList = this.resJson.resources;
        for(let val of resList) {
            let data = RES.getRes(val.name);
            if(!data){
                console.log('获取资源--',val.name);
                RES.getResAsync(val.name, ()=>{
                    console.log('存在',val.name);
                }, this);
            }
        }
    }

    /**
     * 列出preload,loading中含有哪个sheet的子资源
     * 参数preload表示preload名称可以传递
     */
    findPreload(preload='preload'):void{
        if(!this.resJson){
            console.log('json初始化未完成,稍后重新调用')
            return;
        }
        let groups = this.resJson.groups;
        let preloadList = [];
        let loadList = [];
        groups.forEach((group)=>{
            if(group.name == preload){
                preloadList = group.keys.split(',');
            }else if(group.name == 'loading'){
                loadList = group.keys.split(',');
            }
        });
        for(let group of groups){
            if(group.name.indexOf('sheet')!=-1){
                let keys = group.keys.split(',');
                for(let key of keys){
                    if(preloadList.indexOf(key)!=-1){
                        console.log('preload组中含有',group.name,'的资源：',key);
                    }
                    if(loadList.indexOf(key)!=-1){
                        console.log('loading组中含有',group.name,'的资源：',key);
                    }
                }
            }
        }
        for(let key of preloadList){
            if(loadList.indexOf(key)!=-1){
                console.log('preload组中含有loading组的资源：',key);
            }
        }
    }

    prepareRes():Promise<any>{
        return new Promise<any>((resolve,reject)=>{
            if(RES.getRes('resource/default.res.json')){
                resolve();
            }else{
                RES.getResByUrl('resource/default.res.json',(result)=>{
                    this.resJson = result;
                    resolve();
                },this,RES.ResourceItem.TYPE_JSON);
            }
        });
    }
}