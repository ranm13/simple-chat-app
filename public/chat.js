const socket = io.connect('https://simple-chat-io.herokuapp.com/');
const message = $('#message'),
      handler = $('#handler'),
      btn = $('#send'),
      output = $('#output'),
      feedback = $('#feedback');

btn.on('click', function(){
    socket.emit('chat', {
        message: message.val(),
        handler: handler.val()
    });
    message.val(" ") 
});

message.on('keypress', function(){
    socket.emit('typing', handler.val());
})

socket.on('chat', function(data){
    feedback.html(' ') 
    output.append(`<p><strong>  ${data.handler}  : </strong>  ${data.message}  </p>`)  
});

socket.on('typing', function(data){
    feedback.html(`<p><em>  ${data }  is typing a message...</em></p>`)  
});
