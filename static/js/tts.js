var googleTTS = require('google-tts-api');



export function sayText(text) {
  console.log("TTS: " + text)
  googleTTS(text, 'en', 1)   // speed normal = 1 (default), slow = 0.24
  .then(function (url) {
    console.log(url); // https://translate.google.com/translate_tts?...
    var a = new Audio(url);
    a.play();
  })
  .catch(function (err) {
    console.error(err.stack);
  });
}
