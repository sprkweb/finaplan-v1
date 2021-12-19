<template>
  <div>
    <v-text-field
      :label="$t('stepModules.income.amount')"
      v-model.number="amount"
      required
    ></v-text-field>

    <SimpleDuration
      v-model="period"
      :label="$t('stepModules.income.period')"
      :prefix="$t('stepModules.income.periodPrefix')"
      />

    <SimpleDuration
      v-model="incomeStartDate"
      :label="$t('stepModules.income.startDate')"
      :prefix="$t('stepModules.income.startDatePrefix')"
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
    ...generateComputedOptions(['amount', 'period', 'incomeStartDate'])
  }
})
</script>
