import Speech from "speak-tts";

const _addVoicesList = voices => {
  voices.forEach(voice => {
    $("#voice-selector").append(`<li><a href="#!">${voice.name} (${voice.lang})</a></li>`);
    // html += `<option value="${voice.lang}" data-name="${voice.name}">${
    //   voice.name
    // } (${voice.lang})</option>`;
  });
};

const speech = new Speech();

function _init() {
  speech
    .init({
      volume: 0.5,
      lang: "en-GB",
      rate: 1,
      pitch: 1,
      //'voice':'Google UK English Male',
      //'splitSentences': false,
      listeners: {
        onvoiceschanged: voices => {
          console.log("Voices changed", voices);
        }
      }
    })
    .then(data => {
      console.log("Speech is ready", data);
      _addVoicesList(data.voices);
    })
    .catch(e => {
      console.error("An error occured while initializing : ", e);
    });
  const text = speech.hasBrowserSupport()
    ? "Hurray, your browser supports speech synthesis"
    : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !";
  console.log(text);
}

export function sayText(text) {
  const languages = document.getElementById("languages");
  const language = languages.value;
  const voice = languages.options[languages.selectedIndex].dataset.name;
  if (language) speech.setLanguage(languages.value);
  if (voice) speech.setVoice(voice);
  speech
    .speak({
      text: text,
      queue: false,
      listeners: {
        onstart: () => {
          console.log("Start utterance");
        },
        onend: () => {
          console.log("End utterance");
        },
        onresume: () => {
          console.log("Resume utterance");
        },
        onboundary: event => {
          console.log(
            event.name +
              " boundary reached after " +
              event.elapsedTime +
              " milliseconds."
          );
        }
      }
    })
    .then(data => {
      console.log("Success !", data);
    })
    .catch(e => {
      console.error("An error occurred :", e);
    });
}

_init();
