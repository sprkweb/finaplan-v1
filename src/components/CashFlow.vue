<template>
  <div>
    <!-- TODO: transition? -->
    <draggable
      tag="v-expansion-panels"
      v-model='steps'
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
import draggable from 'vuedraggable'
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
  computed: {
    steps: {
      get () {
        // @ts-ignore: this.$store and this.flowID actually exist
        return this.$store.state.flows[this.flowID].steps
      },
      set (value) {
        // @ts-ignore: this.$store and this.flowID actually exist
        this.$store.commit('updateSteps', { flowID: this.flowID, value })
      }
    }
  }
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
