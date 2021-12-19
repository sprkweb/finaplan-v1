import Vue from 'vue'

export default Vue.extend({
  props: ['id'],
  computed: {
    step: function () {
      return this.$store.getters.getStep(this.id)
    }
  }
})

export function generateComputedOption<ValueT> (option: string):
  { get: () => ValueT, set: (value: ValueT) => void } {
  return {
    get () {
      // @ts-ignore
      return this.step.options[option]
    },
    set (value) {
      // @ts-ignore
      this.$store.commit('updateStep', {
        // @ts-ignore
        stepID: this.step.id,
        options: {
          // @ts-ignore
          ...this.step.options,
          [option]: value
        }
      })
    }
  }
}
