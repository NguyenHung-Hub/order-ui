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
        // const invoiceStatusCopy = invoiceStatus;
        console.log(`file: C hefPage.vue:22 > invoiceStatusCopy:`, invoiceStatusCopy);

        const step1 = invoiceStatusCopy.serving.reduce<IInvoiceResponse[][]>(
            (acc: IInvoiceResponse[][], curr: IInvoiceResponse, index: number) => {
                if (index == 0) {
                    return [[curr]];
                }
                const t = new Date(curr.createdAt as string);

                let findIndexPush = -1;
                acc.forEach((itemAcc, index) => {
                    const t2 = new Date(itemAcc[0].createdAt as string);
                    console.log(`Time: `, itemAcc[0].createdAt, ' - ', curr.createdAt);
                    console.log(`Time: `, t2.toLocaleTimeString(), ' - ', t.toLocaleTimeString());
                    t2.setMinutes(t2.getMinutes() + MINUTES_GROUP);
                    if (t.getTime() < t2.getTime()) {
                        findIndexPush = index;
                    }
                    console.log('for : ', index);
                });

                if (findIndexPush < 0) {
                    console.log('index < 0 : ', findIndexPush);
                    return [...acc, [curr]];
                }

                const arr = [...acc];
                console.log({ arr });
                arr[findIndexPush].push(curr);
                console.log({ arr });
                return arr;
            },
            [] as IInvoiceResponse[][],
        );
        console.log(`file: ChefPage.vue:48 > TEMP:`, step1);

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
