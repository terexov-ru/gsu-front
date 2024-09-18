import { API } from "~/constants/index.js";
import { useLazyFetch } from "nuxt/app";

const NEWS_PATH = "/page/news";
const NEWS_ID_PATH = "/page/get_news";
const REV_PATH = "/page/reviews";
const TEAM_PATH = "/page/company_employees";
const FORM_PATH = "/api/make_request";
const ORDER_PATH = "/api/create_order";
const REGISTRY_PATH = "/page/company_registry";
const REQUISITES_PATH = "/page/company_requisites";
const DETAILS_PATH = "/page/company_details";
const LICENSE_PATH = "/page/company_license";
const ABOUT_PATH = "/page/company_info";
const CONTACTS_PATH = "/page/company_contacts";
const FAQS_PATH = "/page/faqs";
const TECH_PATH = "/page/technical_requirements";
const PROMO_PATH = "/get_promo_for_month";

/* AUTH */
const LOGIN_PATH = "/auth/login";
const REG_PATH = "/auth/register";
const PROFILE_PATH = "/profile";
const SET_INFO_PATH = "/profile/set_info";
const SET_PASS_PATH = "/profile/set_password";
const GET_COURSES_PATH = "/profile/courses";
const GET_ORDERS_PATH = "/profile/orders";
const UPLOAD_DOC_PATH = "/profile/manage_files";
const REVIEW_PATH = "/api/create_review";

