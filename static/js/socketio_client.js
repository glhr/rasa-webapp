import io from 'socket.io-client';
import * as handler from './index.js';

var socket = io('http://localhost:5005',{
    transports: ['websocket'],
    upgrade: false
});

socket.on('connected', function(data) {
    console.log('socket connected~~~~');
})

socket.on('session_confirm', function(remoteId) {
  console.log('session_confirm: session_id:${remoteId}');
})

socket.on('bot_uttered', function(data) {
    console.log('BOT REPLIED: ', data);
    handler.receivedBotMessage(data);
})

socket.on('user_uttered', function(data) {
    console.log('USER SAID: ', data);
    handler.addUserMessage(data.text);
})

export function sendUserMessage(text) {
  if (text && text.length >= 1 && text.replace(/\s/g, '').length !== 0) {
    socket.emit('user_uttered',{'message':text});
  }
}
