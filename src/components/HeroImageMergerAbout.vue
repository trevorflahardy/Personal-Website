<script setup>
import Button from './Button.vue';
</script>

<template>
    <div class="rounded-xl w-full shadow flex flex-row items-stretch justify-center snap-center">
        <!-- Hold the preview of the image merger -->
        <div class="w-fit h-fit basis-[40%]">
            <img src="../assets/ImageMergerPreview.png" alt="Image Merger Preview" class="rounded-l-xl" />
        </div>

        <!-- Hold the description of the image merger -->
        <div class="w-full glass-thick rounded-r-xl shadow p-5 space-y-5">
            <div class="space-y-2">
                <div>
                    <span class="text-white text-2xl font-semibold">
                        What is an Image Merger?
                    </span>
                </div>

                <div>
                    <span class="text-white">
                        Image Merger is a <span class="text-green-400 font-medium">blazingly fast</span> and easy-to-use Rust crate that merges many images into one
                        larger
                        image. Boosted by paralleling, it can merge thousands of images in milliseconds. Its development
                        is
                        centered around memory efficiency and speed, as well as ease of use.
                    </span>
                </div>
            </div>

            <!-- TODO: Logos for the buttons -->
            <div class="flex flex-row items-center justify-start gap-5">
                <Button link="https://docs.rs/image-merger/latest/image_merger/">
                    <span class="font-semibold">
                        Documentation
                    </span>
                </Button>

                <Button link="https://github.com/trevorflahardy/image-merger">
                    <span class="font-semibold">
                        GitHub
                    </span>
                </Button>
            </div>
        </div>
    </div>
</template>