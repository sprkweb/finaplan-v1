<template>
  <v-app>
    <v-app-bar
      app
      dense
      color="#030A04"
      dark
    >
      <v-app-bar-title ref="appName">
        FinaPlan
      </v-app-bar-title>

      <template v-slot:extension>
        <v-tabs
          v-model="currentFlow"
          show-arrows
        >
          <v-tab
            v-for="flow, key in flows"
            :key="key"
          >
            {{ flow.name }}
          </v-tab>
        </v-tabs>
        <v-btn
          icon
          v-on:click.capture.stop="addFlowAndSelect"
        >
          <v-icon>
            {{ icons.mdiPlus }}
          </v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-tabs-items
        v-model="currentFlow"
        class="primary tab-content-background"
      >
        <v-tab-item
          v-for="flow, key in flows"
          :key="key"
        >
          <v-container fluid>
            <CashFlow :flowID="key" />
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, Store } from 'vuex'
import type { StateType } from '@/store/defaultState'
import { mdiPlus } from '@mdi/js'
import CashFlow from '@/components/CashFlow.vue'

export default Vue.extend({
  name: 'App',

  components: {
    CashFlow
  },

  data: () => ({
    icons: { mdiPlus },
    currentFlow: null as null | number
  }),

  computed: mapState({
    flows: 'flows'
  }),

  methods: {
    addFlowAndSelect () {
      const store: Store<StateType> = this.$store
      store.commit('addFlow')
      this.currentFlow = this.flows.length - 1
    }
  }
})
</script>

<style lang="scss" scoped>
.tab-content-background {
  min-height: 100%;
}
</style>
