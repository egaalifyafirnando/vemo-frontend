<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div
                v-for="product in products"
                :key="product.id"
                class="col-md-3 col-6 mb-3"
            >
                <div class="card h-100 border-0 shadow rounded-md">
                    <span v-if="product.discount > 0" class="ribbon"></span>
                    <div class="card-img">
                        <img
                            :src="product.image"
                            class="w-100"
                            style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;"
                        />
                    </div>
                    <div class="card-body">
                        <router-link
                            :to="{
                                name: 'detail_product',
                                params: { slug: product.slug },
                            }"
                            class="card-title font-weight-bold"
                            style="font-size:1.2rem; color: #b91646;"
                        >
                            {{ product.title }}
                        </router-link>

                        <div
                            v-if="product.discount > 0"
                            class="discount mt-2"
                            style="color: #999"
                        >
                            <s>Rp. {{ moneyFormat(product.price) }}</s>
                            <span
                                style="background-color: #105652;"
                                class="badge badge-pill badge-success text-white float-md-right"
                                >{{ product.discount }}% OFF</span
                            >
                        </div>

                        <div v-else class="mt-2">
                            Special price for you
                        </div>

                        <div
                            class="price font-weight-bold mt-3"
                            style="color: #105652;font-size:1.1rem;"
                        >
                            Rp.
                            {{ moneyFormat(calculateDiscount(product)) }}
                        </div>
                        <router-link
                            :to="{
                                name: 'detail_product',
                                params: { slug: product.slug },
                            }"
                            class="btn btn-light btn-md mt-3 btn-block shadow-md text-white rounded-pill"
                            style="background: #b91646;"
                            >Detail</router-link
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    setup() {
        // store vuex
        const store = useStore();

        // vue router
        const route = useRoute();

        // onMounted akan menjalankan action "getProductInCategory" di module "category" Vuex
        onMounted(() => {
            store.dispatch('category/getProductInCategory', route.params.slug);
        });

        // computed properti digunakan untuk mendapatkan data products dari state "productInCategory" di module "category"
        const products = computed(() => {
            return store.state.category.productInCategory;
        });

        return {
            store,
            route,
            products,
        };
    },
};
</script>

<style scooped>
.card .ribbon {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 100px;
    height: 100px;
    /* background: red; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.card .ribbon:before {
    content: 'discount';
    position: absolute;
    width: 150%;
    height: 40px;
    background: #b91646;
    transform: rotate(-45deg) translateY(-20px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 600;
    color: white;
}

.card .ribbon:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background: #770f2e;
    z-index: -1;
    /* 
    height ribbon: 150
    height rear ribbon: 10
    150 - 10 = 140
     */
    box-shadow: 90px -90px #770f2e;
}
</style>
