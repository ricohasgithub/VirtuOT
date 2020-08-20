import io from "socket.io-client"

export default {
    data() {
        return {
            socket: {},
            context: {},
            image: [
                {src: "..//assets/steve.png"},
                {src: "..//assets/steve1.png"},
                {src: "..//assets/steve2.png"}
            ],
            position: {
                x: 0,
                y: 0
            }
        }
    },
    created() {
        // Connect to the socket
        this.socket = io("http://localhost:3000");
        // Load the avatar images
        this.avatarR1 = new Image();
        this.avatarR1.src = this.image[0].src;
        this.avatarR1.onload = () => { console.log("Image R1 loaded"); }

        this.avatarR2 = new Image();
        this.avatarR2.src = this.image[1].src;
        this.avatarR2.onload = () => { console.log("Image R2 loaded"); }

        this.avatarR3 = new Image();
        this.avatarR3.src = this.image[2].src;
        this.avatarR3.onload = () => { console.log("Image R3 loaded"); }
    },
    mounted() {

        // Set the context variable to the canvas object (space)
        this.context = this.$refs.space.getContext("2d");

        // Change the settings so the resized image won't be blurry
        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

        //let index = 0;

        // Listen for the position message emitted form the server
        this.socket.on("position", data => {

            // Set the current position object to the incomming emitted data
            this.position = data;

            // Clear the current canvas
            this.context.clearRect(0, 0, this.$refs.space.width, this.$refs.space.height);

            // Animate the player's avatar
            this.context.drawImage(this.avatarR1, this.position.x, this.position.y, 180, 200);
            // if (index === 0) {
            //     this.context.drawImage(this.avatarR1, this.position.x, this.position.y, 180, 200);
            //     // index++;
            // } else if (index === 1) {
            //     this.context.drawImage(this.avatarR2, this.position.x, this.position.y, 180, 200);
            //     index++;
            // } else if (index === 2) {
            //     this.context.drawImage(this.avatarR3, this.position.x, this.position.y, 180, 200);
            //     index--;
            // }

            // // Draw the rectangle based off of server-side position data
            // this.context.fillRect(this.position.x, this.position.y, 20, 20);

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