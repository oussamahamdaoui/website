import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#181517' },
        { name: 'theme-color', content: '#181517' }
      ],
      link: [
        { rel: 'preconnect', href: '//img2.storyblok.com' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#f47677' }
      ],
      script: [
        { type: 'module', src: 'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js', defer: true, tagPosition: 'bodyClose' }
      ]
    }
  },
  modules: [
    '@storyblok/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    'nuxt-gtag'
  ],
  storyblok: {
    accessToken: process.env.STORYBLOK_SPACE_TOKEN,
    apiOptions: {
      cache: {
        clear: 'auto',
        type: 'memory'
      }
    },
    bridge: true
  },
  typescript: {
    typeCheck: true
  },
  tailwindcss: {
    cssPath: '@/assets/scss/tailwind.scss',
    exposeConfig: true
  },
  runtimeConfig: {
    public: {
      storyblokContentVersion: process.env.STORYBLOK_CONTENT_VERSION,
      youtubeApiKey: process.env.YOUTUBE_API_KEY,
      metaLocationOrigin: process.env.META_LOCATION_ORIGIN
    }
  },
  googleFonts: {
    display: 'swap',
    preconnect: true,
    prefetch: true,
    families: {
      Inter: [300, 400, 500, 600]
    }
  },
  gtag: {
    id: process.env.GTAG,
    loadingStrategy: 'async'
  },
  vite: {
    plugins: [
      svgLoader()
    ],
    optimizeDeps: {
      exclude: ['fsevents']
    }
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => ['spline-viewer'].includes(tag)
    }
  }
})