export const useApi = () => {
  async function simpleGet(path: String) {
    return useFetch(API + path, {
      method: "GET",
    });
  }

  async function getNews(
    start: Number,
    amount: Number,
    year: Number = 0,
    type: Number = 0
  ) {
    return useFetch(API + NEWS_PATH, {
      method: "POST",
      body: {
        start: start,
        amount: amount,
        year: year,
        type: type,
      },
    });
  }

  async function getNewsById(id: Number) {
    return useFetch(API + NEWS_ID_PATH, {
      method: "POST",
      body: {
        news_id: id,
      },
    });
  }

  async function getRevs(
    start: Number = 0,
    amount: Number = 10,
    thanks: Boolean = false
  ) {
    return await $fetch(API + REV_PATH, {
      method: "POST",
      body: {
        start: start,
        amount: amount,
        thanks: thanks,
      },
    });
  }

  async function getTeam(
    start: Number = 0,
    amount: Number = 10,
    category: Number = 0
  ) {
    return useFetch(API + TEAM_PATH, {
      method: "POST",
      body: {
        start: start,
        amount: amount,
        category: category,
      },
    });
  }

  async function getRegistry() {
    return useFetch(API + REGISTRY_PATH, {
      method: "GET",
    });
  }

  async function getReq() {
    return useFetch(API + REQUISITES_PATH, {
      method: "GET",
    });
  }

  async function getDetails() {
    return useFetch(API + DETAILS_PATH, {
      method: "GET",
    });
  }

  async function getLicense() {
    return useFetch(API + LICENSE_PATH, {
      method: "GET",
    });
  }

  async function getAbout() {
    return useFetch(API + ABOUT_PATH, {
      method: "GET",
    });
  }

  async function getContacts() {
    return useFetch(API + CONTACTS_PATH, {
      method: "GET",
    });
  }

  async function getFAQS() {
    return useFetch(API + FAQS_PATH, {
      method: "GET",
    });
  }

  async function getTechs() {
    return useFetch(API + TECH_PATH, {
      method: "GET",
    });
  }

  async function checkPromocode(month: String) {
    return useFetch(API + PROMO_PATH, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
      body: {
        month: month,
      },
    });
  }

  async function sendForm(
    name: String,
    email: String,
    phone: String,
    title: String,
    text: String,
    page: String
  ) {
    return useFetch(API + FORM_PATH, {
      method: "POST",
      body: {
        name: name,
        email: email,
        phone: phone,
        title: title,
        text: text,
        page_from: page,
      },
    });
  }

  async function sendFormVacancies(
    name: String,
    phone: String,
    title: String,
    page: String,
    file: Object
  ) {
    return useFetch(API + FORM_PATH, {
      method: "POST",
      body: {
        name: name,
        phone: phone,
        title: title,
        page_from: page,
        file: file,
      },
    });
  }

  async function createOrder(
    name: String,
    email: String,
    phone: String,
    courses: String,
    promo: String
  ) {
    return useFetch(API + ORDER_PATH, {
      method: "POST",
      body: {
        courses: courses,
        fio: name,
        email: email,
        phone: phone,
        promo: promo,
      },
      async onResponseError({ request, response, options }) {
        console.log(
          "[fetch respons error]",
          request,
          response.status,
          response.body
        );
      },
    });
  }

  async function createOrderAuth(courses: string) {
    return useFetch(API + ORDER_PATH, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
      body: {
        courses: courses,
      },
      async onResponseError({ request, response, options }) {
        console.log(
          "[fetch respons error]",
          request,
          response.status,
          response.body
        );
      },
    });
  }

  /* AUTH */
  const { getTokenCookie, setTokenCookie } = useUtils();

  async function login(login: String, pass: String) {
    const { data: data } = await useFetch(API + LOGIN_PATH, {
      method: "POST",
      body: {
        credential: login,
        password: pass,
      },
    });

    if (data.value?.token) {
      setTokenCookie(data.value?.token);
      return true;
    }

    return false;
  }

  async function reg(phone: String, email: String) {
    const body = {
      phone: phone,
      email: email,
    };

    const response = await fetch(API + REG_PATH, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const message = await response.json();

    if (message.status === "error") {
      if (
        message.message.includes("email") &&
        message.message.includes("phone")
      ) {
        return "Данный номер телефона и почта уже используются";
      } else if (message.message.includes("email")) {
        return "Данная почта уже используется";
      } else if (message.message.includes("phone")) {
        return "Данный номер телефона уже используется";
      } else {
        return "Произошла ошибка";
      }
    }

    return true;
  }

  async function setInfo(profile: Object) {
    const response = await fetch(API + SET_INFO_PATH, {
      method: "POST",
      body: JSON.stringify(profile),
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
    });

    const message = await response.json();

    if (message.status === "error") {
      return "Произошла ошибка";
    }

    return true;
  }

  async function deleteAvatar() {
    const response = await fetch(API + SET_INFO_PATH, {
      method: "POST",
      body: '{"avatar": null}',
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
    });

    const message = await response.json();

    if (message.status === "error") {
      return "Произошла ошибка";
    }

    return true;
  }

  async function setAvatar(avatar) {
    const response = await fetch(API + SET_INFO_PATH, {
      method: "POST",
      body: JSON.stringify(avatar),
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
    });

    const message = await response.json();

    if (message.status === "error") {
      return "Произошла ошибка";
    }

    return true;
  }

  async function setPass(password: Object) {
    const response = await fetch(API + SET_PASS_PATH, {
      method: "POST",
      body: JSON.stringify(password),
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
    });

    const message = await response.json();

    if (message.status === "error") {
      return "Произошла ошибка";
    }

    return true;
  }

  async function getUser() {
    const response = await fetch(API + PROFILE_PATH, {
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
    });

    const message = await response.json();

    if (message.message === "unauthorized") {
      navigateTo("/");
    }

    return message;
  }

  async function getUserLazy() {
    return useLazyFetch(API + PROFILE_PATH, {
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
    });
  }

  async function getAccCourses() {
    return useLazyFetch(API + GET_COURSES_PATH, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
    });
  }

  async function sendFile(name: String, file: String) {
    const data = {
      upload: [
        {
          name: name,
          data: file,
        },
      ],
    };

    return $fetch(API + UPLOAD_DOC_PATH, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
      body: data,
    });
  }

  async function deleteFile(id: String) {
    const data = {
      delete: [
        {
          id: id,
        },
      ],
    };

    return $fetch(API + UPLOAD_DOC_PATH, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
      body: data,
    });
  }

  async function saveFiles(addFiles, delFiles) {
    const data = {
      upload: addFiles,
      delete: delFiles,
    };

    return $fetch(API + UPLOAD_DOC_PATH, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
      body: data,
    });
  }

  async function getOrders() {
    return useLazyFetch(API + GET_ORDERS_PATH, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
    });
  }

  async function createReview(
    id: Number,
    text: String,
    title: String,
    rating: Number = 5
  ) {
    return $fetch(API + REVIEW_PATH, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getTokenCookie()}`,
      },
      body: {
        course_id: id,
        text: text,
        title: title,
        rating: rating,
      },
    });
  }

  // async function getAccOrders() {
  //     const response = await useLazyFetch(API + GET_COURSES_PATH, {
  //         headers: {
  //             'Authorization': `Bearer ${getTokenCookie()}`
  //         },
  //     });
  //
  //     const message = await response.json();
  //
  //     if (message.message === 'unauthorized') {
  //         navigateTo('/');
  //     }
  //
  //     return message;
  // }

  return {
    simpleGet,
    getNews,
    getRevs,
    getTeam,
    getNewsById,
    getContacts,
    getFAQS,
    getTechs,
    getAbout,
    getLicense,
    getRegistry,
    getReq,
    getDetails,
    sendForm,
    sendFormVacancies,
    login,
    reg,
    getUser,
    setInfo,
    setPass,
    getAccCourses,
    sendFile,
    deleteFile,
    saveFiles,
    getOrders,
    getUserLazy,
    createOrder,
    createOrderAuth,
    deleteAvatar,
    setAvatar,
    createReview,
    checkPromocode,
  };
};
