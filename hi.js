const express = require('express');
const app = express();

// 可以访问static目录下静态文件
app.use(express.static('static'));


app.get('/', (req,res) => {
    res.send(`<h1>hello express</h1>`)
});


app.get('/about',   (req, res) =>{
  res.send('<h1>about</h1>');
});

app.get('/list',  (req, res) => {
   console.log("/list GET 请求");
   res.send('用户列表页面');
})


app.get('/ab?cd',  (req, res) =>{
  res.send('ab?cd');
  console.log('ab?cd')
});


// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', (req, res) => {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})



app.get('*', (req, res, next) =>{
  res.status(404).send('404 无法找到该页面！!');
});
/*

app.use( (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500');
});*/

app.listen(8888, () => {
    console.log('   localhost:8888 端口已启动');
});