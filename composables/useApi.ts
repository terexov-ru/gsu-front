import {API} from "~/constants/index.js";

export const useApi = () => {

    async function simpleGet(path: String) {
        return await useFetch(API + path, {
            method: 'GET',
        });
    }

    return {
        simpleGet
    }
}
