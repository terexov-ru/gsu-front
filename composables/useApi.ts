import {API} from "~/constants/index.js";

const NEWS_PATH = "/page/news";
const REV_PATH = "/page/reviews";

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

    async function getRevs(start: Number = 0, amount: Number = 10, type: Number = 0) {
        return await useFetch(API + REV_PATH, {
            method: 'POST',
            body: {
                start: start,
                amount: amount,
            }
        });
    }

    return {
        simpleGet,
        getNews,
        getRevs
    }
}
