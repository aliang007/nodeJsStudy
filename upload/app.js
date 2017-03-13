var express = require('express');
var fs = require('fs'); //文件操作
var app = express(); //创建web应用程序
var multer = require('multer'); //这是一个Node.js的中间件处理multipart/form-data
var upload = multer({ dest: './tmp' });

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});


/*upload.array(fieldname[, maxCount])
.fields(fields)
[{name:'file1',maxCount:1},
{name:'file2',maxCount: 8 }]
*/
app.post('/addUserInfo', upload.array("file"), function(req, res, next) {
    if (req.files == undefined) {
        res.send("请选择要上传的图片...");
    } else {
        var str = "文件上传成功...";
        for (var i = 0; i < req.files.length; i++) {
            var filepath = __dirname + "/tmp/" + req.files[i].originalname;
            fs.renameSync(req.files[i].path, filepath);
        }
        res.send("上传的图片成功...");
    }
});
app.listen(6661,() =>{
    console.log("127.0.0.1:6666 已启动！")
});
