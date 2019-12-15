<template>
  <v-card flat class="py-5 px-3">
    <v-card-title 
      primary-title 
      class="justify-center text-uppercase contacts" 
      ref="contacts" 
    >
      {{ $t.contacts.title }}
    </v-card-title>
    <v-card-text class="pa-0">
      {{ $t.contacts.text }}
      <v-card class="my-2 grey lighten-5" outlined color="grey">
        <v-card-text>
          <div 
            v-for="item in $t.contacts.numbers" 
            :key="item[0]"
            class="py-2 "
          >
            <span class="subtitle-2 font-weight-black">{{ `${item.title}: ` }}</span>
            <span 
              class="subtitle-1" 
              v-if="!item.hasOwnProperty('link')"
            >{{ item.text }}</span>
            <a 
              :href="item.link"
              class="subtitle-1" 
              v-else
            >{{ item.text }}</a>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'MyContacts',
}
</script>