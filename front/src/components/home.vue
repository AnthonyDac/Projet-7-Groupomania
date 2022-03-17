<template>
<div>
    <navbar/>
    <poster/>
    <posts/>
</div>
</template>
<script>

import navbar from './navbar.vue'
import poster from './poster.vue'
import posts from './posts.vue'

export default {
    name:"home",
    components: {
    navbar, poster, posts
    }
}
</script>
<style scoped>

</style>