import VueI18n from 'vue-i18n'

const dateTimeFormats: VueI18n.DateTimeFormats = {
  ru: {
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  },
  en: {
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  }
}

export default dateTimeFormats
