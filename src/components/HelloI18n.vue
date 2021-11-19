<template>
  <p>{{ $t('hello') }}</p>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HelloI18n'
})
</script>

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
