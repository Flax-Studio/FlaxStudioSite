// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    css: [
        '@/assets/css/global.css',
    ],

    modules: [
        'nuxt-simple-sitemap',
    ],

    sitemap: {
        siteUrl: process.env.VITE_SITE_URL || 'https://example.com'
    }
})
