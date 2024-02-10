// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/core.less"],
    modules: [
        '@nuxtjs/google-fonts',
        'nuxt-viewport',
        [
            '@vee-validate/nuxt',
            {
                autoImports: true,
            },
        ]
    ],
    googleFonts: {
        families: {
            'Nunito+Sans': [400, 500, 600, 700],
        }
    },
    viewport: {
        breakpoints: {
            desktop: 990,
            tablet: 760,
            mobile: 580,
        },
    },
});
