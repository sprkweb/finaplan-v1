<template>
  <div>
    <v-text-field
      :label="$t('stepModules.contribution.amount')"
      v-model.number="amount"
      required
    ></v-text-field>

    <SimpleDuration
      v-model="contributionDate"
      :label="$t('stepModules.contribution.contributionDate')"
      :prefix="$t('stepModules.contribution.contributionDatePrefix')"
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
    ...generateComputedOptions(['amount', 'contributionDate'])
  }
})
</script>
