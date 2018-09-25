import socketIOClient from 'socket.io-client';
import {onYouTubeIframeAPIReady} from './youtubeUtils';

const endpoint = 'http://localhost:8000';
var socket = {};

try{
  socket = socketIOClient(endpoint);
}
catch(err){
  console.log(err);
}

const Events = {
  on:{
    chatMessage(){
      socket.on('chat message', (message) => {
        console.log(message);
      })
    },
    youtubePlayerCreated(){
      socket.on('youtube player created', (message) => {
        onYouTubeIframeAPIReady(message[0]);
      })
    },
    updateViewers(room){
      socket.on('update view count', (message) => {
        console.log('Updating view count.');
      })
    }
  },
  emit:{
    chatMessage(message){
      socket.emit('chat message', `User: ${message[0]} said ${message[1]}`);
    },
    youtubePlayerCreated(message){
      socket.emit('youtube player created', message);
    },
    updateViewers(message){
      socket.emit('update view count', message);
    }
  }
}

export default Events;
