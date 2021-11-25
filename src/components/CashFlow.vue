<template>
  <div>
    <!-- TODO: save the order -->
    <draggable
      tag="v-expansion-panels"
      v-bind:component-data="{
        attrs: {
          'v-model': 'openedSteps',
          multiple: true
        }
      }"
    >
      <v-expansion-panel
        v-for="(step) in steps"
        :key="step.id"
      >
        <v-expansion-panel-header>
          {{ $t(`stepType.${step.stepType}`) }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <NotesStep v-if="step.stepType == 'notes'" v-bind="step.options" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </draggable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import type { StateType } from '../store/defaultState'
import NotesStep from './step-modules/NotesStep.vue'

export default Vue.extend({
  components: {
    NotesStep,
    draggable
  },
  props: {
    flowID: Number
  },
  data: () => ({
    openedSteps: []
  }),
  computed: mapState({
    steps: function (state: StateType) {
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
