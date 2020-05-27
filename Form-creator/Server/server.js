"use strict";
exports.__esModule = true;
var http = require("http");
var websocket = require("ws");
var server = http.createServer(function (req, res) {
    res.end("I'm connected");
});
var socket = new websocket.Server({ server: server });
socket.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
});
server.listen(8080);
