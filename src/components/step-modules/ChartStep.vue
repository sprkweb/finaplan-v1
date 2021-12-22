<template>
  <div>
    <v-row>
      <v-col>
        <DatePicker
          :label="$t('stepModules.chart.startDate')"
          v-model="startDate"
          :icon="icons.mdiCalendar"
          :resettable="true"
          :defaultDate="defaultStartDate"
          :reset-icon="icons.mdiRewind"
          />
      </v-col>
      <v-col>
        <DatePicker
          :label="$t('stepModules.chart.endDate')"
          v-model="endDate"
          :icon="icons.mdiCalendarEnd"
          />
      </v-col>
    </v-row>

    <Chart
      :chartData="chartData"
      :options="options"
      />
  </div>
</template>

<script>
import i18n from '@/i18n'
import { mdiCalendar, mdiCalendarEnd, mdiRewind } from '@mdi/js'
import StepModule, { generateComputedOptions } from '@/components/mixins/StepModule'
import DatePicker from '@/components/form-inputs/DatePicker.vue'
import Chart from '@/components/step-modules/ChartStep/Chart'
import {
  eachYearOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachDayOfInterval
} from 'date-fns'

export default StepModule.extend({
  props: ['flowID'],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    },
    icons: { mdiCalendar, mdiCalendarEnd, mdiRewind }
  }),
  components: {
    DatePicker,
    Chart
  },
  computed: {
    ...generateComputedOptions(['startDate', 'endDate']),
    interval () {
      return { start: this.startDate, end: this.endDate }
    },
    defaultStartDate () {
      return this.$store.getters.getContext(this.flowID).startDate
    },
    calcInterval () {
      return 'months' // TODO calculation of the optimal interval
    },
    dates () {
      switch (this.calcInterval) {
        case 'years': {
          return eachYearOfInterval(this.interval)
        }
        case 'months': {
          return eachMonthOfInterval(this.interval)
        }
        case 'weeks': {
          return eachWeekOfInterval(this.interval)
        }
        case 'days': {
          return eachDayOfInterval(this.interval)
        }
        default:
          throw new Error('Invalid value of optimalCalcInterval')
      }
    },
    y_values () {
      const flow = this.$store.getters.calcFlow(this.flowID, this.id)
      return this.dates.map((date) => flow.calc(date))
    },
    labels () {
      switch (this.calcInterval) {
        case 'years': {
          return this.dates
            .map((date) => date.getFullYear())
        }
        case 'months': {
          return this.dates
            .map((date) => i18n.d(date, 'month'))
        }
        case 'weeks': {
          return this.dates
            .map((date) => i18n.d(date, 'long'))
        }
        case 'days': {
          return this.dates
            .map((date) => i18n.d(date, 'long'))
        }
        default:
          throw new Error('Invalid value of optimalCalcInterval')
      }
    },
    chartData () {
      return {
        labels: this.labels,
        datasets: [{
          data: this.y_values,
          backgroundColor: this.$vuetify.theme.currentTheme.secondary
        }]
      }
    }
  }
})
</script>
