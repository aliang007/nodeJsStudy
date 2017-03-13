/*var http = require('http');  
  
http.createServer(function (request, response) {  
  
    if(request.url == "/json"){  
        response.writeHead(200, {'Content-Type': 'application/json'});  
        var data = {  
            "name":"nodejs",  
            "value":"stone"  
        };  
        response.end(JSON.stringify(data));  
    }else{  
        response.writeHead(200, {'Content-Type': 'text/plain'});  
  
        response.end('Hello World\n');  
    }  
      
}).listen(8888);
  
// 终端打印如下信息  
console.log('Server running at http://127.0.0.1:8888/');
*/


var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 