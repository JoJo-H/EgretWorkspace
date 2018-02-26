

class PngPixelTest {

    public img : eui.Image = new eui.Image();
    constructor(){
        let img = new eui.Image('bg_headviewcircle_png');
        App.stage.addChild(img);
        // egret.setTimeout(()=>{
        //     this.tempPixel(img);
        // },this,1000);
    }

    tempPixel(img:eui.Image):void{

        let shape = new egret.Shape();
        let width = img.width;
        let height = img.height;
        shape.width = width;
        shape.height = height;
        console.log(width,height);
        shape.graphics.beginFill(0xff0000,1);

        let texture = img.texture;
        for(let i = 0 ; i < width ; i ++){
            for(let j = 0 ; j < height ; j++){
                let pixels = texture.getPixels(i,j,1,1);
                if( pixels[0]+pixels[1]+pixels[2]+pixels[3] ){
                    console.log(pixels);
                    shape.graphics.drawRect(i,j,1,1);
                }
            }
        }
        shape.graphics.endFill();
        App.stage.addChild(shape);
        shape.x = shape.y = 200;
    }

}