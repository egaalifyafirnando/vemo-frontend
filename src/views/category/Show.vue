<template>
    <div class="mb-5 mt-4">
        <!-- data product -->
        <div class="col">
            <div v-if="products.length > 0" class="row">
                <div v-for="product in products" :key="product.id" class="col-md-3 col-6 mb-3">
                    <div class="card h-100 border-0 shadow rounded-md">
                        <span v-if="product.discount > 0" class="ribbon"></span>
                        <div class="card-img">
                            <img
                                :src="product.image"
                                loading="lazy"
                                class="w-100"
                                style="height: 15em;object-fit:cover;border-top-left-radius: .25rem;border-top-right-radius: .25rem;"
                            />
                        </div>
                        <div class="card-body" style="padding: 1rem;">
                            <router-link
                                :to="{
                                    name: 'detail_product',
                                    params: { slug: product.slug },
                                }"
                                class="card-title font-weight-bold"
                                style="font-size:1rem; color: #b91646;"
                            >
                                <span v-if="product.title.length < 29" class="title-card">{{ product.title }}</span>
                                <span v-else class="title-card">
                                    {{ product.title.substring(0, 29) + '...' }}
                                </span>
                            </router-link>

                            <div v-if="product.discount > 0" class="discount mt-2" style="color: #999">
                                <s>Rp. {{ moneyFormat(product.price) }}</s>
                                <span style="background-color: #105652;" class="badge badge-pill badge-success text-white float-md-right">
                                    {{ product.discount }}% OFF
                                </span>
                            </div>

                            <div v-else class="mt-2">
                                Special price for you
                            </div>

                            <div class="price font-weight-bold mt-3" style="color: #105652;font-size:1.1rem;">
                                Rp.
                                {{ moneyFormat(calculateDiscount(product)) }}
                            </div>
                            <router-link
                                :to="{
                                    name: 'detail_product',
                                    params: { slug: product.slug },
                                }"
                                class="btn btn-light btn-md mt-3 btn-block shadow-md text-white rounded-pill"
                                style="background: #911F27;"
                            >
                                Detail
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="row">
                    <div class="col-md-3 col-6 mb-3" v-for="loader in ContentLoader" :key="loader">
                        <div class="card h-100 border-0 shadow rounded-md">
                            <div class="card-body" style="padding: 1rem;">
                                <content-loader viewBox="0 0 150 200" :speed="2" primaryColor="#f3f3f3" secondaryColor="#e3e3e3">
                                    <rect x="21" y="178" rx="10" ry="10" width="111" height="19" />
                                    <rect x="7" y="149" rx="4" ry="4" width="138" height="9" />
                                    <rect x="6" y="3" rx="8" ry="8" width="139" height="136" />
                                    <rect x="7" y="162" rx="4" ry="4" width="71" height="8" />
                                </content-loader>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'; // <-- vue content loader
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    components: {
        ContentLoader, // <-- vue content loader
    },
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
            ContentLoader: 4,
        };
    },
};
</script>
