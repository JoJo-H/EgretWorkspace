

class Game2048View extends BaseComponent {

    public btnStart : eui.Button;
    public gamePanel : eui.Group;


    private grids = new Array<GridItem>(16);
    private gridSpacing: number = 20;
    private gamePanelRadius: number = 16;
    private gridRadius: number = 12;
    private gridSize: number;
    private isGameOver = false;

    constructor(){
        super();
        this.skinName = "Game2048Skin";
    }

    onEnter(args):void {
        super.onEnter(args);
        this.setData(Game2048Data.getInstance());
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);

        this.gridSize = (this.gamePanel.width - this.gridSpacing*5) / 4;

        let gamePanelBg = this.createRadiusSquare(0, 0, this.gamePanel.width, this.gamePanelRadius, 0xbbada0, 1);
        this.gamePanel.addChild(gamePanelBg);

        for(var i : number = 0 ; i < 16 ; i++) {
            let row = parseInt("" + i/4);
            let col = parseInt("" + i%4);
            let gx = this.gridSpacing + (this.gridSpacing+this.gridSize)*row;
            let gy = this.gridSpacing + (this.gridSpacing+this.gridSize)*col;
            this.gamePanel.addChild(this.createRadiusSquare(gx,gy,this.gridSize,this.gridRadius, 0xeee4da, 0.35))
        }

