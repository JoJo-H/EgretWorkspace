


class LightButton extends BaseButton {

    constructor(){
        super();
        //因为皮肤被实例化的时候，相关的业务逻辑依赖并没有初始化完全，容易产生报错。
        //在这里调用playAnimation会报错，
    }
    
    onEnter():void {
        super.onEnter();
        this.playAnimation();
    }

    private playAnimation():void {
        var mcSX : number = this.width / 235;
        var mcSY : number = this.height / 108;
        BaseFactory.fast({scaleX:mcSX,scaleY:mcSY,container:this,onComplete:()=>{
            console.log("添加动画成功!");
        }},"lightbutton2_ske.dbmv");
    }
}