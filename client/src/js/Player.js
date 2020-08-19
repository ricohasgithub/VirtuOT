import io from "socket.io-client"

export default {
    data() {
        return {
            socket: {},
            context: {},
            position: {
                x: 0,
                y: 0
            }
        }
    },
    created() {
        this.socket = io("http://localhost:3000");
    },
    mounted() {
        // Set the context variable to the canvas object (space)
        this.context = this.$refs.space.getContext("2d");
        // Listen for the position message emitted form the server
        this.socket.on("position", data => {
            // Set the current position object to the incomming emitted data
            this.position = data;
            // Clear the current canvas
            this.context.clearRect(0, 0, this.$refs.space.width, this.$refs.space.height);
            // Draw the rectangle based off of server-side position data
            this.context.fillRect(this.position.x, this.position.y, 20, 20);
        });
    },
    methods: {
        move: function (event) {
            // Get the player's intended move
            let x = event.clientX;
            let y = event.clientY;
            // Package coordinates
            let cursor = {
                x,
                y
            };
            // Send intended position to the server
            this.socket.emit("move", cursor);
        }
    }
}