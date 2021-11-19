module.exports = {
  pwa: {
    name: 'FinaPlan',
    themeColor: '#3B707D',
    manifestOptions: {
      background_color: '#FFFFFF',
      icons: [
        {
          "src": "./img/icons/icon.svg",
          "type": "image/svg+xml",
          "purpose": "any maskable"
        },
        {
          "src": "./img/icons/icon-192.png",
          "type": "image/png",
          "sizes": "192x192",
          "purpose": "any maskable"
        },
        {
          "src": "./img/icons/icon-512.png",
          "type": "image/png",
          "sizes": "512x512",
          "purpose": "any maskable"
        }
      ]
    },
    iconPaths: {
      // Fine, I'll do it myself
      faviconSVG: null,
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null
    }
  },

  configureWebpack: {
    devtool: 'source-map'
  },

  transpileDependencies: [
    'vuetify'
  ],

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      enableBridge: false
    }
  },

  productionSourceMap: false,

  css: {
    sourceMap: true
  }
}
