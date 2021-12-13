<template>
  <div>
    <!-- TODO: transition? -->
    <draggable
      tag="v-expansion-panels"
      v-model='steps'
      v-bind:component-data="expansionPanelsData"
    >
      <v-expansion-panel
        v-for="(step) in steps"
        :key="step.id"
      >
        <v-expansion-panel-header>
          <v-row>
            <v-col cols="auto">
              {{ $t(`stepModules.${step.stepType}.name`) }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-icon>
                {{ icons.mdiDrag }}
              </v-icon>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <component
            v-if="stepModules[step.stepType].component"
            :is="stepModules[step.stepType].component"
            v-bind="step.options" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </draggable>

    <NewStepButton @add-step="addStep" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import draggable from 'vuedraggable'
import { mdiDrag } from '@mdi/js'
import NewStepButton from '@/components/NewStepButton.vue'
import NotesStep from '@/components/step-modules/NotesStep.vue'
import { index as stepModules } from '@/model/step-modules'

export default Vue.extend({
  components: {
    NewStepButton,
    NotesStep,
    draggable
  },
  props: {
    flowID: Number
  },
  data: () => ({
    icons: { mdiDrag },
    stepModules
  }),
  computed: {
    steps: {
      get () {
        return this.$store.getters.getSteps(this.flowID)
      },
      // Use this only to change their order
      set (value: PlanStepInfo[]) {
        this.$store.commit('updateStepsOrder', {
          flowID: this.flowID,
          order: value.map((v: PlanStepInfo) => v.id)
        })
      }
    },
    expansionPanelsData: function () {
      const stepsCount = this.$store.getters.getSteps(this.flowID).length
      return {
        props: {
          value: Array.from({ length: stepsCount }, (v, k) => k),
          multiple: true
        }
      }
    }
  },
  methods: {
    addStep: function ({ stepTypeInfo }: { stepTypeInfo: PlanStepTypeInfo }) {
      this.$store.commit('addStep', {
        flowID: this.flowID,
        stepTypeInfo
      })
    }
  }
})
</script>
