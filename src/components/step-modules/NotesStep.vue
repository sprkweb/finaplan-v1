<template>
  <v-textarea
    :label="$t('stepModules.notes.fieldLabel')"
    v-model="text"
    rows="1"
    auto-grow
  ></v-textarea>
</template>

<script lang="ts">
import Vue from 'vue'
import type { NotesOptions } from '@/model/step-modules/Notes'

export default Vue.extend({
  props: [
    'id'
  ],
  computed: {
    step: function () {
      return this.$store.getters.getStep(this.id)
    },
    text: {
      get () {
        // @ts-ignore
        return this.step.options.text
      },
      set (value: string) {
        const newOptions: NotesOptions = {
          text: value
        }
        // @ts-ignore
        this.$store.commit('updateStep', {
          // @ts-ignore
          stepID: this.step.id,
          options: newOptions
        })
      }
    }
  }
})
</script>
