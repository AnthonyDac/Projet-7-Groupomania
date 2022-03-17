<template>
<div>
  <router-view></router-view>
  <foot/>
</div>
</template>

<script>
import foot from './components/foot.vue'


export default {
  name: 'App',
  components: {
    foot
  }
}
</script>

<style>
body {
  margin: 0;
  overflow-x: hidden;
  color: white;
  background-image: url('./assets/img/back2.jpg');
}
</style>
