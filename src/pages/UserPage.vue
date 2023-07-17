<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import HeaderProfile from '../components/HeaderProfile.vue';
import Button from '../components/Button.vue';
import QrIcon from '../components/Icons/QrIcon.vue';
import UserNewIcon from '../components/Icons/UserNewIcon.vue';
import ProductSection from '../components/ProductSection.vue';
import { IProduct } from '../interfaces/product.interface';
import { IDashboardData } from '../interfaces/dashboard.interface';
import ChervonRightIcon from '../components/Icons/ChervonRightIcon.vue';
import * as invoiceService from '../services/invoice.service';
import * as dashboardService from '../services/dashboard.service';
import { formatMoneyStr } from '../utils/format';
import { routesName } from '../router';
import roleName from '../config/roleName';

const store = useStore();
const shopName = store.getters['shopName'];
const purchasedProduct = ref<IProduct[]>();
const dashboardData = ref<IDashboardData>({
    tableCount: 0,
    customerCount: 0,
    invoiceCount: 0,
    totalMoney: 0,
});
const role = store.getters['userRole'];

onMounted(async () => {
    try {
        const result = await invoiceService.getByUser(store.getters['user']._id);

        if (result) {
            purchasedProduct.value = result.reduce((acc: IProduct[], curr) => {
                const products = curr.items.reduce(
                    (acc2: IProduct[], curr2) => [...acc2, curr2.product],
                    [] as IProduct[],
                );
                return [...acc, ...products];
            }, []);
        }

        const result2 = await dashboardService.get(store.getters['user'].shopId);
        if (result2) {
            dashboardData.value = result2;
        }
    } catch (error) {
        console.log(`file: UserPage.vue:24 > error:`, error);
    }
});
</script>

<template>
    <div class="user-wrapper">
        <div class="scroll-container">
            <HeaderProfile class="header" />

            <div class="feature__wrapper" v-if="role == roleName.MANAGER">
                <div class="feature">
                    <Button class="feature-btn" :vertical="true" :to-name="routesName.QrPage">
                        <QrIcon />
                        <span class="label">QR code</span>
                    </Button>
                </div>
                <div class="feature">
                    <Button class="feature-btn" :vertical="true" :to-name="routesName.DiningTablePage">
                        <UserNewIcon />
                        <span class="label">Tables</span>
                    </Button>
                </div>
                <div class="feature">
                    <Button class="feature-btn" :vertical="true" :to-name="routesName.FoodPage">
                        <UserNewIcon />
                        <span class="label">Foods</span>
                    </Button>
                </div>

                <div class="feature">
                    <Button class="feature-btn" :vertical="true" :to-name="routesName.CreateAccount">
                        <UserNewIcon />
                        <span class="label">Account</span>
                    </Button>
                </div>
            </div>

            <div class="dashboard__wrapper" v-if="role == roleName.MANAGER">
                <div class="statistics__wrapper">
                    <div class="statistic__box">
                        <span class="statistic-number">{{ dashboardData?.tableCount }}</span>
                        <span class="statistic-label">Bàn</span>
                    </div>
                    <div class="statistic__box">
                        <span class="statistic-number">{{ dashboardData?.invoiceCount }}</span>
                        <span class="statistic-label">Lượt gọi món</span>
                    </div>
                    <div class="statistic__box">
                        <span class="statistic-number">{{ dashboardData?.customerCount }}</span>
                        <span class="statistic-label">Khách hàng</span>
                    </div>
                    <div class="statistic__box">
                        <span class="statistic-number">{{ formatMoneyStr(dashboardData?.totalMoney) }}</span>
                        <span class="statistic-label">Doanh thu</span>
                    </div>
                </div>
            </div>

            <div class="feature-list" v-if="role == roleName.CUSTOMER">
                <Button full class="btn-flat" :to-name="routesName.OrderHistoryPage">
                    <span>Đơn mua</span>
                    <ChervonRightIcon :color="`#ccc`" />
                </Button>
                <Button full class="btn-flat">
                    <span>Tạo shop</span>
                    <ChervonRightIcon :color="`#ccc`" />
                </Button>
            </div>
            <div class="feature-list mt-8" v-if="role == roleName.CUSTOMER">
                <ProductSection :title="'Món đã đặt'" :products="purchasedProduct" v-if="purchasedProduct" />
            </div>

            <div class="feature-list mt-8">
                <Button full class="btn-flat">
                    <span>Thông tin tài khoản</span>
                    <ChervonRightIcon :color="`#ccc`" />
                </Button>
                <Button full class="btn-flat">
                    <span>Đăng xuất</span>
                    <ChervonRightIcon :color="`#ccc`" />
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles' as *;

.user-wrapper {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100vh;
    background: rgb(235, 235, 235);
    .scroll-container {
        overflow-y: scroll;
        padding-bottom: $footer-height;

        &::-webkit-scrollbar {
            display: none;
        }

        .feature__wrapper {
            @include flex-center();

            $padding: 8px;

            width: 100%;
            padding: calc($padding * 2) $padding;

            background-color: #fff;

            .feature {
                $size: calc((100vw - $padding * 2) / 4);
                padding: 4px;

                width: $size;
                height: $size;

                &:not(:last-child) {
                    // margin-right: 16px;
                }

                .feature-btn {
                    padding: 6px;
                    width: 100%;
                    height: 100%;

                    box-shadow: 0px 2px 8px 2px rgba($color: #acacac, $alpha: 0.3);

                    .label {
                        margin-top: 2px;
                        font-size: 1.2rem;
                        color: $text-primary;
                    }
                }
            }
        }

        .dashboard__wrapper {
            margin: 8px 0;
            padding: 8px 0;

            background-color: #fff;
            .statistics__wrapper {
                $padding: 16px;
                padding: $padding;
                $col: calc((100vw - $padding * 2) / 2);
                $row: min($col / 2, 100px);

                display: grid;
                justify-content: center;
                gap: $padding;
                grid-template-columns: repeat(2, $col);
                grid-template-rows: repeat(2, $row);

                .statistic__box {
                    @include col-center();
                    @include square(100%, 8px);

                    color: #fff;
                    box-shadow: 0px 1px 4px 0px rgba($color: #868686, $alpha: 0.3);

                    .statistic-number {
                        font-size: 3.6rem;
                        font-weight: bold;
                        user-select: none;
                    }
                    .statistic-label {
                        font-size: 1.8rem;
                        font-weight: bold;
                        user-select: none;
                    }

                    &:nth-child(1) {
                        background: linear-gradient(135deg, #9055ff, #13e2da);
                    }
                    &:nth-child(2) {
                        background: linear-gradient(135deg, #f06966, #fad6a6);
                    }
                    &:nth-child(3) {
                        background: linear-gradient(135deg, #d6ff7f, #00b3cc);
                    }
                    &:nth-child(4) {
                        background: linear-gradient(135deg, #ed7b84, #9055ff);
                    }
                }
            }
        }

        .feature-list {
            display: flex;
            flex-direction: column;
            .btn-flat {
                margin: 0;

                border-radius: 0;
                border-bottom: 1px solid #eee;

                span {
                    font-family: 'Roboto', serif;
                    font-size: 1.4rem;
                    font-weight: 300;
                }
            }
        }
    }
}
</style>
