const express=require('express');
const path=require('path');
const http=require('http');
const socketIO=require('socket.io');

var {generateMessage,generateLocationMessage}=require('./utils/message');
const publicPath=path.join(__dirname,'../public');
//console.log(publicPath);
var port=process.env.PORT||3000;
var app=new express();
var server=http.createServer(app);
var serverIo=socketIO(server);

app.use(express.static(publicPath));
serverIo.on('connection',(socket)=>{
    console.log('New User Connected..');
     socket.emit('newMessage',generateMessage('Admin','Welcome to the Group')
    );  
    
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

    socket.on('createMessage',function(data,callback){
      // console.log(typeof callback);
        console.log('create Message from client',data);
        serverIo.emit('newMessage',generateMessage(data.from,data.text));
        //socket.broadcast.emit('newMessage',generateMessage(data.from,data.text)); 
        callback(data);      
   });

   socket.on('sendLocation',function(data){
   
      console.log('sendLocation Event',data);
     
      serverIo.emit('newLocationEvent',generateLocationMessage('Admin',data.lat,data.lng));
 });

    socket.on('disconnect',function(){
        console.log('User discconnect');
    });
});

server.listen(port,()=>{
    console.log('server is up at 3000'); 
});