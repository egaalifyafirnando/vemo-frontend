// import global API
import Api from '../../api/Api';

const category = {
    // set namespace true
    namespaced: true,

    // state
    state: {
        // index categories
        categories: [],

        // product in category
        productInCategory: [],
    },

    // mutation
    mutations: {
        // set state categories dengan data dari response
        GET_CATEGORIES(state, categories) {
            state.categories = categories;
        },

        // set state productInCategory dengan data response
        PRODUCT_IN_CATEGORY(state, products) {
            state.productInCategory = products;
        },
    },

    // action
    actions: {
        // action getCategories
        getCategories({ commit }) {
            // get data categories ke server
            Api.get('/categories')
                .then((response) => {
                    // commit ke mutation GET_CATEGORIES dengan response data
                    commit('GET_CATEGORIES', response.data.categories);
                })
                .catch((error) => {
                    // show error log dari response
                    console.log(error);
                });
        },

        // action getProductInCategory
        getProductInCategory({ commit }, slug) {
            // get data product by category ke server
            Api.get(`/category/${slug}`)
                .then((response) => {
                    // commit ke mutation PRODUCT_IN_CATEGORY dengan response data
                    commit('PRODUCT_IN_CATEGORY', response.data.product);
                })
                .catch((error) => {
                    // show error log dari response
                    console.log(error);
                });
        },
    },

    // getters
    getters: {},
};

export default category;
