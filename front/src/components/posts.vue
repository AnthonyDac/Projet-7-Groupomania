<template>
    <div class="postContainer">
        <div class="message" v-for="item in list" v-bind:key="item.message">
            <div class="postInfos">
              <div class="postAvatar">
                <img class="avatar" v-bind:src="item.avatarURL">
              </div>
              <div class="">
                <p><b><i>{{item.firstname}} {{item.lastname}}</i></b> a écrit :</p>
                <p class="date">Le {{item.date_creation}}</p>
              </div>
            </div>
            <p>{{item.message}}</p>
            <img class="msg_img" v-bind:src="item.imageURL">
            <div v-if="admin > 0" class="admin"><button id="supp_btn" v-on:click="deleting(item.post_ID)" v-bind:value="item.post_ID">Supprimer</button><a>ID du post : <span>{{item.post_ID}}</span></a><a>/ID user : <span>{{item.user_ID}}</span></a></div>
            <div class="commentContainer">
              <div class="comment">
                <textarea v-model="publisher" id="publisher" name="publication" placeholder="Ecrivez votre commentaire.."></textarea>
              </div>
              <div class="buttons">
                <button class="validation" v-on:click="commentating(item.post_ID)">Envoyer<i class="fa-solid fa-angles-right"></i></button>
              </div>
              <div class="comm" v-for="element in item.comment" v-bind:key="element.commentaire_ID">
                <div class="commentInfos">
                  <div class="commentAvatar">
                    <img v-if="element.commentaire" class="comment_avatar" v-bind:src="element.avatarURL">
                  </div>
                  <div class="">
                    <p v-if="element.commentaire"><b><i>{{element.firstname}} {{element.lastname}}</i></b> a commenté :</p>
                    <p v-if="element.commentaire" class="date">Le {{element.date_commentaire}}</p>
                  </div>
                </div>
                <p v-if="element.commentaire_ID != null">{{element.commentaire}}</p>
                <div v-if="admin > 0 && element.commentaire"><button id="supp_btn" class="comment_btn_supp" v-on:click="comdeleting(element.commentaire_ID)" v-bind:value="element.commentaire_ID">Supprimer</button></div>
              </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'navbar',
    data() {
        return {list:undefined,admin:undefined}
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
      greet : async function display() {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
				await fetch('http://127.0.0.1:3000/allPosts', requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
              this.list=data;
          }
        })
      },
      commentating : async function commentating(id) {
        var userID = localStorage.getItem('userId');
        const formdata = new FormData();
        {
          formdata.append("image", null);
          formdata.append("user_ID", userID);
          formdata.append("commentaire", this.publisher);
          formdata.append("post_ID", id);
        }
        const requestOptions = {
          method: "POST",
          body: formdata
        };
        await fetch('http://127.0.0.1:3000/commenter', requestOptions).then((res) => res.json()).then(data => {console.log(data);})
        location.reload();
      },
      deleting : async function deleting(value) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
        var id = value;
				await fetch('http://127.0.0.1:3000/delete_post/' + id, requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
              location.reload();
          }
        })
      },
      comdeleting : async function comdeleting(value) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
        var id = value;
				await fetch('http://127.0.0.1:3000/delete_comment/' + id, requestOptions).then((res) => res.json()).then(data => {
          if(data.error != null) {
            console.log(data.error);
          } else {
              location.reload();
          }
        })
      }
    },
    created: function(){
      this.admins();
      this.greet();
    }
}
</script>
<style scoped>
@font-face {
  font-family: Montserrat;
  src: url(../assets/fonts/Montserrat-Regular.ttf) format("truetype");
}
.commentInfos {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
}
.commentAvatar {
  margin: 0 10px;
}
.postInfos {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
}
.postAvatar {
  margin: 0 10px;
}
.comment_avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
}
.comm {
  background: white;
  border-radius: 10px;
  padding: 5px;
  margin: 5px 0;
}
.comment_btn_supp {
  border: none;
  padding: 5px;
  background: #FFA69E;
  font-family: 'Montserrat';
  font-size: 14px;
  color: black;
  transition-duration: 0.3s;
  border-radius: 10px;
  margin: 5px;
}
.comment_btn_supp:hover {
  background: #FF686B;
  cursor: pointer;
  transition-duration: 0.3s;
  color: white;
  transform: scale(1.1);
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.round_btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: white;
  font-size: 18px;
  margin-left: 10px;
  transition-duration: 0.3s;
}
.round_btn:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition-duration: 0.3s;
}
.admin button {
  border: none;
  padding: 5px;
  background: #FFA69E;
  font-family: 'Montserrat';
  font-size: 16px;
  color: black;
  transition-duration: 0.3s;
  border-radius: 10px;
  margin: 5px;
}
.admin button:hover {
  background: #FF686B;
  cursor: pointer;
  transition-duration: 0.3s;
  color: white;
  transform: scale(1.1);
}
.msg_img {
  width: 60%;
}
.date {
  font-size: 14px;
  margin-top: -10px;
}
.comment {
  margin: 10px 0;
}
.commentContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  border-top: 3px solid #c9ada7;
  margin-top: 10px;
}
.validation {
  background: white;
  border: none;
  padding: 10px 10px;
  border-radius: 10px;
  width: 25%;
  margin: 10px 0;
  font-size: 16px;
  font-family: 'Montserrat';
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.3s;
}
.validation:hover {
    transform: scale(1.05);
    cursor: pointer;
    transition-duration: 0.3s;
}
.validation i {
  margin-left: 10px;
}
#publisher {
  width: 100%;
  border: none;
  padding: 5px 0 0 5px;
  border-radius: 5px;
  resize: none;
  height: 50px;
  font-size: 15px;
  font-family: 'Montserrat';
}
.postContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: black;
    font-family: 'Montserrat';
    margin-bottom: 65px;
}
.message {
    background: #edede9;
    width: 60%;
    min-height: 100px;
    margin: 15px 0;
    border-radius: 15px;
    padding: 10px;
}
.avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
}
@media screen and (max-width : 767px) {
.message {
    background: #edede9;
    width: 80%;
    min-height: 100px;
    margin: 15px 0;
    border-radius: 15px;
    padding: 10px;
}
}
@media screen and (max-width : 445px) {
.message {
    background: #edede9;
    width: 85%;
    min-height: 100px;
    margin: 15px 0;
    border-radius: 15px;
    padding: 10px;
}
.avatar {
  width: 55px;
  height: 55px;
}
.comment_avatar {
  width: 55px;
  height: 55px;
}
.validation {
  background: white;
  border: none;
  padding: 5px 10px;
  border-radius: 10px;
  width: 35%;
  margin: 10px 0;
  font-size: 14px;
}
}
</style>