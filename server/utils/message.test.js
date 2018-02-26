const expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message');

describe('generate message function',()=>{
 it('should create a new message',()=>{
     var from ='admin';
    var text='hello all';
    
    var msg=generateMessage(from,text);

    expect(typeof msg.createdAt).toBe('number');
    expect(msg).toMatchObject({from,text});

 })

});

describe('generate location function',()=>{
    it('should create a new coreect Location',()=>{
       var lat ='123';
       var lng='321';
       var from='admin';
       var url =`https://www.google.com/maps/?q=${lat},${lng}`;
       var msg=generateLocationMessage(from,lat,lng);
   
      // expect(typeof msg.createdAt).toBe('number');
       expect(msg).toMatchObject({from,url});
      // expect(msg).toMatchObject({url})
   
    })
   
   });