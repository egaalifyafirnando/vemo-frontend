// import global API
import Api from '../../api/Api';

const product = {
    // set namespace true
    namespaced: true,

    // state
    state: {
        // index products
        products: [],

        // detail product
        product: {},
    },

    // mutations
    mutations: {
        // set state products dengan data dari response
        GET_PRODUCTS(state, products) {
            state.products = products;
        },

        // set state detail product dengan data dari response
        DETAIL_PRODUCT(state, product) {
            state.product = product;
        },
    },

    // actions
    actions: {
        // action getProducts
        getProducts({ commit }) {
            Api.get('/products')
                .then((response) => {
                    // commit ke mutation GET_PRODUCTS dengan response data
                    commit('GET_PRODUCTS', response.data.products);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        // action getDetailProduct
        getDetailProduct({ commit }, slug) {
            Api.get(`/product/${slug}`)
                .then((response) => {
                    // commit ke mutation DETAIL_PRODUCT dengan response data
                    commit('DETAIL_PRODUCT', response.data.product);
                })
                .catch((error) => {
                    // show error log dari response
                    console.log(error);
                });
        },

        // fitur search
        getSearchProduct({ commit }, products) {
            // get data product ke server
            Api.get(`/search?q=${products}`)
                .then((response) => {
                    // commit ke mutation GET_PRODUCTS dengan response data
                    commit('GET_PRODUCTS', response.data.products);
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

export default product;
