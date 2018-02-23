const express=require('express');
const path=require('path');
const http=require('http');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname,'../public');
console.log(publicPath);
var port=process.env.PORT||3000;

var app=new express();
var server=http.createServer(app);
var serverIo=socketIO(server);
app.use(express.static(publicPath));


serverIo.on('connection',(socket)=>{

    console.log('New User Connected..');


    socket.emit('newMessage',{
      from :'someone@ca.com',
      msg :'do the agile',
      createdAt : new Date().getTime.toString()

    });

    socket.on('createMessage',function(data){
        console.log('create Message from client',data);
   });


    socket.on('disconnect',function(){
        console.log('User discconnect');
    });
});


server.listen(port,()=>{

    console.log('server is up at 3000'); 


});

