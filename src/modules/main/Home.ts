

class Home extends BaseComponent {

    constructor(){
        super();
        this.skinName = "HomeSkin";
    }

    onEnter():void {
        super.onEnter();
        // BaseFactory.playAnim({container:this,actionName:"Walk",scaleX:0.5,scaleY:0.5,offsetX:100,onComplete:()=>{
        //     console.log("添加机器人Walk成功!");
        // }},"robot","robot");
        // BaseFactory.playAnim({container:this,actionName:"Run",scaleX:0.5,scaleY:0.5,offsetX:-100,onComplete:()=>{
        //     console.log("添加机器人Run成功!");
        // }},"robot","robot");
        // BaseFactory.playAnim({container:this,actionName:"Standby",scaleX:0.5,scaleY:0.5,offsetY:-100,onComplete:()=>{
        //     console.log("添加机器人Standby成功!");
        // }},"robot","robot");
    }

    onExit():void {
        super.onExit();
    }
}