
// Retrieve dependencies
const express = require("express")();
const http = require("http").Server(express);
const socketio = require("socket.io")(http);

// Track the player's current position
let position = {
    x: 200,
    y: 200
};

// Track the player's intent (where to move to)
let movementIntent = {
    x: 200,
    y: 200
}

// Have the socket listen for the connection event (triggered at everytime a player goes onto the server)
socketio.on("connection", socket => {

    // Emit a message (as position) to the opened socket
    socket.emit("position", position);

    // Listen for Vue.js client-side move requests
    socket.on("move", data => {

        // Update the movementIntent's x and y values from the client-side
        movementIntent.x = data.x;
        movementIntent.y = data.y;

        console.log(movementIntent.x);
        console.log(movementIntent.y);

    });

    setInterval(function(){
        console.log("Hello");

        // Update the current x position
        if (position.x < (movementIntent.x - 5)) {
            position.x += 5;
        } else if (position.x > (movementIntent.x + 5)) {
            position.x -= 5;
        }

        // Update the current y position
        if (position.y < (movementIntent.y - 5)) {
            position.y += 5;
        } else if (position.y > (movementIntent.y + 5)) {
            position.y -= 5;
        }

        // Emit to the global clientbase (ALL Client machines)
        socketio.emit("position", position);
    }, 1000);

});

// Serve the express socket.io server
http.listen(3000, () => {
    console.log("Listening at port 3000...");
});

