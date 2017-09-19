


class LightButton extends BaseButton {

    constructor(){
        super();
        this.playAnimation();
    }
    
    private playAnimation():void {
        var mcSX : number = this.width / 235;
        var mcSY : number = this.height / 108;
        var movie = BaseFactory.create("assets/animation/fast/lightbutton2_ske.dbmv",MovieType.DBFAST);
        movie.touchEnabled = false;
        this.addChild(movie);
    }
}