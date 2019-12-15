<template>
  <v-card flat class="py-5 px-3">
    <v-card-title 
      primary-title 
      class="justify-center text-uppercase components" 
      ref="components" 
    >
      {{ $t.components.title }}
    </v-card-title>
    <v-card-text class="pa-0">
      <p class="body-2">{{ $t.components.text }}</p>
      <v-row no-guttars justify="space-around" justify-xl="center">
        <v-col
        cols="11" 
        sm="5"
        v-for="(item,i) in $t.components.items"
        :key="`item-${i}`"
        class="pa-0 py-3"
      >       
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card min-height="250">
              <v-img :src="require(`../../assets/${item.img}.jpg`)"></v-img>
              <!-- <v-img :src="`@/assets/${item.img}.jpg`"></v-img> -->

              <v-card-text>
                <h2 class="title warning--text">{{ item.title }}</h2>
                {{ item.text }}
              </v-card-text>

              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="#000"
                >
                  <router-link :to="`/components/${item.path}`" style="text-decoration:none">
                    <v-btn 
                    depressed
                    color="primary" 
                  >{{ item.btnShow }}</v-btn>
                  </router-link>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'MyComponents',
  data: () => ({
    overlay: false,
  }),
}
</script>