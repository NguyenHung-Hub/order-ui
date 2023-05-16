<script setup lang="ts">
import SearchIcon from './Icons/SearchIcon.vue';
import BellIcon from './Icons/BellIcon.vue';
import Button from './Button.vue';
</script>

<template>
    <div class="header-wrapper">
        <div class="left-wrapper"></div>
        <div class="center-wrapper">
            <div class="search-wrapper">
                <input type="text" class="search-input" placeholder="Lẩu thái siêu cay" />
                <Button class="search-btn">
                    <SearchIcon class="btn-icon" />
                </Button>
            </div>
        </div>
        <div class="right-wrapper">
            <Button class="notify-btn">
                <BellIcon class="btn-icon" />
            </Button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../styles/index' as *;
.header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    height: $header-height;

    padding: 0 12px 0 24px;

    background: linear-gradient(45deg, #f3ffe9, #c7ffe8);
    .left-wrapper {
        display: none;
    }
    .center-wrapper {
        display: flex;
        flex: 1;

        .search-wrapper {
            display: flex;
            align-items: center;
            width: 100%;

            height: 32px;

            border: 1px solid #ccc;
            border-radius: 25px;

            background: #fff;
            overflow: hidden;
            .search-input {
                flex: 1;
                margin-left: 16px;
                height: 100%;
                border: none;
                outline: none;

                background: transparent;
            }
            .search-btn {
                position: relative;

                width: 32px;
                height: 100%;
                min-width: fit-content;
                // border-left: 1px solid #ccc;
                &::before {
                    position: absolute;
                    content: '';
                    top: 50%;
                    left: 0;

                    transform: translateY(-50%);
                    width: 1px;
                    height: 70%;
                    background: #ccc;
                }
            }
        }
    }

    .right-wrapper {
        margin-left: 12px;

        .notify-btn {
        }
    }
}
</style>
