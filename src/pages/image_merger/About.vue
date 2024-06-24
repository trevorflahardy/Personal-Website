<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<template>
    <div class="rounded-xl w-full shadow flex flex-row items-stretch justify-center snap-center">
        <!-- Hold the preview of the image merger -->
        <div class="basis-[40%]">
            <img src="@/assets/ImageMergerPreview.png" alt="Image Merger Preview"
                class="rounded-l-xl object-cover h-full w-full" />
        </div>

        <!-- Hold the description of the image merger -->
        <div class="w-full glass-thick rounded-r-xl shadow p-5">
            <p class="title-3">
                What is an Image Merger?
            </p>

            <p class="caption">
                Image Merger is a <span class="text-green-400 font-medium">blazingly fast</span> and easy-to-use Rust
                crate that merges many images into one
                larger
                image. Boosted by paralleling, it can merge thousands of images in milliseconds. Its development
                is
                centered around memory efficiency and speed, as well as ease of use.
            </p>

            <div class="flex flex-row items-center justify-start gap-5">
                <Button link="https://docs.rs/image-merger/latest/image_merger/" icon="pi-book"
                    content="Documentation" />
                <Button link="https://github.com/trevorflahardy/image-merger" icon="pi-github" content="Github" />
            </div>
        </div>
    </div>
</template>