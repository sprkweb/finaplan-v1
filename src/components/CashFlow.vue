<template>
  <div>
    <ContextControls
      :flowID="flowID"
      class="context-block"
      />

    <draggable
      tag="v-expansion-panels"
      handle=".handle"
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
              <v-icon class="handle">
                {{ icons.mdiDrag }}
              </v-icon>
            </v-col>
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <component
            v-if="stepModules[step.stepType].component"
            :is="stepModules[step.stepType].component"
            :id="step.id"
            :flowID="flowID" />
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
import ContextControls from '@/components/CashFlow/ContextControls.vue'
import NotesStep from '@/components/step-modules/NotesStep.vue'
import ContributionStep from '@/components/step-modules/ContributionStep.vue'
import IncomeStep from '@/components/step-modules/IncomeStep.vue'
import ChartStep from '@/components/step-modules/ChartStep.vue'
import { index as stepModules } from '@/model/step-modules'

export default Vue.extend({
  components: {
    NewStepButton,
    ContextControls,
    NotesStep,
    ContributionStep,
    IncomeStep,
    ChartStep,
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
        // @ts-ignore
        this.$store.commit('updateStepsOrder', {
          // @ts-ignore
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

<style lang="scss" scoped>
.context-block {
  margin-bottom: 16px;
}
</style>
