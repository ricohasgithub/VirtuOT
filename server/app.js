
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
    });

    // Player movement update code
    setInterval(function () {

        // console.log(position.x);
        // console.log(position.y);

        // Update the current x position
        if (position.x < (movementIntent.x - 2)) {
            position.x += 2;
        } else if (position.x > (movementIntent.x + 2)) {
            position.x -= 2;
        }

        // Update the current y position
        if (position.y < (movementIntent.y - 2)) {
            position.y += 2;
        } else if (position.y > (movementIntent.y + 2)) {
            position.y -= 2;
        }

        // Emit to the global clientbase (ALL Client machines)
        socketio.emit("position", position);

    }, 10);

});

// Serve the express socket.io server
http.listen(3000, () => {
    console.log("Listening at port 3000...");
});

/*

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/7.18.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/7.18.0/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

*/
