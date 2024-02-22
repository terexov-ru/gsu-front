export const useUtils = () => {

    function getTokenCookie(): string | undefined {
        return useCookie('token')?.value;
    }

    function setTokenCookie(token: string): void {
        const tokenRef = useCookie('token');
        tokenRef.value = token;
    }

    function deleteTokenCookie(token: string): void {
        const tokenRef = useCookie('token');
        tokenRef.value = undefined;
    }


    function getBasket() {
        if (process.client) {
            const store = localStorage.getItem("basket");
            if (store !== null) {
                const basket: any = JSON.parse(store);
                if (Array.isArray(basket)) {
                    return useState('basket', () => basket);
                }
            } else {
                const newBasket = useState('basket', () => []);
                saveBasket(newBasket);
                return newBasket;
            }
        }
    }

    function saveBasket(basket: any) {
        if (process.client) {
            localStorage.setItem('basket', JSON.stringify(basket.value));
        }
    }

    function addToBasket(course: any) {
        const basket = getBasket();

        if (Array.isArray(basket.value)) {
            if (!basket.value.find((element) => element.id === course.id)) {
                basket.value.push(course);
            }
        }

        saveBasket(basket);
    }

    function deleteFromBasket(item: any) {
        const basket = getBasket();

        if (basket.value) {
            basket.value = basket.value.filter((i) => i.id !== item.id);
        }
        saveBasket(basket);
    }

    function cleanBasket() {
        const basket = getBasket();
        basket.value = [];
        saveBasket(basket);
    }

    return {
        getTokenCookie,
        setTokenCookie,
        deleteTokenCookie,
        cleanBasket,
        deleteFromBasket,
        addToBasket,
        getBasket,
    }
}
