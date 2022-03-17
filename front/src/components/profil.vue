<template>
<div class="body">
  <navbar/>
  <div class="profilContainer">
    <div class="profil" v-for="item in list" v-bind:key="item.message">
            <img class="avatar" v-bind:src="item.avatarURL">
            <p><b>Nom :</b> {{item.firstname}} {{item.lastname}}</p>
            <p><b>Adresse-mail : </b>{{item.email}}</p>
            <p>Importer un nouvel avatar : </p>
            <input id="image" name="file" type="file">
        </div>
        <div class="buttons">
          <button class="edit_button" v-on:click="avatarUpdate">Valider le nouvel avatar</button>
          <button class="delete_button" v-on:click="fauttry">Supprimer votre compte</button>
        </div>
  </div>
</div>
</template>
<script>

import navbar from './navbar.vue'


export default {
  name: 'profil',
  components: {
   navbar
  },
  data() {
    return {list:undefined}
  },
  methods : {
      greet : async function display() {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        var id = localStorage.getItem('userId');
				await fetch('http://127.0.0.1:3000/profil/' + id, requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
            this.list=data;
          }
        })
      },
      deleteAccount : async function deleteUser() {
        console.log("Suppression d'utilisateur!");
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
        var id = localStorage.getItem('userId');
				await fetch('http://127.0.0.1:3000/delete_user/' + id, requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
            let url = location.href;
            let newUrl = url.replace("profil", "connexion");
            window.location.replace(newUrl);
            localStorage.setItem('userId', null);
          }
        })
      },
      fauttry : async function goTry() {
        if (confirm('Etes-vous sur de vouloir supprimer votre compte ? Aucune récupération ne serait possible!')) {
          this.deleteAccount();
        }
      },
      avatarUpdate : async function publish() {
        var userID = localStorage.getItem('userId');
        var imagePost = document.getElementById('image');
        const formdata = new FormData();
        if(!imagePost.files[0]) {
          formdata.append("image", null);
          formdata.append("user_ID", userID);
        } else {
          formdata.append("image", imagePost.files[0]);
          formdata.append("user_ID", userID);
        }
        const requestOptions = {
          method: "POST",
          body: formdata
        }
        var id = localStorage.getItem('userId');
        if(imagePost.files[0] == null) {
          alert('Aucun avatar choisi!')
        } else {
          await fetch('http://127.0.0.1:3000/update_profil/' + id, requestOptions).then((res) => res.json()).then(data => {
          console.log(data);
          location.reload();
        })
        }
        }
    },
    created: function(){
        this.greet()
      }
  }
</script>

<style scoped>
@font-face {
  font-family: Montserrat;
  src: url(../assets/fonts/Montserrat-Regular.ttf) format("truetype");
}
.profil {
  margin-top: 100px;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 30px 0;
}
.delete_button {
  border: none;
  padding: 10px;
  background: #FFA69E;
  font-family: 'Montserrat';
  font-size: 16px;
  color: black;
  transition-duration: 0.3s;
  border-radius: 10px;
}
.delete_button:hover {
  background: #FF686B;
  cursor: pointer;
  transition-duration: 0.3s;
  color: white;
}
.edit_button {
  border: none;
  padding: 10px;
  background: #95ecb0;
  font-family: 'Montserrat';
  font-size: 16px;
  color: black;
  transition-duration: 0.3s;
  border-radius: 10px;
}
.edit_button:hover {
  background: #67d193;
  cursor: pointer;
  transition-duration: 0.3s;
  color: white;
}
.body {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.avatar {
  width: 50%;
}
.profilContainer {
  color: black;
  font-family: 'Montserrat';
  width: 40%;
  margin: auto;
  text-align: center;
  background: #edede9;
  border-radius: 0 0 15px 15px;
  font-family: 'Montserrat';
}
</style>
