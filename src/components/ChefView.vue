<script setup lang="ts">
import { IInvoiceGroup2 } from '../interfaces/invoice.interface';
import CardProductSimple from './Card/CardProductSimple.vue';

interface Props {
    foodGroup: IInvoiceGroup2[];
}
// một bàn gọi 2-3 giống nhau??
// {
//     product:,
//     quantity:,
//     status:,
//     invoiceId:[], được sắp xếp theo thời gian sớm nhất - thời gian muộn nhất, làm sao để cố định???
// }

// khi bấm tăng số món abc hoàn thành là 3/5 thì sẽ lấy 3 id[0, 1, 2] trong invoiceId để cập nhật đã hoàn thành món
const props = defineProps<Props>();

function calcTime(time: string | object) {
    const t1 = new Date(time as string);
    const t2 = new Date(time as string);
    t2.setMinutes(t2.getMinutes() + 5);

    return `${t1.getHours()}:${t1.getMinutes()} - ${t2.getHours()}:${t2.getMinutes()}`;
}
</script>

<template>
    <div class="wrapper" v-for="(section, i) in props.foodGroup" :key="i">
        <div class="section-wrapper">
            <div class="section-info">
                <span>Gộp đơn {{ i + 1 }}</span>
                <span>{{ calcTime(section.createdAt) }}</span>
                <span>3 minutes ago</span>
            </div>

            <div class="card__wrapper" v-for="(item, j) in section.group" :key="j">
                <CardProductSimple :data="item" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    .section-wrapper {
        margin: 16px 8px;
        padding: 4px;

        box-shadow: 0px 2px 8px 2px rgba($color: #acacac, $alpha: 0.3);
        border-radius: 4px;

        .section-info {
            display: flex;
            justify-content: space-between;
            padding: 4px;
            border-bottom: 1px solid #dedede;
        }
        .card__wrapper {
            display: flex;
            justify-content: space-between;
            margin: 8px;
        }
    }
}
</style>
