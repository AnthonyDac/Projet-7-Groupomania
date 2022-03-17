<template>
  <div class="footer">
    <a>© Groupomania |</a>
    <a href="mailto:contact@groupomania.fr">Contact : contact@groupomania.fr</a>
  </div>
</template>

<script>
export default {
  name: 'foot'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@font-face {
  font-family: Montserrat;
  src: url(../assets/fonts/Montserrat-Regular.ttf) format("truetype");
}
* {
    padding: 0;
    margin: 0;
}

.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #1F1C1D;
    font-family: 'Montserrat';
    font-size: 16px;
    color: white;
}
.footer a {
    color: white;
    text-decoration: none;
    margin: 0 5px;
}
</style>
