<template>
  <v-dialog
    v-model="dialogShown"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        color="accent"
        fixed bottom right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          {{ icons.mdiPlus }}
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ $t('chooseStepDialog.title') }}
      </v-card-title>
      <v-card-text>
        <v-radio-group
          v-model="selectedModule"
          column
        >
          <v-radio
            v-for="(stepModule) in stepModules"
            :key="stepModule.name"
            :value="stepModule.name"
            :label="$t(`stepModules.${stepModule.name}.name`)"
          ></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="error"
          @click="dialogShown = false"
        >
          {{ $t('button.cancel') }}
        </v-btn>
        <v-btn
          text
          color="primary"
          :disabled="selectedModule === null"
          @click="dialogShown = false"
        >
          {{ $t('button.add') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiClose, mdiPlus } from '@mdi/js'
import { index as stepModules } from '@/model/step-modules'

export default Vue.extend({
  data: () => ({
    icons: { mdiClose, mdiPlus },
    dialogShown: false,
    selectedModule: null,
    stepModules
  })
})
</script>
