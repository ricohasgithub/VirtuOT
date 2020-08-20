<template>
  <div>
    <canvas ref = "space" v-on:click = "move" width = "1200" height = "550" style = "border: 1px solid black;"></canvas>
  </div>
</template>

<script>

    import Player from "..//js/Player.js"

    export default {
        name: 'Atrium',
        extends: Player
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
