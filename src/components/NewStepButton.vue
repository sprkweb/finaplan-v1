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
        >
          <v-icon v-if="speedDialShown">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <p>Hey</p>
    </v-speed-dial>
</template>

<script lang="ts">
const state = {
  speedDialShown: false
}
export default {
  data: (): typeof state => state
}
</script>
