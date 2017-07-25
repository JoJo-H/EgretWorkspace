var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game2048View = (function (_super) {
    __extends(Game2048View, _super);
    function Game2048View() {
        var _this = _super.call(this) || this;
        _this.grids = new Array(16);
        _this.gridSpacing = 20;
        _this.gamePanelRadius = 16;
        _this.gridRadius = 12;
        _this.isGameOver = false;
        /**
         * 当滑动格子的时候，需要等动画全部结束后 新增一格与是否游戏结束
         */
        _this.animateState = {
            running: 0,
            that: _this,
            increase: function () {
                this.running++;
            },
            descrese: function () {
                this.running--;
                if (this.running <= 0) {
                    this.running == 0;
                    //动画结束，添加新的grid，然后检测游戏是否结束
                    this.that.addNewGrids(1);
                    this.that.checkGameOver();
                }
            }
        };
        _this.nums = [
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
        _this.skinName = "Game2048Skin";
        return _this;
    }
    Game2048View.prototype.onEnter = function (args) {
        _super.prototype.onEnter.call(this, args);
        this.setData(Game2048Data.getInstance());
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
        this.gridSize = (this.gamePanel.width - this.gridSpacing * 5) / 4;
        var gamePanelBg = this.createRadiusSquare(0, 0, this.gamePanel.width, this.gamePanelRadius, 0xbbada0, 1);
        this.gamePanel.addChild(gamePanelBg);
        for (var i = 0; i < 16; i++) {
            var row = parseInt("" + i / 4);
            var col = parseInt("" + i % 4);
            var gx = this.gridSpacing + (this.gridSpacing + this.gridSize) * row;
            var gy = this.gridSpacing + (this.gridSpacing + this.gridSize) * col;
            this.gamePanel.addChild(this.createRadiusSquare(gx, gy, this.gridSize, this.gridRadius, 0xeee4da, 0.35));
        }
        this.gamePanel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGamePanelTouchBegin, this);
        document.addEventListener("keyup", this.onKeyup);
        this.newGame();
    };
    Game2048View.prototype.createRadiusSquare = function (x, y, size, radius, color, alpha) {
        var rect = new eui.Rect(size, size, color);
        rect.x = x;
        rect.y = y;
        rect.alpha = alpha;
        rect.ellipseWidth = radius;
        rect.ellipseHeight = radius;
        return rect;
    };
    Game2048View.prototype.onGamePanelTouchBegin = function (event) {
        var target = event.currentTarget;
        target.touchX = event.stageX;
        target.touchY = event.stageY;
        this.gamePanel.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGamePanelTouchMove, this);
    };
    Game2048View.prototype.onGamePanelTouchMove = function (event) {
        var target = event.currentTarget;
        var deltaX = event.stageX - target.touchX;
        var deltaY = event.stageY - target.touchY;
        if (Math.abs(deltaX - deltaY) <= 40) {
            // 需要拖动到一定的距离，才确定方向。 距离太短，忽略不计
            return;
        }
        // x方向距离比较大，则向左或右 ； 否则向上或向下
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
                this.leftMerge();
            }
            else {
                this.rightMerge();
            }
        }
        else {
            if (deltaY < 0) {
                this.upMerge();
            }
            else {
                this.downMerge();
            }
        }
        this.gamePanel.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGamePanelTouchMove, this);
    };
    Game2048View.prototype.leftMerge = function () {
        this.merge(0, 4, 1);
    };
    Game2048View.prototype.rightMerge = function () {
        this.merge(3, 4, -1);
    };
    Game2048View.prototype.upMerge = function () {
        this.merge(0, 1, 4);
    };
    Game2048View.prototype.downMerge = function () {
        this.merge(12, 1, -4);
    };
    /**
     * 合并
     * @param from 起始位置
     * @param fromDelta 不同起始位置的位置间隔 比如向下滑动，起始 为 12,13,14,15，该值为1
     * @param nextDelta 上一个与下一个方块相差的格子数
     */
    Game2048View.prototype.merge = function (from, fromDelta, nextDelta) {
        var _this = this;
        for (var i = 0; i < 4; i++) {
            var posIdx = from;
            var fromEnd = from + nextDelta * 3;
            var min = Math.min(from, fromEnd);
            var max = Math.max(from, fromEnd);
            var _loop_1 = function () {
                var curGrid = this_1.grids[posIdx];
                if (curGrid) {
                    curGrid["isMerged"] = false;
                    var reachable = this_1.findReachablePosIndex(posIdx, nextDelta, min, max);
                    if (reachable != -1) {
                        var row = parseInt("" + reachable / 4);
                        var col = parseInt("" + reachable % 4);
                        var goX = this_1.gridSpacing + (this_1.gridSpacing + this_1.gridSize) * col;
                        var goY = this_1.gridSpacing + (this_1.gridSize + this_1.gridSpacing) * row;
                        var time = Math.abs((goX - curGrid.rect.x) + (goY - curGrid.rect.y)) / (this_1.gridSize + this_1.gridSpacing) * 80;
                        var last = this_1.grids[reachable];
                        // 该格子是否存在数字
                        if (last) {
                            if (this_1.gamePanel.getChildIndex(curGrid.rect) < this_1.gamePanel.getChildIndex(last.rect)) {
                                this_1.gamePanel.swapChildren(curGrid.rect, last.rect);
                            }
                            this_1.grids[posIdx] = null;
                            last["isMerged"] = true;
                            // 分数翻倍 -- 目的格子 延迟 渲染 分数
                            last.change(time + 50, this_1.nums[this_1.getNumIndex(last.num) + 1], this_1.animateState);
                            curGrid.moveToAndFadeOut(goX, goY, time, this_1.animateState, function () {
                                _this.gamePanel.removeChild(curGrid.rect);
                            });
                        }
                        else {
                            this_1.grids[reachable] = curGrid;
                            this_1.grids[posIdx] = null;
                            // 当前格子 缓动 移动到空格子
                            curGrid.moveTo(goX, goY, time, this_1.animateState);
                        }
                    }
                }
                posIdx += nextDelta;
            };
            var this_1 = this;
            while (posIdx >= min && posIdx <= max) {
                _loop_1();
            }
            from += fromDelta;
        }
    };
    Game2048View.prototype.checkGameOver = function () {
        //循环查看，是否为空格子，或者右隔壁、下隔壁存在相同的格子
        for (var i = 0; i < this.grids.length; i++) {
            var grid = this.grids[i];
            if (grid == null) {
                return;
            }
            // 与右隔壁比较
            if ((i % 4) < 3) {
                var rightGrid = this.grids[i + 1];
                if (rightGrid == null || rightGrid.num == grid.num) {
                    return;
                }
            }
            if ((i / 4) < 3) {
                var downGrid = this.grids[i + 4];
                if (downGrid == null || downGrid.num == grid.num) {
                    return;
                }
            }
        }
        this.isGameOver = true;
        GlobalAPI.UI.addBox(Game2048OverView).setData(Game2048Data.getInstance());
    };
    /**
     * 寻找可以移动到的位置，比如空位置，或者可以合成且没合成过的方块位置
     * @param cur 当前位置
     * @param delta 上一个与下一个方块相差的格子数
     * @param min 最小有效位置
     * @param max 最大有效位置
     */
    Game2048View.prototype.findReachablePosIndex = function (cur, delta, min, max) {
        var reachable = -1;
        var curGrid = this.grids[cur];
        var isMerged = curGrid["isMerged"];
        var last = cur - delta;
        while (last >= min && last <= max) {
            var lastGrid = this.grids[last];
            //有空格子
            if (lastGrid == null) {
                reachable = last;
            } //可以合成且没合成过的方块位置
            else if (!isMerged && lastGrid.num == curGrid.num && !lastGrid["isMerged"]) {
                return last;
            } //当有格子存在时，要么是可合成的，要么是不可合成，while循环结束
            else {
                break;
            }
            last = last - delta;
        }
        return reachable == cur ? -1 : reachable;
    };
    Game2048View.prototype.onKeyup = function (event) {
        var key = event.code;
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
    };
    Game2048View.prototype.newGame = function () {
        this.isGameOver = false;
        Game2048Data.getInstance().curScore = 0;
        this.resetGrids();
    };
    Game2048View.prototype.resetGrids = function () {
        for (var i = 0, len = this.grids.length; i < len; i++) {
            var grid = this.grids[i];
            if (grid) {
                this.gamePanel.removeChild(grid.rect);
                this.grids[i] = null;
            }
        }
        this.addNewGrids(2);
    };
    Game2048View.prototype.addNewGrids = function (size) {
        var avas = this.availableGridPos(size);
        for (var i = 0; i < avas.length; i++) {
            var posIdx = avas[i];
            var row = parseInt("" + posIdx / 4);
            var col = parseInt("" + posIdx % 4);
            var numberIdx = Math.random() < 0.8 ? 0 : 1;
            var numInfo = this.nums[numberIdx];
            this.grids[posIdx] = new GridItem(numInfo.num, this.createNumGrid(numberIdx, row, col));
            this.gamePanel.addChild(this.grids[posIdx].rect);
            this.increaseScore(numInfo.num);
        }
    };
    /**
     * 获取有效的格子位置数组
     * @param size
     */
    Game2048View.prototype.availableGridPos = function (size) {
        var temp = [];
        for (var i = 0; i < this.grids.length; i++) {
            if (!this.grids[i]) {
                temp.push(i);
            }
        }
        var result = [];
        while (size > 0) {
            var random = parseInt("" + Math.random() * temp.length);
            var num = temp[random];
            if (result.indexOf(num) == -1) {
                result.push(num);
                size--;
            }
        }
        return result;
    };
    Game2048View.prototype.createNumGrid = function (index, row, col) {
        var numInfo = this.nums[index];
        var rect = new eui.Rect(this.gridSize, this.gridSize, numInfo.backgroundColor);
        rect.x = this.gridSpacing + (this.gridSpacing + this.gridSize) * col;
        rect.y = this.gridSpacing + (this.gridSpacing + this.gridSize) * row;
        rect.ellipseHeight = rect.ellipseWidth = this.gridRadius;
        var label = new eui.Label();
        label.text = numInfo.num + "";
        label.size = numInfo.fontSize;
        label.bold = true;
        label.textColor = numInfo.color;
        label.height = label.width = this.gridSize;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        rect.addChild(label);
        rect["label"] = label;
        return rect;
    };
    Game2048View.prototype.increaseScore = function (value) {
        Game2048Data.getInstance().curScore += value;
        if (Game2048Data.getInstance().bestScore < Game2048Data.getInstance().curScore) {
            Game2048Data.getInstance().bestScore = Game2048Data.getInstance().curScore;
            // 存储本地
            localStorage.setItem("Game2048Data.bestScore", Game2048Data.getInstance().curScore + "");
            sessionStorage.setItem("Game2048Data.bestScore", Game2048Data.getInstance().curScore + "");
            document.cookie = "bestScore=500";
        }
    };
    Game2048View.prototype.onStart = function () {
        this.newGame();
    };
    Game2048View.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
    };
    Game2048View.prototype.onExit = function () {
        _super.prototype.onExit.call(this);
        this.gamePanel.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGamePanelTouchBegin, this);
        document.removeEventListener("keyup", this.onKeyup);
        this.btnStart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
    };
    Game2048View.prototype.getNumIndex = function (num) {
        for (var i = 0; i < this.nums.length; i++) {
            var obj = this.nums[i];
            if (obj.num == num) {
                return i;
            }
        }
        return -1;
    };
    return Game2048View;
}(BaseComponent));
__reflect(Game2048View.prototype, "Game2048View");
