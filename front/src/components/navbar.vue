<template>
  <div class="navbar">
    <div class="navbarContent">
      <img class="top-logo" alt="Logo" src="../assets/img/icon-left-font-monochrome-white.png">
      <div class="boutons">
        <a v-if="admin > 0"><router-link to="/admin"><i class="fa-solid fa-user-gear"></i></router-link></a>
        <a href=""><router-link to="/home"><i class="fa-solid fa-newspaper"></i></router-link></a>
        <a href=""><router-link to="/profil"><i class="fa-solid fa-user"></i></router-link></a>
        <a href=""><router-link v-on:click="greet()" to="/connexion"><i class="fa-solid fa-right-from-bracket"></i></router-link></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
        return {admin:undefined}
    },
  methods : {
      admini : async function admini() {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        var id = localStorage.getItem('userId');
				await fetch('http://127.0.0.1:3000/userAdmin/' + id, requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
            this.admin=data[0].isAdmin;
          }
        })
      },
      greet : async function disconnect() {
				localStorage.removeItem('userId');
        localStorage.removeItem('token');
      }
  },
  mounted: function(){
      this.admini();
    }
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
.navbar {
    background: #1F1C1D;
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
}
.navbarContent {
  width: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.boutons {
  width: 25%;
  display: flex;
  justify-content: space-evenly;
}
.boutons a {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-family: 'Montserrat';
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  font-size: 20px;
  transform: scale(1.05);
}
a:hover {
  transform: scale(1.05);
  cursor: pointer;
  transition-duration: 0.3s;
}
.boutons a:nth-child(1) {
  color: black;
}
.top-logo {
    width: 150px;
    height: 50px;
    object-fit: cover;
}
@media screen and (max-width : 1440px) {
.boutons {
  width: 30%;
}
}
@media screen and (max-width : 1025px) {
.boutons {
  width: 40%;
}
}
@media screen and (max-width : 767px) {
.boutons {
  width: 55%;
}
.butons a {
  font-size: 10px;
  width: 20px;
  height: 20px;
}
.top-logo {
    width: 120px;
}
.navbarContent {
  width: 70%; 
}
}
@media screen and (max-width : 425px) {
.boutons {
  width: 55%;
}
.butons a {
  font-size: 10px;
  width: 20px;
  height: 20px;
}
.top-logo {
    width: 120px;
}
.navbarContent {
  width: 95%; 
}
}
</style>
