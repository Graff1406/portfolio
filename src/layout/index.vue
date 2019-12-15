<template>
  <v-app id="inspire" v-resize="onResize">
    <v-navigation-drawer
      v-model="drawer"
      temporary      
      color="deep-purple accent-4"
      dark
      app
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img src="../assets/my-face.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ $t.application.email.text }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link v-for="button in buttons" :key="button.text" @click="onScroll(button.ref)">
          <v-list-item-icon>
            <v-icon>{{ button.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ button.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#1e1e5c"
      flat
      dense
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ fullName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-for="(button,i) in buttons" :key="button.text">       
        <v-btn dark text v-if="button.show" @click="onScroll(button.ref)">
          {{ button.text }}
          <i v-if="i === buttons.length - 1" class="fab fa-github"></i>
        </v-btn>
      </span>
      <v-menu offset-y v-if="windowSize.x < 850 && windowSize.x > 450">
        <template v-slot:activator="{ on }">
          <v-btn
            dark 
            text
            icon
            v-on="on"
          >
            <v-icon>more_horiz</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in hideBtns"
            :key="index"
            @click="onScroll(item.ref)"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container fluid class="pa-0 white">
        <v-row no-gutters>
          <v-col cols="12" class="pa-0 d-flex justify-center">
            <v-col cols="12" sm="9" md="7" class="pa-0">
              <slot></slot>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!-- <v-footer
      color="#1e1e5c"
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer> -->
  </v-app>
</template>

<script>
  export default {
    name: 'LayOutIndex',
    props: {
      // function scroll from component Home 
      scroll: Function,
    },
    data: (vm) => ({
      fullName: vm.$t.application.fullName.text,
      drawer: null,
      windowSize: {
        x: 0
      },
      show: true
    }),
    computed: {
      buttons() {
        return [
          {
            text: 'About Me', 
            icon: 'face',
            ref: 'about',
            show: this.windowSize.x < 450 ? false : true
          },
          {
            text: 'Components', 
            icon: 'view_module',
            ref: 'components',
            show: this.windowSize.x < 550 ? false : true
          },
          {
            text: 'Project', 
            icon: 'work',
            ref: 'project',
            show: this.windowSize.x < 650 ? false : true
          },
          {
            text: 'Partnership', 
            icon: 'group',
            ref: 'partnership',
            show: this.windowSize.x < 750 ? false : true
          },
          {
            text: 'Contact', 
            icon: 'contacts',
            ref: 'contacts',
            show: this.windowSize.x < 850 ? false : true
          }
        ]
      },
      // if resize window then will hide menu buttens witch do not 
      hideBtns() {
        return this.buttons.filter(btn => !btn.show)
      }
    },
    mounted () {
      this.onResize()
    },
    methods: {
      onResize() {
        this.windowSize = { x: window.innerWidth }
      },
      onScroll(ref) {
        // will be set value of button if user not on main page
        if (this.$route.path !== '/') {
          if (sessionStorage.getItem('pos')) {
            try{
              const pos = JSON.parse(sessionStorage.getItem('pos'))
              pos.target = ref
              sessionStorage.setItem('pos', JSON.stringify(pos))
            } catch(err) {
              alert('Sorry! Heppend some programic case. Please reload page LAYOUT')
            }
          }
          this.$router.push('/')
        } else {
          // will be scroll if user on main page
          this.scroll(ref)
        }
        if (this.drawer) this.drawer = !this.drawer
      }
    }
  }
</script>