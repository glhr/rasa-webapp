# rasa-webapp
Web-app for interfacing with a RASA chat-bot

## Install

Install npm dependencies:
```
cd static
npm install
```
Install Python dependencies:
```
pip3 install eventlet flask
```

## Run
Build the front-end with webpack:
```
npm run build  # this will build the project once
npm run watch  # this will continuously build the project any time a source file is updated
```
Deploy the application using flask:
```
python3 main.py
```
This will launch the application at http://localhost:8080/ (as defined in ``main.py``). Socket.IO listens on http://localhost:5005 (as defined in ``static/js/socketio_client.js``).

## Screenshots

![Screenshot1][scrot1]


[scrot1]: docs/Screenshot1.png "Screenshot1"
