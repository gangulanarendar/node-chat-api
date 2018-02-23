const expect=require('expect');
var {generateMessage}=require('./message');

describe('generate message function',()=>{
 it('should create a new message',()=>{
     var from ='admin';
    var text='hello all';
    
    var msg=generateMessage(from,text);

    expect(typeof msg.createdAt).toBe('number');
    expect(msg).toMatchObject({from,text});

 })

});