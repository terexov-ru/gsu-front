// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/core.less"],
    modules: ['@nuxtjs/google-fonts'],
    googleFonts: {
        families: {
            'Nunito+Sans': [400, 500, 600, 700],
        }
    }
});
