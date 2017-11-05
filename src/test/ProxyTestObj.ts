
class ProxyTestObj {

    constructor(){
    }

    testGet1():void {
        //get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（即this关键字指向的那个对象），其中最后一个参数可选。
        var person = { name : "张三",sex:0};
        var proxy = new Proxy(person,{
            // target:person对象 property:name属性 receiver:proxy实例
            //get方法内部的this指向 handler
            get : function(target , property , receiver) {
                console.log(`getting ${property}!`);
                // if( property in target) {
                //     return target[property];
                // }else {
                //     throw new ReferenceError(`Property "${property}" does not exist.`);
                // }
                return Reflect.get(target,property,receiver);
            }
        });
        console.log(proxy.name);
        console.log(proxy["age"]);//undefined

        // var proxy2 = new Proxy({},{
        //     get :function(target,property,receiver) {
        //         return 35;
        //     }
        // });
        // console.log(proxy2["time"]);//35
        // var target = {};
        // var handler = {};
        // var proxy = new Proxy(target, handler);
        // proxy["a"] = 'b';
        // console.log(target["a"]); // b
    }

    testGet2():void {
        //如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。
        var target = Object.defineProperties({}, {
            foo: {
              value: 123,
              writable: false,
              configurable: false
            },
          });
          
          var handler = {
            get(target, propKey) {
              return 'abc';
            }
          };
          
          var proxy = new Proxy(target, handler);
          
          console.log(proxy.foo);
          // TypeError: Invariant check failed
    }

    //实现数据验证，数据绑定的一种实现方法
    testSet():void {
        //set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
        var person = { name : "张三",sex:0};
        var proxy = new Proxy(person,{
            // target:person对象 property:name属性 receiver:proxy实例
            set : function(target , property ,value , receiver) {
                console.log(`setting ${property}!`);
                return Reflect.set(target,property,value,receiver);
            }
        });
        proxy.name = "李四";
        console.log(proxy.name);
    }

    testApply():void {
        // apply方法拦截函数的调用、call和apply操作。
        // apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
        var targetObj : any = {
            sum:function(left,right){
                return left + right;
            }
        };
        //apply是对函数拦截，所以目标对象是targetObj.sum
        var proxy = new Proxy(targetObj.sum,{
            apply:function(target,context,args){
                console.log(`setting ${args}!`);
                return Reflect.apply(target,context,args);
            }
        });
        console.log(proxy(1,2));
        //直接调用Reflect.apply方法，也会被拦截。
        console.log(Reflect.apply(proxy, null, [9, 10])); // 38
    }

    testHas():void {
        //has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符
        //值得注意的是，has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断一个属性是对象自身的属性，还是继承的属性。
        //has拦截只对in循环生效，对for...in循环不生效
        var handler = {
            has (target, key) {
              if (key[0] === '_') {
                return false;
              }
            //   return key in target;
              return Reflect.has(target,key);
            }
          };
          var target = { _prop: 'foo', prop: 'foo' };
          //如果原对象不可配置或者禁止扩展，这时has拦截会报错
          //'has' on proxy: trap returned falsish for property '_prop' but the proxy target is not extensible
        //   Object.preventExtensions(target);
          var proxy = new Proxy(target, handler);
          console.log('_prop' in proxy); // false
          console.log('prop' in proxy); // false
    }

    testConstruct():void {
        //construct方法用于拦截new命令
        //construct方法可以接受两个参数。target: 目标对象    args：构建函数的参数对象
        var p = new Proxy(function (val) {}, {
            construct: function(target, args) {
              console.log('called: ' + args.join(', '));
            //   return { value: args[0] * 10 };
              return Reflect.construct(target,args);
            }
          });
          
          console.log(new p(1));
          //construct方法返回的必须是一个对象，否则会报错。
    }

    testDeleteProperty():void {
        //deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
        //注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。
        var handler = {
            deleteProperty (target, key) {
              invariant(key, 'delete');
              return true;
            }
          };
          function invariant (key, action) {
            if (key[0] === '_') {
              throw new Error(`Invalid attempt to ${action} private "${key}" property`);
            }
          }
          
          var target = { _prop: 'foo' };
          var proxy = new Proxy(target, handler);
          console.log(delete proxy._prop);    // Error: Invalid attempt to delete private "_prop" property
    }

    testDefineProperty():void {
        //defineProperty方法拦截了Object.defineProperty操作。
        var handler = {
            defineProperty (target, key, descriptor) {
                console.log(`defineProperty ${key}!`);
                // return false;
                return Reflect.defineProperty(target,key,descriptor);
            }
          };
          var target = {};
          var proxy = new Proxy(target, handler);
          console.log(proxy.foo = 'bar');//bar
    }

    testOwnKeys():void {
        //ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
        // Object.getOwnPropertyNames()
        // Object.getOwnPropertySymbols()
        // Object.keys()
        let target = {
            a: 1,
            b: 2,
            c: 3,
            [Symbol.for('secret')]: '4',
          };
          Object.defineProperty(target, 'key', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: 'static'
          });
          let handler = {
            ownKeys(target) {
              return ['a', 'd', Symbol.for('secret'), 'key'];
            }
          };
          let proxy = new Proxy(target, handler);
          //ownKeys方法之中，显式返回不存在的属性（d）、Symbol 值（Symbol.for('secret')）、不可遍历的属性（key），结果都被自动过滤掉。
          console.log(Object.keys(proxy)); // ['a']
    }

    testThis():void {
        //虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，
        //即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，
        //目标对象内部的this关键字会指向 Proxy 代理。
        const target = {
            m: function () {
              console.log(this === proxy);
            }
          };
          const handler = {};
          
          const proxy = new Proxy(target, handler);
          
          target.m() // false
          proxy.m()  // true
    }

    proxy():void {
    //     get(target, propKey, receiver){}：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
    //     set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
    //     has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
    //     deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
    //     ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
    //     getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
    //     defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
    //     preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
    //     getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
    //     isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
    //     setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
    //     apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
    //     construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
    }
}