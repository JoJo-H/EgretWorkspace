iframe用法,跨域


iframe标签用于定义内联框架，内联框架是在一个页面中嵌入一个页面。
有很多网页看上去是一个网页，但实际上它其中可能镶嵌有其它网页，<iframe>标签就可以把其它网页无缝地嵌入在一个页面中。

a>通过iframe实现跨域;
b>使用iframe解决IE6下select遮挡不住的问题
c>通过iframe解决Ajax的前进后退问题
d>通过iframe实现异步上传。(Easyui中form组件就是用的iframe，实现表单提交时，可以提交上传域)


实例：
1、会更改资源加载的域
如果直接打开http://localhost:3333/MyEgretProject/index.html
加载资源的域是http://localhost:3333/MyEgretProject/resource/assets/Button/button_up.png

打开http://localhost:3333/MyEgretProject/indexIFrame.html，该html内联iframe
<iframe id='cpGamePlayFrame' class="iframe" height="100%" width="100%" name="cpGamePlayFrame" frameborder='0' src="http://10.0.0.43:3333/MyEgretProject/index.html"></iframe>
使用iframe内联框架后，加载资源的域是http://10.0.0.43:3333/MyEgretProject/resource/assets/Button/button_up.png

html5的postMessage：
HTML5提供了跨文档消息机制（Cross Document Messaging），它提供了跨越frame、tabs或windows通信的能力。使用方法：
otherWindow.postMessage(message, targetOrigin);
otherWindow: 对接收信息页面的window的引用。可以是页面中iframe的contentWindow属性；window.open的返回值；通过name或下标从window.frames取到的值。
message: 所要发送的数据，string类型。
targetOrigin: 用于限制otherWindow，“*”表示不作限制
父页面a.com中的parent.html嵌入b.com的child.html
<html> 
<head>
 <script type="text/JavaScript"> 
   function sendMessage(){ 
     // 通过 postMessage 向子窗口发送数据
     document.getElementById("otherPage").contentWindow 
       .postMessage( 
         document.getElementById("message").value, 
        "http://b.com"
       ); 
   } 
 </script> 
 </head> 
 <body> 
   <iframe src="http://b.com/child.html" 
         id="otherPage"></iframe>
   <input type="text" id="message"><input type="button" 
       value="来自父窗口数据" onclick="sendMessage()" /> 
 </body> 
 </html>
 子页面b.com的child.html
 <html> 
 <head> 
 <script type="text/JavaScript"> 
   window.addEventListener("message", function( event ) { 
     // 把父窗口发送过来的数据显示在子窗口中
     if(event.origin.indexOf('a.com')>-1){
      document.getElementById("content").innerHTML+=event.data+"<br/>";
      event.source.postMessage('得到了消息','*');
     }
      
   }, false ); 
 </script> 
 </head> 
 <body> 
   <div id="content"></div> 
 </body> 
 </html>
 这个小demo是通过在parent中嵌入child，在parent中点击发送按钮利用postMessage进行传输数据，将发送信息发送到iframe（child），child页面通过message事件监听，得到数据才进行后续操作。
从而实现页面之间互相传输数据.message的event有三个属性：
 data：作为第一个参数传递给postMessage的数据；
 origin：发送该消息的窗口协议。域名以及端口号；
 source：发送该消息窗口对象;
 上面demo中在message函数中都演示了每个的用处。