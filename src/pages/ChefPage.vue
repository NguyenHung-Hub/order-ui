<script setup lang="ts">
import { computed, onMounted, ref, watchEffect, onBeforeMount, reactive, watch, toRaw } from 'vue';
import { useStore } from 'vuex';
import {
    IInvoiceGroup,
    IInvoiceGroup2,
    IInvoiceItemGroup,
    IInvoiceItemGroup2,
    IInvoiceItemResponse,
    IInvoiceResponse,
    IInvoiceStatus,
} from '../interfaces/invoice.interface';
import ChefView from '../components/ChefView.vue';
import { cloneDeep } from 'lodash';
let invoiceStatus = reactive<IInvoiceStatus>({
    waitingConfirm: [],
    serving: [],
    delivered: [],
    finish: [],
    cancel: [],
});
let invoicesItemGroup = reactive<IInvoiceGroup2[]>([]);

const store = useStore();
const MINUTES_GROUP = 5;

const handleMap = (invoiceStatus: IInvoiceStatus) => {
    if (invoiceStatus) {
        const invoiceStatusCopy = cloneDeep(invoiceStatus);

        // [
        //     [IInvoiceResponse,IInvoiceResponse,IInvoiceResponse],
        //     [IInvoiceResponse,IInvoiceResponse],
        //     [IInvoiceResponse,IInvoiceResponse,IInvoiceResponse,IInvoiceResponse],
        //     [IInvoiceResponse],
        // ]

        //other way

        const step1: Array<IInvoiceResponse[]> = [];
        invoiceStatus.serving.forEach((invoice: IInvoiceResponse, index: number) => {
            if (index == 0) {
                step1.push([invoice]);
            } else {
                const t = new Date(invoice.createdAt as string);
                let findIndexToPush = -1;
                step1.forEach((itemAcc, index) => {
                    const t2 = new Date(itemAcc[0].createdAt as string);
                    t2.setMinutes(t2.getMinutes() + MINUTES_GROUP);
                    if (t.getTime() < t2.getTime()) {
                        findIndexToPush = index;
                    }
                });

                if (findIndexToPush < 0) {
                    step1.push([invoice]);
                } else {
                    step1[findIndexToPush].push(invoice);
                }
            }
        });

        const step2 = step1.map((group: IInvoiceResponse[]) => {
            return group.reduce((acc: IInvoiceGroup[], curr: IInvoiceResponse) => {
                const updateItems = curr.items.map((i: IInvoiceItemResponse) => ({ ...i, invoiceId: curr._id }));

                return [
                    ...acc,
                    {
                        shopId: curr.shopId,
                        group: [...updateItems],
                        createdAt: curr.createdAt,
                        updatedAt: curr.updatedAt,
                    } as IInvoiceGroup,
                ];
            }, [] as IInvoiceGroup[]);
        });

        const step3 = step2.map((list: IInvoiceGroup[]) => {
            return list.reduce((acc, curr, index) => {
                if (index != 0) {
                    return {
                        shopId: curr.shopId,
                        group: [...acc.group, ...curr.group],
                        createdAt: curr.createdAt,
                        updatedAt: curr.updatedAt,
                    };
                }

                return {
                    shopId: curr.shopId,
                    group: [...curr.group],
                    createdAt: curr.createdAt,
                    updatedAt: curr.updatedAt,
                };
            }, {} as IInvoiceGroup);
        });

        const step4 = step3.reduce((acc: IInvoiceGroup2[], curr: IInvoiceGroup) => {
            const group: IInvoiceItemGroup2[] = [];
            curr.group.forEach((element: IInvoiceItemGroup, index: number) => {
                if (index != 0) {
                    const findIndex = group.findIndex((i) => i.product._id === element.product._id);
                    if (findIndex >= 0) {
                        group[findIndex].invoiceId.push(element.invoiceId);
                        group[findIndex].quantity += element.quantity;
                        group[findIndex].done += element.done;
                        group[findIndex].delivered += element.delivered;
                    } else {
                        group.push({ ...element, invoiceId: [element.invoiceId] });
                    }
                } else {
                    group.push({ ...element, invoiceId: [element.invoiceId] });
                }
            });

            return [
                ...acc,
                {
                    shopId: curr.shopId,
                    group: group,
                    createdAt: curr.createdAt,
                    updatedAt: curr.updatedAt,
                } as IInvoiceGroup2,
            ];
        }, [] as IInvoiceGroup2[]);

        console.log(`file: ChefPage.vue:63 > temp2:`, step2);
        console.log(`file: ChefPage.vue:63 > temp3:`, step3);
        console.log(`file: ChefPage.vue:63 > temp4:`, step4);

        invoicesItemGroup.length = 0;
        invoicesItemGroup.push(...step4);
    }
};

onBeforeMount(async () => {
    await store.dispatch('fetchInvoices', store.getters['shopId']);
    invoiceStatus = store.getters['invoices'];

    if (invoiceStatus) handleMap(invoiceStatus);
});

watchEffect(() => {
    invoiceStatus = store.getters['invoices'];
    if (invoiceStatus) handleMap(invoiceStatus);
});
</script>

<template>
    <div class="wrapper">
        <div class="scroll-container">
            <ChefView :food-group="invoicesItemGroup" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;

.wrapper {
    width: 100%;
    height: calc(100vh - $footer-height);
    .scroll-container {
        width: 100%;
        height: 100%;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
