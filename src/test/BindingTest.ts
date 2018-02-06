

class BindingTest {

    public host : any;
    public watcher : Watcher[] = [];
    public target : any = {};
    constructor(){
        this.host = {base:{baseId:5,user:{nm:'watcher',sex:1}},id:'10001'};
    }

    public init():void {
        this.watcher.push(Binding.bindHandler(this.host,['id'],(value)=>{
            this.update('id',value);
        },this));
        this.watcher.push(Binding.bindHandler(this.host,['base','baseId'],(value)=>{
            this.update('base.baseId',value);
        },this));
        this.watcher.push(Binding.bindHandler(this.host,['base','user','sex'],(value)=>{
            this.update('base.user.sex',value);
        },this));
    }
    public init2():void {
        this.watcher.push(Binding.bindProperty(this.host,['id'],this.target,'id'));
        this.watcher.push(Binding.bindProperty(this.host,['base','baseId'],this.target,'baseId'));
        this.watcher.push(Binding.bindProperty(this.host,['base','user','sex'],this.target,'sex'));
    }

    private update(property:string,value:any):void {
        console.log('property:'+property,'value:'+value);
    }
}