<template>
  <div class="connection">
      <div class="login-box">
        <img class="top-logo" alt="Logo" src="../assets/img/icon-left-font-monochrome-white.png">
        <h2>Vous connecter</h2>
        <div class="parts">
          <label class="labels" for="mail">Adresse-mail :</label><br>
          <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" id="username" name="mail" type="text" placeholder="Entrez votre adresse mail" required>
        </div>
        <div class="parts">
          <label class="labels" for="password">Mot de passe : </label><br>
          <input id="password" name="password" type="password" placeholder="Entrez votre mot de passe" required>
        </div>
        <input class="valid" v-on:click="greet" type="submit" value="Se connecter">
        <div class="propose">
          <p>Vous n'avez pas de compte ?</p><a href=""><router-link to="/inscription">S'inscrire</router-link></a>
        </div>
      </div>
  </div>
</template>
<script>

export default {
  name: 'connect',
  methods : {
      greet : async function connect() {
				var username = document.getElementById('username').value
				var password = document.getElementById('password').value
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "email": username,
						"password": password
					})
        };
				await fetch('http://127.0.0.1:3000/login', requestOptions).then((res) => res.json()).then(data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.user.user_ID);
          if(data.msg == "Logged in!") {
            location.assign('http://localhost:8080/#/home');
          }
        })
      }
      }
}
</script>

<style scoped>
@font-face {
  font-family: Montserrat;
  src: url(../assets/fonts/Montserrat-Regular.ttf) format("truetype");
}
* {
  padding: 0;
  margin: 0;
}
.top-logo {
  width: 80%;
  height: 50px;
  object-fit: cover;
  margin-bottom: 20px;
}
.parts {
  margin: 5px 0;
  width: 100%;
}
.propose {
  display: flex;
  flex-direction: row;
}
.propose a {
  margin-left: 3px;
}
.connection {
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96vh;
  background-image: url('../assets/img/back2.jpg');
  background-attachment: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.login-box {
    width: 20%;
    height: auto;
    padding: 50px;
    background: #b1a7a6;
    color: black;
    font-family: 'Montserrat';
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.login-box h2 {
  margin: 10px 0;
  color: white;
  padding-bottom: 2px;
  padding-right: 10px;
  border-bottom: 2px solid white;
}
a {
  color: black;
  font-weight: bold;
}
input {
  width: 100%;
  height: 35px;
  border: none;
  padding: 3px 8px;
  background: #f8f9fa;
  border-bottom: 1px solid black;
  -webkit-box-shadow: 0 0 0 30px #f8f9fa inset !important;
  margin: 5px 0;
}
.valid {
    margin: 20px 0;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    background: #edede9;
    color: black;
    font-size: 18px;
    transition-duration: 0.3s;
    width: 40%;
}
.valid:hover {
  transform: scale(1.05);
  cursor: pointer;
  transition-duration: 0.3s;
}
</style>
