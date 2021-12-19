<template>
  <v-textarea
    :label="$t('stepModules.notes.fieldLabel')"
    v-model="text"
    rows="1"
    auto-grow
  ></v-textarea>
</template>

<script lang="ts">
import StepModule, { generateComputedOption } from '@/components/mixins/StepModule'

export default StepModule.extend({
  computed: {
    text: generateComputedOption('text')
  }
})
</script>
