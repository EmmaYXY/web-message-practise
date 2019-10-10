// 代码
// 本页JS代码：

// 监听从右侧框架传来的信息
window.addEventListener('message', function(evt) {
    if (evt.origin == 'https://www.zhangxinxu.com') {
        if ( evt.ports.length > 0 ) {
            // 将端口转移到其他文档
            window.frames[0].postMessage('端口打开','https://www.zhangxinxu.com', evt.ports);
        }
    }    
}, false);

// 左侧iframe JS代码：

var eleForm = document.querySelector("form"), port;
eleForm.onsubmit = function() {
    var message = document.querySelector("input[type='text']").value;
    
    if (port === undefined) {
        alert('信息发送失败，目前没有可用端口！');
    } else {
        port.postMessage(message);
    }

    return false;    
};
window.addEventListener('DOMContentLoaded', function(e) {
    window.addEventListener('message', function(evt) {
        // 扩大端口范围
        if (evt.origin == 'https://www.zhangxinxu.com') {
            port = evt.ports[0];
        } else {
            alert(evt.origin +'这厮我不认识哈！');
        }    
    }, false);
    
    window.parent.postMessage('发送页加载完毕', 'https://www.zhangxinxu.com');
    
} ,false);

// 右侧iframe JS代码：

var eleBox = document.querySelector("#message");
var messageHandle = function(e) {
    eleBox.innerHTML = '接受到的信息是：' + e.data;
};
window.addEventListener('DOMContentLoaded', function() {
    if (window.MessageChannel) {
        // 创建一个新的 MessageChannel 对象
        var mc = new MessageChannel();

        // 给父级发送一个端口
        window.parent.postMessage('显示页加载完毕','https://www.zhangxinxu.com',[mc.port1]);
        
        // 显示发送的信息
        mc.port2.addEventListener('message', messageHandle, false);
        mc.port2.start();
    } else {
        eleBox.innerHTML = '你的浏览器不支持'   
    }
}, false);