<template>
  <lay-out-index :scroll="scroll"> 
    <AboutMe ref="about"/>
    <MyComponents ref="components" />
    <MyProject ref="project" />
    <MyPartnership ref="partnership" />
    <MyContacts ref="contacts" />
  </lay-out-index> 
</template>

<script>
import LayOutIndex from "../layout/index";
import AboutMe from '../components/MainContent/AboutMe'
import MyComponents from '../components/MainContent/MyComponents'
import MyProject from '../components/MainContent/MyProject'
import MyPartnership from '../components/MainContent/MyPartnership'
import MyContacts from '../components/MainContent/MyContacts'
export default {
  name: "home",
  components: {
    LayOutIndex,
    AboutMe,
    MyComponents,
    MyProject,
    MyPartnership,
    MyContacts
  },
  metaInfo: {
    title: 'Portfolio -Avtandil Shainidze',
    titleTemplate: null
  },
  methods: {
    scroll(ref){
      this.$vuetify.goTo(
        this.$refs[ref], 
        { duration: 150 }
      )
    }
  },
  mounted(){
    // if run page take positions from sessionStorage
    if (!sessionStorage.getItem('pos')) {
      try {
        const positions = { target: '' }
        for(const ref in this.$refs) {
          positions[ref] = this.$refs[ref].$refs[ref].getBoundingClientRect().top - 68
        }
        sessionStorage.setItem('pos', JSON.stringify(positions))
      } catch(err) {
        alert('Sorry! Heppend some programic case. Please reload page LAYOUT')
      }     
    }
  }
};
</script>
   