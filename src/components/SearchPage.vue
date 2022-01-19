<template>
    <div>
        <div class="container-fluid mt-3">
            <div class="row">
                <div class="col-md-10 mb-4">
                    <!-- component Slider -->
                    <Slider />
                </div>
                <div class="col-md-2 mb-4">
                    <!-- component Category -->
                    <Category />
                </div>
            </div>
        </div>
        <!-- search -->
        <div class="container-fluid search-mini">
            <div class="row">
                <div class="col input-group mx-auto">
                    <input
                        type="text"
                        v-model="keywords"
                        class="form-control search-form"
                        style="width:10%;border: 1px solid #ffffff"
                        name="q"
                        placeholder="mau beli apa hari ini ?"
                        @keypress.enter="search"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn search-button"
                            @click="search"
                            type="submit"
                        >
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-5 mt-4">
            <!-- data product -->
            <div class="col">
                <div v-if="products.length > 0" class="row">
                    <div
                        v-for="product in products"
                        :key="product.id"
                        class="col-md-3 col-6 mb-3"
                    >
                        <div class="card h-100 border-0 shadow rounded-md">
                            <span
                                v-if="product.discount > 0"
                                class="ribbon"
                            ></span>
                            <div class="card-img">
                                <img
                                    :src="product.image"
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
                                    <span
                                        v-if="product.title.length < 29"
                                        class="title-card"
                                    >
                                        {{ product.title }}
                                    </span>
                                    <span v-else class="title-card">
                                        {{
                                            product.title.substring(0, 29) +
                                                '...'
                                        }}
                                    </span>
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
                                    >
                                        {{ product.discount }}% OFF
                                    </span>
                                </div>

                                <div v-else class="mt-2">
                                    Special price for you
                                </div>

                                <div
                                    class="price font-weight-bold mt-3"
                                    style="color: #105652;font-size:1.1rem;"
                                >
                                    Rp.
                                    {{
                                        moneyFormat(calculateDiscount(product))
                                    }}
                                </div>
                                <router-link
                                    :to="{
                                        name: 'detail_product',
                                        params: { slug: product.slug },
                                    }"
                                    class="btn btn-light btn-md mt-3 btn-block shadow-md text-white rounded-pill"
                                    style="background: #b91646;"
                                >
                                    Detail
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="row">
                        <div
                            class="col-md-3 col-6 mb-3"
                            v-for="loader in ContentLoader"
                            :key="loader"
                        >
                            <div class="card h-100 border-0 shadow rounded-md">
                                <div class="card-body" style="padding: 1rem;">
                                    <content-loader
                                        viewBox="0 0 150 200"
                                        :speed="2"
                                        primaryColor="#f3f3f3"
                                        secondaryColor="#e3e3e3"
                                    >
                                        <rect
                                            x="21"
                                            y="178"
                                            rx="10"
                                            ry="10"
                                            width="111"
                                            height="19"
                                        />
                                        <rect
                                            x="7"
                                            y="149"
                                            rx="4"
                                            ry="4"
                                            width="138"
                                            height="9"
                                        />
                                        <rect
                                            x="6"
                                            y="3"
                                            rx="8"
                                            ry="8"
                                            width="139"
                                            height="136"
                                        />
                                        <rect
                                            x="7"
                                            y="162"
                                            rx="4"
                                            ry="4"
                                            width="71"
                                            height="8"
                                        />
                                    </content-loader>
                                </div>
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
import Category from '@/components/Category'; // <-- component Category
import Slider from '@/components/Slider'; // <-- component Slider
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    components: {
        Category, // <-- register component Category
        Slider, // <-- register component slider
        ContentLoader, // <-- vue content loader
    },

    setup() {
        // store vuex
        const store = useStore();

        // vue router
        const router = useRouter();

        // onMounted akan menjalankan action "getProducts" di module product
        onMounted(() => {
            store.dispatch('product/getProducts');
        });

        // computed properti digunakan untuk get data products dari state di module product
        const products = computed(() => {
            return store.state.product.products;
        });

        // fitur search
        let keywords = ref('');
        function search() {
            store.dispatch('product/getSearchProduct', keywords.value);
            router.push('/search');
        }

        return {
            store,
            products,
            ContentLoader: 4,
            search,
            keywords,
        };
    },
};
</script>
