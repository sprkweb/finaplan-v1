<template>
  <v-timeline dense>
    <v-timeline-item>
      <v-card>
        <v-card-title>
          {{ $t('hello') }}
        </v-card-title>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<i18n>
{
  "en": {
    "hello": "Hello"
  },
  "ru": {
    "hello": "Привет"
  }
}
</i18n>
