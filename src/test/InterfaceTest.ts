

class InterfaceTest {

    fun(t:ITest):void {
        t.fun();
    }

    test():void{
        //如果传入的参数是实例对象，该对象需要有实例属性val,实例方法fun
        this.fun({val:1,fun:()=>{
            console.log('test');
        }})
        //如果传入的参数是类类型，该对象需要有静态属性val,静态方法fun
        this.fun(Test);
    }
}

interface ITest {
    val:number;
    fun():void;
}

class Test {
    static val:number;
    static fun():void{}
}
