

class Game2048Data extends egret.EventDispatcher{

    private static _instance : Game2048Data;
    public bestScore : number = 0;
    public curScore : number = 0;
    constructor(){
        super();
        let value : string = localStorage.getItem("Game2048Data.bestScore") ? localStorage.getItem("Game2048Data.bestScore") : "0";
        this.bestScore = parseInt(value);
    }

    get desc():string {
        return "合并数字直到出现2048甚至更高";
    }
}