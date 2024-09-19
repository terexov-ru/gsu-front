export const useUtils = () => {
  function getTokenCookie(): string | undefined {
    return useCookie("token")?.value;
  }

  function setTokenCookie(token: string): void {
    const tokenRef = useCookie("token");
    tokenRef.value = token;
  }

  function deleteTokenCookie(): void {
    const tokenRef = useCookie("token");
    tokenRef.value = undefined;
  }

  function getBasket() {
    if (process.client) {
      const store = localStorage.getItem("basket");
      if (store !== null) {
        const basket: any = JSON.parse(store);
        if (Array.isArray(basket)) {
          return useState("basket", () => basket);
        }
      } else {
        const newBasket = useState("basket", () => []);
        saveBasket(newBasket);
        return newBasket;
      }
    }
  }

  function saveBasket(basket: any) {
    if (process.client) {
      localStorage.setItem("basket", JSON.stringify(basket.value));
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

  function activatePromoInBasket(
    item: any,
    promo: {
      id: number;
      code: string;
      percent: number;
      month: string;
    }
  ) {
    const basket = getBasket();

    if (basket.value) {
      let basketItem = basket.value.find((i) => i.id === item.id);

      if (promo.id == null) {
        basketItem.promo = null;
        basketItem.price_sale = 0;
      } else {
        basketItem.promo = promo.id;
        basketItem.promoObject = promo;
        basketItem.price_sale = parseFloat(
          (basketItem.price * (1 - promo.percent / 100)).toFixed(2)
        );
      }
    }

    saveBasket(basket);
  }

  function setPromoInBasket(
    item: any,
    promoId: number | null,
    discountPercentage: number
  ) {
    const basket = getBasket();

    if (basket.value) {
      let basketItem = basket.value.find((i) => i.id === item.id);

      basketItem.promo = null;
      basketItem.price_sale = 0;
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
    setPromoInBasket,
    activatePromoInBasket,
    getBasket,
  };
};
