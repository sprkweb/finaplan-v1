<template>
  <v-card>
    <v-card-text>
      <DatePicker
        :label="$t('flow.startDate')"
        v-model="startDate"
        :icon="icons.mdiCalendar"
        />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import DatePicker from '@/components/form-inputs/DatePicker.vue'
import { mdiCalendar } from '@mdi/js'

export default Vue.extend({
  components: {
    DatePicker
  },
  data: () => ({
    icons: { mdiCalendar }
  }),
  props: {
    flowID: Number
  },
  computed: {
    context () {
      return this.$store.getters.getContext(this.flowID)
    },
    startDate: {
      get () {
        // @ts-ignore
        return this.context.startDate
      },
      set (startDate) {
        this.updateContext({ startDate })
      }
    }
  },
  methods: {
    updateContext (newContext: Record<string, unknown>) {
      this.$store.commit('updateFlowContext', {
        flowID: this.flowID,
        newValue: {
          ...this.context,
          ...newContext
        }
      })
    }
  }
})
</script>
