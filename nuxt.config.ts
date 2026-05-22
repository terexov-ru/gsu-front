// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://gsu.terexov.ru',
        },
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'ru',
            },
            titleTemplate: '%s | ГСУ',
            meta: [
                { name: 'theme-color', content: '#25292D' },
                { name: 'yandex-verification', content: '6f765491a6ba81bc' },
                { property: 'og:site_name', content: 'ГСУ' },
                { property: 'og:type', content: 'website' },
                { name: 'twitter:card', content: 'summary_large_image' },
            ],
            link: [
                { rel: 'icon', href: '/favicon.ico' },
            ],
        },
    },
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
            tablet: 769,
            mobile: 580,
        },
    },
});
