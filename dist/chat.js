const socket = io.connect('https://simple-chat-io.herokuapp.com/');
const message = $('#message'),
      handler = $('#handler'),
      button = $('#send'),
      output = $('#output'),
      feedback = $('#feedback');

const sendMessage = function(){
    let messageData = {
        message: message.val(),
        handler: handler.val()
    }
    socket.emit('chat', messageData);
    message.val(" ") 
}

button.on('click', sendMessage);

message.on('keypress', function(){
    if(event.keyCode == 13) sendMessage() //pressing enter will also trigger sending a message
    socket.emit('typing', handler.val());
})

socket.on('chat', function(data){
    feedback.html(' ') 
    output.append(`<p><strong>  ${data.handler}  : </strong>  ${data.message}  </p>`)  
});

socket.on('typing', function(data){
    feedback.html(`<p><em>  ${data }  is typing a message...</em></p>`)  
});
