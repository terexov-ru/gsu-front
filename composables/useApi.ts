import {API} from "~/constants/index.js";

const NEWS_PATH = "/page/news";

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

    return {
        simpleGet,
        getNews
    }
}
