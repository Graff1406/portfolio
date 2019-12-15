<template>
  <v-card flat class="py-5">
    <v-card-title 
      primary-title 
      class="justify-center text-uppercase about" 
      ref="about"
    >
      {{ $t.aboutMe.title }}
    </v-card-title>
    <v-card-text class="pa-0">
      
      <v-expansion-panels inset class="my-5 px-3">
        <v-expansion-panel>
          <v-expansion-panel-header>{{ $t.aboutMe.application }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-guttars>
              <v-col cols="12" class="pa-0 mb-2">
                <v-row no-guttars justify="center">
                  <v-avatar size="100">
                    <v-img src="../../assets/my-face.jpg"></v-img>
                  </v-avatar>
                </v-row>
              </v-col>
              <v-col 
                cols="12" 
                v-for="(item,i) in $t.application" 
                :key="`item-${i}`" 
                class="pa-0 mb-2"
              >
                <div class="body-2 font-weight-medium">{{ `${item.label}:` }}</div>
                <div class="body-2">{{ item.text }}</div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="px-3">
        {{ $t.aboutMe.text }}
        <h3 class="mt-5">{{ $t.aboutMe.timeline }}</h3>
      </div>
      <v-timeline dense align-top class="my-5 mr-3">
        <v-timeline-item 
          v-for="item in $t.aboutMe.skills"
            :key="item.title"
            small 
            color="success"
          >
          <div>
            <h3 class="success--text">{{ item.year }}</h3>
            <div class="subtitle-2">{{ item.title }}</div>
            <div class="caption">
              <div class="font-weight-medium">{{ `${item.subtitle}:` }} </div>
              <div class="body-2">{{ item.text }}</div>             
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'AboutMe',
}
</script>