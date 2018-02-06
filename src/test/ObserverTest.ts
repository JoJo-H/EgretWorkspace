

class ObserverTest {

    constructor(){
        App.NotifierManager.addNotification('TEST1',this.test1,this);
        App.NotifierManager.addNotification('TEST1',this.test12,this);
    }

    post():void{
        App.NotifierManager.sendNotification('TEST1');
    }
    remove():void{
        App.NotifierManager.removeNotification('TEST1',this);
    }

    private test1(data:any):void{
        console.log('test1',data);
    }

    private test12(data:any):void{
        console.log('test12',data);
    }
}