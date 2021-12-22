import VueI18n from 'vue-i18n'

const dateTimeFormats: VueI18n.DateTimeFormats = {
  ru: {
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    month: {
      year: 'numeric',
      month: 'long'
    }
  },
  en: {
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    month: {
      year: 'numeric',
      month: 'long'
    }
  }
}

export default dateTimeFormats
