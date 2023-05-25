<script setup lang="ts">
import { ref } from 'vue';
import Button from '../Button.vue';

interface Props {
    tabNames: string[];
}

const props = defineProps<Props>();

const activeTab = ref(1);
</script>

<template>
    <div class="tab__wrapper">
        <div class="tabs">
            <ul class="tab-btn__container">
                <li
                    class="tab-btn"
                    v-for="(name, index) in tabNames"
                    :key="index"
                    :class="[index + 1 === activeTab ? 'active' : 'disable']"
                >
                    <label :for="`tab${index + 1}`">{{ name }}</label>
                    <input
                        type="radio"
                        :id="`tab${index + 1}`"
                        name="tab"
                        :value="index + 1"
                        v-model="activeTab"
                        class="hidden"
                    />
                </li>
            </ul>
        </div>

        <template v-for="(name, index) in tabNames" :key="index">
            <div class="tab-content" v-if="index + 1 === activeTab">
                <slot :name="`tabPanel-${index + 1}`" />
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.tab__wrapper {
    width: 100%;
    .tabs {
        width: 100%;
        height: $tab-height;
        .tab-btn__container {
            width: 100%;
            height: 100%;
            display: flex;
            padding-top: 4px;

            .tab-btn {
                background-color: $bg-gray;
                width: 100%;
                list-style: none;

                font-size: 1.3rem;

                label {
                    display: block;
                    padding: 8px;

                    text-align: center;

                    cursor: pointer;
                }

                &.active {
                    transition: border 2s;
                    border-top: 1px solid $primary3;
                    border-left: 1px solid $primary3;
                    border-right: 1px solid $primary3;
                    border-top-left-radius: 4px;
                    border-top-right-radius: 4px;

                    background-color: #fff;

                    color: $primary3;
                }
                &.disable {
                    border-bottom: 1px solid $primary3;
                    color: $text-gray;
                }
                .hidden {
                    display: none;
                }
            }
        }
    }

    .tab-content {
        height: calc(100vh - $tab-height - $footer-height);
    }
}
</style>
