<template>
  <div>
    <canvas ref = "space" width = "640" height = "480" style = "border: 1px solid black;">

    </canvas>
  </div>
</template>

<script>

    import io from "socket.io"

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
            this.socket = io("https://localhost:3000");
        },
        mounted() {
            this.context = this.$refs.space.getContext("2d");
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
