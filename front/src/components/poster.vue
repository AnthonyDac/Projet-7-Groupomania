<template>
  <div class="poster">
      <div class="posterContainer">
        <label>Publiez votre contenu : </label>
        <textarea id="publisher" name="publication" placeholder="Ecrivez votre publication.."></textarea>
        <div class="buttons">
          <input id="image" name="file" type="file" style="display:none;">
          <button class="validation" v-on:click="greet">Envoyer <i class="fa-solid fa-angles-right"></i></button>
          <button class="round_btn" onclick="document.getElementById('image').click()"><i class="fa-solid fa-image"></i></button>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'poster',
  methods : {
      greet : async function publish() {
        var message = document.getElementById('publisher').value;
        var userID = localStorage.getItem('userId');
        var imagePost = document.getElementById('image');
        const formdata = new FormData();
        if(!imagePost.files[0]) {
          formdata.append("image", null);
          formdata.append("user_ID", userID);
          formdata.append("message", message);
        } else {
          formdata.append("image", imagePost.files[0]);
          formdata.append("user_ID", userID);
          formdata.append("message", message);
        }
        const requestOptions = {
          method: "POST",
          body: formdata
        };
        if(message.length < 5) {
            alert("Le champs de publication est vide!");
        }
        else {
            await fetch('http://127.0.0.1:3000/posting', requestOptions).then((res) => res.json()).then(data => {
              if(data) {
                location.reload();}
              })
        }
      }
  },
  mounted() {
    
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
  display: flex;
  justify-content: center;
  align-items: center;
  transition-duration: 0.3s;
}
.round_btn:hover {
  transform: scale(1.05);
  cursor: pointer;
  transition-duration: 0.3s;
}
.poster {
    width: 60%;
    height: 200px;
    margin: auto;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #b1a7a6;
    padding: 10px;
    border-radius: 0 0 15px 15px;
}
.posterContainer {
     color: white;
     font-family: 'Montserrat';
     width: 90%;
     margin: auto;
}

.posterContainer label{
    font-size: 20px;
}

.posterContainer #publisher{
    color: black;
    width: 100%;
    height: 75px;
    vertical-align: center;
    text-align: left;
    resize: none;
    margin: 10px 0;
    font-size: 16px;
    font-family: 'Montserrat';
    border-radius: 10px;
    padding: 3px;
    letter-spacing: 0.5px;
    border: none;
}

.validation {
    padding: 8px 15px;
    border: none;
    border-radius: 15px;
    font-size: 18px;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    transition-duration: 0.3s;
}
.validation:hover {
    transform: scale(1.05);
    cursor: pointer;
    transition-duration: 0.3s;
}
.validation i {
    margin-left: 5px;
}
@media screen and (max-width : 767px) {
.poster {
  width: 80%;
}
.posterContainer label {
  font-size: 18px;
}
}
@media screen and (max-width : 445px) {
.poster {
  width: 85%;
}
.posterContainer label {
  font-size: 16px;
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
