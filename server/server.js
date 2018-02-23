const express=require('express');
const path=require('path');
const http=require('http');

const publicPath=path.join(__dirname,'../public');
console.log(publicPath);
var port=process.env.PORT||3000;

var app=new express();
app.use(express.static(publicPath));

app.listen(port,()=>{

    console.log('server is up at 3000'); 
})

