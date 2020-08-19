
// Retrieve dependencies
const express = require("express")();
const http = require("http").Server(express);
const socketio = require("socket.io")(http);

// Track the player positions
let position = {
    x: 200,
    y: 200
};

// Have the socket listen for the connection event (triggered at everytime a player goes onto the server)
socketio.on("connection", socket => {
    // Emit a message (as position) to the opened socket
    socket.emit("position", position);
});

// Serve the express socket.io server
http.listen(3000, () => {
    console.log("Listening at port 3000...");
});

