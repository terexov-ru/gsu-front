import {API} from "~/constants/index.js";

const NEWS_PATH = "/page/news";
const NEWS_ID_PATH = "/page/get_news";
const REV_PATH = "/page/reviews";
const TEAM_PATH = "/page/company_employees";

export const useApi = () => {

    async function simpleGet(path: String) {
        return await useFetch(API + path, {
            method: 'GET',
        });
    }

    async function getNews(start: Number, amount: Number, year: Number = 0, type:Number = 0) {
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
        return await useFetch(API + REV_PATH, {
            method: 'POST',
            body: {
                start: start,
                amount: amount,
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

    return {
        simpleGet,
        getNews,
        getRevs,
        getTeam,
        getNewsById
    }
}
