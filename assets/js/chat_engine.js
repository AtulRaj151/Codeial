
class ChatEngine {
      constructor(chatBoxId,userEmail) {
            this.chatBox = $(`#${chatBoxId}`);
            this.userEmail = userEmail;

            this.socket = io.connect('http://54.209.163.42:5000');

            if(this.userEmail){
                this.connectionHandler();
            }

      }
      connectionHandler(){
              let self = this;
              this.socket.on('connect',function(){
                   console.log("connection established using socket");

                   self.socket.emit('join_room',{
                        user_email:self.userEmail,
                        chatroom: 'codeial'
                });
                self.socket.on('user_joined',function(data){
                         console.log("User joined",data);
                  })
              });
             

              $('#send-message').click(function(){
                      let msg = $('#chat-message-input').val();

                       if(msg !=''){
                               self.socket.emit('send_message',{
                                       message:msg,
                                       user_email:self.userEmail,
                                       chatroom: "codeial"
                               });
                       }
              });
              self.socket.on('recieve_message',function(data){
                      console.log('Message recieved',data);

                      let newMessage = $('<li>');

                      let messageType = 'other-message';
                      if(data.user_email == self.userEmail){
                              messageType = 'self-message';
                      }

                      newMessage.append($('<span>',{
                        'html': data.message
                      }))

                      newMessage.append($('<sub>',{
                             'html': data.user_email
                      }))

                      newMessage.addClass(messageType);

                      $('#chat-messages-list').append(newMessage);
              })
      }
}