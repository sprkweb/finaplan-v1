<template>
  <div>
    <v-expansion-panels
      v-model="openedSteps"
      multiple
    >
      <v-expansion-panel
        v-for="(step, i) in steps"
        :key="i"
      >
        <v-expansion-panel-header>Step {{ step }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import type { State } from '../store'

export default Vue.extend({
  props: {
    flowID: Number
  },
  data: () => ({
    openedSteps: []
  }),
  computed: mapState({
    steps: function (state: State) {
      return state.flows[this.flowID].steps
    }
  })
})
</script>

<i18n>
{
  "en": {
    "hello": "Hello"
  },
  "ru": {
    "hello": "Привет"
  }
}
</i18n>