        this.gamePanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onGamePanelTouchBegin,this);
        document.addEventListener("keyup", this.onKeyup);
        this.newGame();
    }

    private createRadiusSquare(x: number, y: number, size: number, radius: number, color: number, alpha: number){
        let rect = new eui.Rect(size, size, color);
        rect.x = x;
        rect.y = y;
        rect.alpha = alpha;
        rect.ellipseWidth = radius;
        rect.ellipseHeight = radius;
        return rect;
    }

    private onGamePanelTouchBegin(event: egret.TouchEvent):void {
        let target = event.currentTarget;
        target.touchX = event.stageX;
        target.touchY = event.stageY;
        this.gamePanel.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onGamePanelTouchMove,this);
    }

    private onGamePanelTouchMove(event: egret.TouchEvent) { 
        let target = event.currentTarget;
        let deltaX = event.stageX - target.touchX;
        let deltaY = event.stageY - target.touchY;
        if(Math.abs( deltaX - deltaY) <= 40) {
            // 需要拖动到一定的距离，才确定方向。 距离太短，忽略不计
            return;
        }
        // x方向距离比较大，则向左或右 ； 否则向上或向下
        if( Math.abs(deltaX) > Math.abs(deltaY) ) {
            if(deltaX < 0) {
                this.leftMerge();
            }else {
                this.rightMerge();
            }
        }else {
            if(deltaY < 0){
                this.upMerge();
            }else {
                this.downMerge();
            }
        }
        this.gamePanel.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onGamePanelTouchMove,this);
    }

    private leftMerge() {
        this.merge(0, 4, 1);
    }

    private rightMerge() {
        this.merge(3, 4, -1);
    }

    private upMerge() {
        this.merge(0, 1, 4);
    }

    private downMerge() {
        this.merge(12, 1, -4);
    }

    /**
     * 合并
     * @param from 起始位置
     * @param fromDelta 不同起始位置的位置间隔 比如向下滑动，起始 为 12,13,14,15，该值为1
     * @param nextDelta 上一个与下一个方块相差的格子数 
     */
    private merge(from: number, fromDelta: number, nextDelta: number) {
        for(var i : number = 0 ; i < 4 ; i ++ ) {
            let posIdx : number = from;
            let fromEnd : number = from + nextDelta * 3;
            let min : number = Math.min(from,fromEnd);
            let max : number = Math.max(from,fromEnd);
            while( posIdx >= min && posIdx <= max ) {
                let curGrid = this.grids[posIdx];
                if(curGrid){
                    curGrid["isMerged"] = false;

                    let reachable = this.findReachablePosIndex(posIdx,nextDelta,min,max);
                    if( reachable != -1 ) {
                        let row : number = parseInt(""+ reachable / 4);
                        let col : number = parseInt(""+ reachable % 4);
                        let goX = this.gridSpacing + (this.gridSpacing+this.gridSize) * col;
                        let goY = this.gridSpacing + (this.gridSize+this.gridSpacing) * row;
                        let time = Math.abs( (goX-curGrid.rect.x) + (goY-curGrid.rect.y) ) / ( this.gridSize + this.gridSpacing) * 80;

                        let last = this.grids[reachable];
                        // 该格子是否存在数字
                        if(last) {
                            if(this.gamePanel.getChildIndex(curGrid.rect) < this.gamePanel.getChildIndex(last.rect)){
                                this.gamePanel.swapChildren(curGrid.rect,last.rect);
                            }
                            this.grids[posIdx] = null;
                            last["isMerged"] = true;
                            // 分数翻倍 -- 目的格子 延迟 渲染 分数
                            last.change(time+50,this.nums[this.getNumIndex(last.num)+1],this.animateState)
                            curGrid.moveToAndFadeOut(goX,goY,time,this.animateState,()=>{
                                this.gamePanel.removeChild(curGrid.rect);
                            });
                        }else {
                            this.grids[reachable] = curGrid;
                            this.grids[posIdx] = null;
                            // 当前格子 缓动 移动到空格子
                            curGrid.moveTo(goX,goY,time,this.animateState);
                        }
                    }
                }
                posIdx += nextDelta;
            }
            from += fromDelta;
        }
    }

    /**
     * 当滑动格子的时候，需要等动画全部结束后 新增一格与是否游戏结束
     */
    private animateState = {
        running : 0,
        that : this,
        increase : function() {
            this.running ++;
        },
        descrese : function(){
            this.running --;
            if(this.running <= 0){
                this.running == 0;
                //动画结束，添加新的grid，然后检测游戏是否结束
                this.that.addNewGrids(1);
                this.that.checkGameOver();
            }
        }
    };

    private checkGameOver():void {
        //循环查看，是否为空格子，或者右隔壁、下隔壁存在相同的格子
        for(var i : number = 0 ; i < this.grids.length ; i++) {
            let grid = this.grids[i];
            if(grid == null){
                return;
            }
            // 与右隔壁比较
            if( (i%4) < 3) {
                let rightGrid = this.grids[i+1];
                if( rightGrid == null || rightGrid.num == grid.num){
                    return;
                }
            }
            if( (i/4) < 3 ) {
                let downGrid = this.grids[i+4];
                if( downGrid == null || downGrid.num == grid.num ) {
                    return;
                }
            }
        }
        this.isGameOver = true;
        GlobalAPI.UI.addBox(Game2048OverView).setData(Game2048Data.getInstance());
    }

    /**
     * 寻找可以移动到的位置，比如空位置，或者可以合成且没合成过的方块位置
     * @param cur 当前位置
     * @param delta 上一个与下一个方块相差的格子数 
     * @param min 最小有效位置
     * @param max 最大有效位置
     */
    private findReachablePosIndex(cur: number, delta: number, min: number, max: number):number {
        let reachable = -1;
        let curGrid = this.grids[cur];
        let isMerged = curGrid["isMerged"];
        let last = cur - delta;
        while( last >= min && last <= max ) {
            let lastGrid = this.grids[last];
            //有空格子
            if( lastGrid==null ) {
                reachable = last;
            }//可以合成且没合成过的方块位置
            else if(!isMerged && lastGrid.num == curGrid.num && !lastGrid["isMerged"]) {
                return last;
            }//当有格子存在时，要么是可合成的，要么是不可合成，while循环结束
            else {
                break;
            }
            last = last - delta;
        }
        return reachable == cur ? -1 : reachable;
    }

    private onKeyup(event:KeyboardEvent):void {
let key = event.code;
        switch (key) {
            case "ArrowLeft":
                this.leftMerge();
                break;
            case "ArrowRight":
                this.rightMerge();
                break;
            case "ArrowUp":
                this.upMerge();
                break;
            case "ArrowDown":
                this.downMerge();
                break;
        }
    }

    private newGame():void {
        this.isGameOver = false;
        Game2048Data.getInstance().curScore = 0;
        this.resetGrids();
    }

    private resetGrids():void {
        for (var i = 0, len = this.grids.length; i < len; i++) {
            let grid = this.grids[i];
            if (grid) {
                this.gamePanel.removeChild(grid.rect);
                this.grids[i] = null;
            }
        }
        this.addNewGrids(2);
    }

    private addNewGrids(size:number):void {
        let avas = this.availableGridPos(size);
        for(let i : number = 0 ; i < avas.length ; i++) {
            let posIdx : number = avas[i];
            let row : number = parseInt(""+posIdx/4);
            let col : number = parseInt(""+posIdx%4);
            let numberIdx : number = Math.random() < 0.8 ? 0 : 1;
            let numInfo = this.nums[numberIdx];
            this.grids[posIdx] = new GridItem(numInfo.num,this.createNumGrid(numberIdx,row,col));
            this.gamePanel.addChild(this.grids[posIdx].rect);

            this.increaseScore(numInfo.num);
        }
    }

    /**
     * 获取有效的格子位置数组
     * @param size 
     */
    private availableGridPos(size:number):number[] {
        let temp : number[] = [];
        for (var i : number = 0 ; i < this.grids.length ; i++) {
            if(!this.grids[i]) {
                temp.push(i);
            }
        }
        let result = [];
        while( size > 0) {
            let random = parseInt(""+Math.random() * temp.length);
            let num = temp[random];
            if(result.indexOf(num) == -1) {
                result.push(num);
                size --;
            }
        }
        return result;
    }

    private createNumGrid(index:number,row:number,col:number):eui.Rect {
        let numInfo = this.nums[index];
        let rect = new eui.Rect(this.gridSize,this.gridSize,numInfo.backgroundColor);
        rect.x = this.gridSpacing + (this.gridSpacing + this.gridSize)*col;
        rect.y = this.gridSpacing + (this.gridSpacing + this.gridSize)*row;
        rect.ellipseHeight = rect.ellipseWidth = this.gridRadius;

        let label = new eui.Label();
        label.text = numInfo.num +"";
        label.size = numInfo.fontSize;
        label.bold = true;
        label.textColor = numInfo.color;
        label.height = label.width = this.gridSize;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;

        rect.addChild(label);
        rect["label"] = label;
        return rect;
    }

    private increaseScore(value:number) {
        Game2048Data.getInstance().curScore += value;
        if(Game2048Data.getInstance().bestScore < Game2048Data.getInstance().curScore) {
            Game2048Data.getInstance().bestScore = Game2048Data.getInstance().curScore;
            // 存储本地
            localStorage.setItem("Game2048Data.bestScore",Game2048Data.getInstance().curScore+"");
            sessionStorage.setItem("Game2048Data.bestScore",Game2048Data.getInstance().curScore+"");
            document.cookie = "bestScore=500";
        }
    }

    private onStart():void {
        
        this.newGame();
    }

    dataChanged():void {
        super.dataChanged();
    }
    
    onExit():void {
        super.onExit();
        this.gamePanel.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onGamePanelTouchBegin,this);
        document.removeEventListener("keyup", this.onKeyup);
        this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
    }

    private getNumIndex(num:number):number{
        for(var i : number = 0 ; i < this.nums.length ; i++ ) {
            let obj : any = this.nums[i];
            if( obj.num == num) {
                return i;
            }
        }
        return -1;
    }

    private nums = 
    [
        {
            "num": 2,
            "color": 0x776e65,
            "backgroundColor": 0xeee4da,
            "fontSize": 65
        },
        {
            "num": 4,
            "color": 0x776e65,
            "backgroundColor": 0xede0c8,
            "fontSize": 65
        },
        {
            "num": 8,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf2b179,
            "fontSize": 55
        },
        {
            "num": 16,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf59563,
            "fontSize": 55
        },
        {
            "num": 32,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf67c5f,
            "fontSize": 55
        },
        {
            "num": 64,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf65e3b,
            "fontSize": 55
        },
        {
            "num": 128,
            "color": 0xf9f6f2,
            "backgroundColor": 0xedcf72,
            "fontSize": 45
        },
        {
            "num": 256,
            "color": 0xf9f6f2,
            "backgroundColor": 0xedcc61,
            "fontSize": 45
        },
        {
            "num": 512,
            "color": 0xf9f6f2,
            "backgroundColor": 0xedc850,
            "fontSize": 45
        },
        {
            "num": 1024,
            "color": 0xf9f6f2,
            "backgroundColor": 0xabe358,
            "fontSize": 35
        },
        {
            "num": 2048,
            "color": 0xf9f6f2,
            "backgroundColor": 0x4dd9cf,
            "fontSize": 35
        },
        {
            "num": 4096,
            "color": 0xf9f6f2,
            "backgroundColor": 0xa283f9,
            "fontSize": 35
        },
        {
            "num": 8192,
            "color": 0xf9f6f2,
            "backgroundColor": 0xf98383,
            "fontSize": 35
        }
    ];
}