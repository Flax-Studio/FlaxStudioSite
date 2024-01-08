// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   devtools: { enabled: true },
//   modules: ["@nuxtjs/tailwindcss"],
//   build: {
//    postcss:{

//    }
//   },
// });

export default {
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  imports: {
    autoImport: false,
  },
};
