<script setup lang="ts">
import { IInvoiceItemResponse } from '../interfaces/invoice.interface';

interface Props {
    invoices: IInvoiceItemResponse[];
}

const props = defineProps<Props>();
</script>

<template>
    <div class="name" v-for="invoice in invoices" :key="invoice.product._id">
        {{ invoice.product.name }} - x{{ invoice.quantity }}
    </div>
</template>

<style scoped lang="scss"></style>
