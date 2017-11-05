
class PromiseTestObj {

    //Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
    constructor(){

    }
    //resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
    //由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。
    test1():void {
        // 上面代码中，p1是一个Promise，3秒之后变为rejected。
        // p2的状态在1秒之后改变，resolve方法返回的是p1。
        // 由于p2返回的是另一个 Promise，导致p2自己的状态无效了，
        // 由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。
        // 又过了2秒，p1变为rejected，导致触发catch方法指定的回调函数。
        var p1 = new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error('fail')), 3000)
            console.log("p1 promise");
          })
          
          var p2 = new Promise(function (resolve, reject) {
            setTimeout(() => resolve(p1), 1000);
            console.log("p2 promise");
          })
          
          p2.then((result) =>{
              console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
            //promise创建后会立即执行，先打印  "p1 promise"  "p2 promise"
            //由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）
            //当p1的延迟时间为3000，p2的延迟时间为1000时，p2在1秒后会等待p1的回调；后面的then语句都变成针对后者（p1）
            //当p1的延迟时间为1000，p2的延迟时间为3000时，p1会先抛出一个错误，记录p1的状态reject；当3秒后，p2会去调用p1的状态，所以后面的then语句都变成针对后者（p1）

    }

    test2():void {
        function getJSON(name):Promise<any>{
            return new Promise<any>((resolve,reject)=>{
                resolve();
            });
        }
        //第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
        getJSON("/posts.json").then(function() {
            return "json.post";
          }).then(function(post) {
            console.log(post); // "json.post"
          });

        getJSON("/post/1.json").then(function(post) {
            return getJSON("/post/2.json");
          }).then(function funcA(comments) {
            console.log("resolved: ", comments);
          }, function funcB(err){
            console.log("rejected: ", err);
          });
          //resolved:  undefined
        //   getJSON("/post/1.json").then(
        //     post => getJSON(post.commentURL)
        //   ).then(
        //     comments => console.log("resolved: ", comments),
        //     err => console.log("rejected: ", err)
        //   );
          
          //上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。
          //这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用funcA，
          //如果状态变为rejected，就调用funcB。
    }
}