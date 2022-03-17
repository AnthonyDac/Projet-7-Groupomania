<template>
<div>
    <navbar/>
    <div class="container">
        <div class="">
          <table class="GeneratedTable">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>userID</th>
                <th>Email</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Admin Level</th>
                <th>Suppression</th>
                <th>Définir Admin</th>
                <th>Retirer Admin</th>
              </tr>
            </thead>
            <tbody v-for="item in list" v-bind:key="item.user_ID">
              <tr>
                <td><img class="avatar" v-bind:src="item.avatarURL"></td>
                <td>{{item.user_ID}}</td>
                <td>{{item.email}}</td>
                <td>{{item.firstname}}</td>
                <td>{{item.lastname}}</td>
                <td>{{item.isAdmin}}</td>
                <td><button class="btn delete" v-on:click="deleteUser(item.user_ID)">Supprimer</button></td>
                <td><button class="btn up" v-on:click="setAdmin(item.user_ID)">Promouvoir</button></td>
                <td><button class="btn delete" v-on:click="removeAdmin(item.user_ID)">Retirer</button></td>
              </tr>
            </tbody>
            </table>
        </div>
    </div>
</div>
</template>
<script>
import navbar from './navbar.vue'

export default {
    name: 'admin',
    data() {
        return {list:undefined,admin:undefined}
    },
    components: {
    navbar
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
            if(data[0].isAdmin != 1) {
                location.assign('http://localhost:8080/#/home');
            } else {
                this.greet();
            }
          }
        })
      },
      greet : async function display() {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
				await fetch('http://127.0.0.1:3000/allProfils', requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
              this.list=data;
          }
        })
      },
      setAdmin : async function setAdmin(value) {
        console.log(value)
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
        var id = value;
				await fetch('http://127.0.0.1:3000/userNowAdmin/' + id, requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
            console.log(data);
            location.reload();
          }
        })
      },
      removeAdmin : async function removeAdmin(value) {
        console.log(value)
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
        var id = value;
				await fetch('http://127.0.0.1:3000/userNotAdmin/' + id, requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
            console.log(data);
            location.reload();
          }
        })
      },
      deleteUser : async function deleteUser(value) {
        console.log(value)
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
        var id = value;
				await fetch('http://127.0.0.1:3000/delete_user/' + id, requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
            console.log(data);
            location.reload();
          }
        })
      },
    },
    created: function(){
      this.admins();
    }
}
</script>
<style scoped>
@font-face {
  font-family: Montserrat;
  src: url(../assets/fonts/Montserrat-Regular.ttf) format("truetype");
}
* {
    margin: 0;
    padding: 0;
    color: black;
    font-family: 'Montserrat';
}
.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  background-image: url('../assets/img/back2.jpg');
}
.btn {
  border: none;
  padding: 5px;
  transition-duration: 0.3s;
  border-radius: 10px;
}
.delete {
  background: #FFA69E;
}
.delete:hover {
  background: #FF686B;
  cursor: pointer;
  transition-duration: 0.3s;
  color: white;
}
.up {
  background: #95ecb0;
}
.up:hover {
  background: #67d193;
  cursor: pointer;
  transition-duration: 0.3s;
  color: white;
}
table.GeneratedTable {
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border-width: 2px;
  border-color: #ffcc00;
  border-style: solid;
  color: #000000;
  margin: auto;
  margin: 90px 0;
}

table.GeneratedTable td, table.GeneratedTable th {
  border-width: 2px;
  border-color: #ffcc00;
  border-style: solid;
  padding: 10px;
  text-align: center;
}

table.GeneratedTable thead {
  background-color: #ffcc00;
}
</style>