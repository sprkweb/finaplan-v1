<template>
  <v-app>
    <v-app-bar app dense>
      <v-app-bar-title>
        FinaPlan
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <PlanSteps/>
      <NewStepButton />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import PlanSteps from './components/PlanSteps.vue'
import NewStepButton from './components/NewStepButton.vue'

export default Vue.extend({
  name: 'App',

  components: {
    PlanSteps,
    NewStepButton
  },

  data: () => ({
    //
  })
})
</script>
