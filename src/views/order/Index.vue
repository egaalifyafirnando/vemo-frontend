<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-3 mb-4">
                <CustomerMenu />
            </div>
            <div class="col-md-9 mb-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body table-responsive">
                        <h5 class="font-weight-bold">
                            <i class="fas fa-shopping-cart"></i>
                            MY ORDER
                        </h5>
                        <hr />
                        <table class="table table-striped table-bordered">
                            <thead class="text-white" style="background: #911F27">
                                <tr>
                                    <th scope="col">INVOICE</th>
                                    <th scope="col">FULL NAME</th>
                                    <th scope="col">TOTAL PEMBAYARAN</th>
                                    <th scope="col">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="order in orders" :key="order.id">
                                    <th>
                                        <router-link
                                            :to="{
                                                name: 'detail_order',
                                                params: {
                                                    snap_token: order.snap_token,
                                                },
                                            }"
                                            class="badge badge-pill text-white p-2 cursor-pointer"
                                            style="background: #911F27;font-size:.8rem;"
                                        >
                                            {{ order.invoice }}
                                        </router-link>
                                    </th>
                                    <td>{{ order.name }}</td>
                                    <td>Rp. {{ moneyFormat(order.grand_total) }}</td>
                                    <td class="text-center">
                                        <span
                                            v-if="order.status == 'pending'"
                                            class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                            style="background: #2D5C7F;font-size:.8rem;"
                                        >
                                            {{ order.status }}
                                        </span>
                                        <span
                                            v-else-if="order.status == 'success'"
                                            class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                            style="background: #105652;font-size:.8rem;"
                                        >
                                            {{ order.status }}
                                        </span>
                                        <span
                                            v-else-if="order.status == 'expired'"
                                            class="badge badge-pill font-weight-bolder text-uppercase p-2"
                                            style="background:#FECD51;font-size:.8rem;"
                                        >
                                            {{ order.status }}
                                        </span>
                                        <span
                                            v-else-if="order.status == 'failed'"
                                            class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                            style="background: #911F27;font-size:.8rem;"
                                        >
                                            {{ order.status }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import customer menu component
import CustomerMenu from '@/components/CustomerMenu';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        //customer menu component
        CustomerMenu,
    },

    setup() {
        //store vuex
        const store = useStore();

        //mounted
        onMounted(() => {
            //panggil action "getOrder" di module "order" vuex
            return store.dispatch('order/getOrder');
        });

        //computed
        const orders = computed(() => {
            //panggil getter dengan nama "getOrder" di module "order" vuex
            return store.getters['order/getOrder'];
        });

        //return a state and function
        return {
            store,
            orders,
        };
    },
};
</script>

<style scoped>
.table .thead-dark th {
    color: #fff;
    background-color: #6777ef;
    border-color: #6777ef;
}
</style>
