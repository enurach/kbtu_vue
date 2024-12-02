// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  plugins: ['~/plugins/pinia.js'],
  modules: ['@samk-dev/nuxt-vcalendar'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Jersey+25&display=swap'
        }
      ]
    }
  }
})

