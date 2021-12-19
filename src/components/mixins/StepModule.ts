import Vue from 'vue'

export default Vue.extend({
  props: ['id'],
  computed: {
    step: function () {
      return this.$store.getters.getStep(this.id)
    }
  }
})

type computedOption<ValueT> = { get: () => ValueT, set: (value: ValueT) => void }
export function generateComputedOption<ValueT> (option: string): computedOption<ValueT> {
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

type computedOptions = Record<string, computedOption<unknown>>
export function generateComputedOptions (options: string[]): computedOptions {
  return options.reduce((result, option) => {
    result[option] = generateComputedOption(option)
    return result
  }, {} as computedOptions)
}
