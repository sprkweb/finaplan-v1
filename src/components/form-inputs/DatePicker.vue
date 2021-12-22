<template>
  <v-menu
    v-model="selectionOpened"
    :close-on-content-click="false"
    max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="humanFriendlyDate"
        :label="label"
        :prepend-inner-icon="icon"
        readonly
        :append-icon="resettable ? resetIcon : undefined"
        @click:append=setDefault
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="datepickerFriendlyDate"
      :locale="locale"
      @change="onInput"
      :show-current="true"
    ></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { format, parseISO } from 'date-fns'
import i18n from '@/i18n'

export default Vue.extend({
  props: [
    'value',
    'label',
    'icon',
    'resettable',
    'resetIcon',
    'defaultDate'
  ],
  data: () => ({
    selectionOpened: false
  }),
  computed: {
    humanFriendlyDate () {
      return this.value ? i18n.d(this.value, 'long') : ''
    },
    datepickerFriendlyDate () {
      return this.value ? format(this.value, 'yyyy-MM-dd') : ''
    },
    locale: () => i18n.locale
  },
  methods: {
    setValue (value: unknown) {
      this.$emit('input', value)
    },
    setDefault: function () {
      if (this.defaultDate) {
        // @ts-ignore
        this.setValue(this.defaultDate)
      } else {
        // @ts-ignore
        this.setValue(null)
      }
    },
    onInput (event: string) {
      // @ts-ignore
      this.selectionOpened = false
      // @ts-ignore
      this.setValue(parseISO(event))
    }
  }
})
</script>
