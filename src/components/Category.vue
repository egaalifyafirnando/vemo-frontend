<template>
    <div class="card border-0 shadow rounded">
        <div class="card-body">
            <h5 class="font-weight-bold"><i class="fa fa-shopping-bag"></i> KATEGORI</h5>
            <hr />
            <ul class="list-group">
                <div v-if="categories.length > 0">
                    <router-link
                        :to="{
                            name: 'detail_category',
                            params: { slug: category.slug },
                        }"
                        v-for="category in categories.slice(0, 4)"
                        :key="category.id"
                        class="list-group-item shadow-sm font-weight-bold text-decoration-none text-dark rounded-pill"
                    >
                        <img :src="category.image" style="width:35px" />
                        {{ category.name }}
                    </router-link>
                </div>
                <div v-else>
                    <div v-for="loader in ContentLoader" :key="loader">
                        <div>
                            <ContentLoader viewBox="0 0 200 130" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb">
                                <rect x="5" y="2" rx="16" ry="16" width="192" height="36" />
                                <rect x="5" y="45" rx="16" ry="16" width="192" height="36" />
                                <rect x="5" y="88" rx="16" ry="16" width="192" height="36" />
                            </ContentLoader>
                        </div>
                    </div>
                </div>

                <router-link
                    :to="{ name: 'categories' }"
                    class="list-group-item text-center active shadow-sm font-weight-bold text-decoration-none rounded-pill"
                    >LAINNYA <i class="fa fa-long-arrow-alt-right"></i>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'; // <-- vue content loader
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
    components: {
        ContentLoader,
    },
    setup() {
        // store vuex
        const store = useStore();

        // onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
        onMounted(() => {
            store.dispatch('category/getCategories');
        });

        // computed properti digunakan untuk get data categories
        const categories = computed(() => {
            return store.state.category.categories;
        });

        return {
            categories,
            ContentLoader: 1,
        };
    },
};
</script>
