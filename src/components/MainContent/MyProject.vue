<template>
  <v-card flat class="py-5 px-3">
    <v-card-title 
      primary-title 
      class="justify-center text-uppercase project" 
      ref="project" 
    >
      {{ $t.project.title }}
    </v-card-title>
    <v-card-text class="pa-0">
      <p class="body-2">{{ $t.project.text }}</p>
      <v-card>
        <iframe 
          low 
          style="width:100%; margin: 0" 
          height="300" 
          src="https://nuxt-profi.workagents.now.sh/"
          frameBorder="0"
        ></iframe>

        <v-card-text class="text--primary">
          <p>{{ $t.project.describtion }}</p>
          <p class="subtitle-2">{{ `${$t.project.used.title}:` }}</p>
          <div 
            v-for="item in $t.project.used.items"
            :key="item"
            class="ml-2 overline"
          >{{ `- ${item}` }}</div>
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <v-btn
            color="deep-purple accent-4"
            class="mb-3"
            outlined
            @click="openLinkProfi"
          >
            Full preview
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'MyProject',
  methods: {
    openLinkProfi () {
      window.open('https://nuxt-profi.workagents.now.sh/', '_blank')
    }
  }
}
</script>