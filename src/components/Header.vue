<template>
    <header class="section-header">
        <section class="header-main border-bottom">
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-md-3 col-4">
                        <router-link
                            :to="{ name: 'home' }"
                            class="text-decoration-none"
                            data-abc="true"
                        >
                            <span class="logo">
                                VEMO
                            </span>
                        </router-link>
                    </div>
                    <div class="col-md-5 d-none d-md-block">
                        <div class="input-group w-100">
                            <input
                                type="text"
                                v-model="keywords"
                                class="form-control search-form"
                                style="width:55%;border: 1px solid #ffffff"
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
                    <div class="col-md-4 col-8">
                        <div class="d-flex justify-content-end">
                            <div class="cart-header">
                                <div class="cart-header">
                                    <router-link
                                        :to="{ name: 'cart' }"
                                        class="badge badge-pill mt-1"
                                        style="color: #b91646;background-color: #fff;border-color: #ffffff; line-height: 20px; cursor: pointer;"
                                    >
                                        <i class="fa fa-shopping-cart"></i>
                                        {{ cartCount }} | Rp.
                                        {{ moneyFormat(cartTotal) }}
                                    </router-link>
                                </div>
                            </div>

                            <div class="account">
                                <router-link
                                    :to="{ name: 'login' }"
                                    v-if="!isLoggedIn"
                                    class="ml-3"
                                    style="background-color: #B91646;"
                                >
                                    <i
                                        class="fa fa-user-circle"
                                        style="color: white;
                                        font-size: 1.7rem; line-height: 33px"
                                    ></i>
                                </router-link>
                                <router-link
                                    :to="{ name: 'dashboard' }"
                                    v-else
                                    class="ml-3"
                                    style="background-color: #B91646;"
                                >
                                    <i
                                        class="fa fa-store-alt"
                                        style="color: white;
                                        font-size: 1.4rem; line-height: 33px"
                                    ></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    setup() {
        //store vuex
        const store = useStore();

        //vue router
        const router = useRouter();

        //computed
        const isLoggedIn = computed(() => {
            //get getter "isLoggedIn" dari module "auth"
            return store.getters['auth/isLoggedIn'];
        });

        //cart count
        const cartCount = computed(() => {
            //get getter "cartCount" dari module "auth"
            return store.getters['cart/cartCount'];
        });

        //cart total
        const cartTotal = computed(() => {
            //get getter "cartTotal" dari module "auth"
            return store.getters['cart/cartTotal'];
        });

        //mounted
        onMounted(() => {
            //check state token
            const token = store.state.auth.token;

            if (!token) {
                return;
            }

            //saat mounted, akan memanggil action "cartCount" di module "cart"
            store.dispatch('cart/cartCount');

            //saat mounted, akan memanggil action "cartTotal" di module "cart"
            store.dispatch('cart/cartTotal');
        });

        let keywords = ref('');
        function search() {
            store.dispatch('product/getSearchProduct', keywords.value);
            router.push('/search');
        }

        return {
            store,
            isLoggedIn,
            cartTotal,
            cartCount,
            keywords,
            search,
        };
    },
};
</script>
