<template>
  <router-view></router-view>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "App",
  watch: {
    $route(to){
      // scroll to target what identificator are holding in sessionStorage
      if (sessionStorage.getItem('pos')) {
        try{
            const pos = JSON.parse(sessionStorage.getItem('pos'))
            if (to.path === '/' && pos.target) {
              this.$vuetify.goTo(
                pos[pos.target], 
                { duration: 150 }
              )
            }
        } catch(err) {
          alert('Sorry! Heppend some programic case. Please reload page')
        }
      }
    }
  },
  created() {
    // if was run no main page and wasn't save data positions in sessionStorage
    // will be redirect to main page
    if(this.$route.path !== '/' && !sessionStorage.getItem('pos'))
      this.$router.push('/')
  }
});
</script>
