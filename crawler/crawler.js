const http = require('http');
const express = require('express');
const app = express();
const cheerio = require('cheerio');
const url = 'http://www.imooc.com/learn/';
const aUrl = [url+'186'];

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

function filterChapters(html) {
    
    const $ = cheerio.load(html);
    const chapters =  $('.chapter');
    
    let arrData = [];
    let courseData = {
        itemData: []
    };

    chapters.each(function(){
        const chapter = $(this);
        const chapterTitle = chapter.find('strong').text();
        const videos  = chapter.find('.video').children('li');
        let chapterData = {
            chapterTitle,
            videos: []
        };
        
        videos.each(function(){
            const video = $(this).find('.J-media-item');
            const videoTitle = video.text();
            
            const href = video.attr('href');
            
            chapterData.videos.push({
                title: videoTitle,
                href  
            });
            
        });
        
        courseData.itemData.push(chapterData);
        
    });
    
    courseData.itemTitle = $('#main .hd>.l').text();
    
    arrData.push(courseData);
    
    console.log(arrData);
    
    return arrData;
}

let sData = new Object();

function printCouseInfo(data) {
    sData = data[0].itemData;
        data[0].itemData.forEach( (item) => {
            const chapterTitle = item.chapterTitle; 
            // console.log(chapterTitle + '\n');
            item.videos.forEach( (video) => {
               // console.log(' 【'+ video.id +'】'+ video.title +'\n') ;
            });
        });
}

// let sUrl = url+Math.floor( Math.random()*500+1);

http.get( url+'186' ,  (res) =>{
    let html = '';
    
    res.on('data', (data)=>{
        html += data;
    });
    
    res.on('end',  () =>{
        const courseData = filterChapters(html);
        printCouseInfo(courseData)
        
    });
    
    res.on('error', ()=>{
        console.log('获取课程数据出错！');
    });
    
    
});


app.get('/', (req, res)=>{
    res.render('crawler.ejs', {name: 'ZengLiang', sData: sData})
});

app.listen(8082, ()=>{
   console.log('项目已启动，访问： localhost:8082') 
});