<script setup lang="ts">
import { ref, computed } from 'vue';
import { IInvoiceResponse } from '../interfaces/invoice.interface';
import { formatMoney } from '../utils/format';
import { calcTotal } from '../utils/calcInvoices';

interface Props {
    invoice: IInvoiceResponse;
}

const props = defineProps<Props>();
console.log(props.invoice.items);

const totalInvoice = computed(() => calcTotal(props.invoice.items));

const refComp = ref();

defineExpose({ refComp });
</script>

<template>
    <div class="wrapper" ref="refComp">
        <table>
            <tr v-for="item in props.invoice?.items" :key="item.product._id">
                <td>{{ item.product.name }}</td>
                <td>x{{ item.quantity }}</td>
                <td>{{ formatMoney(item.product.priceSale) }} đ</td>
                <td>{{ formatMoney(item.quantity * item.product.priceSale) }} đ</td>
            </tr>
            <tr>
                <td colspan="3">Tổng cộng:</td>
                <td>{{ totalInvoice }} đ</td>
            </tr>
        </table>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;
.wrapper {
    width: 100%;

    table {
        padding: 8px;

        width: 100%;

        border-spacing: 1px;

        tr {
            td {
                padding: 4px 0px;
                font-size: 1.3rem;
                line-height: 13px;

                &:nth-child(3),
                &:last-child {
                    text-align: right;
                }
            }
        }
    }
}
</style>
