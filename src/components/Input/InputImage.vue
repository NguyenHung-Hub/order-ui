<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import CrossIcon from '../Icons/CrossIcon.vue';
import Button from '../Button.vue';

interface Props {
    size?: number;
    label?: string;
}

interface IImage extends File {
    preview?: any;
}

const props = withDefaults(defineProps<Props>(), {
    size: 80,
    label: 'Choose image',
});

const sizeCss = computed(() => `${props.size}px`);

let images = reactive<IImage[]>([]);
function onUploadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(`file: InputImage.vue:18 > event:`, images);

    if (target && target?.files) {
        const image: IImage = target.files[0];
        image.preview = URL.createObjectURL(image);
        images.push(image);
    }
}

function removeImage(image: IImage) {
    const index = images.indexOf(image);
    URL.revokeObjectURL(image.preview);
    images.splice(index, 1);
}
</script>

<template>
    <div class="choose-img__wrapper">
        <div class="preview__wrapper">
            <label for="choose-img" v-if="images.length < 4">
                <p>{{ props.label }} {{ images.length }}/4</p>
                <input type="file" id="choose-img" @change="onUploadFile" />
            </label>

            <div class="img-wrapper" v-for="(img, index) in images" :key="index">
                <img :src="img.preview" :alt="img.name" class="img-preview" />
                <Button class="remove-btn" :click="() => removeImage(img)">
                    <CrossIcon :color="`#ccc`" />
                </Button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/index' as *;

.choose-img__wrapper {
    width: inherit;

    .preview__wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-items: center;
        gap: 4px;

        .img-wrapper {
            position: relative;

            .img-preview {
                aspect-ratio: 1;
                width: 100%;

                border-radius: 4px;
                object-fit: cover;
            }

            .remove-btn {
                position: absolute;
                top: 2px;
                right: 2px;
                padding: 6px;

                background: rgba($color: #000000, $alpha: 0.7);

                border-radius: 50%;
                z-index: 10;
            }
        }
        label {
            position: relative;
            @include flex-center();

            margin: 16px;
            aspect-ratio: 1;
            width: v-bind(sizeCss);
            height: v-bind(sizeCss);

            border: 2px solid #ccc;
            border-style: dashed;

            &:hover {
                cursor: pointer;
            }

            p {
                display: inline-block;
                width: 100%;

                font-weight: bold;
                color: $disable-text-color;
                word-wrap: none;
                text-align: center;
            }

            input {
                display: none;
            }
        }
    }
}
</style>
