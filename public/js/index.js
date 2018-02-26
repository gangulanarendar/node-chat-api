
var clientSocket=io();

clientSocket.on('connect',function(){
     console.log('connected to Server');
     $("#status").text("online");
     $("#status").css({ color: 'green'});
    // $("#status").addClass('offline');
});

clientSocket.on('disconnect',function(){
     console.log('disconnected from Server');
     $("#status").text("offline");
     $("#status").css({ color: 'red'});
});

clientSocket.on('newMessage',function(data){
 //   console.log('New email from server',data);
    var litag=$("<li></li>").text(data.text);
    $("#msglist").append(litag);
});

clientSocket.on('newLocationEvent',function(data){
  
       var litag=$("<li></li>").text(data.from);
       var atag=$("<a target='_blank'>My location</a>");
       atag.attr('href',data.url);
       litag.append(atag)
       $("#msglist").append(litag);
   });

// clientSocket.emit('createMessage',{
//      from :'abc@ca.com',
//      text :'this is urgent',
//     to: 'baby@ca.com'
//   });

$('#message-form').on('submit',function (evt) {
        
        evt.preventDefault();
     //   console.log('$([name=vmsg]).val()',$("[name=vmsg]").val());
         clientSocket.emit('createMessage',{
           from :'user',
           text :$("[name=vmsg]").val(),
           to: 'baby@ca.com'
         },function(){
         //   console.log('bui');
          
         });
        
});

var sendBtn=$('#send-location');
sendBtn.on('click',function (evt) {
    console.log('Send Location function');
    if(!navigator.geolocation)
    {
        return alert('Unable to access Geolocation');
    }
    else{
       navigator.geolocation.getCurrentPosition(function(position){

        console.log('Position ',position);
        clientSocket.emit('sendLocation',{
            lat :position.coords.latitude,
            lng :position.coords.longitude,
            alt: position.coords.altitude
          });
       },function(){
        return alert('Unable to fecth Geolocation');

       });
    }

});
     
 
