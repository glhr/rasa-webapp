import * as socket from './socketio_client.js';
import * as voice from './voice.js';
import * as tts from './tts.js';

// var $ = require("jquery");

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

$( document ).ready(function() {
    // $(".dropdown-trigger").dropdown({
		// 	'constrainWidth':false,
		// 	'coverTrigger':false
		// });
	  // $('#voice-selector').formSelect();
});

export function addUserAudio(msg) {
	// addUserMessageToList("Audio");
	socket.sendUserMessage(msg);
}

export function addUserMessage(msg) {
	addUserMessageToList(msg);
}

export function receivedBotMessage(data) {

	if (data.text) {
		// console.log('Data:'+data.text)
		console.log("-> receivedBotMessage - type:text - " + data.text)
		tts.sayText(data.text);
		addBotMessageToList(data.text, 'text');
	}
	else if (data.attachment) {
		if (data.attachment.type == 'image') {
			console.log("-> receivedBotMessage - type:image - " + data.attachment.payload.src)
			addBotMessageToList(data.attachment.payload.src, 'image');
		}

	}
}



function scrollDown() {
	var d = $('#msg_ul');
	d.scrollTop(d.prop("scrollHeight"));
}

function addBotMessageToList(data, type) {
		console.log("-> addBotMessageToList")
		if (type == 'text') {
			$('#msg_ul').append('<li class="collection-item botmsg_li"><span class="botmsg_span speech-bubble speech-bubble-right">'+data+'</span></li>');
		}
		else if (type == 'image') {
			$('#msg_ul').append('<li class="collection-item botmsg_li"><span class="botmsg_span speech-bubble speech-bubble-right"><img src="'+data+'"></span></li>');
		}
		scrollDown();
}

function addUserMessageToList(data) {
	console.log("-> addUserMessageToList")
    $("#msg_ul").append('<li class="collection-item usermsg_li"><span class="usermsg_span speech-bubble speech-bubble-left">'+data+'</span></li>');
		scrollDown();
}

$('#user_input_form').submit(function(e) {
		e.preventDefault();
		var msg = $("#user_input").val();
		console.log("user input " + msg);
		socket.sendUserMessage(msg);
		$("#user_input").val('');
});

var recordButton = $("#record-button");
var stopButton = $("#stop-button");
stopButton.hide();
recordButton.show();
//add events to those 2 buttons

recordButton.click(voice.startRecording);
stopButton.click(voice.stopRecording);

export function toggleRecordButton(state) {
	if (state=='off') {
		console.log('button off');
		recordButton.hide();
		stopButton.show();
		// recordButton.disabled = true;
		// stopButton.disabled = false;
	}
	else if (state=='on') {
		console.log('button on');
		stopButton.hide();
		recordButton.show();
		// recordButton.disabled = false;
		// stopButton.disabled = true;
	}
}
