<template>
  <v-speed-dial
      v-model="speedDialShown"
      fixed bottom right
      transition="slide-y-reverse-transition"
      direction="top"
    >
      <template v-slot:activator>
        <v-btn
          v-model="speedDialShown"
          fab
          color="accent"
        >
          <v-icon v-if="speedDialShown">
            {{ icons.mdiClose }}
          </v-icon>
          <v-icon v-else>
            {{ icons.mdiPlus }}
          </v-icon>
        </v-btn>
      </template>
      <p>Hey</p>
    </v-speed-dial>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiClose, mdiPlus } from '@mdi/js'

export default Vue.extend({
  data: () => ({
    speedDialShown: false,
    icons: { mdiClose, mdiPlus }
  })
})
</script>
