const path = require('path')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt_works',
    titleTemplate: '%s - by nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: ['~/plugins/i18n.js'],
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',
  /*
  ** Global css
  */
  css: ['~/assets/common.css'],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vue-i18n'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
