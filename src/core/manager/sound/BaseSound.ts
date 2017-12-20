

class BaseSound {

    constructor(){

    }


    protected prepareSound(nama):Promise<any> {
        if(RES.hasRes(nama)) {
            if(RES.getRes(name)) {
                return Promise.resolve();
            }else {
                return RES.getResAsync(nama);
            }
        }
    }
}