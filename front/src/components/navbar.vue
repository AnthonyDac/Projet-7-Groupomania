<template>
  <div class="navbar">
    <div class="navbarContent">
      <img class="top-logo" alt="Logo" src="../assets/img/icon-left-font-monochrome-white.png">
      <div class="boutons">
        <a v-if="admin > 0" href=""><router-link to="/home"><i class="fa-solid fa-screwdriver-wrench"></i></router-link></a>
        <a href=""><router-link to="/home"><i class="fa-solid fa-newspaper"></i></router-link></a>
        <a href=""><router-link to="/profil"><i class="fa-solid fa-user"></i></router-link></a>
        <a href="" v-on:click="greet"><router-link to="/connexion"><i class="fa-solid fa-right-from-bracket"></i></router-link></a>
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
      admins : async function admins() {
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
  created: function(){
      this.admins();
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
  width: 19%;
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
    width: 15%;
    height: 50px;
    object-fit: cover;
}
</style>
