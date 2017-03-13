const http = require('http');  
  
http.createServer( (request, response) => {  
  
    if(request.url == "/json"){  
        response.writeHead(200, {'Content-Type': 'application/json'});  
        const data = {  
            "name":"aliang", 
            "age" : 18,
            "domain":"www.aliang.me"  
        };  
        response.end(JSON.stringify(data));  
    }else{  
        response.writeHead(200, {'Content-Type': 'text/html'});  
  
        response.end('<h1>Hello world</h1>\n\n\n<h1>访问 /json 输出接口</h1>');  
    }  
      
}).listen(8888);
  
// 终端打印如下信息  
console.log('Server running at http://127.0.0.1:8888/');