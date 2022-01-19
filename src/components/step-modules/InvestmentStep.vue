<template>
  <div>
    <v-text-field
      :label="$t('stepModules.investment.interestRate')"
      v-model.number="interestRate"
      suffix="%"
      required
    ></v-text-field>

    <SimpleDuration
      v-model="period"
      :label="$t('stepModules.investment.period')"
      :prefix="$t('stepModules.investment.periodPrefix')"
      />

    <SimpleDuration
      v-model="startDate"
      :label="$t('stepModules.investment.startDate')"
      :prefix="$t('stepModules.investment.startDatePrefix')"
      />
  </div>
</template>

<script lang="ts">
import StepModule, { generateComputedOptions } from '@/components/mixins/StepModule'
import SimpleDuration from '@/components/form-inputs/SimpleDuration.vue'

export default StepModule.extend({
  components: {
    SimpleDuration
  },
  computed: {
    ...generateComputedOptions(['period', 'interestRate', 'startDate'])
  }
})
</script>
