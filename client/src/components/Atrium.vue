<template>
  <div>
    <canvas ref = "space" width = "640" height = "480" style = "border: 1px solid black;">

    </canvas>
  </div>
</template>

<script>

    import io from "socket.io-client"

    export default {
        name: 'Atrium',
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
                this.position = data;
                // Draw the rectangle based off of server-side position data
                this.context.fillRect(this.position.x, this.position.y, 20, 20);
            });
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
