<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-main>
      <HelloI18n/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloI18n from './components/HelloI18n.vue'

export default Vue.extend({
  name: 'App',

  components: {
    HelloI18n
  },

  data: () => ({
    //
  })
})
</script>
