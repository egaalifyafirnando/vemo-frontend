<template>
    <div class="container-fluid mb-5 mt-4">
        <div v-if="categories.length > 0" class="row">
            <div v-for="category in categories" :key="category.id" class="col-md-2 col-sm-4 col-6 mb-3">
                <router-link
                    :to="{
                        name: 'detail_category',
                        params: { slug: category.slug },
                    }"
                >
                    <div class="card h-100 border-0 rounded shadow">
                        <div class="card-body text-center">
                            <img :src="category.image" loading="lazy" style="width: 100px;" />
                            <hr />
                            <label class="font-weight-bold" style="color: #105652;">{{ category.name }}</label>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div v-else class="row">
            <div class="col-md-2 col-sm-4 col-6 mb-3" v-for="loader in ContentLoader" :key="loader">
                <content-loader viewBox="0 0 135 140" :speed="2" primaryColor="#f3f3f3" secondaryColor="#e3e3e3">
                    <rect x="7" y="3" rx="8" ry="8" width="124" height="128" />
                </content-loader>
            </div>
        </div>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'; // <-- vue content loader
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        ContentLoader, // <-- vue content loader
    },
    setup() {
        // store vuex
        const store = useStore();

        // onMounted akan menjalankan action "getCategories" di module "category"
        onMounted(() => {
            store.dispatch('category/getCategories');
        });

        // computed properti digunakan untuk mendapatkan data dari state "categories" di module "category"
        const categories = computed(() => {
            return store.state.category.categories;
        });

        return {
            store,
            categories,
            ContentLoader: 6,
        };
    },
};
</script>
