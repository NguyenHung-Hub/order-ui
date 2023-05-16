<script setup lang="ts">
import HeaderProfile from '../components/HeaderProfile.vue';
import Button from '../components/Button.vue';
import QrIcon from '../components/Icons/QrIcon.vue';
import UserNewIcon from '../components/Icons/UserNewIcon.vue';
</script>

<template>
    <div class="user-wrapper">
        <HeaderProfile class="header" />

        <div class="feature__wrapper">
            <div class="feature">
                <Button class="feature-btn" :vertical="true" :to="'/qr'">
                    <QrIcon />
                    <span class="label">QR code</span>
                </Button>
            </div>
            <div class="feature">
                <Button class="feature-btn" :vertical="true" :to="'/table'">
                    <UserNewIcon />
                    <span class="label">Tables</span>
                </Button>
            </div>
            <div class="feature">
                <Button class="feature-btn" :vertical="true" :to="'/food'">
                    <UserNewIcon />
                    <span class="label">Foods</span>
                </Button>
            </div>

            <div class="feature">
                <Button class="feature-btn" :vertical="true" :to="'/account'">
                    <UserNewIcon />
                    <span class="label">Account</span>
                </Button>
            </div>
        </div>
        <div class="dashboard__wrapper">
            <div class="statistics__wrapper">
                <div class="statistic__box">
                    <span class="statistic-number">20</span>
                    <span class="statistic-label">Bàn</span>
                </div>
                <div class="statistic__box">
                    <span class="statistic-number">1120</span>
                    <span class="statistic-label">Lượt gọi món</span>
                </div>
                <div class="statistic__box">
                    <span class="statistic-number">56</span>
                    <span class="statistic-label">Khách hàng</span>
                </div>
                <div class="statistic__box">
                    <span class="statistic-number">36,2tr</span>
                    <span class="statistic-label">Doanh thu</span>
                </div>
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
    // height: 100vh;
    background: blanchedalmond;

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
}
</style>
