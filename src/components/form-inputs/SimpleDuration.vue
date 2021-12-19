<template>
  <v-input>
    <v-row>
      <v-col>
        <v-text-field
          type="number"
          :value="intervalCount"
          @input="$emit('input', { [selectedType]: parseInt($event) })"
          :rules="numberRules"
          :label="label"
          :prepend-inner-icon="icon"
          :prefix="prefix"
        ></v-text-field>
      </v-col>

      <v-col>
        <v-select
          :items="unitsSelection"
          item-text="label"
          item-value="value"
          :value="selectedType"
          @input="$emit('input', { [$event]: intervalCount })"
          :label="$t('unit')"
        ></v-select>
      </v-col>
    </v-row>
  </v-input>
</template>

<script lang="ts">
import Vue from 'vue'
import { intervalUnits } from '@/model/helpers/intervalUnits'

export default Vue.extend({
  props: [
    'value',
    'label',
    'icon',
    'prefix'
  ],
  data: () => ({
    intervalUnits,
    numberRules: [
      (num: string) => !isNaN(parseInt(num)),
      (num: string) => parseInt(num) >= 0
    ]
  }),
  computed: {
    unitsSelection () {
      return intervalUnits.map((unit) => ({
        value: unit,
        label: this.$t(`unitsSelection.${unit}`)
      }))
    },
    selectedType () {
      return Object.keys(this.value)[0]
    },
    intervalCount () {
      return Object.values(this.value)[0]
    }
  }
})
</script>
