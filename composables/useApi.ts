import {API} from "~/constants/index.js";

const NEWS_PATH = "/page/news";
const NEWS_ID_PATH = "/page/get_news";
const REV_PATH = "/page/reviews";
const TEAM_PATH = "/page/company_employees";
const FORM_PATH = "/api/make_request";
const REGISTRY_PATH = "/page/company_registry";
const REQUISITES_PATH = "/page/company_requisites";
const LICENSE_PATH = "/page/company_license";
const ABOUT_PATH = "/page/company_info";
const CONTACTS_PATH = "/page/company_info";
const FAQS_PATH = "/page/faqs";
const LOGIN_PATH = "/auth/login";
const REG_PATH = "/auth/register";

export const useApi = () => {

    async function simpleGet(path: String) {
        return useFetch(API + path, {
            method: 'GET',
        });
    }

    async function getNews(start: Number, amount: Number, year: Number = 0, type: Number = 0) {
        return useFetch(API + NEWS_PATH, {
            method: 'POST',
            body: {
                start: start,
                amount: amount,
                year: year,
                type: type
            }
        });
    }

    async function getNewsById(id: Number) {
        return useFetch(API + NEWS_ID_PATH, {
            method: 'POST',
            body: {
                news_id: id
            }
        });
    }

    async function getRevs(start: Number = 0, amount: Number = 10, type: Number = 0) {
        return await $fetch(API + REV_PATH, {
            method: 'POST',
            body: {
                start: start,
                amount: amount,
                type: type
            }
        });
    }

    async function getTeam(start: Number = 0, amount: Number = 10, category: Number = 0) {
        return useFetch(API + TEAM_PATH, {
            method: 'POST',
            body: {
                start: start,
                amount: amount,
                category: category,
            }
        });
    }

    async function getRegistry() {
        return useFetch(API + REGISTRY_PATH, {
            method: 'GET'
        })
    }

    async function getReq() {
        return useFetch(API + REQUISITES_PATH, {
            method: 'GET'
        })
    }

    async function getLicense() {
        return useFetch(API + LICENSE_PATH, {
            method: 'GET'
        })
    }

    async function getAbout() {
        return useFetch(API + ABOUT_PATH, {
            method: 'GET'
        })
    }

    async function getContacts() {
        return useFetch(API + CONTACTS_PATH, {
            method: 'GET'
        })
    }

    async function getFAQS() {
        return useFetch(API + FAQS_PATH, {
            method: 'GET'
        })
    }

    async function sendForm(name: String, email: String, phone: String, title: String, text: String) {
        return useFetch(API + FORM_PATH, {
            method: 'POST',
            body: {
                name: name,
                email: email,
                phone: phone,
                title: title,
                text: text,
            }
        });
    }

    async function login(login: String, pass: String) {
        const {data: data} = await useFetch(API + LOGIN_PATH, {
            method: 'POST',
            body: {
                credential: login,
                password: pass,
            }
        });

        if (data.value?.token) {
            setTokenCookie(data.value?.token);
            return true;
        }

        return false;
    }

    async function reg(phone: String, email: String) {
        await $fetch(API + REG_PATH, {
            method: 'POST',
            body: {
                phone: phone,
                email: email
            }
        });

        // if (data.value?.status !== 'ok') {

            // const message = error.value;
            // console.log(error);
            // console.log(data);
            //
            // if (message.includes('email') && message.includes('phone')) {
            //     return 'Данный номер телефона и почта уже используются'
            // } else if (message.includes('email')){
            //     return 'Данная почта уже используется'
            // }
            // else if (message.includes('phone')) {
            //     return 'Данный номер телефона уже используется'
            // } else {
            //     return 'Ошибка при регистрации'
            // }
        // }

        return false;
    }


    function getTokenCookie(): string | undefined {
        return useCookie('token')?.value;
    }

    function setTokenCookie(token: string): void {
        const tokenRef = useCookie('token');
        tokenRef.value = token;
    }

    return {
        simpleGet,
        getNews,
        getRevs,
        getTeam,
        getNewsById,
        getContacts,
        getFAQS,
        getAbout,
        getLicense,
        getRegistry,
        getReq,
        sendForm,
        login,
        reg
    }
}
