
var clientSocket=io();
clientSocket.on('connect',function(){
     console.log('connected to Server');
});

clientSocket.on('disconnect',function(){
     console.log('disconnected from Server');
});

clientSocket.on('newMessage',function(data){
    console.log('New email from server',data);
});

//   clientSocket.emit('createMessage',{
//      from :'abc@ca.com',
//      msg :'this is urgent',
//      to: 'baby@ca.com'

//   });