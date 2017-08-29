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
  plugins: [
    '~/plugins/i18n.js',
    {
      src: '~/plugins/storage.js',
      ssr: false
    },
    {
      src: '~/plugins/scroller.js',
      ssr: false
    }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',
  /*
  ** Global css, 由于服务端渲染的问题, 全局样式必须提前加载, 不能在vue文件中import
  ** 否则会有闪动
  */
  css: [
    '~/assets/iconfont/iconfont.css',
    '~/node_modules/mint-ui/lib/style.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    postcss: [
      require('postcss-salad')({
        browsers: ['IOS >= 7', 'Android >= 4.4', '>5%'],
        features: {bem: true}
      })
    ],
    vendor: ['axios', 'vue-i18n', 'mint-ui'],
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
