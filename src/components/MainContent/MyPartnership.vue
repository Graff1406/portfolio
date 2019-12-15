<template>
  <v-card flat class="py-5 px-3">
    <v-card-title 
      primary-title 
      class="justify-center text-uppercase partnership" 
      ref="partnership" 
    >
      {{ $t.partnership.title }}
    </v-card-title>
    <v-card-text class="pa-0">
      <p class="body-2">{{ $t.partnership.text }}</p>
      <v-card outlined>
        <v-card-text>
          <div
            v-for="item in $t.partnership.items"
            :key="item"
            class="ml-2 overline"
          >{{ `- ${item}` }}</div>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'MyPartnership',
}
</script>