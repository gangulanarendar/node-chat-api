var socket = io();


function scrollToBottom(){
  var messages=$("#messages");
  var newMessage=messages.children('li:last-child');
 
  var clientHeight=messages.prop('clientHeight');
  var scrollHeight=messages.prop('scrollHeight'); 
  var scrollTop=messages.prop('scrollTop');
  var newMessageHeight=newMessage.innerHeight();
  var prevMessageHeight=newMessage.prev().innerHeight();

  if(clientHeight+scrollTop+newMessageHeight+prevMessageHeight >= scrollHeight)
  {
   // console.log('scroll bottom');
    messages.scrollTop(scrollHeight);
  }

}

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime=moment(message.createdAt).format('h:mm a');
  //console.log('newMessage', message);
  var template = $('#message-template').html();
  var html=Mustache.render(template,{
    from :message.from,
    text:message.text,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {

  var formattedTime=moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html=Mustache.render(template,{
    from :message.from,
    url:message.url,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
