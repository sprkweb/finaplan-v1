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
import Vue from 'vue'
import SimpleDuration from '@/components/form-inputs/SimpleDuration.vue'

export default Vue.extend({
  components: {
    SimpleDuration
  },
  props: [
    'id'
  ],
  computed: {
    step: function () {
      return this.$store.getters.getStep(this.id)
    },
    amount: {
      get () {
        // @ts-ignore
        return this.step.options.amount
      },
      set (value: number) {
        // @ts-ignore
        this.$store.commit('updateStep', {
          // @ts-ignore
          stepID: this.step.id,
          options: {
            // @ts-ignore
            ...this.step.options,
            amount: value
          }
        })
      }
    },
    contributionDate: {
      get () {
        // @ts-ignore
        return this.step.options.contributionDate
      },
      set (value: SimpleDuration) {
        // @ts-ignore
        this.$store.commit('updateStep', {
          // @ts-ignore
          stepID: this.step.id,
          options: {
            // @ts-ignore
            ...this.step.options,
            contributionDate: value
          }
        })
      }
    }
  }
})
</script>
