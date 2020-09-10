# rasa-webapp
Web-app for interfacing with a [RASA](https://github.com/RasaHQ/rasa) chat-bot, built on:

- [Materialize-CSS](https://github.com/Dogfalo/materialize) for styling
- [Webpack](https://github.com/webpack/webpack) for bundling JavaScript files
- [Socket.IO client](https://github.com/socketio/socket.io-client) for real-time communication with the RASA back-end
- [Flask](https://github.com/pallets/flask) for quick & easy deployment
- [RecorderJS](https://github.com/mattdiamond/Recorderjs) for recording and saving the user's voice within the browser

Currently, the web-app supports:

- text and image messages from the bot
- text and audio messages from the user; audio messages are transcribed in the back-end and sent back to the client for display

The RASA assistant used in this project can be found [here](https://github.com/glhr/rasa_project).


## Install

Install npm dependencies:
```
cd static
npm install --save css-loader file-loader materialize-css jquery style-loader socket.io-client url-loader webpack webpack-cli speak-tts
```
Install Python dependencies:
```
pip3 install eventlet flask
```

## Run
Build the front-end with webpack (this will generate ``/static/dist/bundle.js``):
```
npm run build  # this will build the project once
npm run watch  # this will continuously build the project any time a source file is updated
```
Deploy the Flask application:
```
python3 main.py
```
This will launch the application at http://localhost:8080/ (as defined in ``main.py``), with the Socket.IO client listening on http://localhost:5005 (as defined in ``static/js/socketio_client.js``).

## Screenshots

![Screenshot1][scrot1]

![Screenshot2][scrot2]


[scrot1]: docs/Screenshot1.png "Screenshot1"
[scrot2]: docs/Screenshot2.png "Screenshot2"
