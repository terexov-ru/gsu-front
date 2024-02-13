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

export const useApi = () => {

    async function simpleGet(path: String) {
        return await useFetch(API + path, {
            method: 'GET',
        });
    }

    async function getNews(start: Number, amount: Number, year: Number = 0, type: Number = 0) {
        return await useFetch(API + NEWS_PATH, {
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
        return await useFetch(API + NEWS_ID_PATH, {
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
        return await useFetch(API + TEAM_PATH, {
            method: 'POST',
            body: {
                start: start,
                amount: amount,
                category: category,
            }
        });
    }

    async function getRegistry() {
        return await useFetch(API + REGISTRY_PATH, {
            method: 'GET'
        })
    }

    async function getReq() {
        return await useFetch(API + REQUISITES_PATH, {
            method: 'GET'
        })
    }

    async function getLicense() {
        return await useFetch(API + LICENSE_PATH, {
            method: 'GET'
        })
    }

    async function getAbout() {
        return await useFetch(API + ABOUT_PATH, {
            method: 'GET'
        })
    }

    async function sendForm(name: String, email: String, phone: String, title: String, text: String) {
        return await useFetch(API + FORM_PATH, {
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

    return {
        simpleGet,
        getNews,
        getRevs,
        getTeam,
        getNewsById,
        getAbout,
        getLicense,
        getRegistry,
        getReq,
        sendForm
    }
}
