


class Destroyable implements IDestroyable {
    public CLASS_NAME:string = "Destroyable";
    public isDestroyed: boolean;

    public constructor() {

    }

    public destroy():void {
        this.isDestroyed = true;
    }

    /**
     * 类名
     * @returns {string}
     */
    public toString():string {
        return this.CLASS_NAME;
    }
}