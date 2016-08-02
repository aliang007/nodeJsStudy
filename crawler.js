const http = require('http');
const cheerio = require('cheerio');
const url  =  'http://www.imooc.com/learn/186';


function filterChapters(html) {
    const $ = cheerio.load(html);
    const chapters =  $('.chapter');
    
    let courseData = [];
    
    chapters.each(function(){
        const chapter = $(this);
        const chapterTitle = chapter.find('strong').text();
        const videos  = chapter.find('.video').children('li');
        let chapterData = {
            chapterTitle,
            videos: []
        };
        
        videos.each(function(){
            const video = $(this).find('.studyvideo');
            const videoTitle = video.text();
            const id = video.attr('href').split('video/')[1];
            
            chapterData.videos.push({
                title: videoTitle,
                id: id    
            });
            
        });
        
        courseData.push(chapterData);
        
    });
    
    return courseData;
}

function printCouseInfo(courseData) {
    courseData.forEach(function(item){
        const chapterTitle = item.chapterTitle; 
        console.log(chapterTitle + '\n');
        item.videos.forEach(function(video){
           console.log(' 【'+ video.id +'】'+ video.title +'\n') ;
        });
    });
}

http.get(url, function (res) {
    let html = '';
    
    res.on('data', function(data){
        html += data;
    });
    
    res.on('end', function () {
        const courseData = filterChapters(html);
        
        printCouseInfo(courseData)
        
    });
    
    res.on('error', function(){
        console.log('获取课程数据出错！');
    });
    
    
});
