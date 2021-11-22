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
        <v-expansion-panel-header>{{ $t(`stepType.${step.stepType}`) }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <NotesStep v-if="step.stepType == 'notes'" v-bind="step.options" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import type { State } from '../store'
import NotesStep from './step-modules/NotesStep.vue'

export default Vue.extend({
  components: { NotesStep },
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
    "stepType": {
      "notes": "Notes"
    }
  },
  "ru": {
    "stepType": {
      "notes": "Заметки"
    }
  }
}
</i18n>
