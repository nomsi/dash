module.exports = {
  head: {
    title: 'Dash',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Yet another Discord bot' },
      { hid: 'og:title', name: 'og:title', content: 'Dash - Discord Bot' },
      { hid: 'og:url', name: 'og:url', content: 'https://dash.nomsy.net/' },
      { hid: 'og:image', name: 'og:image', content: 'https://i.nomsy.net/HmT5rlDrvNF0G48LVaaN2RE9Hke3xbcW.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/avatar-source.png' }
    ]
  },
  loading: { color: '#3B8070' },
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
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
