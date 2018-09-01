import socketIOClient from 'socket.io-client';

const endpoint = 'http://localhost:8000';
const socket = socketIOClient(endpoint);

const Events = {
  on:{
    chatMessage(){
      socket.on('chat message', (message) => {
        console.log(message);
      })
    },
    buttonPress(){
      socket.on('button press', (message) => {
        console.log(message);
      })
    },
    youtubeStart(){
      socket.on('youtube start', (message) => {
        console.log(message);
      })
    }
  },
  emit:{
    chatMessage(message){
      socket.emit('chat message', `User: ${message[0]} said ${message[1]}`);
    },
    buttonPress(message){
      socket.emit('button press', message);
    },
    youtubeStart(message){
      socket.emit('youtube start', message)
    }
  }
}

export default Events;
